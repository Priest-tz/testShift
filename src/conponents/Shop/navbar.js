import React, { useState } from "react";
import { Link } from "react-router-dom";
import bell from "../../data/Images/bell.svg";
import question from "../../data/Images/question.svg";
import cart from "../../data/Images/shopping-cart.svg";
import userIcon from "../../data/Images/user.svg";
import arrowDown from "../../data/Images/chevron-down.svg";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [userDropdown, setUserDropdown] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleUserDropdown = () => {
		setUserDropdown(!userDropdown);
	};

	return (
		<div className="sticky top-0 z-50 bg-milkText shadow">
			<div className="flex justify-between items-center md:px-12 px-4 py-6 select-none">
				{/* Logo */}
				<div className="flex items-end">
					<span className="text-primaryGreen text-2xl md:text-3xl font-semibold">
						GREEN
					</span>
					<span className="text-primaryGreen text-2xl md:text-3xl font-light">
						shift
					</span>
				</div>

				<div className="flex items-center md:hidden space-x-2">
					<button onClick={toggleUserDropdown}>
						<img src={userIcon} alt="User" className="w-6 h-6" />
					</button>

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
						<li className="flex items-center space-x-2 cursor-pointer">
							<img src={cart} alt="Cart" className="w-4 h-4" />
							<span>Cart</span>
						</li>
						<li
							className="relative flex items-center space-x-2 cursor-pointer"
							onClick={toggleUserDropdown}>
							<img
								src={userIcon}
								alt="User"
								className="w-4 h-4"
							/>
							<span>User</span>
							<img
								src={arrowDown}
								alt="Dropdown Arrow"
								className={`w-4 h-4 transition-transform ${
									userDropdown ? "rotate-180" : "rotate-0"
								}`}
							/>
						</li>
					</ul>

					<button className="px-12 py-4 bg-primaryGreen text-white text-xs rounded">
						SELL
					</button>
				</div>
			</div>

			{userDropdown && !isOpen && (
				<div className="absolute right-20 top-16 md:right-60 select-none mt-2 w-32 bg-white shadow-lg rounded z-100">
					<ul className="text-sm text-black">
						<li className="px-4 py-3">
							<Link to="/auth">Register</Link>
						</li>
						<li className="px-4 py-3">
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</div>
			)}

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
							<img src={cart} alt="Cart" className="w-4 h-4" />
							<span>Cart</span>
						</li>
					</ul>

					<div className="px-6 py-4">
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
