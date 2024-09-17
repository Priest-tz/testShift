import React, { useState } from "react";
import eyeOpen from "../../../data/Images/eye.svg";
import eyeClosed from "../../../data/Images/eye-off.svg";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";
import lock from "../../../data/Images/lock.svg";

const PasswordComponent = ({ onNextStep }) => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Password validation regex
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	// Check if the passwords match
	const passwordsMatch = password === confirmPassword;

	// Handle password change
	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		if (!passwordRegex.test(value)) {
			setErrorMessage(
				"Password should be at least 8 characters containing an uppercase letter, a lowercase letter, a number, and a special character."
			);
		} else {
			setErrorMessage("");
		}
	};

	// Handle confirm password change
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (passwordRegex.test(password) && passwordsMatch) {
			onNextStep(password);
		} else {
			setErrorMessage(
				"Passwords do not match or do not meet the criteria."
			);
		}
	};

	// Show confirm password input when password is valid
	const shouldShowConfirmInput = passwordRegex.test(password);

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
					</div>

					<form className="w-full md:w-[60%]" onSubmit={handleSubmit}>
						{/* Password input */}
						<div className="relative mb-4">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
								aria-label="Password"
								className={`py-3 px-12 text-base border-border rounded w-full outline-none bg-opacity-40 ${
									password.length > 0
										? "border-primaryGreen"
										: "border-border"
								}`}
							/>
							<img
								src={lock}
								alt="Password Icon"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
							/>
							<div
								className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}>
								<img
									src={showPassword ? eyeOpen : eyeClosed}
									alt={
										showPassword
											? "Hide Password"
											: "Show Password"
									}
									className="w-5 h-5"
								/>
							</div>
						</div>

						{/* Conditionally render Confirm Password input */}
						{shouldShowConfirmInput && (
							<div className="relative mb-4">
								<input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
									aria-label="Confirm Password"
									className={`py-3 px-12 text-base border-border rounded w-full outline-none bg-opacity-40 ${
										confirmPassword.length > 0
											? "border-primaryGreen"
											: "border-border"
									}`}
								/>
								<img
									src={lock}
									alt="Password Icon"
									className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
								/>
								<div
									className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}>
									<img
										src={
											showConfirmPassword
												? eyeOpen
												: eyeClosed
										}
										alt={
											showConfirmPassword
												? "Hide Confirm Password"
												: "Show Confirm Password"
										}
										className="w-5 h-5"
									/>
								</div>
							</div>
						)}

						{/* Password requirements */}
						<p className="text-sm text-red-500 mb-4">
							{errorMessage}
						</p>

						<button
							type="submit"
							className={`mt-2 px-4 py-3 w-full text-base text-milkText font-medium rounded-md focus:outline-none ${
								shouldShowConfirmInput && passwordsMatch
									? "bg-primaryGreen"
									: "bg-baseGreen"
							}`}
							disabled={
								!shouldShowConfirmInput || !passwordsMatch
							}>
							{shouldShowConfirmInput ? "Submit" : "Continue"}
						</button>
					</form>

					<div className="text-sm md:text-base mt-4">
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

export default PasswordComponent;
