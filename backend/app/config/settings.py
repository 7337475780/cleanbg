from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "cleanBG Enterprise API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "development_secret_key_change_in_production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/cleanbg"
    
    # Redis & RQ
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Storage
    STORAGE_PROVIDER: str = "local" # local, s3, r2, azure, gcs
    UPLOAD_DIR: str = "uploads"
    PROCESSED_DIR: str = "processed"
    
    # Cloud Storage Config
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None
    AWS_REGION: str = "us-east-1"
    AWS_BUCKET_NAME: str | None = None
    AZURE_STORAGE_CONNECTION_STRING: str | None = None
    AZURE_CONTAINER_NAME: str | None = None
    GCS_BUCKET_NAME: str | None = None
    GCS_PROJECT_ID: str | None = None
    
    # Observability
    SENTRY_DSN: str | None = None
    LOG_LEVEL: str = "INFO"
    LOG_JSON: bool = False
    ENABLE_METRICS: bool = True
    PROMETHEUS_ENABLED: bool = True
    ENABLE_REQUEST_LOGGING: bool = True
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # AI Engine & Workers
    AI_ENGINE: str = "rmbg"
    MODEL_PATH: str = "models/rmbg"
    DEVICE: str = "auto"
    USE_FP16: bool = True
    ENABLE_WARMUP: bool = True
    ENABLE_THUMBNAILS: bool = True
    MAX_UPLOAD_SIZE: int = 20 * 1024 * 1024
    MAX_IMAGE_DIMENSION: int = 10000
    WORKER_TIMEOUT: int = 300
    WORKER_CONCURRENCY: int = 1
    REQUEST_TIMEOUT: int = 60
    MAX_UPLOADS: int = 10
    
    # Privacy & Cleanup
    TEMP_FILE_TTL: int = 300
    AUTO_DELETE_FILES: bool = True
    MAX_TEMP_STORAGE: str = "2GB"
    GPU_MEMORY_LIMIT: float = 0.9
    DELETE_AFTER_DOWNLOAD: bool = True
    
    MODEL_CACHE: str = "models/"
    THUMBNAIL_SIZE: int = 256
    JPEG_BACKGROUND: str = "white"
    PNG_COMPRESSION: int = 6
    WEBP_QUALITY: int = 85
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
