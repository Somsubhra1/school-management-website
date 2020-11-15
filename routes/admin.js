const router = require("express").Router();
const Student = require("../models/Student");

router.get("/", (req, res) => {
  res.render("admin/dashboard");
});

router.get("/search", async function (req, res) {
  let guardian = req.query.guardian;
  let students;

  if (guardian) {
    students = await Student.find().populate({
      path: "guardian",
      match: { name: { $regex: "^" + guardian, $options: "i" } },
    });
  } else {
    students = await Student.find().populate("guardian", { name: 1, username: 1 }).exec();
  }

  students = students.filter((student) => student.guardian != null);

  // console.log(students);
  res.json(students);
});

router.post("/notice/students", (req, res) => {
  console.log(req.body);
  const students = req.body.students;
  const noticesArr = req.body.notices;
  console.log(noticesArr);

  for (i in students) {
    Student.findOneAndUpdate(
      { _id: students[i] },
      { $push: { notices: { body: noticesArr } } },
      (err, success) => {
        if (err) {
          console.log(err);
        } else {
          console.log(success);
        }
      }
    );
  }
});

module.exports = router;
