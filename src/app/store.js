import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import { authApiSlice } from "../slices/auth/authApiSlice";
import { todosApiSlice } from "../slices/todos/todosApiSlice";

const store = configureStore({
	reducer: {
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		auth: authReducer,
		[todosApiSlice.reducerPath]: todosApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApiSlice.middleware)
			.concat(todosApiSlice.middleware),
	devTools: true,
});

export default store;
