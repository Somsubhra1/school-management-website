const router = require("express").Router();

const generateStudentID = require("../utils/generateID");

const Student = require("../models/Student");

router.get("/register", (req, res) => {
  res.render("student/register");
});

router.post("/register", (req, res) => {
  generateStudentID(req.body.class_name, req.body.joined_year, (studentID) => {
    const newStudent = new Student({
      studentID: studentID,
      name: req.body.name,
      class_name: req.body.class_name,
      joined_year: req.body.joined_year,
    });

    newStudent
      .save()
      .then((student) => {
        req.flash("success_msg", "Successfully added student");
        res.redirect("/student/register");
      })
      .catch((err) => {
        console.log("Error saving Student to db: " + err);
      });
  });
});

module.exports = router;
