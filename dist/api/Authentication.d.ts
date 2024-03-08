import { ErrPromise } from "../ErrPromise";
import Permafrost from "./Permafrost";
import { Error, Session, UserPrimitive } from "./types";
export type AuthenticationResponse = {
    user: UserPrimitive & {
        email: string;
        flags: string[];
        permissions: string[];
        twoFactorEnabled: boolean;
    };
    session: Session;
};
export default class Authentication {
    permafrost: Permafrost;
    session?: Session;
    user?: AuthenticationResponse["user"];
    constructor(permafrost: Permafrost);
    private handleAuthenticationResponse;
    /**
     * Authenticates a user using their email, password, and OTP code if required.
     * @param body
     * @param options
     * @returns
     */
    password(body: {
        email: string;
        password: string;
        otp?: string;
    }, options?: RequestInit): ErrPromise<AuthenticationResponse, Error<"PreconditionRequired" | "InvalidField">>;
    /**
     * Authenticates a user using an autnehtication token.
     * @param body
     * @param options
     * @returns
     */
    token(body: {
        token: string;
        otp: string;
    }, options?: RequestInit): ErrPromise<AuthenticationResponse, Error<"PreconditionRequired" | "InvalidField">>;
}
//# sourceMappingURL=Authentication.d.ts.map