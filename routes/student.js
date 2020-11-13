const router = require("express").Router();

const { showRegisterPage, studentRegister } = require("../controllers/student");

router.get("/register", showRegisterPage);

router.post("/register", studentRegister);

module.exports = router;
