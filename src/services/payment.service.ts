import { baseApi } from "./baseApi";

export const paymentService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookingBill: builder.query({
      query: (bookingId: string) => `/payments/booking/${bookingId}/bill`,
      providesTags: (_res, _err, id) => [{ type: "Booking", id }],
    }),

    addBookingCharges: builder.mutation({
      query: ({
        bookingId,
        ...body
      }: {
        bookingId: string;
        title: string;
        amount: number;
      }) => ({
        url: `/payments/booking/${bookingId}/add-charges`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    submitUpiPayment: builder.mutation({
      query: ({
        bookingId,
        ...body
      }: {
        bookingId: string;
        upiRefNumber: string;
      }) => ({
        url: `/payments/booking/${bookingId}/submit-upi`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    confirmPayment: builder.mutation({
      query: ({
        bookingId,
        ...body
      }: {
        bookingId: string;
        paymentMethod: "CASH" | "DIRECT_UPI";
        amountReceived: number;
        transactionId?: string;
      }) => ({
        url: `/payments/booking/${bookingId}/confirm-payment`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    getInvoice: builder.query({
      query: (bookingId: string) => `/payments/booking/${bookingId}/invoice`,
    }),
  }),
});

export const {
  useGetBookingBillQuery,
  useAddBookingChargesMutation,
  useSubmitUpiPaymentMutation,
  useConfirmPaymentMutation,
  useGetInvoiceQuery,
} = paymentService;

