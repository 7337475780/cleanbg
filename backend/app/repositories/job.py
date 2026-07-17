from sqlalchemy.orm import Session
from app.db.models.job import Job
from typing import Optional

class JobRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_uuid(self, job_uuid: str) -> Optional[Job]:
        return self.db.query(Job).filter(Job.id == job_uuid).first()

    def update_progress(self, job_uuid: str, status: str, progress: float) -> Job:
        job = self.get_by_uuid(job_uuid)
        if job:
            job.status = status
            job.progress = progress
            self.db.commit()
            self.db.refresh(job)
        return job

    def complete_job(self, job_uuid: str, output_path: str, processing_time: float) -> Job:
        job = self.get_by_uuid(job_uuid)
        if job:
            job.status = "COMPLETED"
            job.progress = 100.0
            job.output_image = output_path
            job.processing_time = processing_time
            self.db.commit()
            self.db.refresh(job)
        return job

    def fail_job(self, job_uuid: str) -> Job:
        job = self.get_by_uuid(job_uuid)
        if job:
            job.status = "FAILED"
            self.db.commit()
            self.db.refresh(job)
        return job
