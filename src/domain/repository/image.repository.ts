import { getManager, EntityManager } from 'typeorm';
import { tryCatch, TaskEither } from 'fp-ts/lib/TaskEither';
import { Image, ImageSchema } from '../aggregate/image';
import { ImageKind } from '~/type';
import Error from '~/lib/error';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const manager = getManager();

  function create(
    image: {
      kind: ImageKind;
      uri: string;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, Image> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.getRepository<Image>(ImageSchema).save(image),
      Error.of,
    );
  }

  return {
    create,
  };
};
