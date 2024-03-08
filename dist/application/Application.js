var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { USER_AGENT } from "../index";
import Authorization from "./Authorization";
export default class Application {
    /**
     * Creates a new Permafrost instance
     * @param endpoint The endpoint to use
     * @param clientId The client ID of the OAuth application. This can be set later by `setClient`.
     * @param clientSecret The client secret of the OAuth application. This can be set later by `setClient`.
     */
    constructor(endpoint = "https://id.snowflake.blue/api", clientId, clientSecret) {
        this.endpoint = endpoint;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Sets the current client ID and client secret
     * @param clientId The client ID
     * @param clientSecret The client secret
     */
    setClient(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Gets the access token from the OAuth code.
     * @param code The code returned from the OAuth flow.
     * @returns An AccessTokenResponse object.
     */
    authorize(code) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientId || !this.clientSecret) {
                throw new Error("Client ID and Client Secret are required");
            }
            const response = yield fetch(`${this.endpoint}/oauth/accessToken`, {
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
            if (!response.ok)
                throw new Error("Failed to get access token");
            const json = (yield response.json());
            return new Authorization(this.endpoint, json.scope, `${json.token_type} ${json.access_token}`);
        });
    }
}
