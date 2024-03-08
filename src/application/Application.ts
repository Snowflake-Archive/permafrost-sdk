import { USER_AGENT } from "../index";
import Authorization from "./Authorization";

export type AccessTokenResponse = {
  access_token: string;
  token_type: "Bearer";
  scope: ("ReadPublic" | "ReadPrivate")[];
};

export default class Application {
  private endpoint: string;
  private clientId?: string;
  private clientSecret?: string;

  /**
   * Creates a new Permafrost instance
   * @param endpoint The endpoint to use
   * @param clientId The client ID of the OAuth application. This can be set later by `setClient`.
   * @param clientSecret The client secret of the OAuth application. This can be set later by `setClient`.
   */
  constructor(
    endpoint = "https://id.snowflake.blue/api",
    clientId?: string,
    clientSecret?: string
  ) {
    this.endpoint = endpoint;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Sets the current client ID and client secret
   * @param clientId The client ID
   * @param clientSecret The client secret
   */
  public setClient(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Gets the access token from the OAuth code.
   * @param code The code returned from the OAuth flow.
   * @returns An AccessTokenResponse object.
   */
  public async authorize(code: string): Promise<Authorization> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error("Client ID and Client Secret are required");
    }

    const response = await fetch(`${this.endpoint}/oauth/accessToken`, {
      method: "POST",
      headers: {
        "User-Agent": USER_AGENT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      }),
    });

    if (!response.ok) throw new Error("Failed to get access token");

    const json = (await response.json()) as AccessTokenResponse;

    return new Authorization(
      this.endpoint,
      json.scope,
      `${json.token_type} ${json.access_token}`
    );
  }
}
