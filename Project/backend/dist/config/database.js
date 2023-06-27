"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const api_logger_1 = require("../utils/api-logger");
class Database {
    constructor() {
        this.dbUrl = process.env.DB_URL;
        this.createConnection();
    }
    createConnection() {
        try {
            mongoose.set("strictQuery", true); // DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
            mongoose.connect(this.dbUrl);
            api_logger_1.default.info(`Database connected successfully!`);
        }
        catch (error) {
            api_logger_1.default.error(`Failed to connect to the database!`);
        }
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map