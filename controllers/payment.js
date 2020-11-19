const Payment = require("../models/Payment");
const Student = require("../models/Student");

const showCheckout = async (req, res) => {
  const studentID = req.body.studentid;
  const studentData = await Student.findOne(
    { _id: studentID },
    { name: 1, studentID: 1, outstandingBill: 1 }
  ).exec();
  console.log(studentData);

  res.render("payment/checkout", { studentData });
};

module.exports = { showCheckout };
