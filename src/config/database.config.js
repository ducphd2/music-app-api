const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  const mongoDbUrl =
    process.env.MONGO_ATLAS_URL ??
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  console.log(`Connecting to ${mongoDbUrl}`);

  await mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;
