import React from "react";
import BannerImg from "../../data/Images/BannerImg.png";
import search from "../../data/Images/search.svg";

const Banner = () => {
	return (
		<div
			className="relative bg-cover bg-center h-[200px] md:h-[350px] flex justify-center items-center"
			style={{ backgroundImage: `url(${BannerImg})` }}>
			<div className="absolute inset-0 bg-black opacity-10"></div>

			<div className="flex flex-col gap-2 md:gap-4 p-4 md:p-8 rounded-md text-center w-full">
				<span className="text-white text-xs md:text-lg">
					Your one stop for your Agricultural produce
				</span>
				<div className="mb-4 relative">
					<input
						type="text"
						className="px-14 py-2 md:py-4 md:w-[50%] rounded-md text-black text-base bg-[rgba(255,255,255,0.8)] placeholder-inactiveText placeholder:text-base focus:outline-none"
						placeholder="I'm looking for..."
					/>
					<img
						src={search}
						alt="Search Icon"
						className="absolute left-[13%] md:left-[26%] top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-7 md:h-7"
					/>
				</div>
			</div>
		</div>
	);
};

export default Banner;
