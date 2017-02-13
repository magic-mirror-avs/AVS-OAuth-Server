"use strict";
const passport = require("passport");
const passport_amazon_1 = require("passport-amazon");
const logger = require("winston");
class AmazonPassportLoader {
    load(clientId, secret) {
        passport.use(new passport_amazon_1.Strategy({
            clientID: clientId,
            clientSecret: secret,
            callbackURL: "/amazon/callback",
        }, (accessToken, refreshToken, profile, done) => {
            logger.info(profile);
            return done(null, profile);
        }));
    }
}
exports.AmazonPassportLoader = AmazonPassportLoader;
//# sourceMappingURL=amazon.js.map