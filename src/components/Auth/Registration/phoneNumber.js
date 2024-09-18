import React, { useState } from "react";
import Mail from "../../../data/Images/mail.svg";
import Phone from "../../../data/Images/phone.svg";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";

const PhoneNumberOrEmailComponent = ({ onNextStep }) => {
	const [inputValue, setInputValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const isValidInput = (input) => {
		const phoneRegex = /^[0-9]{10,15}$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return phoneRegex.test(input) || emailRegex.test(input);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValidInput(inputValue)) {
			onNextStep(inputValue);
		} else {
			setErrorMessage("Please enter a valid phone number or email.");
		}
	};

	// Determine if the first character of input is a number (phone number) or not (email)
	const isFirstCharacterNumber = /^[0-9]/.test(inputValue);
	const isPhoneNumber =
		isFirstCharacterNumber && /^[0-9]{10,15}$/.test(inputValue);
	const isEmail = !isFirstCharacterNumber;

	return (
		<div
			className="flex items-center justify-center select-none min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-opacity-30"
			style={{ backgroundImage: `url(${Backdrop})` }}>
			{/* Dark Hue Overlay */}
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 p-4 m-4 md:m-0 bg-primaryBg bg-opacity-60 rounded-xl shadow-lg max-w-3xl w-full">
				<div className="flex flex-col gap-4 py-12 px-4 md:p-12 items-center">
					{/* Logo */}
					<div className="flex flex-col justify-center items-center gap-4 mb-4">
						<div className="flex justify-center items-center text-primaryGreen">
							<span className=" text-2xl md:text-3xl font-bold">
								GREEN
							</span>
							<span className="text-xl md:text-3xl font-extralight">
								shift
							</span>
						</div>
						<span className="text-primaryGreen font-semibold text-base">
							Registration
						</span>
						<div className="hidden md:flex"></div>
					</div>

					{/* Input for phone number or email */}
					<form className="w-full md:w-[60%]" onSubmit={handleSubmit}>
						<div className="relative ">
							<input
								type="text"
								placeholder="Phone Number / Email"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className={`p-4 pl-10 border-border rounded w-full outline-none bg-opacity-40 ${
									isFocused || inputValue.length > 0
										? "border-primaryGreen"
										: "border-border"
								}`}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
							{/* Show dynamic icon inside input */}
							<div className="absolute left-3 top-1/2 transform -translate-y-1/2">
								{isPhoneNumber ? (
									<img
										src={Phone}
										alt="Phone Icon"
										className="w-5 h-5"
									/>
								) : isEmail ? (
									<img
										src={Mail}
										alt="Mail Icon"
										className="w-5 h-5"
									/>
								) : (
									<img
										src={Phone}
										alt="Phone Icon"
										className="w-5 h-5"
									/>
								)}
							</div>
						</div>

						{/* Submit button */}
						<button
							type="submit"
							className={`mt-8 px-4 py-2 w-full text-base text-milkText font-medium rounded-md focus:outline-none ${
								inputValue.length > 0
									? "bg-primaryGreen"
									: "bg-baseGreen"
							}`}>
							Continue
						</button>

						{errorMessage && (
							<p className="text-red-500 mt-2">{errorMessage}</p>
						)}
					</form>

					<div className=" text-sm md:text-base mt-4">
						<span className="text-customBlack">
							Have an account already?
						</span>{" "}
						<a className="text-primaryGreen" href="/login">
							Login Instead
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhoneNumberOrEmailComponent;
