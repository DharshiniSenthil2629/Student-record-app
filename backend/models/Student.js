const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  department: String,
  fatherName: String,
  domainMail: String,
  personalMail: String,
  phone: String,
  photo: String,
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
