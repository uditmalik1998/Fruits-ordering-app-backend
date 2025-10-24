const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  cart: [
    {
      item_name: {
        type: String,
        required: [true, "Item Name is required"],
        minLength: [2, "Item Name should be 2 charater long"],
      },
      description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [5, "Description should be altleast 5 charater long"],
      },
      price: {
        type: Number,
        required: [true, "Please give Price of the Item"],
        min: [1, "Minimum Price Should be atleast 1"],
      },
      stock: {
        type: Number,
        required: [true, "Please give stock number"],
        min: [1, "Minimum stock should be 1 at time of new item creation."],
      },
      img_url: {
        type: String,
        required: [true, "Please give image Url"],
      },
      public_id: {
        type: String,
        required: [true, "Please enter Public Id for Image"],
      },
      quantity: {
        type: Number,
        required: [true, "Please Enter the Quantity"],
        min: [0, "Quantity Should not be negative"],
      },
      admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("cart", CartSchema);
