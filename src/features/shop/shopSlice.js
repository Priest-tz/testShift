import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
	"shop/fetchProducts",
	async (_, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const token = auth.user?.token;
		try {
			const response = await axios.get(
				"https://backend-greenshift.onrender.com/api/farmers/products",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
      console.log("Product response:", response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Something went wrong"
			);
		}
	}
);

const initialState = {
	isSidebarOpen: false,
	products: [],
	status: "idle",
	error: null,
};

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { toggleSidebar } = shopSlice.actions;

export default shopSlice.reducer;
