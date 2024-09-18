import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StoreProvider } from "./context/storeContext";
import store, { products } from "./context/store";
import RegistrationFlow from "./components/Auth/Registration/registrationFlow";
import Login from "./components/Auth/Login/login";
import Shop from "./pages/Shop/Index";

function App() {
	return (
		<Provider store={store}>
			<StoreProvider value={{ products }}>
				<BrowserRouter>
					<Routes>
						<Route element={<RegistrationFlow />} path="/auth" />
						<Route element={<Login />} path="/login" />
						<Route element={<Shop />} path="/" />
					</Routes>
				</BrowserRouter>
			</StoreProvider>
		</Provider>
	);
}

export default App;
