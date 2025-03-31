const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
// const favicon = require("serve-favicon");

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static file serving
const allowedExt = [
  ".js",
  ".ico",
  ".css",
  ".png",
  ".jpg",
  ".gif",
  ".jpeg",
  ".woff2",
  ".woff",
  ".ttf",
  ".svg",
  ".mp4",
];

// Set up EJS and Jade view engine
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "dist")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Serve index.html for all non-static routes
app.get("*", function (req, res, next) {
  if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`./dist/${req.url}`));
  } else {
    res.sendFile("index.html", {
      root: path.join(__dirname, "dist"),
    });
  }
});

app.listen(3000, (req, res) => {
  console.log("Server running on port 3000...");
});
