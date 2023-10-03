const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: false,
  },
 category: {
    type: String,
    // required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrls: [{
    type: String,
    validate: {
      validator: function (value) {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlPattern.test(value);
      },
      message: 'Invalid URL format. Please provide a valid URL.',
    },
  }],
  status:{
    type:String,
    enum: ["draft", "publish"], 
    default:"draft"
  },
  isFeatured:{
    type:Boolean,
    default:false
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: [
    {
      author: {
        type: String,
       
      },
      comment: {
        type: String,
      
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  metakeywords:{
    type:String,
    // required: true,
  },
  metatitle:{
    type:String,
    unique: true,
    // required: true,
  },
  metaDescription:{
    type:String,
    // required: true,
  },
  customUrl:{
    type:String,
    // required: true,
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

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
