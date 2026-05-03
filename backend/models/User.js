const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  emergencyContacts: [String],
  medicalNotes: String
});

module.exports = mongoose.model("User", userSchema);