import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/todo/" });

export const authapi = createApi({
	baseQuery,
	tagTypes: ["Auth"],
	endpoints: (builder) => ({}),
});
