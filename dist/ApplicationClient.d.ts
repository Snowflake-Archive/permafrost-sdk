export type Scopes = "ReadPublic" | "ReadPrivate";
export type UsersResponse = {
    id: string;
    username: string;
    displayName: string;
    email?: string;
    createdAt: string;
};
export default class ApplicationClient<S extends Scopes[]> {
    private endpoint;
    private accessToken;
    private scope;
    /**
     * Creates an Application Client.
     * @param endpoint The endpoint to use
     * @param accessToken The access token to use
     */
    constructor(endpoint: string | undefined, scope: S, accessToken: string);
    /**
     * Gets the user authorized by the access token.
     * @returns A UsersResponse object.
     */
    getUser(): Promise<UsersResponse>;
}
//# sourceMappingURL=ApplicationClient.d.ts.map