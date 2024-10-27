const express = require("express");

const router = express.Router();

const {handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProducts}=require("../../controllers/admin-controller/product-controller")
const {upload} = require("../../helpers/cloudinary")

router.post("/upload-image",upload.single("my_file"),handleImageUpload);
router.post("/add",addProduct);
router.get("/get",fetchAllProducts);
router.put("/edit/:id",editProduct);
router.delete("/delete/:id",deleteProduct);

module.exports = router