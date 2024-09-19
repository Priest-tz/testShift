import React, { useState, useEffect } from "react";
import Navbar from "../../components/Shop/navbar";
import Banner from "../../components/Shop/Banner";
import ShopGallery from "../../components/Shop/Shop";
import SplashScreen from "../../pages/Welcome/Index";
import Footer from "../../components/Shop/footer";

function Shop() {
	const [showSplash, setShowSplash] = useState(false);

	useEffect(() => {
		const splashScreenShown = sessionStorage.getItem("splashScreenShown");

		if (!splashScreenShown) {
			setShowSplash(true);
			sessionStorage.setItem("splashScreenShown", "true");

			const timer = setTimeout(() => {
				setShowSplash(false);
			}, 5000);

			return () => clearTimeout(timer);
		} else {
			setShowSplash(false);
		}
	}, []);

	return (
		<div>
			{showSplash ? (
				<SplashScreen />
			) : (
				<>
					<Navbar />
					<Banner />
					<ShopGallery />
					<Footer />
				</>
			)}
		</div>
	);
}

export default Shop;
