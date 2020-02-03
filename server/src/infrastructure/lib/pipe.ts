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
      return a(t).then((bArg) => b(bArg));
    case 3:
      return a(t).then((bArg) => b(bArg)).then((cArg) => c(cArg));
    case 4:
      return a(t).then((bArg) => b(bArg)).then((cArg) => c(cArg)).then((dArg) => d(dArg));
    case 5:
      return a(t)
        .then((bArg) => b(bArg))
        .then((cArg) => c(cArg))
        .then((dArg) => d(dArg))
        .then((eArg) => e(eArg));
    case 6:
      return a(t)
        .then((bArg) => b(bArg))
        .then((cArg) => c(cArg))
        .then((dArg) => d(dArg))
        .then((eArg) => e(eArg))
        .then((fArg) => f(fArg));
    default:
      return undefined;
  }
}
