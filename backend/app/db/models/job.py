from sqlalchemy import Column, String, DateTime, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.session import Base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    @property
    def uuid(self):
        return str(self.id)
        
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    status = Column(String, default="queued", index=True)
    progress = Column(Float, default=0.0)
    input_image = Column(String, nullable=True)
    output_image = Column(String, nullable=True)
    processing_time = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="jobs")
    history_entry = relationship("History", back_populates="job", uselist=False, cascade="all, delete-orphan")
