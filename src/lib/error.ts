export default class StaticError extends Error {
  static of(error?: Error | string | unknown): Error {
    if (typeof error === 'string') {
      return new Error(error);
    }

    return error as Error ?? new Error();
  }
}

export class Error401 extends StaticError {
  static of(error?: Error | string | unknown): Error401 {
    return super.of(error) as Error401;
  }
}
