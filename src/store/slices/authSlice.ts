import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, ProviderProfile } from "@/types/api.types";

export interface AuthState {
  user: User | null;
  providerProfile: ProviderProfile | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  providerProfile: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user?: User;
        providerProfile?: ProviderProfile | null;
        token: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, providerProfile, token, refreshToken } = action.payload;

      if (user) state.user = user;
      if (providerProfile !== undefined) state.providerProfile = providerProfile;
      state.token = token;
      if (refreshToken) state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;

      // Sync with localStorage safely
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("accessToken", token);
          if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
          if (user) localStorage.setItem("user", JSON.stringify(user));
          if (providerProfile) {
            localStorage.setItem(
              "providerProfile",
              JSON.stringify(providerProfile)
            );
          }
        } catch {
          // Ignore storage quota or security errors
        }
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("user", JSON.stringify(state.user));
          } catch {
            // Ignore storage errors
          }
        }
      }
    },

    updateProviderProfile: (
      state,
      action: PayloadAction<Partial<ProviderProfile>>
    ) => {
      if (state.providerProfile) {
        state.providerProfile = { ...state.providerProfile, ...action.payload };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "providerProfile",
              JSON.stringify(state.providerProfile)
            );
          } catch {
            // Ignore storage errors
          }
        }
      }
    },

    logout: (state) => {
      state.user = null;
      state.providerProfile = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;

      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          localStorage.removeItem("providerProfile");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
        } catch {
          // Ignore storage errors
        }
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
          const storedUser = localStorage.getItem("user");
          const storedProfile = localStorage.getItem("providerProfile");

          if (token && storedUser) {
            state.token = token;
            state.refreshToken = refreshToken;
            state.user = JSON.parse(storedUser);
            if (storedProfile) {
              state.providerProfile = JSON.parse(storedProfile);
            }
            state.isAuthenticated = true;
          }
        } catch {
          // Fallback to logged out if JSON parse fails
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      }
      state.isInitialized = true;
    },
  },
});

export const {
  setCredentials,
  updateUser,
  updateProviderProfile,
  logout,
  setLoading,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
