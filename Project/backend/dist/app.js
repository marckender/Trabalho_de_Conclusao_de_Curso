"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require('cors');
const multer = require('multer');
dotenv.config();
require("dotenv/config");
const database_1 = require("./config/database");
const api_logger_1 = require("./utils/api-logger");
const app_routes_1 = require("./routes/app-routes");
const user_routes_1 = require("./routes/user-routes");
const auth_routes_1 = require("./routes/auth-routes");
const product_routes_1 = require("./routes/product-routes");
const path = require("path");
const cart_routes_1 = require("./routes/cart-routes");
class AfroHome {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this._db = new database_1.default();
        this.app.use(express.json());
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + path.extname(file.originalname));
            },
        });
        const upload = multer({ storage });
        this.app.use(upload.array('images', 5));
        this.app.use('/uploads', express.static('uploads'));
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
    }
    listen(port) {
        this.app.listen(port, () => {
            api_logger_1.default.info(`The api project is running at the port: http://localhost:${port}`);
        });
    }
}
exports.default = new AfroHome;
//# sourceMappingURL=app.js.map