const express = require("express");
const blog = express.Router();
const Blog=require("../model/blog.model");
const adminauth = require("../middleware/adminauth.middleware");

blog.post("/add/publish", adminauth, async (req, res) => {
  console.log("hi")
  try {
    // Count the number of currently featured blogs
    const existingFeaturedBlogs = await Blog.countDocuments({ isFeatured: true });
  
    // Check if the limit of 4 featured blogs has been reached
    if (existingFeaturedBlogs >= 4) {
      return res.status(400).json({ error: "Maximum of 4 blogs can be featured. Please unfeature a blog to add a new one." });
    }

    req.body.status = "publish";
    const newProduct = new Blog(req.body);
    const savedProduct = await newProduct.save();
    console.log("hjgkj")
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating the product." });
  }
});

blog.post("/add/draft", adminauth, async (req, res) => {
  try {
    // Check if the request body contains isFeatured property
    if (req.body.isFeatured) {
      return res.status(400).json({ error: "Draft blogs cannot be featured." });
    }

    // const existingFeaturedBlogs = await Blog.countDocuments({ isFeatured: true });
    // if (existingFeaturedBlogs >= 4) {
    //   return res.status(400).json({ error: "Maximum of 4 blogs can be featured. Please unfeature a blog to add a new one." });
    // }
    
    req.body.status = "draft";
    const newProduct = new Blog(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating the product." });
  }
});

blog.get("/blogs/check-feature-limit", adminauth, async (req, res) => {
  try {
    // Count the number of currently featured blogs
    const existingFeaturedBlogs = await Blog.countDocuments({ isFeatured: true });

    // Check if the limit of 4 featured blogs has been reached
    if (existingFeaturedBlogs >= 4) {
      return res.status(400).json({ error: "Maximum of 4 blogs can be featured. Please unfeature a blog to add a new one." });
    }

    res.status(200).json({ message: "You can feature this blog." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while checking the feature limit." });
  }
});

blog.get("/", async (req, res) => {
  try {
    const products = await Blog.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

blog.get("/api/blogs/published", async (req, res) => {
  try {
    const publishedBlogs = await Blog.find({ status: "publish" }).exec();
    res.json(publishedBlogs);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.get("/api/blogs/draft", async (req, res) => {
  try {
    const publishedBlogs = await Blog.find({ status: "draft" }).exec();
    res.json(publishedBlogs);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.put("/api/blogs/unpublish/:blogId", async (req, res) => {
  const { blogId } = req.params;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { status: "draft" },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog status updated to draft" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.put("/api/blogs/publish/:blogId", async (req, res) => {
  const { blogId } = req.params;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { status: "publish" },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog status updated to draft" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.get("/count/all/blog",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await Blog.countDocuments();
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});

blog.get("/count/draft/blog",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await Blog.countDocuments({status:"draft"});
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});

blog.get("/count/publish/blog",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await Blog.countDocuments({status:"publish"});
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});

blog.get("/:blogId", async (req, res) => {
  const productId = req.params.blogId;
  try {
    const product = await Blog.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
});

blog.get("/title/:query", async (req, res) => {
  const query = req.params.query;
  console.log(query);

  try {
    const blogs = await Blog.find({ title: { $regex: query, $options: "i" } });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found matching the search criteria." });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the blogs." });
  }
});

blog.get("/blogname/:blogname", async (req, res) => {
 const category=req.params.blogname
   try {
    const product = await Blog.find({category});
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
});

blog.get("/api/blogs/featured", async (req, res) => {
  try {
    // Find all blogs where isFeatured is true
    const featuredBlogs = await Blog.find({ isFeatured: true });

    res.json(featuredBlogs);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.get("/count/fatures/blog",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await Blog.countDocuments({isFeatured:true});
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});

blog.put("/api/blogs/feature/:blogId", async (req, res) => {
  const { blogId } = req.params;

  try {
    // Find the blog post by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the maximum number of featured blogs (4) has been reached
    const featuredBlogsCount = await Blog.countDocuments({ isFeatured: true });
    if (featuredBlogsCount >= 4) {
      return res.status(400).json({ error: "Maximum featured blogs reached" });
    }

    // Toggle the isFeatured field
    blog.isFeatured = !blog.isFeatured;

    // Save the updated blog post
    await blog.save();

    // Return a success message
    res.json({ message: `Blog is now ${blog.isFeatured ? "featured" : "unfeatured"}` });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.put("/api/blogs/remove-feature/:blogId", async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (!blog.isFeatured) {
      return res.status(400).json({ error: "Blog is already not featured" });
    }
    blog.isFeatured = false;
    await blog.save();
    res.json({ message: "Blog removed from featured" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

blog.patch("/update/:blogId",adminauth, async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const updatedProduct = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the blog." });
  }
});

blog.delete("/delete/:blogId", adminauth,async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const deletedProduct = await Blog.findByIdAndDelete(blogId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json({ message: "blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the blog." });
  }
});

module.exports = blog;
