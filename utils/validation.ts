export const validateImageFile = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
  }

  const maxSizeInBytes = 25 * 1024 * 1024; // 25MB
  if (file.size > maxSizeInBytes) {
    throw new Error('File size exceeds the 25MB limit.');
  }
  
  return true;
};
