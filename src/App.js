import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StoreProvider } from "./context/storeContext";
import store from "./context/store";
import { fetchProducts } from "./features/shop/shopSlice";
import RegistrationFlow from "./components/Auth/Registration/registrationFlow";
import Login from "./components/Auth/Login/login";
import Shop from "./pages/Shop/Index";
import ProductDetails from "./components/Shop/productDetails";
import Checkout from "./pages/Checkout/Index";
import PrelistingPage from "./components/Shop/prelisting";

function AppContent() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RegistrationFlow />} path="/auth" />
				<Route element={<Login />} path="/login" />
				<Route element={<Shop />} path="/" />
				<Route element={<Checkout />} path="/checkout" />
				<Route element={<PrelistingPage />} path="/pre" />
				<Route path="/product/:id" element={<ProductDetails />} />
			</Routes>
		</BrowserRouter>
	);
}

function App() {
	return (
		<Provider store={store}>
			<StoreProvider>
				<AppContent />
			</StoreProvider>
		</Provider>
	);
}

export default App;
