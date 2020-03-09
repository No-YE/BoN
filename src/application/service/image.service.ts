import { map, TaskEither } from 'fp-ts/lib/TaskEither';
import AWS from 'aws-sdk';
import { pipe } from 'fp-ts/lib/pipeable';
import { CreatePresignedUrlDto } from '../dto/image.dto';
import makeImageRepository from '~/domain/repository/image.repository';
import { ImageKind } from '~/type';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makeImageService() {
  const repository = makeImageRepository();
  const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-northeast-2' });

  function generateUri(kind: ImageKind, userId: number, filename: string): string {
    return `image/${kind}/${userId}/${new Date()}-${filename}`;
  }

  function createPresignedUrl(dto: CreatePresignedUrlDto): TaskEither<Error, string> {
    const { kind, filename, userId } = dto;

    return pipe(
      generateUri(kind, userId, filename),
      (uri) => repository.create({ kind: 'post', uri }),
      map((image) => s3.getSignedUrl('putObject', {
        Bucket: 'blog-of-noye',
        Key: image.uri,
        Expires: 3 * 60,
      })),
    );
  }

  return {
    createPresignedUrl,
  };
}
