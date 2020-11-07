const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Password incorrect",
              });
            }
          });
        })
        .catch((err) => console.log("Error finding user " + err));
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
