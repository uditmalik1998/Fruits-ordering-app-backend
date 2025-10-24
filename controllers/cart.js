const CartSchema = require("../models/cart");
const { InternalServerError } = require("../utils/error-wrapper");
const { okResponse } = require("../utils/response-wrapper");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const newItems = req.body; // expect array of { item_id, quantity, ... }

    const cartData = await CartSchema.findOneAndUpdate(
      { user_id: userId },
      {
        $addToSet: { cart: { $each: newItems } }, // prevents duplicates
      },
      {
        new: true, // return updated document
        upsert: true, // create new if not found
      }
    );

    okResponse(res, { cartData });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    InternalServerError(res, "Failed to add to cart");
  }
};

const getCart = async (req, res) => {
    try{
     const cartData =await  CartSchema.findOne({user_id:req.user.id});
     console.log(cartData, "***")
     okResponse(res, {cartData});
    }catch(err){
        console.log(err);
        InternalServerError(res, err.message)
    }
}

module.exports = {
  addToCart,
  getCart
};
