const generateStudentID = require("../utils/generateID");
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.razor_key_id,
  key_secret: process.env.razor_key_secret,
});

const Student = require("../models/Student");
const Payment = require("../models/Payment");

const showRegisterPage = (req, res) => {
  res.render("student/register");
};

const studentRegister = (req, res) => {
  generateStudentID(req.body.class_name, req.body.joined_year, (studentID) => {
    const newStudent = new Student({
      guardian: req.user.id,
      studentID: studentID,
      name: req.body.name,
      class_name: req.body.class_name,
      joined_year: req.body.joined_year,
      outstandingBill: 500,
    });

    newStudent
      .save()
      .then((student) => {
        req.flash("success_msg", "Successfully added student");
        res.redirect("/guardian/students/register");
      })
      .catch((err) => {
        console.log("Error saving Student to db: " + err);
      });
  });
};

const studentPaymentCheckout = async (req, res) => {
  const { studentId } = req.body;

  const student = await Student.findById(studentId);

  const amount = student.outstandingBill * 100;

  const { id: orderId } = await instance.orders.create({
    amount,
    currency: "INR",
    payment_capture: 1,
  });

  return res.render("payment/checkout", {
    orderId,
    key: process.env.razor_key_id,
    amount,
    studentData: student,
  });
};

const studentPaymentVerify = async (req, res) => {
  const { orderId, paymentId, signature, studentId } = req.body;

  const payment = await instance.payments.fetch(paymentId);

  if (payment) {
    const newPayment = new Payment({
      student: studentId,
      orderId,
      paymentId,
      signature,
      amount: payment.amount / 100,
      isPaid: true,
    });
    await newPayment.save();

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        outstandingBill: 0,
      },
      { new: true }
    );
    if (updatedStudent) {
      return res.json({ success: true });
    }
  }
};

module.exports = {
  showRegisterPage,
  studentRegister,
  studentPaymentCheckout,
  studentPaymentVerify,
};
