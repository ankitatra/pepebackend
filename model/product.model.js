const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    sizetype:{
      type:String
    },
    flavour:{
      type:String
    },
    color:{
      type:String
    },
    paperSize:{
      type:String
    },
    producturl: {
      type: String,
      validate: {
        validator: function (value) {
          const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          return urlPattern.test(value);
        },
        message: 'Invalid URL format. Please provide a valid URL.',
      },
    },
    whyChooseus:{
      type:String
    },
    ProductDescription:{
      type:String
    },
    keyFetures:{
      type:String
    },
    imageUrls: {
      type: [String],
      validate: {
        validator: function (value) {
          const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          return urlPattern.test(value);
        },
        message: 'Invalid URL format. Please provide a valid URL.',
      },
    },
    producttag:{
      type:String
    },
    productCategories:{
      type:String
    },
    productSubcategories:{
      type:String
    },
    metaKeywords:{
       type:String
    },
    MetaDescription: {
      type: String,
      validate: {
        validator: function (value) {
          // Split the description into words using a regular expression
          const words = value.split(/\s+/);
          
          // Check if the number of words is less than or equal to 180
          return words.length <= 180;
        },
        message: 'MetaDescription should have at most 180 words.',
      },
    },
    seoOptimization:{
      type:String
    },
    status:{
      type:String,
      enum: ["draft", "publish"], 
      default:"draft"
    },
    AltTag:{
     type:String,
     unique:true
    },
    customURL:{
      type:String,
      unique:true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
