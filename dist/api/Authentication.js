import { ErrPromise } from "../ErrPromise";
export default class Authentication {
    constructor(permafrost) {
        this.permafrost = permafrost;
    }
    handleAuthenticationResponse(response) {
        this.session = response.session;
        this.user = response.user;
    }
    /**
     * Authenticates a user using their email, password, and OTP code if required.
     * @param body
     * @param options
     * @returns
     */
    password(body, options) {
        return new ErrPromise((res, rej) => {
            const promise = this.permafrost.makeRequest("/users/auth", Object.assign({ method: "POST", body: JSON.stringify(body) }, options), false);
            promise
                .then((result) => {
                this.handleAuthenticationResponse(result);
                res(result);
            })
                .catch(rej);
        });
    }
    /**
     * Authenticates a user using an autnehtication token.
     * @param body
     * @param options
     * @returns
     */
    token(body, options) {
        return new ErrPromise((res, rej) => {
            const promise = this.permafrost.makeRequest("/users/auth/token", Object.assign({ method: "POST", body: JSON.stringify(body) }, options), false);
            promise
                .then((result) => {
                this.handleAuthenticationResponse(result);
                res(result);
            })
                .catch(rej);
        });
    }
}
