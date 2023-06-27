import * as express from "express";
import * as dotenv from "dotenv";
const session = require("express-session");

dotenv.config();

import "dotenv/config";
import Database from "./config/database";
import apiLogger from "./utils/api-logger";

class AfroHome {
    public app: express.Application;
    private _db: Database;

    constructor() {
        this.app = express();
        this._db = new Database();
        this.app.use(express.json)
    }

    loadRoutes() {
        this.app.routes("/").get((req, res) => {
            res.redirect("/api");
        })
    }

    listen(port: string) {
        this.app.listen(port, () => {
            apiLogger.info(`The api project is running at the port: http://localhost:${port}`);
        });
    }

}

export default new AfroHome;