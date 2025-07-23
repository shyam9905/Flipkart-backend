const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { router: authRoutes, authenticateJWT } = require("./auth");
const cartRoutes = require("./cart");
app.use(authRoutes);
app.use(cartRoutes);

mongoose.connect(
  "mongodb+srv://shyamsundarbala20:Shyam321@cluster0.suy3kta.mongodb.net/ecommerce",
  { useNewUrlParser: true, useUnifiedTopology: true}
);

app.get("/products",async(req,res)=>{
  try{
  const products=await Product.find();
  res.json(products);
  }catch (error) {
    res.status(500).json({error:"There is internal server error"});
  }
});

app.get('/product/:id',async(req,res)=>{
  try {
    const product=await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({message: "The items that you were searching for data not exist ",});
    } else{
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({error: "server error"});
  }
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
