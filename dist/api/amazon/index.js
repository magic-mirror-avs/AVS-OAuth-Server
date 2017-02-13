"use strict";
const oauth_access_token_fetcher_1 = require("./access-token/oauth-access-token-fetcher");
const express_1 = require("express");
const logger = require("winston");
class AmazonRouter {
    constructor(config) {
        this.router = express_1.Router();
        this.init();
        this.accessTokenFetcher = new oauth_access_token_fetcher_1.OAuthAccessTokenFetcher(this.router, config);
    }
    init() {
        this.router.get("/profile", (req, res) => {
            logger.debug("Getting Auth Token");
            this.accessTokenFetcher.fetch().then((profile) => {
                res.status(200).send(profile);
            }).catch((error) => {
                logger.error(error);
                res.status(500).send("Something went wrong. Cannot get profile");
            });
        });
    }
}
exports.AmazonRouter = AmazonRouter;
//# sourceMappingURL=index.js.map