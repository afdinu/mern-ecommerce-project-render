require("dotenv").config()
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth/auth-routes")

const adminProductRouter = require("./routes/admin/product-routes")
const adminOrdersRouter = require("./routes/admin/order-routes")

const shopCartRouter = require("./routes/shop/cart-routes")
const shopAddressRouter = require("./routes/shop/address-routes")
const shopOrderRouter = require("./routes/shop/order-routes")
const shopSearchRouter = require("./routes/shop/search-routes")
const shopReviewRouter = require("./routes/shop/review-routes")
const shopProductRouter = require("./routes/shop/products-routes")


const commonFeatureRouter = require("./routes/common/common-routes")

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("mongoDB Connected")).catch((error)=>console.log(error));
const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin:process.env.CLIENT_BASE_URL,
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter)

app.use("/api/admin/products",adminProductRouter)
app.use("/api/admin/orders",adminOrdersRouter)

app.use("/api/shop/products",shopProductRouter)
app.use("/api/shop/cart",shopCartRouter);
app.use("/api/shop/address",shopAddressRouter);
app.use("/api/shop/order",shopOrderRouter);
app.use("/api/shop/search",shopSearchRouter);
app.use("/api/shop/review",shopReviewRouter);

app.use("/api/common/feature",commonFeatureRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));