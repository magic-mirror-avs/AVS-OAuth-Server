"use strict";
class Config {
    constructor() {
        this.port = process.env.PORT || 9000;
        this.baseUrl = process.env.BASE_URL || `http://localhost:${this.port}`;
        this.amazon = {
            email: "",
            password: "",
            clientId: "amzn1.application-oa2-client.81574bebfb25437595d7376f44b54f8e",
            secret: "87d49f998b3a6507b8e6a08760cda274e1d44a22a2bebade9433b1e7445d66a5",
        };
    }
}
exports.Config = Config;
//# sourceMappingURL=index.js.map