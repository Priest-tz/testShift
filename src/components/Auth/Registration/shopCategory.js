import { useState } from "react";

const CategoryDropdown = ({ selectedCategories, setSelectedCategories }) => {
	const categories = [
		"Cereals",
		"Tubers",
		"Legumes",
		"Fruits",
		"Vegetables",
		"Roots",
		"Oilseeds",
		"Spices and Condiments",
		"Livestock",
		"Aquaculture Products",
	];

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleCategoryChange = (category) => {
		if (selectedCategories.includes(category)) {
			setSelectedCategories(
				selectedCategories.filter((item) => item !== category)
			);
		} else {
			setSelectedCategories([...selectedCategories, category]);
		}
	};

	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen);
	};

	return (
		<div className="w-full max-w-md">
			<div className="relative mb-4">
				<button
					onClick={handleDropdownToggle}
					className="flex items-center justify-between mt-1 w-full py-3 text-left pl-4 border bg-white border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primaryGreen">
					{selectedCategories.length > 0
						? selectedCategories.join(", ")
						: "What category of produce do you have?"}
					<span>
						{" "}
						<svg
							className="w-6 h-6 text-customBlack font-light"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
				</button>

				{dropdownOpen && (
					<ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
						{categories.map((category) => (
							<li key={category} className="px-4 py-2">
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										checked={selectedCategories.includes(
											category
										)}
										onChange={() =>
											handleCategoryChange(category)
										}
										className="form-checkbox text-primaryGreen"
									/>
									<span className="ml-2">{category}</span>
								</label>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default CategoryDropdown;
