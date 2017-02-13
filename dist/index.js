"use strict";
const amazon_1 = require("./api/amazon");
const application_wrapper_1 = require("./bootstrap/application-wrapper");
const amazon_2 = require("./bootstrap/passport/amazon");
const index_1 = require("./config/index");
const logger = require("winston");
const config = new index_1.Config();
const amazonPassport = new amazon_2.AmazonPassportLoader();
amazonPassport.load(config.amazon.clientId, config.amazon.secret);
const appWrapper = new application_wrapper_1.ApplicationWrapper(config);
appWrapper.configure((app) => {
    logger.debug("Configuring application routes");
    app.use("/amazon", new amazon_1.AmazonRouter(config).router);
});
appWrapper.start();
//# sourceMappingURL=index.js.map