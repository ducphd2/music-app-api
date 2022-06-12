const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

module.exports = createLogger({
  transports: new DailyRotateFile({
    filename: path.join(__dirname, "..", "logs", `%DATE%.log`),
    prepend: true,
    json: false,
    format: format.combine(
      format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});
