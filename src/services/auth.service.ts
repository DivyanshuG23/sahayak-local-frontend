import { baseApi } from "./baseApi";
import {
  setCredentials,
  updateUser,
  updateProviderProfile,
  logout as logoutAction,
} from "../store/slices/authSlice";

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation({
      query: (data) => ({
        url: "/auth/register/customer",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload = data?.data;
          const token = payload?.accessToken || payload?.token;
          const refreshToken = payload?.refreshToken;
          const user = payload?.user;

          if (user && token) {
            dispatch(
              setCredentials({
                user,
                token,
                refreshToken,
              })
            );
          }
        } catch {
          // Error handled in component
        }
      },
    }),

    registerProvider: builder.mutation({
      query: (data) => ({
        url: "/auth/register/provider",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload = data?.data;
          const token = payload?.accessToken || payload?.token;
          const refreshToken = payload?.refreshToken;
          const user = payload?.user;
          const providerProfile = payload?.providerProfile;

          if (user && token) {
            dispatch(
              setCredentials({
                user,
                providerProfile,
                token,
                refreshToken,
              })
            );
          }
        } catch {
          // Error handled in component
        }
      },
    }),

    login: builder.mutation({
      query: (credentials: {
        identifier?: string;
        email?: string;
        phone?: string;
        password: string;
      }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const payload = data?.data;
          const token = payload?.accessToken || payload?.token;
          const refreshToken = payload?.refreshToken;
          const user = payload?.user;
          const providerProfile = payload?.providerProfile;

          if (user && token) {
            dispatch(
              setCredentials({
                user,
                providerProfile,
                token,
                refreshToken,
              })
            );
          }
        } catch {
          // Error handled in component
        }
      },
    }),

    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logoutAction());
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data?.data?.user;
          const providerProfile = data?.data?.providerProfile;
          if (user) {
            dispatch(updateUser(user));
          }
          if (providerProfile) {
            dispatch(updateProviderProfile(providerProfile));
          }
        } catch {
          // Handled in component
        }
      },
    }),

    updateMe: builder.mutation({
      query: (body) => ({
        url: "/auth/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data?.data?.user;
          if (user) {
            dispatch(updateUser(user));
          }
        } catch {
          // Handled in component
        }
      },
    }),

    changePassword: builder.mutation({
      query: (body: {
        oldPassword?: string;
        currentPassword?: string;
        newPassword: string;
      }) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, ...body }: { token: string; password: string }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useRegisterProviderMutation,
  useLoginMutation,
  useLogoutUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authService;
