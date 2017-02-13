"use strict";
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const session = require("express-session");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const logger = require("winston");
class ApplicationWrapper {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.app.use(compression());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.set("appPath", path.join("", "client"));
        this.app.use(morgan("dev"));
        this.app.use(express.static(this.app.get("appPath")));
        this.app.use(session({ secret: "league" }));
        this.server = http.createServer(this.app);
    }
    start(callback = () => null) {
        this.server.listen(this.config.port, () => {
            logger.info(`Express server listening on ${this.config.port}, in ${process.env.NODE_ENV} mode`);
            callback();
        });
    }
    configure(func = () => null) {
        func(this.app);
    }
    get Server() {
        return this.server;
    }
}
exports.ApplicationWrapper = ApplicationWrapper;
//# sourceMappingURL=application-wrapper.js.map