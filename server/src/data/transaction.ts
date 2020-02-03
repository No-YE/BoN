export type Transaction = <T>(
  callback: (transaction: T) => void,
) => Promise<void>;
