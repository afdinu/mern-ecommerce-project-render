const express = require("express");
const { searchProducts } = require("../../controllers/shop-controller/search-controller");

const router = express.Router();


router.get("/:keyword",searchProducts);


module.exports = router