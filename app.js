const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config/database.js");
const path = require("path");
const router = express.Router();

const apiRouter = require("./api_server/routes/product");
const port = 8080;


mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log("Not able to connect to the DB", err);
  } else {
    console.log("Connected to DB ", config.datbase);
  }
});

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/app_public/dist/client"));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/app_public/dist/client/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listensing at http://localhost:${port}`);
});
