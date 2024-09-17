import React, { createContext, useContext } from "react";

const StoreContext = createContext();

export const useStore = () => {
	return useContext(StoreContext);
};

export const StoreProvider = ({ children, value }) => {
	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
};
