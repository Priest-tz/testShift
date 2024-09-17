import React, { useState, useEffect } from "react";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";
import consumerActive from "../../../data/Images/consumer_active.svg";
import consumerInactive from "../../../data/Images/consumer_inactive.svg";
import farmerInactive from "../../../data/Images/farmer_inactive.svg";
import farmerActive from "../../../data/Images/farmer_active.svg";
import Spinner from "../spinner";

const UserReg = ({ onNextStep }) => {
	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	const handleClick = (option) => {
		setSelected(option);
	};

	const handleContinue = () => {
		if (selected) {
			onNextStep(selected === "farmer");
		}
	};

	if (loading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	return (
		<div
			className="flex items-center justify-center select-none caret-transparent min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-opacity-30"
			style={{ backgroundImage: `url(${Backdrop})` }}>
			{/* Dark Hue Overlay */}
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 m-3 bg-primaryBg bg-opacity-60 rounded-xl shadow-lg max-w-3xl w-full">
				<div className="flex flex-col gap-4 p-8 items-center">
					{/* Logo */}
					<div className="flex flex-col justify-center items-center gap-2 mb-2">
						<div className="flex justify-center items-center text-primaryGreen">
							<span className="text-2xl md:text-3xl font-bold">
								GREEN
							</span>
							<span className="text-xl md:text-3xl font-extralight">
								shift
							</span>
						</div>
						<span className="text-primaryGreen font-semibold text-base">
							Registration
						</span>
						<span className="text-customBlack text-base md:text-lg font-thin">
							Please select your preferred role
						</span>
					</div>
				</div>

				{/* Role Selection */}
				<div className="flex flex-col m-auto gap-2 md:gap-4 w-full md:w-[60%]">
					{/* Consumer Option */}
					<div
						className={`flex items-center justify-around border rounded-2xl m-4 p-4 cursor-pointer ${
							selected === "consumer"
								? "border-primaryGreen"
								: "border-border"
						}`}
						onClick={() => handleClick("consumer")}>
						<img
							src={
								selected === "consumer"
									? consumerActive
									: consumerInactive
							}
							alt="Consumer"
						/>
						<div className="flex flex-col gap-2">
							<span
								className={`${
									selected === "consumer"
										? "text-customBlack"
										: "text-inactiveText"
								} text-lg font-semibold`}>
								Consumer
							</span>
							<span
								className={`${
									selected === "consumer"
										? "text-customBlack"
										: "text-inactiveText"
								} text-sm font-medium`}>
								I want to get fresh <br />
								produce
							</span>
						</div>
					</div>

					{/* Farmer Option */}
					<div
						className={`flex items-center justify-around border rounded-2xl m-4 p-4 cursor-pointer ${
							selected === "farmer"
								? "border-primaryGreen"
								: "border-border"
						}`}
						onClick={() => handleClick("farmer")}>
						<img
							src={
								selected === "farmer"
									? farmerActive
									: farmerInactive
							}
							alt="Farmer"
						/>
						<div className="flex flex-col gap-2">
							<span
								className={`${
									selected === "farmer"
										? "text-customBlack"
										: "text-inactiveText"
								} text-lg font-semibold`}>
								Farmer
							</span>
							<span
								className={`${
									selected === "farmer"
										? "text-customBlack"
										: "text-inactiveText"
								} text-sm font-medium`}>
								I want to bring my <br />
								fresh produce to the market
							</span>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex flex-col gap-1 items-center justify-center">
					<button
						onClick={handleContinue}
						className={`w-[90%] md:w-[60%] mt-6 py-4 px-4 text-base text-milkText font-medium rounded-lg focus:outline-none ${
							selected ? "bg-primaryGreen" : "bg-baseGreen"
						}`}
						disabled={!selected}>
						Continue
					</button>
					{/* Link to Login */}
					<div className="text-base mt-4 mb-10">
						<span className="text-customBlack">
							Have an account already?
						</span>
						<a className="text-primaryGreen" href="/login">
							Login Instead
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserReg;
