import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import authReducer from "../features/auth/authSlice";
import cocoa from "./products/cocoa.jpg";
import coconut from "./products/coconut.jpeg";
import yam from "./products/yam.png";
import ugu from "./products/ugu.png";
import fish from "./products/fish.png";
import ginger from "./products/ginger.jpg";

export const products = [
	{
		id: 1,
		name: "Fresh Yam Tuber",
		price: 2500,
		image: yam,
		iscountPercentage: 28,
		discountPrice: 1799.9,
	},
	{
		id: 2,
		name: "Coconut",
		price: 150,
		image: coconut,
		discountPercentage: 20,
		discountPrice: 120,
	},
	{
		id: 3,
		name: "Cocoa",
		price: 200,
		image: cocoa,
		discountPercentage: 15,
		discountPrice: 170,
	},
	{
		id: 4,
		name: "Ugu Leaves",
		price: 500,
		image: ugu,
		discountPercentage: 10,
		discountPrice: 450,
	},
	{
		id: 5,
		name: "Fresh Fish",
		price: 1000,
		image: fish,
		discountPercentage: 5,
		discountPrice: 950,
	},
	{
		id: 6,
		name: "Fresh Ginger",
		price: 300,
		image: ginger,
		discountPercentage: 12,
		discountPrice: 264,
	},
];

const store = configureStore({
	reducer: {
		shop: shopReducer,
		auth: authReducer,
	},
});

export default store;
