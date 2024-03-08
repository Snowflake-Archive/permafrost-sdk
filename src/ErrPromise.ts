// https://stackoverflow.com/questions/50071115/typescript-promise-rejection-type

export class ErrPromise<TSuccess, TError> extends Promise<TSuccess> {
  constructor(
    executor: (
      resolve: (value: TSuccess | PromiseLike<TSuccess>) => void,
      reject: (reason: TError) => void
    ) => void
  ) {
    super(executor);
    // Object.setPrototypeOf(this, new.target.prototype);  // restore prototype chain
  }
}

export interface ErrPromise<TSuccess, TError = unknown> {
  then<TResult1 = TSuccess, TResult2 = never>(
    onfulfilled?:
      | ((value: TSuccess) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: TError) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;

  catch<TResult = never>(
    onrejected?:
      | ((reason: TError) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<TSuccess | TResult>;
}
