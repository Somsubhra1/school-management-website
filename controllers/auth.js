const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const showRegisterPage = (req, res) => {
  res.render("register");
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

module.exports = { showRegisterPage, login, showDashboard, logout };
