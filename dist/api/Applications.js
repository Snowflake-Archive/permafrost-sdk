export default class Applications {
    constructor(permafrost) {
        this.permafrost = permafrost;
    }
    /**
     * Gets a specific application.
     * @param body
     * @param options
     * @returns
     */
    get(body, options) {
        return this.permafrost.makeRequest(`/applications/${body.application}`, Object.assign({ method: "GET", body: JSON.stringify(body) }, options));
    }
    /**
     * Gets the authorized user's applications.
     * @param options
     * @returns
     */
    list(options) {
        return this.permafrost.makeRequest("/applications", Object.assign({ method: "GET" }, options));
    }
}
