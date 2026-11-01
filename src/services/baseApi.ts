import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "@/store/slices/authSlice";

// Mutex flag to prevent simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  credentials: "include", // Supports HTTP-only cookies in production
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

/**
 * Production-Grade BaseQuery with Automatic Token Rotation / Silent Refresh
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // If request failed with 401 Unauthorized, attempt token refresh
  if (result.error && result.error.status === 401) {
    const isRefreshEndpoint =
      typeof args === "string"
        ? args.includes("/auth/refresh-token")
        : args.url.includes("/auth/refresh-token");

    // Do not attempt reauth on the refresh endpoint itself
    if (!isRefreshEndpoint) {
      if (isRefreshing) {
        // Another request is already refreshing; queue this request
        try {
          const newToken = await new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });

          if (newToken) {
            // Retry original request with newly obtained token
            return await rawBaseQuery(args, api, extraOptions);
          }
        } catch {
          return result;
        }
      }

      isRefreshing = true;

      try {
        const storedRefreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : null;

        // Call backend refresh token endpoint
        const refreshResult: any = await rawBaseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
            body: storedRefreshToken ? { refreshToken: storedRefreshToken } : {},
          },
          api,
          extraOptions
        );

        const refreshData = refreshResult.data?.data;
        const newAccessToken =
          refreshData?.accessToken || refreshData?.token;
        const newRefreshToken = refreshData?.refreshToken;
        const user = refreshData?.user;

        if (newAccessToken) {
          // Update Redux Store and LocalStorage
          api.dispatch(
            setCredentials({
              token: newAccessToken,
              refreshToken: newRefreshToken || storedRefreshToken || undefined,
              user,
            })
          );

          processQueue(null, newAccessToken);

          // Retry the original query
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          processQueue(new Error("Token refresh returned empty access token"), null);
          api.dispatch(logout());
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        api.dispatch(logout());
      } finally {
        isRefreshing = false;
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Category",
    "Service",
    "Booking",
    "Address",
    "Provider",
    "Review",
    "Payment",
  ],
  endpoints: () => ({}),
});
