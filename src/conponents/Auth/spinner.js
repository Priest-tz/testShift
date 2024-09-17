import React from "react";

const Spinner = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-20 h-20 md:w-32 md:h-32 border-2 border-baseGreen border-t-transparent rounded-full animate-spinlow"></div>
		</div>
	);
};

export default Spinner;
