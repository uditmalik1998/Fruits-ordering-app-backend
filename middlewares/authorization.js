const { NotAuthorized, InternalServerError } = require("../utils/error-wrapper");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization || "";
  
  if (token !== "" && token?.includes("Bearer ")) {
    token = token?.split("Bearer ")?.[1];
  } else {
    return NotAuthorized(res, "Not Authorised");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = {
      id: decoded.id,
    };
    next();
  } catch (err) {
    console.log(err);
    InternalServerError(res, "Something went wrong, Try again later!");
  }
};

module.exports = auth;
