import { ErrPromise } from "../ErrPromise";
import Applications from "./Applications";
import Authentication from "./Authentication";
import { DefaultError, Session } from "./types";

/**
 * Permafrost API
 * Notice: this class is not intended to be used by end users. Users
 * should create applications and get user information from there,
 * as authenticating directly is insecure.
 */
export default class Permafrost {
  public endpoint = "https://id.snowflake.blue/api";
  public readonly auth: Authentication;
  public readonly applications: Applications;

  constructor(endpoint?: string) {
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
  public makeRequest<S, E extends DefaultError = DefaultError>(
    url: string,
    init: RequestInit = {},
    requireAuth = true
  ): ErrPromise<S, E> {
    if (requireAuth && this.auth.session === undefined) {
      return new ErrPromise<S, E>((_, rej) => {
        rej({
          error: {
            code: "Unauthorized",
            message: "Authorization is needed to request this information.",
          },
        } as E);
      });
    }

    const headers: HeadersInit & {
      "content-type"?: string;
      authorization?: string;
    } = init.headers || {};

    const contentType = headers["content-type"] || "application/json";

    headers["content-type"] = contentType;

    return new ErrPromise<S, E>((res, rej) => {
      fetch(url.startsWith("http") ? this.endpoint : `${this.endpoint}${url}`, {
        ...init,
        headers: {
          ...headers,
          "user-agent": "Permafrost/1.0.0",
          ...(headers.authorization !== undefined
            ? {
                authorization: headers.authorization,
              }
            : this.auth.session !== undefined
            ? {
                authorization: `Bearer ${this.auth.session.token}`,
              }
            : {}),
        },
        mode: "cors",
        signal: AbortSignal.timeout(30000),
      })
        .then(async (r) => {
          const resp = await r.json();

          r.ok ? res(resp) : rej(resp);
        })
        .catch((e) => {
          rej({
            error: {
              code: "CouldNotConnect",
              message: `Could not connect to the authentication API: ${this.endpoint}.`,
            },
          } as E);
        });
    });
  }
}
