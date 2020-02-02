export type Either<L, R> = Left<L> | Right<R>;

type Left<L> = {
  readonly value: L;
  readonly tag: 'left';
};

type Right<R> = {
  readonly value: R;
  readonly tag: 'right';
};

export function left<L>(value: L): Either<L, never> {
  return {
    value,
    tag: 'left',
  };
}

export function right<R>(value: R): Either<never, R> {
  return {
    value,
    tag: 'right',
  };
}

export function isLeft<L, R>(either: Either<L, R>): either is Left<L> {
  return either.tag === 'left';
}

export function isRight<L, R>(either: Either<L, R>): either is Right<R> {
  return either.tag === 'right';
}

export function match<T, L, R>(
  either: Either<L, R>,
  leftFunc: (left: L) => T,
  rightFunc: (right: R) => T,
): T {
  switch (either.tag) {
    case 'left':
      return leftFunc(either.value);
    case 'right':
      return rightFunc(either.value);
    default:
      return undefined;
  }
}
