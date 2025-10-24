const express = require("express");
const { addToCart, getCart } = require("../controllers/cart");
const auth = require("../middlewares/authorization");
const router = express.Router();

router.route("/").post(auth, addToCart);
router.route("/getcartdetails").get(auth, getCart);
module.exports = router;
