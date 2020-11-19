const router = require("express").Router();
const { showCheckout } = require("../controllers/payment");

router.post("/", showCheckout);

module.exports = router;
