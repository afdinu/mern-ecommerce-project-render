import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice.js"

import adminProductSlice from "./admin-slice/product-slice.js"
import adminOrderSlice from "./admin-slice/order-slice.js"

import shoppingProductSlice from "./shop-slice/products/productSlice.js"
import shoppingCartSlice from "./shop-slice/carts/cartSlice.js"
import shoppingAddressSlice from "./shop-slice/address-slice.js"
import shoppingOrderSlice from "./shop-slice/order-slice.js"
import shoppingSearchSlice from "./shop-slice/search-slice.js"
import shoppingReviewSlice  from "./shop-slice/review-slice.js"
import commonFeatureSlice  from "./common/common-slice.js"

const store = configureStore({
    reducer:{
        auth:authReducer,

        adminProducts:adminProductSlice,
        adminOrder:adminOrderSlice,

        shopProducts:shoppingProductSlice,
        shopAddress:shoppingAddressSlice,
        shopOrder:shoppingOrderSlice,
        shopCart:shoppingCartSlice,
        shopSearch:shoppingSearchSlice,
        shopReview:shoppingReviewSlice,
        commonFeature:commonFeatureSlice,
    }
});

export default store

