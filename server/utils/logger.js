const colors = require("colors");

const format = (level, message) =>
  `[${new Date().toISOString()}] ${level} ${message}`;

const logger = {
  info: (message) => console.log(format("INFO", message).cyan),
  warn: (message) => console.warn(format("WARN", message).yellow),
  error: (message) => console.error(format("ERROR", message).red),
};

module.exports = logger;
