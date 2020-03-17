import Joi from 'typesafe-joi';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { ImageKind } from '~/type';
import validate from './validate';

type CreateImageSchema = {
  userId: number;
  filename: string;
  kind: ImageKind;
};

//eslint-disable-next-line import/prefer-default-export
export function createImageValidate(
  obj: { [key in keyof CreateImageSchema]: unknown },
): TaskEither<Error, CreateImageSchema> {
  const schema = Joi.object({
    userId: Joi.number().integer().min(0).required(),
    filename: Joi.string().replace(/\s+/g, '-').min(1).max(255),
    kind: Joi.valid('post').required(),
  });

  validate(schema, obj);
}
