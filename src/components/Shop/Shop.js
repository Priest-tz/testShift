import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, fetchProducts } from "../../features/shop/shopSlice";
import chevronleft from "../../data/Images/chevronLeft.svg";
import TrendingProducts from "./trending";
import Spinner from "../Auth/spinner";

const baseUrl = "https://backend-greenshift.onrender.com";

const ShopGallery = () => {
	const dispatch = useDispatch();
	const { products, status, error } = useSelector((state) => state.shop);
	const isSidebarOpen = useSelector((state) => state.shop.isSidebarOpen);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner />
			</div>
		);
	}

	if (status === "failed") {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="flex relative">
			{/* Sidebar */}
			<div
				className={` bg-primaryGreen bg-opacity-10 z-30 transition-all duration-300 ease-in-out 
         min-h-screen overflow-hidden
        ${
			isSidebarOpen
				? "w-3/4 max-w-[300px] md:w-1/5 md:max-w-none"
				: "w-0 md:w-0"
		}`}>
				<div className="py-16 flex flex-col items-center justify-center gap-2 whitespace-nowrap">
					{/* Sidebar content */}
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
						className="flex mb-4  items-center justify-center w-10 h-10 md:w-10 md:h-10 bg-primaryGreen bg-opacity-10 rounded-full"
						onClick={() => dispatch(toggleSidebar())}
						aria-label={
							isSidebarOpen ? "Close Sidebar" : "Open Sidebar"
						}>
						<div className="flex">
							<img
								src={chevronleft}
								alt=""
								className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${
									isSidebarOpen ? "rotate-0" : "rotate-180"
								}`}
							/>
							<img
								src={chevronleft}
								alt=""
								className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${
									isSidebarOpen ? "rotate-0" : "rotate-180"
								}`}
							/>
						</div>
					</button>

					{/* Product Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{products.map((product) => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}>
								<div className="border p-4 rounded shadow">
									<img
										src={`${baseUrl}${product.imagePath}`}
										alt={product.produceName}
										className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-2 rounded"
										loading="lazy"
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
