const Student = require("../models/Student");

const showGuardianDashboard = async (req, res) => {
  console.log(req.user);
  const guardianid = req.user._id;
  // const guardianid = "5faf88b17a91a12e4c81a1eb";

  let students = await Student.find()
    .populate("guardian", { name: 1, username: 1 }, { _id: guardianid })
    .exec();
  students = students.filter((student) => student.guardian != null);

  // console.log(students);

  res.render("guardian/guardian", { students });
};

module.exports = { showGuardianDashboard };
