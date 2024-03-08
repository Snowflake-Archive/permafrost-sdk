import { ErrPromise } from "../ErrPromise";
import Permafrost from "./Permafrost";
import { ApplicationPrimitive, Error, Session, UserPrimitive } from "./types";

/* Types */

export type GetApplicationResponseBase = ApplicationPrimitive & {
  homepageURL?: string;
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  owner: UserPrimitive;
  redirectURIs: string[];
  isAuthorized: boolean;
};

export type GetApplicationResponseUser = GetApplicationResponseBase;
export type GetApplicationResponseCollaborator = GetApplicationResponseBase & {
  collaborators: UserPrimitive[];
  role: "owner" | "collaborator";
};

export type GetApplicationResponse =
  | GetApplicationResponseUser
  | GetApplicationResponseCollaborator;

export default class Applications {
  public permafrost: Permafrost;

  constructor(permafrost: Permafrost) {
    this.permafrost = permafrost;
  }

  /**
   * Gets a specific application.
   * @param body
   * @param options
   * @returns
   */
  public get(body: { application: string }, options?: RequestInit) {
    return this.permafrost.makeRequest<
      GetApplicationResponse,
      Error<"NotFound">
    >(`/applications/${body.application}`, {
      method: "GET",
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * Gets the authorized user's applications.
   * @param options
   * @returns
   */
  public list(options?: RequestInit) {
    return this.permafrost.makeRequest<
      ApplicationPrimitive[],
      Error<"NotFound">
    >("/applications", {
      method: "GET",
      ...options,
    });
  }
}
