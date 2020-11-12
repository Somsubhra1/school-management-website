const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentID: String,
  name: String,
  class_name: String,
  joined_year: Number,

  registration_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Student = mongoose.model("student", StudentSchema);
