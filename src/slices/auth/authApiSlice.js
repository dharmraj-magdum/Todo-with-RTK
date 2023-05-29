import { baseApi } from "../baseApi";
const USERS_URL = "/";

export const authApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "login/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Auth"],
		}),
		logout: builder.mutation({
			query: () => ({
				url: "logout/",
				method: "POST",
			}),
			invalidatesTags: ["Auth"],
		}),
		register: builder.mutation({
			query: (data) => ({
				url: "register/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Auth"],
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: "user-update/",
				method: "PATCH",
				body: data.actualData,
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			}),
			invalidatesTags: ["Auth"],
		}),
		sendResetMail: builder.mutation({
			query: (data) => ({
				url: "send-password-reset-email/",
				method: "POST",
				body: data,
			}),
			// invalidatesTags: ["Auth"],
		}),
		resetPassword: builder.mutation({
			query: (data) => ({
				url:
					"/reset-password/" + data.uid + "/" + data.resetToken + "/",
				method: "POST",
				body: data.actualData,
			}),
			// invalidatesTags: ["Auth"],
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateUserMutation,
	useSendResetMailMutation,
	useResetPasswordMutation,
} = authApiSlice;
