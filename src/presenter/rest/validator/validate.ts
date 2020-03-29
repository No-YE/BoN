import { left, right, Either } from 'fp-ts/lib/Either';
import { ObjectSchema, Value } from 'typesafe-joi';
import { Error400 } from '~/lib/error';

export default <T>(
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ObjectSchema<Value<Record<never, never>, any, never, undefined, never>>,
  obj: { [key in keyof T]: unknown },
): Either<Error, T> => {
  const result = schema.validate(obj);

  return result.error ? left(Error400.of(result.error)) : right(result.value as T);
};
