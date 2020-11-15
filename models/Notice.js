const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
  body: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("notice", NoticeSchema);
