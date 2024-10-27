const express = require("express");
const { getFilterProducts,getProductDetails } = require("../../controllers/shop-controller/product-controller");

const router = express.Router();


router.get("/get",getFilterProducts);
router.get("/get/:id",getProductDetails);

module.exports = router