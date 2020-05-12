const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use("/todos", require("./todo/router"));

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", function (err) {
  if (err) {
    console.error("Unable to connect to db", error);
    process.exit(10);
  }
  console.log("MongoDB database connection established successfully");
});

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.error("Unable to listen for connections", error);
    process.exit(10);
  }
  console.log("Server is running on Port: " + process.env.PORT);
});
