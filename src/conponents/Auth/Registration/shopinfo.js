import React, { useState } from "react";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";
import statesData from "../../../data/StatesLgas.json";
import CategoryDropdown from "./shopCategory";

const ShopInfoComponent = ({ onNextStep }) => {
	const [formData, setFormData] = useState({
		businessName: "",
		businessCategories: [],
		businessState: "",
		businessLocalGovernmentArea: "",
		businessAddress: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (categories) => {
		setFormData((prev) => ({ ...prev, businessCategories: categories }));
	};

	const isFormValid =
		formData.businessName.trim() &&
		formData.businessCategories.length > 0 &&
		formData.businessState &&
		formData.businessLocalGovernmentArea &&
		formData.businessAddress.trim();

	console.log("Form Data:", formData);
	console.log("Is Form Valid:", isFormValid);

	return (
		<div
			className="flex items-center justify-center select-none min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-opacity-30"
			style={{ backgroundImage: `url(${Backdrop})` }}>
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 p-4 m-4 md:m-0 bg-primaryBg bg-opacity-60 rounded-xl shadow-lg max-w-3xl w-full">
				<div className="flex flex-col gap-4 py-12 px-4 md:p-12 items-center">
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
							Registration
						</span>
					</div>

					<div className="w-full max-w-md">
						<div className="mb-4">
							<input
								type="text"
								name="businessName"
								value={formData.businessName}
								onChange={handleInputChange}
								placeholder="Business Name"
								className="mt-1 block w-full py-4 px-3 border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryGreen"
							/>
						</div>

						<div className="mb-4">
							<select
								name="businessState"
								value={formData.businessState}
								onChange={handleInputChange}
								className="mt-1 block w-full py-4 px-3 border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryGreen">
								<option value="">
									What state are you based in
								</option>
								{Object.keys(statesData).map((state) => (
									<option key={state} value={state}>
										{state}
									</option>
								))}
							</select>
						</div>

						{formData.businessState && (
							<div className="mb-4">
								<select
									name="businessLocalGovernmentArea"
									value={formData.businessLocalGovernmentArea}
									onChange={handleInputChange}
									className="mt-1 block w-full py-4 px-3 border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryGreen">
									<option value="">
										Select Local Government
									</option>
									{statesData[formData.businessState]?.map(
										(localGovt) => (
											<option
												key={localGovt}
												value={localGovt}>
												{localGovt}
											</option>
										)
									)}
								</select>
							</div>
						)}

						<div className="mb-4">
							<input
								type="text"
								name="businessAddress"
								value={formData.businessAddress}
								onChange={handleInputChange}
								placeholder="Business Address"
								className="mt-1 block w-full py-4 px-3 border border-border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryGreen"
							/>
						</div>

						<CategoryDropdown
							selectedCategories={formData.businessCategories}
							setSelectedCategories={handleCategoryChange}
						/>

						<button
							type="button"
							className={`w-full mt-6 py-4 px-4 text-base text-milkText font-medium rounded-lg focus:outline-none ${
								isFormValid ? "bg-primaryGreen" : "bg-baseGreen"
							}`}
							disabled={!isFormValid}
							onClick={() => onNextStep(formData)}>
							Register
						</button>
					</div>

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

export default ShopInfoComponent;
