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
export default class Authorization {
    /**
     * Creates an Application Client.
     * @param endpoint The endpoint to use
     * @param accessToken The access token to use
     */
    constructor(endpoint = "https://id.snowflake.blue/api", scope, accessToken) {
        this.endpoint = endpoint;
        this.accessToken = accessToken;
        this.scope = scope;
    }
    /**
     * Gets the user authorized by the access token.
     * @returns A UsersResponse object.
     */
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.endpoint}/users/me`, {
                method: "POST",
                headers: {
                    Authorization: this.accessToken,
                    "User-Agent": USER_AGENT,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok)
                throw new Error("Failed to get user");
            const json = (yield response.json());
            return json;
        });
    }
}
