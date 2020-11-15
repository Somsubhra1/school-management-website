const mongoose = require("mongoose");
const Notice = require("./Notice").schema;

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  guardian: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  studentID: String,
  name: String,
  class_name: String,
  joined_year: Number,

  isActive: {
    type: Boolean,
    default: true,
  },

  registration_date: {
    type: Date,
    default: Date.now,
  },

  notices: [
    {
      body: [String],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Student = mongoose.model("student", StudentSchema);
