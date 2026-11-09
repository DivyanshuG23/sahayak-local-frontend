import { baseApi } from "./baseApi";

export interface ProviderOfferedService {
  serviceId: any;
  customPrice?: number;
  experienceYears?: number;
  description?: string;
  isActive?: boolean;
}

export interface ProviderAvailabilityData {
  isOnline: boolean;
  workingDays: string[];
  timeSlots: Array<{
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
}

export interface ProviderKycPayload {
  docType: "aadhaar_front" | "aadhaar_back" | "pan" | "certificate" | "other";
  fileUrl: string;
  aadhaarNumber?: string;
  panNumber?: string;
}

export const providerService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProviderProfile: builder.query({
      query: () => "/providers/profile",
      providesTags: ["Provider"],
    }),

    updateMyProviderProfile: builder.mutation({
      query: (body: {
        businessName?: string;
        ownerName?: string;
        category?: string;
        city?: string;
        address?: string;
        experienceYears?: number;
        bio?: string;
      }) => ({
        url: "/providers/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Provider", "User"],
    }),

    getMyOfferedServices: builder.query({
      query: () => "/providers/my-services",
      providesTags: ["Provider"],
    }),

    addMyOfferedService: builder.mutation({
      query: (body: {
        serviceId: string;
        customPrice?: number;
        experienceYears?: number;
        description?: string;
      }) => ({
        url: "/providers/my-services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Provider"],
    }),

    removeMyOfferedService: builder.mutation({
      query: (serviceId: string) => ({
        url: `/providers/my-services/${serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Provider"],
    }),

    getAvailability: builder.query<any, void>({
      query: () => "/providers/availability",
      providesTags: ["Provider"],
    }),

    updateAvailability: builder.mutation({
      query: (body: Partial<ProviderAvailabilityData>) => ({
        url: "/providers/availability",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Provider"],
    }),

    uploadKycDocument: builder.mutation({
      query: (body: ProviderKycPayload) => ({
        url: "/providers/kyc/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Provider"],
    }),
  }),
});

export const {
  useGetMyProviderProfileQuery,
  useUpdateMyProviderProfileMutation,
  useGetMyOfferedServicesQuery,
  useAddMyOfferedServiceMutation,
  useRemoveMyOfferedServiceMutation,
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useUploadKycDocumentMutation,
} = providerService;

