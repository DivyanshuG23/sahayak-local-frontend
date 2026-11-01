import { baseApi } from "./baseApi";

export const serviceCatalogService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params?: {
        category?: string;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
        sort?: string;
        page?: number;
        limit?: number;
      }) => ({
        url: "/services",
        params,
      }),
      providesTags: ["Service"],
    }),

    getServiceById: builder.query({
      query: (id: string) => `/services/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Service", id }],
    }),

    getProviders: builder.query({
      query: (params?: Record<string, any>) => ({
        url: "/providers",
        params,
      }),
      providesTags: ["Provider"],
    }),

    getProviderById: builder.query({
      query: (id: string) => `/providers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Provider", id }],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetProvidersQuery,
  useGetProviderByIdQuery,
} = serviceCatalogService;

