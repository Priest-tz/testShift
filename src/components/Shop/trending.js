import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/shop/shopSlice";
import { Link } from "react-router-dom";

const baseUrl = "https://backend-greenshift.onrender.com";

const TrendingProducts = () => {
	const dispatch = useDispatch();
	const { products, status, error } = useSelector((state) => state.shop);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts());
		}
	}, [dispatch, status]);

	if (status === "loading") {
		return <div>Loading trending products...</div>;
	}

	if (status === "failed") {
		return <div>Error: {error}</div>;
	}

	const lastSixProducts = products.slice(-3);

	return (
		<div className="my-8 p-4">
			{/* Header */}
			<div className="bg-primaryGreen bg-opacity-80 text-white py-2 px-4 rounded mb-4 text-xl font-bold">
				Trending
			</div>

			{/* Product Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{lastSixProducts.length > 0 ? (
					lastSixProducts.map((product) => (
						<Link to={`/product/${product._id}`} key={product._id}>
							<div className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
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
					))
				) : (
					<div className="text-center col-span-full">
						No products available
					</div>
				)}
			</div>
		</div>
	);
};

export default TrendingProducts;
