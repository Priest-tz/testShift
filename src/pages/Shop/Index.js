import React, { useState, useEffect } from "react";
import Navbar from "../../conponents/Shop/navbar";
import Banner from "../../conponents/Shop/Banner";
import ShopGallery from "../../conponents/Shop/Shop";
import SplashScreen from "../../pages/Welcome/Index";

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
				</>
			)}
		</div>
	);
}

export default Shop;
