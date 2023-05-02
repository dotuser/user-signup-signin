const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const env = require("dotenv");

const app = express();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

//////////////////////////////////////////// MongoDB Connection ////////////////////////////////////////////

mongoose.connect(process.env.URI, { useNewUrlParser: true });

//////////////////////////////////////////// User Schema && Model ////////////////////////////////////////////

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//////////////////////////////////////////// HOME Route ////////////////////////////////////////////

app.get("/", (req, res) => {
  res.render("home");
});

//////////////////////////////////////////// LOGIN Route ////////////////////////////////////////////

app.route("/login").get((req, res) => {
  res.render("login");
});

//////////////////////////////////////////// REGISTER Route ////////////////////////////////////////////

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    let reg = "Registration";
    let log = "Login";

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    user.save();

    res.render("success", {
      reg: reg,
      log: log,
    });
  });

//////////////////////////////////////////// SUCCESS Route ////////////////////////////////////////////

app.get("/success", (req, res) => {
  res.render("success");
});

//////////////////////////////////////////// ERROR Route ////////////////////////////////////////////

app.get("/error", (req, res) => {
  res.render("error");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
