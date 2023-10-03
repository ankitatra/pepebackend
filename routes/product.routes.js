const express = require("express");
const productrouter = express.Router();
const ProductModel=require("../model/product.model");
const adminauth = require("../middleware/adminauth.middleware");


const itemsPerPage = 9

// Create a new product
productrouter.post("/add/publish",adminauth, async (req, res) => {
  console.log(req.body)
  req.body.status="publish"
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save(); // Use a different variable name
    console.log(savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) {
       res.status(400).json({ error: "Duplicate key error. The value is not unique." });
    } else {
       res.status(500).json({ error: "Internal server error" });
    }
  }
});

productrouter.post("/add/draft",adminauth, async (req, res) => {
  console.log(req.body)
  req.body.status="draft"
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save(); // Use a different variable name
    console.log(savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate key error. The value is not unique." });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

productrouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = await ProductModel.find();

    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    // res.status(200).json(products);

    res.status(200).json({ message: "Successfully got the data",
    product:itemsToSend,currentPage: page,
    totalPages: totalPages});

  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

productrouter.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
});

productrouter.get("/count/product",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await ProductModel.countDocuments();
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});

productrouter.get("/count/publish/product",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await ProductModel.countDocuments({status:"publish"});
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});
productrouter.get("/count/draft/product",adminauth, async (req, res) => {
  try {
    // Count all documents in the "Blog" collection
    const productCount = await ProductModel.countDocuments({status:"draft"});
    
    // Respond with the count
    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product count." });
  }
});
// Route to get products by category
productrouter.get("/api/products/category/:category", async (req, res) => {
  const  productCategories = req.params.category;
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = await ProductModel.find({productCategories});

    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    // res.status(200).json(products);

    res.status(200).json({ message: "Successfully got the data",
    product:itemsToSend,currentPage: page,
    totalPages: totalPages});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

// Route to get products by subcategory
productrouter.get("/api/products/subcategory/:subcategory", async (req, res) => {
  const productSubcategories= req.params.subcategory;
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const products = await ProductModel.find({ productSubcategories });
    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    // res.status(200).json(products);

    res.status(200).json({ message: "Successfully got the data",
    product:itemsToSend,currentPage: page,
    totalPages: totalPages});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products by subcategory" });
  }
});

// Route to get products by category and subcategory
productrouter.get("/api/products/:category/:subcategory", async (req, res) => {
  const productCategories= req.params.category;
  const   productSubcategories = req.params.subcategory;
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = await ProductModel.find({
      productCategories,
      productSubcategories
    });

    const itemsToSend = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    // res.status(200).json(products);

    res.status(200).json({ message: "Successfully got the data",
    product:itemsToSend,currentPage: page,
    totalPages: totalPages});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products by category and subcategory" });
  }
});

productrouter.get("/title/:query", async (req, res) => {
  const query = req.params.query;
  console.log(query);

  try {
    const product = await ProductModel.find({ name: { $regex: query, $options: "i" } });

    if (!product || product.length === 0) {
      return res.status(404).json({ message: "No Product found matching the search criteria." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
});
// Update a product by ID
productrouter.patch("/:productId",adminauth, async (req, res) => {
  const productId = req.params.productId;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the product." });
  }
});

// Delete a product by ID
productrouter.delete("/:productId", adminauth,async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the product." });
  }
});

module.exports = productrouter;
