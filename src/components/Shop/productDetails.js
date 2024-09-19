import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Navbar from "./navbar";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./footer";

const baseUrl = "https://backend-greenshift.onrender.com";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector((state) =>
		state.shop.products.find((prod) => prod._id === id)
	);

	if (!product) {
		return <div>Product not found!</div>;
	}

	const handleAddToCart = () => {
		dispatch(addToCart({ productId: product._id, quantity: 1 }));
	};

	return (
		<>
			<Navbar />
			<div className="p-6 max-w-4xl mx-auto">
				{/* Back to Shop Link */}
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<img
							src={`${baseUrl}${product.imagePath}`}
							alt={product.produceName}
							className="w-full h-64 object-cover rounded"
						/>
					</div>

					<div>
						<h1 className="text-3xl font-bold">
							{product.produceName}
						</h1>
						<p className="text-gray-600 mb-4">{product.category}</p>
						<p className="text-2xl text-green-600 font-semibold mb-4">
							&#8358;{product.price}
						</p>
						<p className="text-gray-700 mb-2">
							Location: {product.location}
						</p>
						<p className="text-gray-700 mb-2">
							Available Quantity: {product.quantity}
						</p>
						<p className="text-gray-700 mb-4">
							Bulk Price: &#8358;{product.bulkPrice}
						</p>
						<p className="text-gray-700 mb-6">
							{product.description}
						</p>

						<button
							onClick={handleAddToCart}
							disabled={product.quantity === 0}
							className={`bg-primaryGreen text-white py-2 px-4 rounded hover:bg-green-700 ${
								product.quantity === 0
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}>
							Add to Cart
						</button>

						<div className="mt-6">
							<h2 className="text-lg font-semibold">
								Delivery Expectation:
							</h2>
							<p className="text-gray-600">3-5 business days</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductDetails;
