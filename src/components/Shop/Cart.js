import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchCart,
	removeCartItem,
	updateCartItem,
	clearCart,
} from "../../features/cart/cartSlice";
import trash from "../../data/Images/trash.svg";
import { Link } from "react-router-dom";
import Spinner from "../../components/Auth/spinner";

const baseUrl = "https://backend-greenshift.onrender.com/users/cart/";

const CartPage = () => {
	const dispatch = useDispatch();
	const { items, status, error } = useSelector((state) => state.cart);
	const [shippingDetails, setShippingDetails] = useState({
		address: "",
		phoneNumber: "",
	});

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	const handleRemove = (productId) => {
		dispatch(removeCartItem(productId));
	};

	const handleUpdateQuantity = (productId, quantity) => {
		dispatch(updateCartItem({ productId, quantity }));

		dispatch(fetchCart());
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	const handleShippingDetailsChange = (e) => {
		const { name, value } = e.target;
		setShippingDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleProceedToPayment = () => {};

	const calculateTotalPrice = () => {
		return items.reduce(
			(total, item) => total + item.productId.price * item.quantity,
			0
		);
	};

	const incrementQuantity = (productId, currentQuantity) => {
		handleUpdateQuantity(productId, currentQuantity + 1);
	};

	const decrementQuantity = (productId, currentQuantity) => {
		if (currentQuantity > 1) {
			handleUpdateQuantity(productId, currentQuantity - 1);
		}
	};

	if (status === "loading") return <Spinner />;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="container mx-auto py-8 h-screen">
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
			<h1 className="text-3xl font-bold mb-6">Your Cart</h1>
			{items.length === 0 ? (
				<div className="text-gray-600">Your cart is empty.</div>
			) : (
				<div>
					{items.map((item) => (
						<div
							key={item.productId._id}
							className="flex justify-between items-center mb-6 p-4 border rounded-lg shadow-sm">
							<div className="flex items-center space-x-4">
								<img
									src={`${baseUrl}${item.productId.imagePath}`}
									alt={item.productId.produceName}
									className="w-24 h-24 object-cover rounded"
								/>
								<div>
									<h2 className="text-lg font-semibold">
										{item.productId.produceName}
									</h2>
									<p className="text-gray-600">
										&#8358;{item.productId.price} x{" "}
										{item.quantity}
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<button
									onClick={() =>
										decrementQuantity(
											item.productId._id,
											item.quantity
										)
									}
									className="w-10 h-10 flex items-center justify-center border rounded bg-gray-200 hover:bg-gray-300">
									<span className="text-xl font-bold">-</span>
								</button>
								<input
									type="number"
									min="1"
									value={item.quantity}
									onChange={(e) =>
										handleUpdateQuantity(
											item.productId._id,
											e.target.value
										)
									}
									className="w-24 p-2 border rounded text-center"
								/>
								<button
									onClick={() =>
										incrementQuantity(
											item.productId._id,
											item.quantity
										)
									}
									className="w-10 h-10 flex items-center justify-center border rounded bg-gray-200 hover:bg-gray-300">
									<span className="text-xl font-bold">+</span>
								</button>
								<button
									onClick={() =>
										handleRemove(item.productId._id)
									}
									className="flex items-center justify-center p-2 rounded hover:bg-gray-200">
									<img
										src={trash}
										alt="Remove"
										className="w-6 h-6"
									/>
								</button>
							</div>
						</div>
					))}

					<div className="mt-8">
						<h2 className="text-2xl font-semibold mb-4">
							Cart Summary
						</h2>
						<p className="text-lg">
							<span className="font-semibold">Total Price:</span>{" "}
							&#8358;{calculateTotalPrice()}
						</p>
						<div className="mt-6">
							<h2 className="text-xl font-semibold mb-2">
								Shipping Details
							</h2>
							<div className="mb-4">
								<label
									className="block text-gray-700 mb-2"
									htmlFor="address">
									Address
								</label>
								<input
									type="text"
									id="address"
									name="address"
									value={shippingDetails.address}
									onChange={handleShippingDetailsChange}
									className="w-full p-2 border rounded"
								/>
							</div>
							<div className="mb-6">
								<label
									className="block text-gray-700 mb-2"
									htmlFor="phoneNumber">
									Phone Number
								</label>
								<input
									type="text"
									id="phoneNumber"
									name="phoneNumber"
									value={shippingDetails.phoneNumber}
									onChange={handleShippingDetailsChange}
									className="w-full p-2 border rounded"
								/>
							</div>
							<button
								onClick={handleProceedToPayment}
								className="bg-primaryGreen text-white py-2 px-4 rounded hover:bg-green-700">
								Proceed to Payment
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
