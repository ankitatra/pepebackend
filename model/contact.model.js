const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type:String,
    required:true,
  },
  productenquiry:{
    type:String,
    required:true,
  },
  Message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
