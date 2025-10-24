const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  InternalServerError,
  NotAuthorized,
  BadRequest,
  NotFound,
} = require("../utils/error-wrapper");
const { createResponse, okResponse } = require("../utils/response-wrapper");

const loginUser = async (req, res) => {
  const { email = "", password = "" } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return NotFound(res, "User does not exits");
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      return NotAuthorized(res, "Email or password is invalid");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "30d",
    });
    okResponse(res, { token });
  } catch (err) {
    console.log(err, "Error");
    InternalServerError(res, err.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstname = "",
      lastname = "",
      email = "",
      password = "",
      isadmin = false,
    } = req.body;
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    ) {
      BadRequest(res, "Please Enter required fields");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // await UserSchema.deleteMany();
    const user = await UserSchema.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      isadmin,
    });
    const token = jwt.sign(
      { username: user.name, id: user._id },
      process.env.JWTSECRET,
      {
        expiresIn: "30d",
      }
    );
    createResponse(res, { token });
  } catch (err) {
    console.log(err);
    InternalServerError(res, err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
