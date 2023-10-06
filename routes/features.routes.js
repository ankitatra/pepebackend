const express = require("express");
const features = express.Router();
const {Features, Adds} = require("../model/fetures.model"); // Import your Category model
const adminauth = require("../middleware/adminauth.middleware");

features.post("/add", async (req, res) => {
  try {
    const newCategory = new Features(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the category." });
  }
});

features .get("/", async (req, res) => {
  try {
    const categories = await Features.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching categories." });
  }
});

features.get("/features/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Features.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the category." });
  }
});

features.patch("/update/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const updatedCategory = await Features.findByIdAndUpdate(categoryId, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the category." });
  }
});

features.delete("/delete/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Features.findByIdAndRemove(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the category." });
  }
});



features.post('/add/adds',adminauth,async (req, res) => {
  try {
    const adds=await Adds.find()
    if(adds.length==2){
      return res.status(400).json({ error: 'adds limit exceeds' });
    }
    const description = req.body.Discription;
    const words = description.split(/\s+/);

    if (words.length > 15) {
      return res.status(400).json({ error: 'Description exceeds the word limit of 15 words' });
    }

    const newAdd = new Adds({
      Image: req.body.Image,
      alttag: req.body.alttag,
      adTittle: req.body.adTittle,
      Discription: req.body.Discription,
      redirectionalURL: req.body.redirectionalURL,
    });
   const savedAdd = await newAdd.save();
    res.status(201).json(savedAdd);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

features .get("/adds/", async (req, res) => {
  try {
    const adds = await Adds.find();
    res.status(200).json(adds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching categories." });
  }
});

features.patch("/adds/update/:id",adminauth, async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCategory = await Adds.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the category." });
  }
});

features.delete('/adds/delete/:id',adminauth,async (req, res) => {
  const id = req.params.id;
  try {
    const existingAdd = await Adds.findByIdAndRemove(id);
    if (!existingAdd) {
      return res.status(404).json({ error: 'Add not found' });
    }
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = features;
