const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  // Define the fields for the first model
  papersize:{
    type:String,
    required: true,
  },
  Unit:{
    type:String,
    required: true,
  }
});
const PaperModel = mongoose.model("Paper", paperSchema);


const colorSchema = new mongoose.Schema({
  colorname: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
    unique: true,
  }
});

const ColorModel = mongoose.model("colours", colorSchema);



const sizeSchema = new mongoose.Schema({
   sizename:{
      type:String,
      required: true,
      unique:true
    },
  sizeicon:{
      type:String,
      required: true,
    }
  });
  
  
const SizeModel = mongoose.model("Size", sizeSchema );

const flavourSchema = new mongoose.Schema({
  flavourname:{
     type:String,
     required: true,
     unique:true
   }

 });
 
 
const FlavourModel = mongoose.model("flavour", flavourSchema  );
  


module.exports = {
 PaperModel,
 ColorModel,
 SizeModel,
 FlavourModel
};
