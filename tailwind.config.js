/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["source-sans-pro", "sans-serif"],
			},
			colors: {
				primaryGreen: "#388E3C",
				secondaryGreen: "#58C55D",
				baseGreen: "#80B382",
				customBlack: "#151515",
				customGrey: "#A1A1A1",
				customBg: "#EBEBEB",
				primaryBg: "#FFFFFF",
				border: "#A1A1A1",
				milkText: "#F1F1F1",
				inactiveText: "#767676",
				progressGrey: "#7C7C7C",
				disabled: "#C0C0C0",
				disabledText: "#5C5C5C",
				sidebarGreen: "#70AC72",
				sidebarText: "#515151",
				sidebarHeader: "#B3FBB5",
			},
			animation: {
				fadeIn: "fadeIn 4s ease-in-out forwards",
				spinlow: "spinlow 0.8s linear infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				spinlow: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			transitionDelay: {
				200: "200ms",
				400: "400ms",
			},
			spacing: {
				"delay-200": "200ms",
				"delay-1000": "1000ms",
			},
		},
	},
	plugins: [],
};
