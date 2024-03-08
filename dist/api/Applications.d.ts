import { ErrPromise } from "../ErrPromise";
import Permafrost from "./Permafrost";
import { ApplicationPrimitive, Error, UserPrimitive } from "./types";
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
export type GetApplicationResponse = GetApplicationResponseUser | GetApplicationResponseCollaborator;
export default class Applications {
    permafrost: Permafrost;
    constructor(permafrost: Permafrost);
    /**
     * Gets a specific application.
     * @param body
     * @param options
     * @returns
     */
    get(body: {
        application: string;
    }, options?: RequestInit): ErrPromise<GetApplicationResponse, Error<"NotFound">>;
    /**
     * Gets the authorized user's applications.
     * @param options
     * @returns
     */
    list(options?: RequestInit): ErrPromise<ApplicationPrimitive[], Error<"NotFound">>;
}
//# sourceMappingURL=Applications.d.ts.map