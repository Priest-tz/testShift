import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Backdrop from "../../../data/Images/Greenshift_backdrop.jpeg";
import lock from "../../../data/Images/lock.svg";
import user from "../../../data/Images/user.svg";
import eyeOpen from "../../../data/Images/eye.svg";
import eyeClosed from "../../../data/Images/eye-off.svg";
import Spinner from "../spinner";

const Login = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			setShowLogin(true);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const isValidPhoneNumber = (phone) => {
		return phone.length === 11 && /^\d+$/.test(phone);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (!isValidEmail(credential) && !isValidPhoneNumber(credential)) {
			setError("Please enter a valid email or 11-digit phone number");
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				"https://backend-greenshift.onrender.com/api/users/auth",
				{ credential, password }
			);

			const userdata = {
				token: response.data.token,
				id: response.data._id,
				firstName: response.data.firstName,
				lastName: response.data.lastName,
				credential: response.data.email,
				isFarmer: response.data.isFarmer,
			};

			dispatch(login(userdata));

			localStorage.setItem("userData", JSON.stringify(userdata));

			setTimeout(() => {
				if (userdata.isFarmer) {
					window.location.href = `https://frontend-ruddy-six-56.vercel.app?token=${userdata.token}`;
				} else {
					navigate("/");
				}
				setIsLoading(false);
			}, 4000);
		} catch (err) {
			setError("Invalid email or password");
			console.error("Login failed", err.response?.data || err.message);
			setIsLoading(false);
		}
	};

	const isButtonDisabled = !(credential && password);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div
			className="flex items-center justify-center select-none h-screen bg-cover bg-center bg-no-repeat bg-gray-800 bg-opacity-30"
			style={{ backgroundImage: `url(${Backdrop})` }}>
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 p-4 m-4 md:m-0 bg-primaryBg bg-opacity-60 rounded-xl shadow-lg max-w-3xl w-full">
				<div className="flex flex-col gap-4 p-4 md:p-12 items-center">
					<div className="flex flex-col justify-center items-center gap-2 mb-4">
						<div className="flex justify-center items-center text-primaryGreen">
							<span className="text-2xl md:text-3xl font-bold">
								GREEN
							</span>
							<span className="text-xl md:text-3xl font-extralight">
								shift
							</span>
						</div>
						<span className="text-primaryGreen font-semibold text-base">
							Login
						</span>
						<span className="text-customBlack text-sm font-thin">
							Please enter your details to login
						</span>
					</div>

					<form onSubmit={handleSubmit} className="md:w-[60%] w-full">
						{error && (
							<div className="mb-4 text-red-500 text-sm">
								{error}
							</div>
						)}
						<div className="mb-4 relative">
							<input
								type="text"
								id="credential"
								name="credential"
								value={credential}
								onChange={(e) => setCredential(e.target.value)}
								placeholder="Email or Phone Number"
								className="text-sm font-thin mt-1 w-full pl-10 md:px-12 py-4 rounded-md bg-customBg focus:bg-customBg border border-border focus:border-none focus:outline-none"
								required
							/>
							<img
								src={user}
								alt="Email Icon"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
							/>
						</div>
						<div className="mb-6 relative">
							<input
								type={isPasswordVisible ? "text" : "password"}
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								className="text-sm mt-1 w-full px-12 py-4 rounded-md bg-customBg focus:bg-customBg border border-border focus:border-none focus:outline-none"
								required
							/>
							<img
								src={lock}
								alt="Password Icon"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-customBg"
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customBg focus:outline-none"
								onClick={togglePasswordVisibility}>
								<img
									src={
										isPasswordVisible ? eyeOpen : eyeClosed
									}
									alt="Toggle Password Visibility"
									className="w-4 h-4 md:w-5 md:h-5"
								/>
							</button>
						</div>
						<div className="flex justify-end items-center">
							<a
								href="/forgot-password"
								className="text-sm text-primaryGreen hover:underline">
								Forgot Password?
							</a>
						</div>
						<button
							type="submit"
							className={`w-full mt-6 py-4 px-4 text-milkText rounded-lg font-medium text-base ${
								isButtonDisabled
									? "bg-baseGreen "
									: "bg-primaryGreen"
							} focus:outline-none`}
							disabled={isButtonDisabled}>
							Login
						</button>
					</form>
					<div className="text-sm">
						<span className="text-customBlack">
							Don't have an account?
						</span>{" "}
						<a className="text-primaryGreen" href="/auth">
							Register Instead
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
