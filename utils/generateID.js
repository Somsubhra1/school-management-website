const Student = require("../models/Student");

function generateStudentID(class_name, joined_year, callback) {
  Student.countDocuments({ class_name, joined_year }, (err, count) => {
    if (err) {
      console.log(err);
    } else {
      return callback(class_name + "/" + joined_year + "/" + String(count + 1).padStart(2, "0"));
    }
  });
}

module.exports = generateStudentID;
