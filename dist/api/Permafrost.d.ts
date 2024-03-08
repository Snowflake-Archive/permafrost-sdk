import { ErrPromise } from "../ErrPromise";
import Applications from "./Applications";
import Authentication from "./Authentication";
import { DefaultError } from "./types";
/**
 * Permafrost API
 * Notice: this class is not intended to be used by end users. Users
 * should create applications and get user information from there,
 * as authenticating directly is insecure.
 */
export default class Permafrost {
    endpoint: string;
    readonly auth: Authentication;
    readonly applications: Applications;
    constructor(endpoint?: string);
    /**
     * Utility function to make requests to the Permafrost API.
     * @param url
     * @param init
     * @param requireAuth
     * @returns
     */
    makeRequest<S, E extends DefaultError = DefaultError>(url: string, init?: RequestInit, requireAuth?: boolean): ErrPromise<S, E>;
}
//# sourceMappingURL=Permafrost.d.ts.map