import { AmazonRouter } from "./api/amazon";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { AmazonPassportLoader } from "./bootstrap/passport/amazon";
import { Config } from "./config/index";
import * as logger from "winston";

const config = new Config();

const amazonPassport = new AmazonPassportLoader();
amazonPassport.load(config.amazon.clientId, config.amazon.secret);

const appWrapper = new ApplicationWrapper(config);

appWrapper.configure((app) => {
    logger.debug("Configuring application routes");
    app.use("/amazon", new AmazonRouter(config).router);
});

appWrapper.start();
