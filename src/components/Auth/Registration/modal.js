import React from "react";

const Modal = ({ isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 shadow-lg w-[80%] max-w-md">
				<h2 className="text-2xl font-bold text-center mb-4">
					Registration Successful
				</h2>
				<p className="text-center mb-6">
					Your registration was completed successfully!
				</p>
				<button
					onClick={onClose}
					className="w-full bg-primaryGreen text-white py-2 rounded-lg">
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
