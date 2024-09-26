const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
