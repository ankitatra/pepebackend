const express = require("express");
const atribute = express.Router();
const adminauth = require("../middleware/adminauth.middleware");
const { ColorModel, PaperModel, SizeModel, FlavourModel } = require("../model/Atribute.model");

//......................PaperSize
atribute.post('/add/paper', adminauth, async (req, res) => {
  try {
    const { papersize, Unit } = req.body;
    const existingPaper = await PaperModel.findOne({ papersize, Unit });
    if (existingPaper) {
    return res.status(400).json({ error: 'Duplicate entry. Paper with the same pepersize and Unit already exists.' });
    }
    const newPaper = new PaperModel({ papersize, Unit });
    const savedPaper = await newPaper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the paper.' });
  }
});

atribute .get("/paper", adminauth,async (req, res) => {
  try {
    const Seetting = await PaperModel.find();
    res.status(200).json(Seetting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching categories." });
  }
});

atribute.get('/paper/papersize',adminauth, async (req, res) => {
  try {
    const distinctColors = await PaperModel.distinct('papersize');
    res.json({ papersize: distinctColors });
  } catch (error) {
    console.error('Error fetching distinct colors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

atribute.get('/paper/unit',adminauth, async (req, res) => {
  try {
    const distinctColors = await PaperModel.distinct('Unit');
    res.json({ unit: distinctColors });
  } catch (error) {
    console.error('Error fetching distinct colors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

atribute.patch("/paper/:paperId",adminauth, async (req, res) => {
  const blogId = req.params.paperId;
  try {
    const updatedPaper= await PaperModel.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });
    if (!updatedPaper) {
      return res.status(404).json({ message: "Paper not found." });
    }
    res.status(200).json( updatedPaper);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the Paper." });
  }
});

atribute.delete("/paper/:paperId",adminauth,async (req, res) => {
  const blogId = req.params.paperId;
  try {
    const deletedProduct = await PaperModel.findByIdAndDelete(blogId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the product." });
  }
});

atribute.get('/allpapers/size', async (req, res) => {
  try {
   
    const allPapers = await PaperModel.find();
     console.log(allPapers)
     const paperInfoArray = allPapers.map((paper) =>`${paper.papersize} ${paper.Unit}`);
    res.json({ paperInfoArray });
  } catch (error) {
    console.error('Error fetching paper info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  //........Color model



  atribute.post("/add/color",adminauth, async (req, res) => {
    try {
      const newSetting = new ColorModel(req.body);
      const savedSetting = await newSetting.save();
      res.status(201).json(savedSetting);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Handle duplicate key error (unique constraint violation)
        res.status(400).json({ error: "Duplicate key error: Color name or color already exists." });
      } else {
        // Handle other errors
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the category." });
      }
    }
  });
  
  atribute .get("/color", adminauth,async (req, res) => {
    try {
      const Seetting = await ColorModel.find();
      res.status(200).json(Seetting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching categories." });
    }
  });
  
  atribute.get('/color/colorname',adminauth, async (req, res) => {
    try {
      const distinctColors = await ColorModel.distinct('colorname');
      res.json({ colors: distinctColors });
    } catch (error) {
      console.error('Error fetching distinct colors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  atribute.get('/color/color',adminauth, async (req, res) => {
    try {
      const distinctColors = await ColorModel.distinct('color');
      res.json({ colors: distinctColors });
    } catch (error) {
      console.error('Error fetching distinct colors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  atribute.patch("/color/:colorId",adminauth, async (req, res) => {
    const blogId = req.params.colorId;
    try {
      const updatedProduct = await ColorModel.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Color not found." });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the color." });
    }
  });
  
  atribute.delete("/color/:colorId",adminauth,async (req, res) => {
    const blogId = req.params.colorId;
    try {
      const deletedProduct = await ColorModel.findByIdAndDelete(blogId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Color not found." });
      }
      res.status(200).json({ message: "Color deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the Color." });
    }
  });

  atribute.get('/allcolor/colorcode', async (req, res) => {
    try {
     
      const allPapers = await ColorModel.find();
       console.log(allPapers)
       const paperInfoArray = allPapers.map((colors) =>`${colors.colorname} ${colors.color}`);
      res.json({ paperInfoArray });
    } catch (error) {
      console.error('Error fetching paper info:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
   //........Size model

   atribute.post('/add/size', adminauth, async (req, res) => {
    try {
      const { sizename, sizeicon } = req.body;
      const newSize = new SizeModel({ sizename, sizeicon });
      const savedSize = await newSize.save();
      res.status(201).json(savedSize);
    } catch (error) {
     if (error.code === 11000 && error.keyPattern && error.keyPattern.sizename) {
      return res.status(400).json({ error: 'Duplicate entry. Size with the same sizename already exists.' });
      }
       console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the size.' });
    }
  });


  atribute .get("/size", adminauth,async (req, res) => {
    try {
      const Seetting = await SizeModel.find();
      res.status(200).json(Seetting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching categories." });
    }
  });
  
  atribute.get('/size/sizename',adminauth, async (req, res) => {
    try {
      const distinctColors = await SizeModel.distinct('sizename');
      res.json({ colors: distinctColors });
    } catch (error) {
      console.error('Error fetching distinct colors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  atribute.get('/size/sizeicon',adminauth, async (req, res) => {
    try {
      const distinctColors = await SizeModel.distinct('sizeicon');
      res.json({ colors: distinctColors });
    } catch (error) {
      console.error('Error fetching distinct colors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  atribute.patch("/size/:sizeId",adminauth, async (req, res) => {
    const blogId = req.params.sizeId;
    try {
      const updatedProduct = await SizeModel.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Size not found." });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the product." });
    }
  });
  
  atribute.delete("/size/:sizeId",adminauth,async (req, res) => {
    const blogId = req.params.sizeId;
    try {
      const deletedProduct = await SizeModel.findByIdAndDelete(blogId);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Size not found." });
      }
      res.status(200).json({ message: "Size deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the product." });
    }
  });


  atribute.get('/allsize/sizeicon', async (req, res) => {
    try {
     
      const allPapers = await SizeModel.find();
       console.log(allPapers)
       const paperInfoArray = allPapers.map((size) =>`${size.sizename} ${size.sizeicon}`);
      res.json({ paperInfoArray });
    } catch (error) {
      console.error('Error fetching paper info:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 //........Flavour model

  atribute.post('/add/flavour', adminauth, async (req, res) => {
    try {
      const newFlavour = new FlavourModel(req.body);
      const savedFlavour = await newFlavour.save();
      res.status(201).json(savedFlavour);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.flavourname === 1) {
        // This error code (11000) indicates a duplicate key error (unique constraint violation)
        res.status(400).json({ error: 'Flavour name must be unique.' });
      } else {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the flavour.' });
      }
    }
  });
  
  atribute .get("/flavour", adminauth,async (req, res) => {
      try {
        const Seetting = await FlavourModel.find();
        res.status(200).json(Seetting);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching categories." });
      }
  });
    
  atribute.get('/flavour/flavourname',adminauth, async (req, res) => {
      try {
        const distinctColors = await FlavourModel.distinct('flavourname');
        res.json({ flavour: distinctColors });
      } catch (error) {
        console.error('Error fetching distinct colors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });
    
  atribute.patch("/flavour/:flavourId",adminauth, async (req, res) => {
      const blogId = req.params.flavourId;
      try {
        const updatedProduct = await FlavourModel.findByIdAndUpdate(blogId, req.body, {
          new: true,
        });
        if (!updatedProduct) {
          return res.status(404).json({ message: "Flavour not found." });
        }
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the Flavour." });
      }
  });
    
 atribute.delete("/flavour/:flavourId",adminauth,async (req, res) => {
      const blogId = req.params.flavourId;
      try {
        const deletedProduct = await FlavourModel.findByIdAndDelete(blogId);
        if (!deletedProduct) {
          return res.status(404).json({ message: "Flavour not found." });
        }
        res.status(200).json({ message: "Flavour deleted successfully." });
      } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the Flavour." });
      }
 });


module.exports =atribute;
