import { Request, Response, Router } from "express";
// import * as Nightmare from "nightmare";
// import * as passport from "passport";
import * as request from "request";
import * as logger from "winston";

const passport = require("passport");
const Nightmare = require("nightmare");

export class OAuthAccessTokenFetcher {
    private authCode: string;

    constructor(router: Router, private config: IConfig) {
        router.get("/login", passport.authenticate("amazon"));

        router.get("/callback", (req: Request, res: Response) => {
            logger.info(req.query.code);
            this.authCode = req.query.code;
            res.status(200);
        });
    }

    public fetch(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const nightmare = new Nightmare({ show: true });
            nightmare
                .goto(`${this.config.baseUrl}/amazon/login`)
                .insert("#session_key-oauth2SAuthorizeForm", this.config.amazon.email)
                .insert("#session_password-oauth2SAuthorizeForm", this.config.amazon.password)
                .type("#session_password-oauth2SAuthorizeForm", "\u000d")
                .wait(2000)
                .end()
                .then((result) => {
                    /*this.fetchAccessToken(this.authCode).then((accessToken) => {
                        resolve(accessToken);
                    });*/
                })
                .catch((err) => {
                    logger.error(err);
                    reject(err);
                });
        });
    }

    /*private fetchAccessToken(code: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            request.post("https://www.amazon.com/oauth/v2/accessToken", {
                form: {
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: `${this.config.baseUrl}/amazon/callback`,
                    client_id: this.config.amazon.clientId,
                    client_secret: this.config.amazon.secret,
                },
                json: true,
            }, (error, response, body: AccessTokenResponse) => {
                if (error || response.statusCode !== 200) {
                    reject(error);
                }

                resolve(body.access_token);
            });
        });
    }*/
}
