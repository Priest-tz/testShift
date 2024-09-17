import React from "react";

const SplashScreen = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-primaryGreen p-4 sm:p-8 md:p-12 lg:p-16">
			<div className="flex items-end">
				<span className="text-white text-4xl md:text-7xl font-extrabold opacity-0 animate-fadeIn">
					GREEN
				</span>
				<span className="text-white text-4xl md:text-7xl font-light opacity-0 animate-fadeIn delay-200">
					shift
				</span>
			</div>
		</div>
	);
};

export default SplashScreen;
