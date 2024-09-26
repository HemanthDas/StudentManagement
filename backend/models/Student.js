const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  academicHistory: {
    type: [String],
    default: [],
  },
  extracurriculars: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Student", StudentSchema);
