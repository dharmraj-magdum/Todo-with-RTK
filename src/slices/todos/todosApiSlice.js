import { getToken } from "../tokenService";
import { baseApi } from "../baseApi";
const URL = "/";

export const todosApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAll: builder.query({
			query: (token) => {
				return {
					url: "getAll/",
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			providesTags: ["Todo"],
			transformResponse: (response) => response.todos,
			transformErrorResponse: (response, meta, arg) => response.error,
		}),
		createTodo: builder.mutation({
			query: (data) => {
				return {
					url: "create-todo/",
					method: "POST",
					body: data.todo,
					headers: {
						Authorization: `Bearer ${data.token}`,
					},
				};
			},
			// transformResponse: (response) => response.todos,
			transformErrorResponse: (response, meta, arg) => {
				if (response.status == 400) {
					// console.log("response.status", response.status);
					return response.data.errors;
				}
				// console.log("response.data.errors", response.data.errors);
				return response.data.errors;
				return response;
			},
			invalidatesTags: ["Todo"],
		}),
		updateTodo: builder.mutation({
			query: (data) => {
				return {
					url: "update-todo/" + data.id + "/",
					method: "PATCH",
					body: data.todo,
					headers: {
						Authorization: `Bearer ${data.token}`,
					},
				};
			},
			// transformResponse: (response) => response.todos,
			transformErrorResponse: (response, meta, arg) => {
				if (response.status == 400) {
					// console.log("response.status", response.status);
					return response.data.errors;
				}
				// console.log("response.data.errors", response.data.errors);
				return response.data.errors;
				return response;
			},
			invalidatesTags: ["Todo"],
		}),
		deleteTodo: builder.mutation({
			query: (data) => {
				return {
					url: "delete-todo/" + data.id + "/",
					method: "DELETE",
					body: data.todo,
					headers: {
						Authorization: `Bearer ${data.token}`,
					},
				};
			},
			// transformResponse: (response) => response.todos,
			transformErrorResponse: (response, meta, arg) => {
				if (response.status == 400) {
					// console.log("response.status", response.status);
					return response.data.errors;
				}
				// console.log("response.data.errors", response.data.errors);
				return response.data.errors;
				return response;
			},
			invalidatesTags: ["Todo"],
		}),
	}),
});

export const {
	useGetAllQuery,
	useCreateTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodoMutation,
} = todosApiSlice;
