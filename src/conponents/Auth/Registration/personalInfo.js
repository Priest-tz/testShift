import React, { useState } from "react";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";
import user from "../../../data/Images/user.svg";

const PersonalFormComponent = ({ onNextStep, isFarmer }) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const isFormValid = formData.firstName && formData.lastName;

	const handleSubmit = () => {
		if (isFormValid) {
			onNextStep(formData);
		}
	};

	return (
		<div
			className="flex items-center justify-center select-none min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-opacity-30"
			style={{ backgroundImage: `url(${Backdrop})` }}>
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 p-4 m-4 md:m-0 bg-primaryBg bg-opacity-60 rounded-xl shadow-lg max-w-3xl w-full">
				<div className="flex flex-col gap-4 py-12 px-4 md:p-12 items-center">
					{/* Logo */}
					<div className="flex flex-col justify-center items-center gap-4 mb-4">
						<div className="flex justify-center items-center text-primaryGreen">
							<span className="text-2xl md:text-3xl font-bold">
								GREEN
							</span>
							<span className="text-xl md:text-3xl font-extralight">
								shift
							</span>
						</div>
						<span className="text-primaryGreen font-semibold text-base">
							Personal Information
						</span>
					</div>

					{/* Form Fields */}
					<div className="w-full md:w-[60%] ">
						<div className="md:mb-4 relative">
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								className="w-full pl-10 pr-4 py-4 mb-3 bg-white rounded-lg border-2 border-border outline-none"
								placeholder="First Name"
							/>
							<img
								src={user}
								alt="User Icon"
								className="absolute left-3 top-1/3 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
							/>
						</div>
						<div className="md:mb-4 relative">
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className="w-full pl-10 pr-4 py-4 mb-3 bg-white rounded-lg border-2 border-border outline-none"
								placeholder="Last Name"
							/>
							<img
								src={user}
								alt="User Icon"
								className="absolute left-3 top-1/3 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
							/>
						</div>
					</div>

					<button
						onClick={handleSubmit}
						disabled={!isFormValid}
						className={`w-full md:w-[60%] p-3 rounded-lg ${
							isFormValid
								? "bg-primaryGreen text-white"
								: "bg-baseGreen text-gray-200"
						}`}>
						Continue
					</button>

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

export default PersonalFormComponent;
