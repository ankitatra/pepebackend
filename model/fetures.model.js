const mongoose = require("mongoose");

const featuresSchema = new mongoose.Schema({
  FeaturedImage : {
    type: String,
    required: true,
  },
  Tittle : {
    type: String,
    required: true,
  },
  Discription:{
    type:String,
    required: true,
  },
  ProductLinking:{
    type:String,
    required: true,
  }
});

const Features = mongoose.model("Features", featuresSchema);

module.exports =  Features ;
