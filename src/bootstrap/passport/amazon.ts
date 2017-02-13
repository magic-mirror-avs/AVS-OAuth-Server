import * as passport from "passport";
import { Strategy } from "passport-amazon";
import * as logger from "winston";

export class AmazonPassportLoader {

    public load(clientId: string, secret: string): void {
        passport.use(new Strategy({
            clientID: clientId,
            clientSecret: secret,
            callbackURL: "/amazon/callback",
        }, (accessToken, refreshToken, profile, done) => {
            logger.info(profile);
            return done(null, profile);
        }));
    }
}
