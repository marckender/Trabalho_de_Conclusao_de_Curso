"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();
require("dotenv/config");
const database_1 = require("./config/database");
const api_logger_1 = require("./utils/api-logger");
const app_routes_1 = require("./routes/app-routes");
class AfroHome {
    constructor() {
        this.app = express();
        this._db = new database_1.default();
        this.app.use(express.json());
        this.loadRoutes();
    }
    loadRoutes() {
        this.app.route("/").get((req, res) => {
            res.redirect("/api");
        });
        this.app.use("/", app_routes_1.default);
    }
    listen(port) {
        this.app.listen(port, () => {
            api_logger_1.default.info(`The api project is running at the port: http://localhost:${port}`);
        });
    }
}
exports.default = new AfroHome;
//# sourceMappingURL=app.js.map