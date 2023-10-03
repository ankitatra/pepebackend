const express = require("express");
const productrouter=require("./routes/product.routes")

const app = express();
const connection = require("./config/db");

app.use(express.json());

const cors = require("cors");
const { admin } = require("./routes/admin.route");
const blog = require("./routes/blog.route");
const contact = require("./routes/contact.route");
const features = require("./routes/features.routes");
const category = require("./routes/category.route");
const atribute = require("./routes/atribute.route");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("send data");
});

app.use("/admin",admin)
app.use("/product",productrouter);
app.use("/blog",blog)
app.use("/category",category)
app.use("/atribute",atribute)
app.use("/contact",contact)
app.use("/features",features)

app.listen(5000, async () => {
  try {
    await connection;
    console.log("db is running");
  } catch (error) {
    console.log(error);
  }
  console.log(`port is running 5000`);
});