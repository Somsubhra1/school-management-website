module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.isAuthenticated = true;
      next();
    } else {
      req.flash("error_msg", "Please login first");
      res.redirect("/");
    }
  },
  isAdmin: function (req, res, next) {
    if (req.user.type === "administrator") {
      next();
    } else {
      req.flash("error_msg", "Please login as admin");
      res.redirect("/");
    }
  },
  isEmployee: function (req, res, next) {
    if (req.user.type === "employee") {
      next();
    } else {
      req.flash("error_msg", "Please login as employee");
      res.redirect("/");
    }
  },
  isGuardian: function (req, res, next) {
    if (req.user.type === "guardian") {
      next();
    } else {
      req.flash("error_msg", "Please login as guardian");
      res.redirect("/");
    }
  },
  isPickupPerson: function (req, res, next) {
    if (req.user.type === "pickupPerson") {
      next();
    } else {
      req.flash("error_msg", "Please login as pickup person");
      res.redirect("/");
    }
  },
};
