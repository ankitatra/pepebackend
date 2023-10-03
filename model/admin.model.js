const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
//ADD HERE FOR PERSONAL INFO FILED
  gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  profileImage: {
    type: String,
  },

});

const Admin = mongoose.model("admin", superAdminSchema);

module.exports = Admin;