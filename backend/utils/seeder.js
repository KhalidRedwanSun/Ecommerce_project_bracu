// importing the product from model folder
const Product = require("../models/product");
const dotenv = require("dotenv");

// Connecting it with the database from config folder's database.js file
const connectDatabase = require("../config/database");

// data folder er product.json file theke shob product ke import kora hocche
const products = require("../data/products");

//setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    // delete all the products from database
    // age demo hishebe ba test hishebe jeshob product database a add korechilam ta delete kore dibe deleteMany() method use kore
    await Product.deleteMany();
    console.log("Products are deleted");

    // insert all the products from json file to database
    //const products = require("../data/products"); eta diye product variable a shob json file a banano product ta import korechilam ..now ekhn ta database a push korbo
    await Product.insertMany(products);
    console.log("All products are added.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
