import React from "react";
import CartPage from "../../components/Shop/Cart";
import Navbar from "../../components/Shop/navbar";
import Footer from "../../components/Shop/footer";

function Checkout() {
	return (
		<div>
			<Navbar />
			<CartPage />
			<Footer />
		</div>
	);
}

export default Checkout;
