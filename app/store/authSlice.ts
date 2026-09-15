import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/auth";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // Login user
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    // Restore authentication data
    restoreAuth: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      return action.payload;
    },

    // Update student profile
    updateProfile: (
      state,
      action: PayloadAction<
        Pick<User, "name" | "className" | "section">
      >
    ) => {
      if (!state.user) {
        return;
      }

      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    // Logout user
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  login,
  restoreAuth,
  updateProfile,
  logout,
} = authSlice.actions;

export default authSlice.reducer;