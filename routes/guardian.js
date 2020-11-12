const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("guardian/guardian");
});

module.exports = router;
