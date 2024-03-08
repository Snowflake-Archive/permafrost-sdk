// https://stackoverflow.com/questions/50071115/typescript-promise-rejection-type
export class ErrPromise extends Promise {
    constructor(executor) {
        super(executor);
        // Object.setPrototypeOf(this, new.target.prototype);  // restore prototype chain
    }
}
