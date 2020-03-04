export default class extends Error {
  static of(message?: string | unknown): Error {
    return new Error(message as string | undefined);
  }
}
