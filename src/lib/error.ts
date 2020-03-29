export default class StaticError extends Error {
  static of(error?: Error | string | unknown): Error {
    if (typeof error === 'string') {
      return new Error(error);
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error(error as string);
  }
}

export class Error400 extends StaticError {
  static of(error?: Error | string | unknown): Error400 {
    const originError = super.of(error);
    const error400 = new Error400(originError.message);
    error400.stack = originError.stack;

    return error400;
  }

  constructor(message?: string) {
    super(message);
    this.name = 'Bad Request';
  }
}

export class Error401 extends StaticError {
  static of(error?: Error | string | unknown): Error401 {
    const originError = super.of(error);
    const error401 = new Error401(originError.message);
    error401.stack = originError.stack;

    return error401;
  }

  constructor(message?: string) {
    super(message);
    this.name = 'Unauthorized';
  }
}

export class Error404 extends StaticError {
  static of(error?: Error | string | unknown): Error404 {
    const originError = super.of(error);
    const error404 = new Error404(originError.message);
    error404.stack = originError.stack;

    return error404;
  }

  constructor(message?: string) {
    super(message);
    this.name = 'NotFound';
  }
}
