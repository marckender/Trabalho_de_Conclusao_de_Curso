import * as mongoose from "mongoose";
import apiLogger from "../utils/api-logger";
export default class Database {
  private dbUrl = process.env.DB_URL;
  constructor() {
    this.createConnection();
  }

  createConnection() {
    try {
      mongoose.set("strictQuery", true); // DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
      mongoose.connect(this.dbUrl);
      apiLogger.info(`Database connected successfully!`);
    } catch (error) {
      apiLogger.error(`Failed to connect to the database!`);
    }
  }
}