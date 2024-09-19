import React from "react";

const Footer = () => {
	return (
		<footer className="bg-[#235A25] text-white">
			{/* Top Section */}
			<div className="container mx-auto py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				{/* Logo */}
				<div className="flex justify-center items-center text-white">
					<span className="text-2xl md:text-3xl font-bold">
						GREEN
					</span>
					<span className="text-xl md:text-3xl font-extralight">
						shift
					</span>
				</div>

				{/* Newsletter Signup */}
				<div className="flex flex-col items-center md:items-start space-y-2 w-full md:w-auto">
					<p className="text-xs md:text-sm font-medium text-center md:text-left">
						Subscribe to our newsletter to get the latest offers
						first
					</p>
					<div className="flex w-full px-3 ">
						<input
							type="email"
							placeholder="Enter your email address"
							className="py-3 px-4 w-full rounded bg-white text-black outline-none"
						/>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="bg-primaryGreen py-8 md:py-12">
				<div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-5">
					{/* Footer Columns */}
					<FooterColumn
						title="ABOUT GREENshift"
						links={[
							"About us",
							"Terms and Conditions",
							"Privacy Policy",
							"Billing Policy",
							"Cookie Policy",
							"Copyright Policy",
						]}
					/>
					<FooterColumn
						title="SUPPORT"
						links={[
							"mailto:support@greenshift.com",
							"Safety Tips",
							"Contact Us",
							"FAQ",
						]}
					/>
					<FooterColumn
						title="SOCIALS"
						links={["Facebook", "Instagram", "Twitter", "YouTube"]}
					/>
					<FooterColumn
						title="PARTNERS"
						links={[
							"Mastercard",
							"DHL",
							"VISA",
							"Verve",
							"Interswitch",
							"Realsam",
						]}
					/>
				</div>

				{/* Footer Copyright */}
				<div className="text-center mt-6">
					<p className="text-sm md:text-base">© 2024 Greenshift</p>
				</div>
			</div>
		</footer>
	);
};

const FooterColumn = ({ title, links }) => (
	<div>
		<h5 className="font-bold mb-3 text-sm md:text-base text-black">
			{title}
		</h5>
		<ul className="space-y-2 text-xs md:text-sm">
			{links.map((link, index) => (
				<li key={index}>
					<a
						href={link.includes("mailto:") ? link : "#"}
						className="hover:underline">
						{link.replace("mailto:", "")}
					</a>
				</li>
			))}
		</ul>
	</div>
);

export default Footer;
