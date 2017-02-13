import { OAuthAccessTokenFetcher } from "./access-token/oauth-access-token-fetcher";
import { Request, Response, Router } from "express";
import * as logger from "winston";

export class AmazonRouter {
    public router: Router;
    private accessTokenFetcher: OAuthAccessTokenFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.init();
        this.accessTokenFetcher = new OAuthAccessTokenFetcher(this.router, config);
    }

    public init(): void {
        this.router.get("/profile", (req: Request, res: Response) => {
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
