import { baseApi } from "./baseApi";

export const reviewService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body: {
        bookingId: string;
        serviceId: string;
        providerId: string;
        rating: number;
        comment: string;
      }) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review", "Service", "Provider"],
    }),

    getServiceReviews: builder.query({
      query: (serviceId: string) => `/reviews/service/${serviceId}`,
      providesTags: ["Review"],
    }),

    getProviderReviews: builder.query({
      query: (providerId: string) => `/reviews/provider/${providerId}`,
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetServiceReviewsQuery,
  useGetProviderReviewsQuery,
} = reviewService;

