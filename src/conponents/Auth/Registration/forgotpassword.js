import React, { useState } from "react";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";
import Email from "../../../data/Images/mail.svg";

const ForgotPasswordComponent = ({ onNextStep }) => {
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Handle email input change
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	// Simulate a form submission for password reset
	const handleSubmit = (e) => {
		e.preventDefault();

		// Perform validation
		if (!email || !email.includes("@")) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}

		// Simulate password reset request (replace with actual API call)
		setIsSubmitted(true);
		setErrorMessage("");
	};

	return (
		<div
			className="flex items-center justify-center select-none min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-opacity-30"
			style={{ backgroundImage: `url(${Backdrop})` }}>
			{/* Dark Hue Overlay */}
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 p-4 m-4 md:m-0 bg-primaryBg bg-opacity-60 rounded-xl shadow-lg max-w-3xl w-full">
				<div className="flex flex-col gap-4 py-12 px-4 md:p-12 items-center">
					{/* Conditional rendering based on isSubmitted */}
					{!isSubmitted ? (
						<>
							{/* Logo */}
							<div className="flex flex-col justify-center items-center gap-4 mb-4">
								<div className="flex gap-1 justify-center items-center text-primaryGreen">
									<span className="text-2xl md:text-3xl font-bold">
										GREEN
									</span>
									<span className="text-xl md:text-3xl font-extralight">
										shift
									</span>
								</div>
								<span className="text-primaryGreen font-semibold text-base">
									Forgot Password
								</span>
								<span className="text-customBlack text-sm font-thin">
									Please enter your email
								</span>
							</div>

							{/* Form */}
							<form
								onSubmit={handleSubmit}
								className="flex flex-col w-[60%] gap-4">
								<div className="mb-4 relative">
									<input
										type="email"
										placeholder="youremail@domain.com"
										value={email}
										onChange={handleEmailChange}
										className="py-3 px-12 text-base border-2 border-gray-300 rounded-md w-full focus:outline-none focus:border-primaryGreen"
									/>
									<img
										src={Email}
										alt="Email Icon"
										className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
									/>
								</div>

								{/* Error message */}
								{errorMessage && (
									<span className="text-red-500 text-sm">
										{errorMessage}
									</span>
								)}

								{/* Submit button */}
								<button
									type="submit"
									className={`py-3 px-4 w-full text-white bg-primaryGreen rounded-md ${
										!email
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
									disabled={!email}>
									Continue
								</button>

								<button
									type="button"
									className="px-4 py-3 w-full text-lg text-primaryGreen font-medium rounded-md bg-transparent border-2 border-border focus:outline-none">
									Cancel
								</button>
							</form>
						</>
					) : (
						<>
							{/* Confirmation message */}

							<div className="flex flex-col justify-center items-center gap-2 md:gap-4 mb-4">
								<div className="flex gap-1 justify-center items-center text-primaryGreen">
									<span className="text-2xl md:text-3xl font-bold">
										GREEN
									</span>
									<span className="text-xl md:text-3xl font-extralight">
										shift
									</span>
								</div>
								<span className="text-primaryGreen font-semibold">
									Check Mail
								</span>
								<span className="text-customBlack text-center text-xs md:text-sm items-center w-full md:w-[70%]">
									If the email address
									<span className="text-primaryGreen mx-1">
										{email}
									</span>
									is registered on Greenshift, you'll receive
									an email with instructions on how to reset
									your password shortly.
								</span>
							</div>

							{/* Disabled email input */}
							<form className="flex flex-col w-[60%] gap-4">
								<div className="mt-3 mb-3 relative ">
									<input
										type="email"
										value={email}
										disabled
										className="py-3 pl-12 w-full text-disabledText caret-transparent text-sm md:text-base border-2 border-border rounded-md tems-center bg-disabled cursor-not-allowed focus:outline-none"
									/>
									<img
										src={Email}
										alt="Email Icon"
										className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
									/>
								</div>

								{/* Back to Login button */}
								<button
									type="button"
									className="py-3 px-4 text-white bg-primaryGreen rounded-md">
									Back to Login
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordComponent;
