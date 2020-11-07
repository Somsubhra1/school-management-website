module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.isAuthenticated = true;
      next();
    } else {
      res.redirect("/auth/login");
    }
  },
};
