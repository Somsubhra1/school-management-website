const router = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/auth");
const {
  showRegisterPage,
  login,
  showDashboard,
  logout,
} = require("../controllers/auth");

// User login handle route
router.post("/login", login);

router.get("/dashboard", ensureAuthenticated, showDashboard);

// User logout handle
router.get("/logout", logout);

module.exports = router;
