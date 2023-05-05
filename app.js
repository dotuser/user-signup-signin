const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
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
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    immutable: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    immutable: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

userSchema.plugin(uniqueValidator);

const User = new mongoose.model("User", userSchema);

//////////////////////////////////////////// HOME Route ////////////////////////////////////////////

app.get("/", (req, res) => {
  res.render("Home");
});

//////////////////////////////////////////// LOGIN Route ////////////////////////////////////////////

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.render("error", {
          msg: "User not found!",
          route: "/login",
          btnMsg: "Login Again",
        });
      } else {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (e, result) => {
            if (result === true) {
              res.render("success", {
                msg: `Welcome ${user.name}.`,
                route: "/",
                btnMsg: "Home",
              });
            } else {
              res.render("error", {
                msg: "Incorrect Password!",
                route: "/login",
                btnMsg: "Login Again",
              });
            }
          });
        }
      }
    });
  });

//////////////////////////////////////////// REGISTER Route ////////////////////////////////////////////

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    User.findOne({ username: req.body.username }).then((username) => {
      if (username) {
        res.render("error", {
          msg: "Username already taken!",
          route: "/register",
          btnMsg: "Try Again",
        });
      } else {
        User.findOne({ email: req.body.email }).then((email) => {
          if (email) {
            res.render("error", {
              msg: "Email already registered!",
              route: "/register",
              btnMsg: "Try Again",
            });
          } else {
            bcrypt.hash(req.body.password, 10, (e, hash) => {
              let reg = "Registration";
              let log = "Login";

              const user = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
              });
              user.save();

              res.render("success", {
                msg: "User Registration Successful",
                route: "/login",
                btnMsg: "Login",
              });
            });
          }
        });
      }
    });
  });

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
