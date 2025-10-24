const express = require("express");
const { uploadItems, getAllItems } = require("../controllers/admin");
const { upload } = require("../multer/upload");
const auth = require("../middlewares/authorization");
const router = express.Router();

router.route("/uploaditems").post(auth, upload.single("image"), uploadItems);
router.route("/getAllItems").get(auth, getAllItems);

module.exports = router;
