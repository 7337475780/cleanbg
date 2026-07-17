# Privacy & Zero-Retention Guarantee

CleanBG is architected from the ground up as a **Privacy-First AI SaaS**. We respect user privacy by adhering to a strict **zero-retention policy**.

## Guarantees

1. **No Permanent Storage**: Original uploaded images and processed results are never permanently stored on any server or cloud bucket.
2. **Immediate Deletion**: Images are aggressively deleted from the server the exact moment they are downloaded by the client.
3. **Automatic Cleanup**: If a user uploads an image but abandons the session or fails to download the result, an internal cleanup scheduler securely wipes the files within 5 minutes (`TEMP_FILE_TTL=300`).
4. **Metadata Only**: The database records only statistical metadata (file size, dimensions, processing time) to monitor API health. **No image data, paths, or base64 strings are retained in PostgreSQL.**
5. **No AI Training**: User images are never utilized to train, retrain, or fine-tune any AI models.

## Infrastructure
By removing integrations with AWS S3, Google Cloud Storage, and Azure Blob Storage, we ensure your files never leave our temporary processing pipeline.
