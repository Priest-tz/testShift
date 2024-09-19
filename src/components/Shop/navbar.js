import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import bell from "../../data/Images/bell.svg";
import question from "../../data/Images/question.svg";
import cart from "../../data/Images/shopping-cart.svg";
import userIcon from "../../data/Images/user.svg";
import arrowDown from "../../data/Images/chevron-down.svg";
import loadingIcon from "../../data/Images/waiting.svg";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [userDropdown, setUserDropdown] = useState(false);

	const user = useSelector((state) => state.auth.user);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleUserDropdown = () => {
		setUserDropdown(!userDropdown);
	};

	const handleLogout = () => {
		dispatch(logout());
		// Optionally, you might want to redirect after logout
	};

	return (
		<div className="sticky top-0 z-50 bg-milkText shadow">
			<div className="flex justify-between items-center md:px-12 px-4 py-6 select-none">
				{/* Logo */}
				<Link to="/" className="flex items-end">
					<div className="flex items-end">
						<span className="text-primaryGreen text-2xl md:text-3xl font-semibold">
							GREEN
						</span>
						<span className="text-primaryGreen text-2xl md:text-3xl font-light">
							shift
						</span>
					</div>
				</Link>

				<div className="flex items-center md:hidden space-x-2">
					{isAuthenticated ? (
						<button
							onClick={toggleUserDropdown}
							className="flex items-center space-x-2">
							<span>Welcome {user.firstName}</span>
						</button>
					) : (
						<button onClick={toggleUserDropdown}>
							<img
								src={userIcon}
								alt="User"
								className="w-6 h-6"
							/>
						</button>
					)}

					<button onClick={toggleMenu}>
						<svg
							className="w-8 h-8 text-primaryGreen"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>

				<div className="hidden md:flex items-center space-x-6 text-inactiveText text-base pr-12">
					<ul className="flex items-center space-x-6">
						<li className="flex items-center space-x-2 cursor-pointer">
							<img
								src={bell}
								alt="Notifications"
								className="w-4 h-4"
							/>
							<span>Notification</span>
						</li>
						<li className="flex items-center space-x-2 cursor-pointer">
							<img
								src={question}
								alt="Help"
								className="w-4 h-4"
							/>
							<span>Help</span>
						</li>
						<Link
							to="/checkout"
							className="flex items-center space-x-2">
							<img src={cart} alt="Cart" className="w-4 h-4" />
							<span>Cart</span>
						</Link>
						<li
							className="relative flex items-center space-x-2 cursor-pointer"
							onClick={toggleUserDropdown}>
							<img
								src={userIcon}
								alt="User"
								className="w-4 h-4"
							/>
							<span>
								{isAuthenticated
									? `Welcome ${user.firstName}`
									: "User"}
							</span>
							<img
								src={arrowDown}
								alt="Dropdown Arrow"
								className={`w-4 h-4 transition-transform ${
									userDropdown ? "rotate-180" : "rotate-0"
								}`}
							/>
						</li>
					</ul>

					<div className="flex space-x-4">
						<Link to="/pre">
							<button className="relative px-12 py-4 border-2	 border-primaryGreen text-primaryGreen text-xs rounded">
								<img
									src={loadingIcon}
									alt="Loading"
									className="absolute left-2 w-5 h-5"
								/>
								Prelisted Products
							</button>
						</Link>
						<button className="px-12 py-4 bg-primaryGreen text-white text-xs rounded">
							SELL
						</button>
					</div>
				</div>
			</div>

			{/* User dropdown */}
			{userDropdown && !isOpen && (
				<div className="absolute right-20 top-16 md:right-60 select-none mt-2 w-32 bg-white shadow-lg rounded z-100">
					<ul className="text-sm text-black">
						{isAuthenticated ? (
							<>
								<li
									className="px-4 py-3 cursor-pointer"
									onClick={handleLogout}>
									Logout
								</li>
							</>
						) : (
							<>
								<li className="px-4 py-3">
									<Link to="/auth">Register</Link>
								</li>
								<li className="px-4 py-3">
									<Link to="/login">Login</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			)}

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden">
					<ul className="flex flex-col space-y-4 text-inactiveText text-base p-6">
						<li className="flex items-center space-x-2 cursor-pointer">
							<img
								src={bell}
								alt="Notifications"
								className="w-4 h-4"
							/>
							<span>Notification</span>
						</li>
						<li className="flex items-center space-x-2 cursor-pointer">
							<img
								src={question}
								alt="Help"
								className="w-4 h-4"
							/>
							<span>Help</span>
						</li>
						<li className="flex items-center space-x-2 cursor-pointer">
							<Link
								to="/checkout"
								className="flex items-center space-x-2">
								<img
									src={cart}
									alt="Cart"
									className="w-4 h-4"
								/>
								<span>Cart</span>
							</Link>
						</li>
					</ul>

					<div className="px-6 py-4 space-y-4">
						{/* Prelisted Products Button visible in mobile */}
						<Link to="/pre">
							<button className="relative w-full border-2 border-primaryGreen text-primaryGreen text-xs rounded py-4 animate-bounce">
								<img
									src={loadingIcon}
									alt="Loading"
									className="absolute left-6 w-4 h-4 animate-spin"
								/>
								Prelisted Products
							</button>
						</Link>

						{/* Sell button in mobile */}
						<button className="w-full bg-primaryGreen text-white text-xs rounded py-4">
							SELL
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
