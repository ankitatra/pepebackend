const mongoose = require("mongoose");
// require("dotenv").config();
const connection = mongoose.connect("mongodb+srv://ankita:ankita@cluster0.mbmdn0q.mongodb.net/Peppecons?retryWrites=true&w=majority");

module.exports = {
  connection,
};