export default class extends Error {
  static of(message?: string | unknown): Error {
    return new this(message as string | undefined);
  }
}
