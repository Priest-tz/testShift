import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, fetchProducts } from "../../features/shop/shopSlice";
import chevronleft from "../../data/Images/chevronLeft.svg";
import TrendingProducts from "./trending";
import Spinner from "../Auth/spinner";
import mangoImage from "../../data/fallback/mangoes.jpeg";
import pineappleImage from "../../data/fallback/pineapple.jpeg";
import carrotsImage from "../../data/fallback/carrots.jpeg";
import tomatoesImage from "../../data/fallback/Tomatoes.jpeg";
import pepperImage from "../../data/fallback/pepper.jpeg";
import strawberryImage from "../../data/fallback/strawberries.jpeg";

const fallbackProducts = [
	{
		_id: "1",
		produceName: "Mango",
		category: "Fruits",
		price: 500,
		bulkPrice: 4500,
		location: "Lagos",
		quantity: 100,
		imagePath: mangoImage,
		description: "Fresh ripe mangoes, perfect for juice or snacks.",
	},
	{
		_id: "2",
		produceName: "Pineapple",
		category: "Fruits",
		price: 600,
		bulkPrice: 5400,
		location: "Abuja",
		quantity: 50,
		imagePath: pineappleImage,
		description: "Juicy and sweet pineapples, great for smoothies.",
	},
	{
		_id: "3",
		produceName: "Carrots",
		category: "Vegetables",
		price: 300,
		bulkPrice: 2700,
		location: "Kano",
		quantity: 200,
		imagePath: carrotsImage,
		description: "Fresh organic carrots, rich in vitamins.",
	},
	{
		_id: "4",
		produceName: "Tomatoes",
		category: "Vegetables",
		price: 200,
		bulkPrice: 1800,
		location: "Ogun",
		quantity: 500,
		imagePath: tomatoesImage,
		description: "Red, juicy tomatoes, perfect for sauces and salads.",
	},
	{
		_id: "5",
		produceName: "Pepper",
		category: "Vegetables",
		price: 100,
		bulkPrice: 900,
		location: "Ibadan",
		quantity: 300,
		imagePath: pepperImage,
		description: "Spicy peppers, ideal for seasoning dishes.",
	},
	{
		_id: "6",
		produceName: "Strawberry",
		category: "Fruits",
		price: 700,
		bulkPrice: 6300,
		location: "Jos",
		quantity: 120,
		imagePath: strawberryImage,
		description: "Sweet strawberries, excellent for desserts.",
	},
];

const ShopGallery = () => {
	const dispatch = useDispatch();
	const { products, status, error } = useSelector((state) => state.shop);
	const isSidebarOpen = useSelector((state) => state.shop.isSidebarOpen);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(fetchProducts());
		}
	}, [dispatch, isAuthenticated]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner />
			</div>
		);
	}

	if (status === "failed") {
		return <div className="text-red-500">Error: {error.message}</div>;
	}

	const displayedProducts =
		isAuthenticated && products.length > 0 ? products : fallbackProducts;

	return (
		<div className="flex relative">
			{/* Sidebar */}
			<div
				className={`bg-primaryGreen bg-opacity-10 z-30 transition-all duration-300 ease-in-out 
            min-h-screen overflow-hidden ${
				isSidebarOpen
					? "w-3/4 max-w-[300px] md:w-1/5 md:max-w-none"
					: "w-0 md:w-0"
			}`}>
				<div className="py-16 flex flex-col items-center justify-center gap-2 whitespace-nowrap">
					<ul>
						<li className="mb-6">
							<span className="font-semibold text-sidebarGreen text-xl">
								Crops
							</span>
							<ul className="ml-4 space-y-2 text-sidebarText text-base">
								<li>Vegetables</li>
								<li>Fruits</li>
								<li>Cereals</li>
								<li>Roots & Tubers</li>
							</ul>
						</li>
						<li className="mb-4">
							<span className="font-semibold text-sidebarGreen text-xl">
								Livestock
							</span>
							<ul className="ml-4 space-y-2 text-sidebarText">
								<li>Poultry</li>
								<li>Cattle</li>
								<li>Goats</li>
								<li>Sheep</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 transition-all duration-300 ease-in-out">
				<div className="p-4">
					{/* Sidebar toggle button */}
					<button
						className="flex mb-4 items-center justify-center w-10 h-10 md:w-10 md:h-10 bg-primaryGreen bg-opacity-10 rounded-full"
						onClick={() => dispatch(toggleSidebar())}
						aria-label={
							isSidebarOpen ? "Close Sidebar" : "Open Sidebar"
						}>
						<img
							src={chevronleft}
							alt="Toggle Sidebar"
							className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${
								isSidebarOpen ? "rotate-0" : "rotate-180"
							}`}
						/>
					</button>

					{/* Product Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{displayedProducts.map((product) => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}>
								<div className="border p-4 rounded shadow">
									<img
										src={product.imagePath}
										alt={product.produceName}
										className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-2 rounded"
									/>
									<h3 className="text-lg font-semibold">
										{product.produceName}
									</h3>
									<p className="text-gray-700">
										&#8358;{product.price}
									</p>
								</div>
							</Link>
						))}
					</div>

					<TrendingProducts />
				</div>
			</div>
		</div>
	);
};

export default ShopGallery;
