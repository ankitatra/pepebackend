const express = require("express");
const category = express.Router();

const adminauth = require("../middleware/adminauth.middleware");
const { BlogCategory, ProductCategory, ProductsubCategory } = require("../model/category.model");
const Blog = require("../model/blog.model");
const ProductModel = require("../model/product.model");

//...............blogcategory
category.post("/add/blogcategory", adminauth, async (req, res) => {
  try {
     const newCategory = new BlogCategory(req.body);
    const blog = await newCategory.save();
     res.json({ message: 'Category created successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.blogcategoryName) {
    res.status(400).json({ error: 'Duplicate category name. Please choose a unique name.' });
    } else {
     res.status(500).json({ error: 'Internal server error' });
    }
  }
});


category.get("/blogcategory", async (req, res) => {
  try {
    const categories = await  BlogCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching categories." });
  }
});

category.get("/blogcategories/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await  BlogCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the category." });
  }
});

category.get('/allblogcategoies', async (req, res) => {
    try {
      const distinctCategories = await BlogCategory.distinct('blogcategoryName');
      res.json({ categories: distinctCategories });
    } catch (error) {
      console.error('Error fetching distinct colors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

category.patch("/blogcategories/:id", adminauth,async (req, res) => {
  const categoryId = req.params.id;
  try {
    const isCategoryUsedInBlogs = await Blog.exists({ category: categoryName });

    if (isCategoryUsedInBlogs) {
      return res.status(400).json({ error: "Category Deletion Error: Blogs still associated with this category. Remove associations first." });
    }
    const updatedCategory = await  BlogCategory.findByIdAndUpdate(categoryId, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the category." });
  }
});

category.delete("/blogcategories/:name", adminauth, async (req, res) => {
  const categoryName = req.params.name;
  try {
    // Check if the category name is associated with any blogs
    const isCategoryUsedInBlogs = await Blog.exists({ category: categoryName });

    if (isCategoryUsedInBlogs) {
      return res.status(400).json({ error: "Category Deletion Error: Blogs still associated with this category. Remove associations first." });
    }

    // If the category name is not associated with any blogs, delete it
    const deletedCategory = await BlogCategory.findOneAndRemove({ blogcategoryName: categoryName });
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    
    // Category successfully deleted
    res.status(204).json({ message: "Category successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the category." });
  }
});


//...........product category

category.post("/add/prouctcategory", adminauth, async (req, res) => {
  console.log(req.body)
  try {
    const newCategory = new  ProductCategory (req.body);
    const blog = await newCategory.save();
    res.json({ message: 'Category created successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.productcategoryName) {
     res.status(400).json({ error: 'Duplicate category name. Please choose a unique name.' });
    } else {
      console.log(error)
       res.status(500).json({ error: 'Internal server error' });
    }
  }
});

category.get("/productcategory", async (req, res) => {
try {
  const categories = await  ProductCategory.find();
  res.status(200).json(categories);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while fetching categories." });
}
});

category.get("/productcategories/:id", async (req, res) => {
const categoryId = req.params.id;
try {
  const category = await  ProductCategory.findById(categoryId);
  if (!category) {
    return res.status(404).json({ error: "Category not found." });
  }
  res.status(200).json(category);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while fetching the category." });
}
});

category.get('/allproductcategoies', async (req, res) => {
  try {
    const distinctCategories = await ProductCategory.distinct('productcategoryName');
    res.json({ categories: distinctCategories });
  } catch (error) {
    console.error('Error fetching distinct colors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

category.patch("/productcategories/:id", adminauth,async (req, res) => {
const categoryId = req.params.id;
try {
  const isCategoryUsedInProducts = await ProductModel.exists({ category: categoryName });
  if (isCategoryUsedInProducts) {
    return res.status(400).json({ error: "Category Deletion Error: Products still associated with this category. Remove associations first." });
  }
  const updatedCategory = await ProductCategory.findByIdAndUpdate(categoryId, req.body, { new: true });
  if (!updatedCategory) {
    return res.status(404).json({ error: "Category not found." });
  }
  res.status(200).json(updatedCategory);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while updating the category." });
}
});

category.delete("/productcategories/:name", adminauth, async (req, res) => {
  const categoryName = req.params.name;
  try {
    // Check if the category name is associated with any products
    const isCategoryUsedInProducts = await ProductModel.exists({ category: categoryName });

    if (isCategoryUsedInProducts) {
      return res.status(400).json({ error: "Category Deletion Error: Products still associated with this category. Remove associations first." });
    }

    // If the category name is not associated with any products, delete it
    const deletedCategory = await ProductCategory.findOneAndRemove({productcategoryName: categoryName });
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Category successfully deleted
    res.status(204).json({ message: "Category successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the category." });
  }
});



//..........subCategory...

category.post("/add/subproductcategory",adminauth, async (req, res) => {
  try {
      console.log(req.body)
      const existingSubcategory = await ProductsubCategory.findOne({
        categoryName: req.body.categoryName, 
        subcategoriesname: req.body.subcategoriesname
      });
    console.log(existingSubcategory)
      if (existingSubcategory) {
        return res.status(400).json({ error: 'Subcategory already exists for this category.' });
      }
      const newCategory = new  ProductsubCategory(req.body);
     const blog= await newCategory.save();
     res.send(blog)
      console.log("Category created successfully");
    } catch (error) {
       
        console.error("Error creating category:", error);
      
    }
    

});

category.get("/subproductcategory", async (req, res) => {
try {
  const categories = await   ProductsubCategory.find();
  res.status(200).json(categories);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while fetching categories." });
}
});

category.get("/subproductcategories/:id", async (req, res) => {
const categoryId = req.params.id;
try {
  const category = await ProductsubCategory.findById(categoryId);
  if (!category) {
    return res.status(404).json({ error: "Category not found." });
  }
  res.status(200).json(category);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while fetching the category." });
}
});

category.get('/suballproductcategoies', async (req, res) => {
  try {

    const distinctCategories = await  ProductsubCategory.distinct('subcategoriesname');
    res.json({ categories: distinctCategories });
  } catch (error) {
    console.error('Error fetching distinct colors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

category.get('/subcategory/allproductcategoies', async (req, res) => {
  try {
    const distinctCategories = await  ProductsubCategory.distinct('categoryName');
    res.json({ categories: distinctCategories });
  } catch (error) {
    console.error('Error fetching distinct colors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

category.get('/:category/allsubproductcategoies', async (req, res) => {
  try {
    const category=req.params.category
    const distinctCategories = await ProductsubCategory.distinct('subcategoriesname', { categoryName: category });
    res.json({ categories: distinctCategories });
  } catch (error) {
    console.error('Error fetching distinct colors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

category.patch("/subproductcategories/:id", adminauth,async (req, res) => {
const categoryId = req.params.id;
try {
  const ischecks=await ProductsubCategory.findById(id)
  const isCategoryUsedInProducts = await ProductModel.exists({productCategories:ischecks.categoryName,productSubcategories:ischecks.subcategoriesname});
  if (isCategoryUsedInProducts) {
    return res.status(400).json({ error: "subCategory Deletion Error: Products still associated with this subcategory. Remove associations first." });
  }
  const updatedCategory = await  ProductsubCategory.findByIdAndUpdate(categoryId, req.body, { new: true });
  if (!updatedCategory) {
    return res.status(404).json({ error: "Category not found." });
  }
  res.status(200).json(updatedCategory);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while updating the category." });
}
});

category.delete("/subproductcategories/:id", adminauth, async (req, res) => {
  const id = req.params.id;
  try {
    const ischecks=await ProductsubCategory.findById(id)
    const isCategoryUsedInProducts = await ProductModel.exists({productCategories:ischecks.categoryName,productSubcategories:ischecks.subcategoriesname});
    if (isCategoryUsedInProducts) {
      return res.status(400).json({ error: "subCategory Deletion Error: Products still associated with this subcategory. Remove associations first." });
    }
    const deletedCategory = await  ProductsubCategory.findByIdAndRemove(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "subCategory not found." });
    }
    res.status(204).json({ message: "subCategory successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the subcategory." });
  }
});


module.exports = category;
