export type CreateThumbnailMessage = {
  id: string;
  uri: string;
  blobName: string;
};

export type ImageDbItemType = {
  id: string;
  uri: string;
  thumbnail?: string;
};
