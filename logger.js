import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Create a transport for daily rotation
const transport = new DailyRotateFile({
  filename: "logs/%DATE%-allLogger.log", // Change this path as needed
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "7d", // Keep logs for 7 days
});

// Create custom log format
const customLogFormat = winston.format.printf(
  ({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
  }
);

// Create logger instance
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), customLogFormat),
  transports: [
    transport,
    // Log errors with details
    new winston.transports.File({
      filename: "logs/errorLoggers.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}] ${message}`;
        })
      ),
    }),
    // Log warnings with details
    new winston.transports.File({
      filename: "logs/warningLogger.log",
      level: "warn",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}] ${message}`;
        })
      ),
    }),
    // Log successes with details
    new winston.transports.File({
      filename: "logs/successLogger.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}] ${message}`;
        })
      ),
    }),
  ],
});

// If not in production, also log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
