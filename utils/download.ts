export const downloadBlob = (blobUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadImage = async (imageUrl: string, filename: string, format = 'image/png') => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    // Assuming backend returns correctly formatted blob or we convert it via canvas (simplified here)
    const blobUrl = URL.createObjectURL(blob);
    downloadBlob(blobUrl, filename);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download image.');
  }
};
