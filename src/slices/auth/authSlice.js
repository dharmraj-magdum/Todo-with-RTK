//----------------------------------------------------
//this our local redux/context of user
//----------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { removeTokens } from "../tokenService";

// Get user from localStorage
let user = localStorage.getItem("user");
user = user ? JSON.parse(user) : null;
// console.log("user", user);
const initialState = {
	user: user ? user : null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		logout: (state, action) => {
			state.user = null;
			localStorage.removeItem("user");
			removeTokens();
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
