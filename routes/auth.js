const router = require("express").Router();

const { ensureAuthenticated } = require("../middlewares/auth");
const {
  showRegisterPage,
  login,
  register,
  showDashboard,
  logout,
} = require("../controllers/auth");

router.get("/register", showRegisterPage);

// User register handle route
router.post("/register", register);

// User login handle route
router.post("/login", login);

router.get("/dashboard", ensureAuthenticated, showDashboard);

// User logout handle
router.get("/logout", logout);

module.exports = router;
