import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// console.log("===========================", process.env.REACT_APP_SERVER);
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_SERVER + "/todo/",
});

export const baseApi = createApi({
	baseQuery,
	tagTypes: ["Todo", "Auth"],
	endpoints: (builder) => ({}),
});
