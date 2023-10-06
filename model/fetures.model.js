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


const adds= new mongoose.Schema({
  Image : {
    type: String,
    required: true,
  },
  alttag:{
    type:String,
    required:true
  },
  adTittle : {
    type: String,
    required: true,
  },
  Discription:{
    type:String,
    required: true,
  },
 redirectionalURL:{
    type:String,
    required: true,
  }
});

const Adds = mongoose.model("Adds", adds);

module.exports =  {Features ,Adds}
