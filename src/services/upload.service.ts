import { baseApi } from "./baseApi";
import { ApiResponse, User } from "@/types/api.types";
import { updateUser } from "@/store/slices/authSlice";

export interface UploadAvatarResult {
  avatar: string;
  user?: User;
}

export interface UploadSingleResult {
  url: string;
  publicId?: string;
  format?: string;
  bytes?: number;
  type?: string;
}

export const uploadService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<ApiResponse<UploadAvatarResult>, FormData>({
      query: (formData: FormData) => ({
        url: "/upload/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data?.data?.user;
          const avatarUrl = data?.data?.avatar;
          if (user) {
            dispatch(updateUser(user));
          } else if (avatarUrl) {
            dispatch(updateUser({ avatar: avatarUrl }));
          }
        } catch {
          // Handled in component
        }
      },
    }),

    uploadSingle: builder.mutation<ApiResponse<UploadSingleResult>, FormData>({
      query: (formData: FormData) => ({
        url: "/upload/single",
        method: "POST",
        body: formData,
      }),
    }),

    uploadImage: builder.mutation<ApiResponse<UploadSingleResult>, FormData>({
      query: (formData: FormData) => ({
        url: "/upload/image",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadAvatarMutation,
  useUploadSingleMutation,
  useUploadImageMutation,
} = uploadService;
