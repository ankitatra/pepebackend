const express = require("express");
const contact = express.Router();
const Contact=require("../model/contact.model");
const adminauth = require("../middleware/adminauth.middleware");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the email service you prefer
  auth: {
    user: "ankita199824@gmail.com", // Your email address
    pass: "fhnc rewe dgcm lwjb", // Your email password or an app-specific password
  },
});

contact.post("/add", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();

    // Send an email to the admin
    const mailOptions = {
      from: "ankita199824@gmail.com",
      to: "ankita199824@gmail.com", // Admin's email address
      subject: "New Contact Form Submission",
      text: `You have received a new contact form submission from ${req.body.fullname} (${req.body.email}).\n\nProduct Enquiry: ${req.body.productenquiry}\nMessage: ${req.body.Message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.status(201).json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the contact." });
  }
});

contact.get("/",adminauth, async (req, res) => {
  try {
    const products = await Contact.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

contact.get("/count/contact", adminauth, async (req, res) => {
  try {
   
    const contactCount = await Contact.countDocuments();
    res.status(200).json({ count: contactCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching contact count." });
  }
});

contact.get("/:contactId",adminauth, async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const product = await Contact.findById(contactId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
});

contact.patch("/:contactId",adminauth, async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const updatedProduct = await Contact.findByIdAndUpdate(contactId, req.body, {
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

contact.delete("/:contactId", adminauth,async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const deletedProduct = await Contact.findByIdAndDelete(contactId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the product." });
  }
});

module.exports = contact;
