const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const AuthRoutes = require("./routes/auth");
const AdminRoutes = require("./routes/admin");
const CartRoutes = require("./routes/cart");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/cart", CartRoutes);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`PORT is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
