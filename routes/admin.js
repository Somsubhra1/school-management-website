const router = require("express").Router();
const User = require("../models/User");
const Student = require("../models/Student");

router.get("/", (req, res) => {
  res.render("admin/dashboard");
});

router.get("/search", async function (req, res) {
  let guardian = req.query.guardian;

  let students;

  if (guardian) {
    const guardianid = await User.findOne(
      { type: "guardian", name: { $regex: "^" + guardian, $options: "i" } },
      { _id: 1 }
    ).exec();
    students = await Student.find({ guardian: guardianid })
      .populate("guardian", { name: 1, username: 1 })
      .exec();
  } else {
    students = await Student.find().populate("guardian", { name: 1, username: 1 }).exec();
  }

  console.log(students);

  res.json(students);
});

module.exports = router;
