const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please Enter First Name"],
    maxLength: 50,
    minLength: 3,
  },
  lastname: {
    type: String,
    required: [true, "Please Enter Last Name"],
    maxLength: 50,
    minLength: 2,
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Enter a valid Email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: 5,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
} , { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
