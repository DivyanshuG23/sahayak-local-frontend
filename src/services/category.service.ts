import { baseApi } from "./baseApi";

export const categoryService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params?: { search?: string; status?: string }) => ({
        url: "/categories",
        params,
      }),
      providesTags: ["Category"],
    }),

    getCategoryById: builder.query({
      query: (id: string) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } =
  categoryService;

