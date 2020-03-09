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
  const s3Url = 'https://blog-of-noye.s3.ap-northeast-2.amazonaws.com';

  function generatePath(kind: ImageKind, userId: number, filename: string): string {
    return `image/${kind}/${userId}/${Date.now()}-${filename}`;
  }

  function createPresignedUrl(dto: CreatePresignedUrlDto): TaskEither<Error, {
    uploadUri: string;
    realUri: string;
  }> {
    const { kind, filename, userId } = dto;
    const path = generatePath(kind, userId, filename);
    const realUri = `${s3Url}/${path}`;

    return pipe(
      repository.create({ kind: 'post', uri: realUri }),
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((_) => ({
        uploadUri: s3.getSignedUrl('putObject', {
          Bucket: 'blog-of-noye',
          Key: path,
          Expires: 3 * 60,
        }),
        realUri,
      })),
    );
  }

  return {
    createPresignedUrl,
  };
}
