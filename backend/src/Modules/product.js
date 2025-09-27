import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },

  description:{
    type: String
  },
  
  sizes: [String],

  prices: {
    type: Number,
    required: true
  },

  category: {
    type: String
  },

  stock: {
    type: Number,
    default: 1
  },

  images: [String]
}, {
  timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product