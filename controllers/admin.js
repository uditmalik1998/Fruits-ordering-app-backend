const AdminSchema = require("../models/admin");
const { BadRequest } = require("../utils/error-wrapper");
const { createResponse, okResponse } = require("../utils/response-wrapper");

const uploadItems = async (req, res) => {
  const { item_name = "", stock = 0, description = "", price = "" } = req.body;
  if (!req?.file && !req?.file?.path) {
    return BadRequest(res, "Image Upload Failed");
  }

  const public_id = req.file.filename?.split("/")?.[1];
  const img_url = req.file.path;
  const user_id = req.user.id;
  //   console.log(req.user);
  //     await AdminSchema.deleteMany();
  const admin = await AdminSchema.create({
    item_name,
    stock,
    description,
    price,
    img_url,
    public_id,
    user_id,
  });
  createResponse(res, admin);
};

const getAllItems = async (req, res) => {
  const userItems = await AdminSchema.find({ user_id: req.user.id });
  okResponse(res, userItems);
};

module.exports = {
  uploadItems,
  getAllItems,
};
