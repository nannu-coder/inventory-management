const express = require("express");
const connectDB = require("./DB/DBConnect");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

// Routes
const productRoutes = require("./routes/product.route");
const brandRoutes = require("./routes/Brand.route");

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/brand", brandRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    connectDB(process.env.DATABASE_LOCAL);
    app.listen(port, () => {
      console.log(`Server Running on Port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
