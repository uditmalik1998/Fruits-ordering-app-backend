const mongoose = require("mongoose");

const CartInputSchema = new mongoose.Schema(
  {
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Item Id should be necessary..."],
    },
    img_url: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [1, "Minimum Price should be 1"],
    },
    quantity: {
      type: Number,
      required: [true, "Please Provide quantity"],
      min: [0, "Quantity should not be negative"],
      default: 1,
    },
    item_name: {
      type: String,
      required: true,
      minLength: [3, "Item Name Should be minimum 3 charater long..."],
    },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    cart: { type: [CartInputSchema], default: [] },
    totalQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
