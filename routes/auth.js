const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

const { ensureAuthenticated } = require("../middlewares/auth");

router.get("/register", (req, res) => {
  res.render("register");
});

// User register handle route
router.post("/register", (req, res) => {
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
});

// User login handle route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/auth/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send("Success");
});

// User logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

module.exports = router;
