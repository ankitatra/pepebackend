const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  Admin = require("../model/admin.model");
const adminauth = require("../middleware/adminauth.middleware");
require("dotenv").config();
const admin = express.Router();

admin.get("/",adminauth,async(req,res)=>{
  try{
     const userdata=await Admin.find()
     console.log("f")
     res.send(userdata)
  }
  catch(err){
      res.send({ msg: "Somethinf went wrong" });
      console.log(err)
  }
})
// admin.post("/register", async (req, res) => {
//   const {name, email, phoneNumber,password,address,gender,DOB,profileImage } = req.body;
//   const userPresent = await Admin.findOne({ email });
//   if (userPresent?.email) {
//     res.send({ Msg: "user already Exist" });
//   } else {
//     try {
//       bcrypt.hash(password, 3, async (err, hash) => {
//         const newuser = new  Admin({
        
//           password: hash,
//           name, email, phoneNumber,password,address,gender,DOB,profileImage
          
//         });
//         await newuser.save();
//         res.send({ msg: "Sign up Sucessful" });
//       });
//     } catch (error) {
//       res.send(error);
//       res.send({ msg: error });
//     }
//   }
// });



admin.post("/register", async (req, res) => {
  const { name, email, phoneNumber, password, address, gender, DOB, profileImage } = req.body;
  
  try {
    const userPresent = await Admin.findOne({ email });

    if (userPresent?.email) {
      return res.send({ Msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Increase the salt rounds for stronger security

    const newuser = new Admin({
      password: hashedPassword,
      name,
      email,
      phoneNumber,
      address,
      gender,
      DOB,
      profileImage,
    });

    await newuser.save();
    res.send({ msg: "Sign up successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// admin.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const loginuser = await Admin.find({ email });
//     if (loginuser.length > 0) {
//       bcrypt.compare(password, loginuser[0].password, (err, result) => {
//         if (result) {
//           const token = jwt.sign(
//             { userId: loginuser[0]._id },
//             process.env.token
//           );
//           res.send({ msg: "Login Sucessfully", token: token });
//         } else {
//           res.send({ msg: "Something went Wrong" });
//         }
//       });
//     } else {
//       res.send({ msg: "Login Field" });
//     }
//   } catch (error) {
//     res.send({ msg: "Cridintial not match" });
//   }
// });


// admin.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await Admin.findOne({ email });
//   console.log(user)
//     if (!user) {
//       return res.status(401).send({ msg: "User not found" });
//     }

//     // Compare the provided password with the hashed password in the database
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).send({ msg: "Incorrect password" });
//     }

//     // Generate a JSON Web Token (JWT) for authentication
//     const token = jwt.sign({ userId: user._id }, "pepe", {
//       expiresIn: "1h", // Token expiration time
//     });

//     res.status(200).send({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ msg: "Internal server error" });
//   }
// });


admin.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await Admin.findOne({ email });
  
      if (!user) {
        return res.status(401).send({ msg: "User not found" });
      }
    console.log(password,user.password)
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)
      if (!passwordMatch) {
        return res.status(401).send({ msg: "Incorrect password" });
      }
  
      // Generate a JSON Web Token (JWT) for authentication
      const token = jwt.sign({ userId: user._id }, "pepe", {
        expiresIn: "15d", // Token expiration time
      });
  
      res.status(200).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Internal server error" });
    }
});
admin.get("/logout",adminauth, (req, res) => {
  //clear the token from the user
  req.session.token = null;
  //clear the user from the req object
  req.session.user = null;
  res.send({ msg: "Logged out successfully" });
});
module.exports = {admin};
