"use strict";
const logger = require("winston");
const passport = require("passport");
const Nightmare = require("nightmare");
class OAuthAccessTokenFetcher {
    constructor(router, config) {
        this.config = config;
        router.get("/login", passport.authenticate("amazon"));
        router.get("/callback", (req, res) => {
            logger.info(req.query.code);
            this.authCode = req.query.code;
            res.status(200);
        });
    }
    fetch() {
        return new Promise((resolve, reject) => {
            const nightmare = new Nightmare({ show: true });
            nightmare
                .goto(`${this.config.baseUrl}/amazon/login`)
                .insert("#session_key-oauth2SAuthorizeForm", this.config.amazon.email)
                .insert("#session_password-oauth2SAuthorizeForm", this.config.amazon.password)
                .type("#session_password-oauth2SAuthorizeForm", "\u000d")
                .wait(2000)
                .end()
                .then((result) => {
            })
                .catch((err) => {
                logger.error(err);
                reject(err);
            });
        });
    }
}
exports.OAuthAccessTokenFetcher = OAuthAccessTokenFetcher;
//# sourceMappingURL=oauth-access-token-fetcher.js.map