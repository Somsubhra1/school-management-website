const router = require("express").Router();
const {
  showDashboard,
  search,
  studentNotice,
  globalNotice,
  getStudent,
  payFees,
} = require("../controllers/admin");

router.get("/", showDashboard);

router.get("/search", search);

router.post("/notice/students", studentNotice);

router.post("/notice/global", globalNotice);

router.get("/payment/:id", getStudent);

router.post("/payment", payFees);

module.exports = router;
