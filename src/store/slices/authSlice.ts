import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { uid: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ uid: string; email: string }>) {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    // Acciones para registro:
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ uid: string; email: string }>
    ) {
      state.user = action.payload;
      state.loading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Acciones para resetPassword (si deseas trackear su estado)
    resetPasswordStart(state) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   registerStart,
//   registerSuccess,
//   registerFailure,
//   resetPasswordStart,
//   resetPasswordSuccess,
//   resetPasswordFailure,
// } = authSlice.actions;

export default authSlice.reducer;
