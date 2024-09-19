import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add to Cart
export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ productId, quantity }, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const token = auth.user?.token;
		if (!token) {
			return rejectWithValue("User not authenticated");
		}
		try {
			const response = await axios.post(
				"https://backend-greenshift.onrender.com/api/users/cart",
				{ productId, quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Something went wrong"
			);
		}
	}
);

// Fetch Cart
export const fetchCart = createAsyncThunk(
	"cart/fetchCart",
	async (_, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const token = auth.user?.token;
		if (!token) {
			return rejectWithValue("User not authenticated");
		}
		try {
			const response = await axios.get(
				"https://backend-greenshift.onrender.com/api/users/cart",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Something went wrong"
			);
		}
	}
);

// Remove Cart Item
export const removeCartItem = createAsyncThunk(
	"cart/removeCartItem",
	async (productId, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const token = auth.user?.token;
		if (!token) {
			return rejectWithValue("User not authenticated");
		}
		try {
			const response = await axios.delete(
				`https://backend-greenshift.onrender.com/api/users/cart/remove/${productId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Something went wrong"
			);
		}
	}
);

// Update Cart Item
export const updateCartItem = createAsyncThunk(
	"cart/updateCartItem",
	async ({ productId, quantity }, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const token = auth.user?.token;
		if (!token) {
			return rejectWithValue("User not authenticated");
		}
		try {
			const response = await axios.put(
				"https://backend-greenshift.onrender.com/api/users/cart",
				{ productId, quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Something went wrong"
			);
		}
	}
);

// Clear Cart
export const clearCart = createAsyncThunk(
	"cart/clearCart",
	async (_, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const token = auth.user?.token;
		if (!token) {
			return rejectWithValue("User not authenticated");
		}
		try {
			const response = await axios.put(
				"https://backend-greenshift.onrender.com/api/users/cart/clear",
				null,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Something went wrong"
			);
		}
	}
);

const initialState = {
	items: [],
	status: "idle",
	error: null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload.items;
				console.log("Cart fetched successfully:", action.payload);
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
				console.error("Failed to fetch cart:", action.payload);
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.items = action.payload.cart.items;
				console.log("Item added to cart:", action.payload);
			})
			.addCase(removeCartItem.fulfilled, (state, action) => {
				state.items = action.payload.cart.items;
				console.log("Item removed from cart:", action.payload);
			})
			.addCase(updateCartItem.fulfilled, (state, action) => {
				state.items = action.payload.cart.items;
				console.log("Cart item updated:", action.payload);
			})
			.addCase(clearCart.fulfilled, (state) => {
				state.items = [];
				console.log("Cart cleared.");
			});
	},
});

export default cartSlice.reducer;
