import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		shop: shopReducer,
		cart: cartReducer,
	},
});

export default store;
