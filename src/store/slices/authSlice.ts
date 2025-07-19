import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  $id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  data: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.data = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
