const mongoose = require("mongoose");

const productcategorySchema = new mongoose.Schema({
  productcategoryName: {
    type: String,
    required: true,
    unique: true,
  },
});
const  ProductCategory = mongoose.model("productCategory",productcategorySchema);


const productSubcategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  subcategoriesname: {
    type: String,
    required: true,
  },
  subcategoryDiscription:{
    type:String,
    required: true,
  },
  metatitle:{
    type:String,
    
  }
});
const ProductsubCategory = mongoose.model("productsubCategory", productSubcategorySchema);


const blogcategorySchema = new mongoose.Schema({
  blogcategoryName: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});
const  BlogCategory = mongoose.model("blogCategory", blogcategorySchema);

module.exports ={
  ProductCategory,
  ProductsubCategory,
  BlogCategory
} 
