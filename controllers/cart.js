const CartSchema = require("../models/cart");
const { InternalServerError } = require("../utils/error-wrapper");
const { okResponse } = require("../utils/response-wrapper");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = {
      item_id: req.body._id, // product ObjectId (string)
      quantity: Number(req.body.quantity) || 1,
      img_url: req.body.img_url,
      price: Number(req.body.price) || 0,
      item_name: req.body.item_name,
    };
  //  await CartSchema.deleteMany()
    // 1) Load the user's cart (single query) to check if item exists and to read current totalQuantity
    let cartDoc = await CartSchema.findOne({ user_id: userId });

    // If there's no cart at all, create one with the item and set totalQuantity = quantity
    if (!cartDoc) {
      const created = await CartSchema.create({
        user_id: userId,
        cart: [items],
        totalQuantity: items.quantity, // sum of quantities
      });
      return okResponse(res, created);
    }

    // 2) Check whether the item already exists in cart
    const existingItem = cartDoc.cart.find(
      (c) => String(c.item_id) === String(items.item_id)
    );

    if (existingItem) {
      // Item exists -> increment the item's quantity and the totalQuantity by the added quantity
      await CartSchema.updateOne(
        { user_id: userId, "cart.item_id": items.item_id },
        {
          $inc: {
            "cart.$.quantity": items.quantity,
            totalQuantity: items.quantity,
          },
        }
      );
    } else {
      // Item does not exist -> push the new item and increment totalQuantity by quantity
      await CartSchema.findOneAndUpdate(
        { user_id: userId },
        {
          $push: { cart: items },
          $inc: { totalQuantity: items.quantity },
        },
        { new: true }
      );
    }

    // Return the updated cart
    const updatedCart = await CartSchema.findOne({ user_id: userId });
    okResponse(res, updatedCart);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    InternalServerError(res, "Failed to add to cart");
  }
};

const getCart = async (req, res) => {
  try {
    const cartData = await CartSchema.findOne({ user_id: req.user.id });
    okResponse(res, cartData);
  } catch (err) {
    console.log(err);
    
    InternalServerError(res, err.message);
  }
};

module.exports = {
  addToCart,
  getCart,
};
