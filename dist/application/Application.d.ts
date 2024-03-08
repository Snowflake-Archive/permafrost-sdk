import Authorization from "./Authorization";
export type AccessTokenResponse = {
    access_token: string;
    token_type: "Bearer";
    scope: ("ReadPublic" | "ReadPrivate")[];
};
export default class Application {
    private endpoint;
    private clientId?;
    private clientSecret?;
    /**
     * Creates a new Permafrost instance
     * @param endpoint The endpoint to use
     * @param clientId The client ID of the OAuth application. This can be set later by `setClient`.
     * @param clientSecret The client secret of the OAuth application. This can be set later by `setClient`.
     */
    constructor(endpoint?: string, clientId?: string, clientSecret?: string);
    /**
     * Sets the current client ID and client secret
     * @param clientId The client ID
     * @param clientSecret The client secret
     */
    setClient(clientId: string, clientSecret: string): void;
    /**
     * Gets the access token from the OAuth code.
     * @param code The code returned from the OAuth flow.
     * @returns An AccessTokenResponse object.
     */
    authorize(code: string): Promise<Authorization>;
}
//# sourceMappingURL=Application.d.ts.map