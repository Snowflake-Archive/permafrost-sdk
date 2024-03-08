import { USER_AGENT } from "../index";
import { Scopes } from "../types";

export type UsersResponse = {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  createdAt: string;
};

export default class Authorization {
  private endpoint: string;
  private accessToken: string;
  private scope: Scopes;

  /**
   * Creates an Application Client.
   * @param endpoint The endpoint to use
   * @param accessToken The access token to use
   */
  constructor(
    endpoint = "https://id.snowflake.blue/api",
    scope: Scopes,
    accessToken: string
  ) {
    this.endpoint = endpoint;
    this.accessToken = accessToken;
    this.scope = scope;
  }

  /**
   * Gets the user authorized by the access token.
   * @returns A UsersResponse object.
   */
  public async getUser(): Promise<UsersResponse> {
    const response = await fetch(`${this.endpoint}/users/me`, {
      method: "POST",
      headers: {
        Authorization: this.accessToken,
        "User-Agent": USER_AGENT,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to get user");

    const json = (await response.json()) as UsersResponse;

    return json;
  }
}
