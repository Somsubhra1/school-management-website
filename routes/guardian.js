const { showGuardianDashboard } = require("../controllers/guardian");

const router = require("express").Router();

router.get("/", showGuardianDashboard);

module.exports = router;
