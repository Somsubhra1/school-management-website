const router = require("express").Router();
const {
  showDashboard,
  search,
  studentNotice,
  globalNotice,
  getStudent,
  payFees,
  addUserPage,
  addUser,
} = require("../controllers/admin");

router.get("/", showDashboard);

router.get("/search", search);

router.post("/notice/students", studentNotice);

router.post("/notice/global", globalNotice);

router.get("/payment/:id", getStudent);

router.post("/payment", payFees);

router.get("/add", addUserPage);
router.post("/add", addUser);

module.exports = router;
