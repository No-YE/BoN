export default class extends Error {
  static of(error?: Error | unknown): Error {
    return error as Error;
  }
}
