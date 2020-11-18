const router = require("express").Router();
const {
  showDashboard,
  search,
  studentNotice,
  globalNotice,
} = require("../controllers/admin");

router.get("/", showDashboard);

router.get("/search", search);

router.post("/notice/students", studentNotice);

router.post("/notice/global", globalNotice);

module.exports = router;
