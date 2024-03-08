var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrPromise } from "../ErrPromise";
import Applications from "./Applications";
import Authentication from "./Authentication";
/**
 * Permafrost API
 * Notice: this class is not intended to be used by end users. Users
 * should create applications and get user information from there,
 * as authenticating directly is insecure.
 */
export default class Permafrost {
    constructor(endpoint) {
        this.endpoint = "https://id.snowflake.blue/api";
        this.auth = new Authentication(this);
        this.applications = new Applications(this);
        this.endpoint = endpoint || this.endpoint;
    }
    /**
     * Utility function to make requests to the Permafrost API.
     * @param url
     * @param init
     * @param requireAuth
     * @returns
     */
    makeRequest(url, init = {}, requireAuth = true) {
        if (requireAuth && this.auth.session === undefined) {
            return new ErrPromise((_, rej) => {
                rej({
                    error: {
                        code: "Unauthorized",
                        message: "Authorization is needed to request this information.",
                    },
                });
            });
        }
        const headers = init.headers || {};
        const contentType = headers["content-type"] || "application/json";
        headers["content-type"] = contentType;
        return new ErrPromise((res, rej) => {
            fetch(url.startsWith("http") ? this.endpoint : `${this.endpoint}${url}`, Object.assign(Object.assign({}, init), { headers: Object.assign(Object.assign(Object.assign({}, headers), { "user-agent": "Permafrost/1.0.0" }), (this.auth.session !== undefined
                    ? {
                        authorization: `Bearer ${this.auth.session.token}`,
                    }
                    : {})), mode: "cors", signal: AbortSignal.timeout(30000) }))
                .then((r) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield r.json();
                r.ok ? res(resp) : rej(resp);
            }))
                .catch((e) => {
                rej({
                    error: {
                        code: "CouldNotConnect",
                        message: `Could not connect to the authentication API: ${this.endpoint}.`,
                    },
                });
            });
        });
    }
}
