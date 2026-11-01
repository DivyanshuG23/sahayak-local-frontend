import { baseApi } from "./baseApi";

export const bookingService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Customer
    createBooking: builder.mutation({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    getMyBookings: builder.query({
      query: (params?: { status?: string; page?: number; limit?: number }) => ({
        url: "/bookings/my-bookings",
        params,
      }),
      providesTags: ["Booking"],
    }),

    getBookingById: builder.query({
      query: (id: string) => `/bookings/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Booking", id }],
    }),

    cancelBooking: builder.mutation({
      query: ({ id, reason }: { id: string; reason?: string }) => ({
        url: `/bookings/${id}/cancel`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Booking"],
    }),

    // Provider
    getProviderBookingRequests: builder.query({
      query: (params?: { page?: number; limit?: number }) => ({
        url: "/provider/bookings/requests",
        params,
      }),
      providesTags: ["Booking"],
    }),

    acceptBooking: builder.mutation({
      query: (id: string) => ({
        url: `/provider/bookings/${id}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["Booking"],
    }),

    rejectBooking: builder.mutation({
      query: ({ id, reason }: { id: string; reason?: string }) => ({
        url: `/provider/bookings/${id}/reject`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Booking"],
    }),

    updateBookingStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/provider/bookings/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Booking"],
    }),

    verifyBookingOtp: builder.mutation({
      query: ({ id, otp }: { id: string; otp: string }) => ({
        url: `/provider/bookings/${id}/verify-otp`,
        method: "POST",
        body: { otp },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
  useGetProviderBookingRequestsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
  useUpdateBookingStatusMutation,
  useVerifyBookingOtpMutation,
} = bookingService;

