"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require('cors');
dotenv.config();
require("dotenv/config");
const database_1 = require("./config/database");
const api_logger_1 = require("./utils/api-logger");
const app_routes_1 = require("./routes/app-routes");
const user_routes_1 = require("./routes/user-routes");
const auth_routes_1 = require("./routes/auth-routes");
const product_routes_1 = require("./routes/product-routes");
const cart_routes_1 = require("./routes/cart-routes");
const category_routes_1 = require("./routes/category-routes");
const oder_routes_1 = require("./routes/oder-routes");
class AfroHome {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this._db = new database_1.default();
        this.app.use(express.json());
        this.loadRoutes();
    }
    loadRoutes() {
        this.app.route("/").get((req, res) => {
            res.redirect("/api");
        });
        this.app.use("/", app_routes_1.default);
        this.app.use("/", user_routes_1.default);
        this.app.use("/", auth_routes_1.default);
        this.app.use("/", product_routes_1.default);
        this.app.use("/", cart_routes_1.default);
        this.app.use("/", category_routes_1.default);
        this.app.use("/", oder_routes_1.default);
    }
    listen(port) {
        this.app.listen(port, () => {
            api_logger_1.default.info(`The api project is running at the port: http://localhost:${port}`);
        });
    }
}
exports.default = new AfroHome;
//# sourceMappingURL=app.js.map