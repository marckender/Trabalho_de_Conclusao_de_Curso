import * as winston from "winston";

class Logger {
  createLogger() {
    const { combine, timestamp, label, printf } = winston.format;
    const projectFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    });
    return winston.createLogger({
      level: "silly",
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "api.log" }),
      ],
      format: combine(
        label({ label: "rechajem-api" }),
        timestamp(),
        projectFormat
      ),
    });
  }
}

export default new Logger().createLogger();