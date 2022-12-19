const mongoose = require("mongoose");

// ek ek ta product er data type and entity gula define kora hocche
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    // by trim we will remove all the blank spaces from start and end
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },

  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },

  description: {
    type: String,
    required: [true, "Please enter product description"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  //arrays of images
  images: [
    {
      // id of that image
      public_id: {
        type: String,
        required: true,
      },
      // url of that image
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],

      message: "Please select correct category for product",
    },
  },

  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },

  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  // which person gave what review
  reviews: [
    {
      user: {
        //want to store mongoose object ID and references will tell me that who created that product
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
