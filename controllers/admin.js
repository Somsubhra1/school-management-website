const Student = require("../models/Student");
const Notice = require("../models/Notice");

const showDashboard = (req, res) => {
  res.render("admin/dashboard");
};

const search = async (req, res) => {
  let guardian = req.query.guardian;
  let students;

  if (guardian) {
    students = await Student.find().populate({
      path: "guardian",
      match: { name: { $regex: "^" + guardian, $options: "i" } },
    });
  } else {
    students = await Student.find()
      .populate("guardian", { name: 1, username: 1 })
      .exec();
  }

  students = students.filter((student) => student.guardian != null);

  // console.log(students);
  res.json(students);
};

const studentNotice = async (req, res) => {
  // console.log(req.body);
  const students = req.body.students;
  const noticesArr = req.body.notices;
  // console.log(students);
  // console.log(noticesArr);

  try {
    await Student.updateMany(
      { _id: { $in: students } },
      { $push: { notices: { body: noticesArr } } }
    );
    // console.log(updatedStudentNotices);
  } catch (error) {
    console.log(error);
  }
};

const globalNotice = (req, res) => {
  const noticesArr = req.body.notices;
  Notice.create({ body: noticesArr }, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log(success);
    }
  });
};

module.exports = { showDashboard, search, studentNotice, globalNotice };
