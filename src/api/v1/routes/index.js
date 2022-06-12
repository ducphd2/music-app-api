const express = require("express");
const fs = require("fs");
const route = express.Router();

const PATH_ROUTES = __dirname;

/**
 * readdir: returns the names of the files in the specified path
 */

fs.readdir(PATH_ROUTES, (err, files) => {
  if (err)
    console.log(
      `## An error has occurred, can not read these file. ##\n${err}`
    );
  files
    .filter((file) => file !== "index.js")
    .forEach((file) => {
      const fileName = file.split(".")[0];
      route.use(`/${fileName}`, require(`./${fileName}`));
    });
});

module.exports = route;
