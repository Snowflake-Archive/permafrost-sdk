import { ErrPromise } from "../ErrPromise";
import Permafrost from "./Permafrost";
import { Error, GenericSuccess, Session, UserPrimitive } from "./types";

/* Types */

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
  public permafrost: Permafrost;
  public session?: Session;
  public user?: AuthenticationResponse["user"];

  constructor(permafrost: Permafrost) {
    this.permafrost = permafrost;
  }

  private handleAuthenticationResponse(response: AuthenticationResponse) {
    this.session = response.session;
    this.user = response.user;
  }

  /**
   * Authenticates a user using their email, password, and OTP code if required.
   * @param body
   * @param options
   * @returns
   */
  public password(
    body: { email: string; password: string; otp?: string },
    options?: RequestInit
  ) {
    return new ErrPromise<
      AuthenticationResponse,
      Error<"PreconditionRequired" | "InvalidField">
    >((res, rej) => {
      const promise = this.permafrost.makeRequest<
        AuthenticationResponse,
        Error<"PreconditionRequired" | "InvalidField">
      >(
        "/users/auth",
        {
          method: "POST",
          body: JSON.stringify(body),
          ...options,
        },
        false
      );

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
  public token(body: { token: string; otp: string }, options?: RequestInit) {
    return new ErrPromise<
      AuthenticationResponse,
      Error<"PreconditionRequired" | "InvalidField">
    >((res, rej) => {
      const promise = this.permafrost.makeRequest<
        AuthenticationResponse,
        Error<"PreconditionRequired" | "InvalidField">
      >(
        "/users/auth/token",
        {
          method: "POST",
          body: JSON.stringify(body),
          ...options,
        },
        false
      );

      promise
        .then((result) => {
          this.handleAuthenticationResponse(result);
          res(result);
        })
        .catch(rej);
    });
  }

  /**
   * Authorization endpoints related to completing OAuth flows.
   */
  public oauth = {
    /**
     * Completes the OAuth flow for a GitHub account.
     * @param param0
     * @param options
     * @returns
     */
    completeGithub: ({ code }: { code: string }, options?: RequestInit) => {
      return this.permafrost.makeRequest<GenericSuccess>(
        `/oauth/create/github`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${code}`,
          },
          ...options,
        }
      );
    },

    /**
     * Completes the OAuth flow for a Discord account.
     * @param param0
     * @param options
     * @returns
     */
    completeDiscord: ({ code }: { code: string }, options?: RequestInit) => {
      return this.permafrost.makeRequest<GenericSuccess>(
        `/oauth/create/discord`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${code}`,
          },
          ...options,
        }
      );
    },
  };

  /**
   * Authorization endpoints related to password resets.
   */
  public passwordReset = {
    /**
     * Sends an E-Mail to the user with a reset token.
     * @param param0
     * @param options
     * @returns
     */
    begin: ({ email }: { email: string }, options?: RequestInit) => {
      return this.permafrost.makeRequest<GenericSuccess>(`/users/me/reset`, {
        method: "POST",
        body: JSON.stringify({ email }),
        ...options,
      });
    },

    /**
     * Completes the password reset flow.
     * @param param0
     * @param options
     * @returns
     */
    complete: (
      {
        userId,
        password,
        token,
      }: { userId: string; password: string; token: string },
      options?: RequestInit
    ) => {
      return this.permafrost.makeRequest<
        GenericSuccess,
        Error<"Unauthorized" | "NotAllowed">
      >(`/users/${userId}/reset`, {
        method: "PUT",
        body: JSON.stringify({ password }),
        headers: {
          authorization: `Bearer ${token}`,
        },
        ...options,
      });
    },
  };
}
