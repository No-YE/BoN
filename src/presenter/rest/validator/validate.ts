import { left, right, TaskEither } from 'fp-ts/lib/TaskEither';
import { ObjectSchema, Value } from 'typesafe-joi';
import { Error400 } from '~/lib/error';

export default <T>(
  schema: ObjectSchema<Value<Record<never, never>, never, never, undefined, never>>,
  obj: { [key in keyof T]: unknown },
): TaskEither<Error, T> => {
  const result = schema.validate(obj);

  return result.error ? left(Error400.of(result.error)) : right(result.value as T);
};
