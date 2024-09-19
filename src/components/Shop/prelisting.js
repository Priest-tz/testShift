import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import Spinner from "../Auth/spinner";
import { Link } from "react-router-dom";

const PrelistingPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const token = user?.token;
				const response = await axios.get(
					"https://backend-greenshift.onrender.com/api/users/prelist/all",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setProducts(response.data);
			} catch (error) {
				console.error("Failed to fetch products", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [user]);

	const handleShowInterest = (productName) => {
		setNotificationMessage(
			`You will be notified when the product "${productName}" is live.`
		);
		setShowNotification(true);
		setTimeout(() => setShowNotification(false), 3000);
	};

	return (
		<>
			<Navbar />
			{showNotification && (
				<div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
					{notificationMessage}
				</div>
			)}
			<div className="container mx-auto p-4">
				<div className="mb-6">
					<Link
						to="/"
						className="flex items-center text-primaryGreen hover:underline">
						<svg
							className="w-6 h-6 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<span>Back to Shop</span>
					</Link>
				</div>
				<h1 className="text-2xl font-bold mb-4">Prelisted Products</h1>

				{/* Display the spinner while loading */}
				{loading ? (
					<div className="flex justify-center">
						<Spinner /> {/* Spinner component */}
					</div>
				) : (
					<>
						{products.length === 0 ? (
							<p>No products available.</p>
						) : (
							<ul className="space-y-4">
								{products.map((product) => (
									<li
										key={product._id}
										className="p-4 border rounded-lg shadow-sm bg-white">
										<h2 className="text-xl font-semibold">
											{product.name}
										</h2>
										<p className="text-gray-700">
											{product.description}
										</p>
										<p className="text-lg font-medium">
											Price: &#8358;
											{product.price.toFixed(2)}
										</p>
										<p className="text-gray-600">
											Category: {product.category}
										</p>
										<p className="text-gray-600">
											Stock: {product.stock}
										</p>
										<p className="text-gray-600">
											Harvest Dates:{" "}
											{new Date(
												product.startHarvestDate
											).toLocaleDateString()}{" "}
											-{" "}
											{new Date(
												product.endHarvestDate
											).toLocaleDateString()}
										</p>
										<button
											onClick={() =>
												handleShowInterest(product.name)
											}
											className="mt-4 px-4 py-2 bg-primaryGreen text-white rounded hover:bg-green-700">
											Show Interest
										</button>
									</li>
								))}
							</ul>
						)}
					</>
				)}
			</div>
			<Footer />
		</>
	);
};

export default PrelistingPage;
