const router = require("express").Router();

const {
  showRegisterPage,
  studentRegister,
  studentPaymentCheckout,
  studentPaymentVerify,
} = require("../controllers/student");

router.get("/register", showRegisterPage);

router.post("/register", studentRegister);

router.post("/payment", studentPaymentCheckout);

router.post("/payment/verify", studentPaymentVerify);

module.exports = router;
