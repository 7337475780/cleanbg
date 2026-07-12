export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageFile extends File {
  dimensions?: ImageDimensions;
  previewUrl?: string;
}
