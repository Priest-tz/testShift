import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/shop/shopSlice";
import { useStore } from "../../context/storeContext";
import chevronleft from "../../data/Images/chevronLeft.svg";

const ShopGallery = () => {
	const dispatch = useDispatch();
	const { products } = useStore();
	const isSidebarOpen = useSelector((state) => state.shop.isSidebarOpen);

	if (!products) {
		return <div>Loading products...</div>;
	}

	return (
		<div className="flex relative">
			{/* Sidebar */}
			<div
				className={`bg-primaryGreen bg-opacity-10 z-30 transition-all duration-300 ease-in-out
          fixed top-0 left-0  w-3/4 max-w-[300px] hidden
          md:relative md:w-1/5 md:max-w-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
				<div className="py-16 flex flex-col items-center justify-center gap-2">
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
			<div
				className={`flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "md:ml-[20%]" : "md:ml-[0"}
          ${isSidebarOpen ? "md:w-4/5" : "md:w-full"}
          w-full`}>
				<div className="p-4">
					{/* Sidebar toggle button */}
					<button
						className=" hidden md:mb-4 md:flex relative"
						onClick={() => dispatch(toggleSidebar())}>
						<img
							src={chevronleft}
							alt="close sidebar"
							className="w-12 h-12"
						/>
						<img
							src={chevronleft}
							alt="close sidebar"
							className="w-12 h-12"
						/>
					</button>

					{/* Product Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{products.map((product) => (
							<div
								key={product.id}
								className="border p-4 rounded">
								<img
									src={product.image}
									alt={product.name}
									className="w-[60%] h-28 object-cover mb-2"
								/>
								<h3 className="text-lg font-semibold">
									{product.name}
								</h3>
								<p className="text-gray-700">
									&#8358;{product.price}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopGallery;
