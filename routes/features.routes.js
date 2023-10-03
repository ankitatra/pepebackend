const express = require("express");
const features = express.Router();
const Features = require("../model/fetures.model"); // Import your Category model

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

module.exports = features;
