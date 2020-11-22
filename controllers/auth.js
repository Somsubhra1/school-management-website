const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const showRegisterPage = (req, res) => {
  res.render("register");
};

const register = (req, res) => {
  const { name, username, password, password2, type } = req.body;
  let errors = [];

  if (!name || !username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords don't match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password must be atleast 6 characters" });
  }
  if (errors.length > 0) {
    return res.render("register", {
      errors,
      name,
      username,
      password,
      password2,
    });
  }

  // Check if user already present
  User.findOne({ username })
    .then((user) => {
      if (user) {
        errors.push({ msg: "Username is already registered" });
        return res.render("register", {
          errors,
          name,
          username,
          password,
          password2,
        });
      }
      const newUser = new User({ name, username, password, type });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              req.flash("success_msg", "Successfully added user");
              res.redirect("/");
            })
            .catch((err) => {
              console.log("Error saving to db: " + err);
            });
        });
      });
    })
    .catch((err) => {
      console.log("Error finding user in db: " + err);
    });
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.redirect("/");
    } else {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        if (user.type === "administrator") {
          return res.redirect("/admin");
        } else if (user.type === "guardian") {
          return res.redirect("/guardian");
        }
      });
    }
  })(req, res, next);
};

const showDashboard = (req, res) => {
  res.send("Success");
};

const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
};

module.exports = { showRegisterPage, register, login, showDashboard, logout };
