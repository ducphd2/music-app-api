const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const connectDatabase = require("./config/database.config");
const logger = require("./api/v1/helpers/handleLogger");
require("dotenv").config();

const app = express();
const route = require("./api/v1/routes");

const isProduction = process.env.NODE_ENV === "production";

app.use(isProduction ? morgan("combined") : morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", route);

// app.get("/", (req, res) => {
//   var path = __dirname + "/docs.md";
//   var file = fs.readFileSync(path, "utf8");
//   res.send(marked(file.toString()));
// });

app.get("/", (req, res, next) => {
  const p = `https://github.com/ducph1/music-app-api/blob/master/README.md`;
  res.send(
    `API for Android Music App. Check out <a href="${p}">documentation</a> now. `
  );
});

// Capture 500 errors
app.use((err, req, res, next) => {
  res.status(500).send("Could not perform this task!");
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

// Capture 404 errors
app.use((req, res, next) => {
  res.status(404).send("PAGE NOT FOUND");
  logger.error(
    `${res.statusMessage} || 404 - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

connectDatabase();

module.exports = app;
