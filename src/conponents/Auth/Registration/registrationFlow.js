import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserReg from "./user";
import PhoneNumberOrEmailComponent from "./phoneNumber";
import PasswordComponent from "./password";
import PersonalFormComponent from "./personalInfo";
import ShopInfoComponent from "./shopinfo";
import Spinner from "../spinner";

const BASE_URL = "https://backend-greenshift.onrender.com/";

const RegistrationFlow = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [registrationdata, setRegistrationdata] = useState({
		isFarmer: false,
		email: "",
		phoneNumber: "",
		password: "",
		firstName: "",
		lastName: "",
		businessCategories: [],
		businessState: "",
		businessLocalGovernmentArea: "",
		businessAddress: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [formError, setFormError] = useState("");

	const handleUserTypeSelection = (isFarmer) => {
		setRegistrationdata({ ...registrationdata, isFarmer });
		setStep(1);
	};

	const handlePhoneOrEmailSubmit = (value) => {
		const isEmail = value.includes("@");
		setRegistrationdata({
			...registrationdata,
			[isEmail ? "email" : "phoneNumber"]: value,
		});
		setStep(2);
	};

	const handlePasswordSubmit = (password) => {
		setRegistrationdata({ ...registrationdata, password });
		setStep(3);
	};

	const handlePersonalInfoSubmit = (personalInfo) => {
		setRegistrationdata({ ...registrationdata, ...personalInfo });
		if (registrationdata.isFarmer) {
			setStep(4);
		} else {
			handleRegistrationSubmit();
		}
	};

	const handleShopInfoSubmit = (shopInfo) => {
		setRegistrationdata({ ...registrationdata, ...shopInfo });
		handleRegistrationSubmit();
	};

	const handleRegistrationSubmit = async () => {
		let error = null;

		if (registrationdata.isFarmer) {
			if (
				!registrationdata.password ||
				!registrationdata.businessCategories.length ||
				!registrationdata.businessState ||
				!registrationdata.businessLocalGovernmentArea ||
				!registrationdata.businessAddress ||
				!registrationdata.firstName ||
				!registrationdata.lastName
			) {
				error = "Some required fields are missing.";
			}
		} else {
			if (
				!registrationdata.firstName ||
				!registrationdata.lastName ||
				(!registrationdata.phoneNumber && !registrationdata.email) ||
				!registrationdata.password
			) {
				error = "Some required fields are missing.";
			}
		}

		if (error) {
			setFormError(error);
			return;
		}

		setFormError("");
		setIsLoading(true);

		try {
			let endpoint;
			let requestBody;

			if (registrationdata.isFarmer) {
				endpoint = "api/farmers/";
				requestBody = {
					firstName: registrationdata.firstName,
					lastName: registrationdata.lastName,
					password: registrationdata.password,
					phoneNumber: registrationdata.phoneNumber, // can be empty
					email: registrationdata.email, // can be empty
					businessCategories:
						registrationdata.businessCategories.join(", "),
					businessState: registrationdata.businessState,
					businessLocalGovernmentArea:
						registrationdata.businessLocalGovernmentArea,
					businessAddress: registrationdata.businessAddress,
					isFarmer: true,
				};
			} else {
				endpoint = "api/users/";
				requestBody = {
					firstName: registrationdata.firstName,
					lastName: registrationdata.lastName,
					phoneNumber: registrationdata.phoneNumber, // can be empty
					email: registrationdata.email, // can be empty
					password: registrationdata.password,
					isFarmer: false,
				};
			}

			console.log("Request Body:", requestBody);

			const response = await axios.post(
				`${BASE_URL}${endpoint}`,
				requestBody
			);

			console.log("Registration successful:", response.data);
			navigate("/login");
		} catch (error) {
			console.error(
				"Registration failed:",
				error.response ? error.response.data : error.message
			);
		} finally {
			setIsLoading(false);
		}
	};

	const renderStep = () => {
		switch (step) {
			case 0:
				return <UserReg onNextStep={handleUserTypeSelection} />;
			case 1:
				return (
					<PhoneNumberOrEmailComponent
						onNextStep={handlePhoneOrEmailSubmit}
					/>
				);
			case 2:
				return <PasswordComponent onNextStep={handlePasswordSubmit} />;
			case 3:
				return (
					<PersonalFormComponent
						onNextStep={handlePersonalInfoSubmit}
					/>
				);
			case 4:
				return <ShopInfoComponent onNextStep={handleShopInfoSubmit} />;
			default:
				return null;
		}
	};

	return (
		<div>
			{formError && <div className="error">{formError}</div>}
			{isLoading ? <Spinner /> : renderStep()}
		</div>
	);
};

export default RegistrationFlow;
