import { ImageKind } from '~/type';

export type CreatePresignedUrlDto = {
  kind: ImageKind;
  filename: string;
  userId: number;
};
