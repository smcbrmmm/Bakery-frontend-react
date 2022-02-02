"use strict";

var express = require("express");

var app = express();
var PORT = process.env.PORT || 5000;

var connectDB = require("./config/db");

connectDB();
app.get("/", function (req, res) {
  return res.send("Hello World");
});
app.listen(PORT, function () {
  return console.log("Server started on PORT ".concat(PORT));
});
app.use("/api/users", require("./routes/api/users"));
app.use(express.json({
  extended: false
}));