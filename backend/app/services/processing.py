from sqlalchemy.orm import Session
from app.db.models.job import Job
from app.repositories.job import JobRepository
from rq import Queue, Retry
from redis import Redis
from app.config.settings import settings
from loguru import logger
import uuid

redis_conn = Redis.from_url(settings.REDIS_URL)
# Priority queues
high_queue = Queue('high', connection=redis_conn)
default_queue = Queue('default', connection=redis_conn)
low_queue = Queue('low', connection=redis_conn)

class ProcessingService:
    def __init__(self, db: Session):
        self.repo = JobRepository(db)

    def create_and_enqueue_job(self, user_id: str, input_image_path: str, priority: str = "default") -> Job:
        job_id = uuid.uuid4()
        job = Job(
            id=job_id,
            user_id=user_id,
            status="QUEUED",
            progress=5.0,
            input_image=input_image_path
        )
        self.repo.db.add(job)
        self.repo.db.commit()
        self.repo.db.refresh(job)
        
        target_queue = {
            "high": high_queue,
            "default": default_queue,
            "low": low_queue
        }.get(priority, default_queue)
        
        # Enqueue with retries and exponential backoff
        rq_job = target_queue.enqueue(
            'app.tasks.process.process_image_task', 
            job.uuid, 
            job.input_image, 
            job_id=job.uuid,
            job_timeout='10m',
            retry=Retry(max=3, interval=[10, 30, 60])
        )
        
        logger.info(f"Enqueued job {job.uuid} into {target_queue.name} queue with RQ ID {rq_job.id}")
        return job

    def update_job_progress(self, job_uuid: str, status: str, progress: float) -> Job:
        """Abstracted progress tracker. In the future, this can also emit Redis Pub/Sub events."""
        job = self.repo.update_progress(job_uuid, status, progress)
        if job:
            logger.info(f"Job {job_uuid} updated: {status} ({progress}%)")
            # TODO: Emit Pub/Sub event here for Websockets
        return job

    def finalize_job(self, job_uuid: str, output_path: str, thumbnail_path: str, processing_time: float) -> Job:
        job = self.repo.complete_job(job_uuid, output_path, processing_time)
        if job:
            # We don't have thumbnail field in current schema, but can save it or handle it in storage layer
            logger.info(f"Job {job_uuid} finalized successfully in {processing_time:.2f}s")
        return job

    def mark_job_failed(self, job_uuid: str, error_message: str) -> Job:
        job = self.repo.fail_job(job_uuid)
        logger.error(f"Job {job_uuid} failed: {error_message}")
        return job
