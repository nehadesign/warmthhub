const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// To categorise the winter products e.g. men, women, kids, girls, seniors, shoes
const categorySchema = new Schema({
  title: { type: String, required: true, unique: true, minlength: 5 },
  value: { type: String, required: true, unique: true, minlength: 5 },
});

module.exports = mongoose.model("Category", categorySchema);

// To store product images
const productImageSchema = new Schema({
  productImageURL: String,
});

module.exports = mongoose.model("Images", productImageSchema);

// To store product schema comments, each product can have multiple comments, and each comment can have one rating associated with it.
// To show the product overall rating we need to calculate it, or we can just have a static hardcoded value of it in product schema itself.
const productCommentsSchema = new Schema({
  comments: { type: String, required: true },
  rating: Number,
});

module.exports = mongoose.model("Comments", productCommentsSchema);


// Product model to store the winter products information
const productDetails = new Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 250 },
  category: { type: String, require: true },
  price: { type: Number, required: true, default: 0 },
  description: { type: String, required: true, minlength: 10, maxlength: 500 },
  hidden: Boolean,
  comments: [productCommentsSchema],
  productImages: [productImageSchema],
  inventory: Number,
  size: String,

  // For time being we can store the relted product id in string format,
  // later we need to connect it related product schema
  relatedProducts: [String],
  color: [String],
});


module.exports = mongoose.model("Product", productDetails);