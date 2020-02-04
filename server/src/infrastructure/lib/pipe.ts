export function pipe<T>(t: T): T
export function pipe<T, A>(t: T, a: (aArg: T) => A): A;
export function pipe<T, A, B>(t: T, a: (aArg: T) => A, b: (bArg: A) => B): B;
export function pipe<T, A, B, C>(t: T, a: (aArg: T) => A, b: (bArg: A) => B, c: (cArg: B) => C): C;
export function pipe<T, A, B, C, D>(
  t: T,
  a: (aArg: T) => A,
  b: (bArg: A) => B,
  c: (cArg: B) => C,
  d: (dArg: C) => D,
): D;
export function pipe<T, A, B, C, D, E>(
  t: T,
  a: (aArg: T) => A,
  b: (bArg: A) => B,
  c: (cArg: B) => C,
  d: (dArg: C) => D,
  e: (eArg: D) => E,
): E;
export function pipe<T, A, B, C, D, E, F>(
  t: T,
  a: (aArg: T) => A,
  b: (bArg: A) => B,
  c: (cArg: B) => C,
  d: (dArg: C) => D,
  e: (eArg: D) => E,
  f: (fArg: E) => F,
): F;

export function pipe(
  t: unknown,
  a?: Function,
  b?: Function,
  c?: Function,
  d?: Function,
  e?: Function,
  f?: Function,
): unknown {
  switch (arguments.length) {
    case 1:
      return a(t);
    case 2:
      return b(a(t));
    case 3:
      return c(b(a(t)));
    case 4:
      return d(c(b(a(t))));
    case 5:
      return e(d(c(b(a(t)))));
    case 6:
      return f(e(d(c(b(a(t))))));
    default:
      return undefined;
  }
}
