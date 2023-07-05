import * as express from "express";
import * as dotenv from "dotenv";
const session = require("express-session");
const cors = require('cors');

dotenv.config();

import "dotenv/config";
import Database from "./config/database";
import apiLogger from "./utils/api-logger";
import appRoutes from "./routes/app-routes";
import userRoutes from "./routes/user-routes";
import authRoutes from "./routes/auth-routes";

class AfroHome {
    public app: express.Application;
    private _db: Database;

    constructor() {
        this.app = express();
         this.app.use(cors());
        this._db = new Database();
        this.app.use(express.json())


        this.loadRoutes();
    }

    loadRoutes() {
        this.app.route("/").get((req, res) => {
            res.redirect("/api");
        });
        this.app.use("/", appRoutes);
        this.app.use("/", userRoutes);
        this.app.use("/", authRoutes);
    }

    listen(port: string) {
        this.app.listen(port, () => {
            apiLogger.info(`The api project is running at the port: http://localhost:${port}`);
        });
    }


}

export default new AfroHome;