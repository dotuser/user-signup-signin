const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const env = require("dotenv");

const app = express();
env.config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//////////////////////////////////////////// HOME Route ////////////////////////////////////////////
app.route("/").get((req, res) => {
  res.render("home");
});

//////////////////////////////////////////// LOGIN Route ////////////////////////////////////////////
app.route("/login").get((req, res) => {
  res.render("login");
});

//////////////////////////////////////////// REGISTER Route ////////////////////////////////////////////
app.route("/register").get((req, res) => {
  res.render("register");
});

//////////////////////////////////////////// SUCCESS Route ////////////////////////////////////////////
app.route("/success").get((req, res) => {
  res.render("success");
});

//////////////////////////////////////////// ERROR Route ////////////////////////////////////////////
app.route("/error").get((req, res) => {
  res.render("error");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
