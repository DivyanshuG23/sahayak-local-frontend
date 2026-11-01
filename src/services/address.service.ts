import { baseApi } from "./baseApi";

export const addressService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => "/addresses",
      providesTags: ["Address"],
    }),

    createAddress: builder.mutation({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

    updateAddress: builder.mutation({
      query: ({ id, ...body }: { id: string; [key: string]: any }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

    deleteAddress: builder.mutation({
      query: (id: string) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),

    setDefaultAddress: builder.mutation({
      query: (id: string) => ({
        url: `/addresses/${id}/set-default`,
        method: "PATCH",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressService;

