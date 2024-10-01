import { createSlice } from "@reduxjs/toolkit";
import { isUserLogged } from "./Actions/IsUserLogged";
import { LogoutAction } from "./Actions/LogoutAction";
import { registerWithEmail } from "./Actions/CreatWithEmail";
import { GoogleAuth } from "./Actions/GoogeAuth";
import { LoginAuth } from "./Actions/LoginAuth";
import { roleType } from "@/components/common/Types";

type initialState = {
  isLoggedIn: boolean;
  email: string;
  uid: string;
  role: roleType;
  responseCase: {
    pending: "pending" | "fulfilled" | "rejected" | "idle";
    error: null | string;
  };
};
const initialState: initialState = {
  isLoggedIn: false,
  email: "",
  uid: "",
  role: "user",
  responseCase: {
    error: null,
    pending: "idle",
  },
};
const AuthSlice = createSlice({
  name: "authSlice",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    // Is User Loggedin

    builder.addCase(isUserLogged.fulfilled, (state, action) => {
      if (action.payload.email && action.payload.uid.length > 0) {
        state.isLoggedIn = true;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        if (action.payload.uid == "6izBOGyOxWbYnWY3MZuPxjj2iik1") {
          state.role = "admin";
        } else {
          state.role = "user";
        }
      }
      state.responseCase.pending = "fulfilled";
      state.responseCase.error = null;
    });
    builder.addCase(isUserLogged.pending, (state) => {
      state.responseCase.pending = "pending";
      state.responseCase.error = null;
    });
    builder.addCase(isUserLogged.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.responseCase.error = action.payload;
      }
      state.responseCase.pending = "rejected";
    });

    // Register
    builder.addCase(registerWithEmail.fulfilled, (state, action) => {
      if (action.payload.email) {
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        if (action.payload.uid == "6izBOGyOxWbYnWY3MZuPxjj2iik1") {
          state.role = "admin";
        } else {
          state.role = "user";
        }
      }
      state.isLoggedIn = true;
      state.responseCase.error = null;
      state.responseCase.pending = "fulfilled";
    });
    builder.addCase(registerWithEmail.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.responseCase.error = action.payload;
      }
      state.responseCase.pending = "rejected";
    });
    builder.addCase(registerWithEmail.pending, (state) => {
      state.responseCase.pending = "pending";
      state.responseCase.error = null;
    });

    // Google Auth

    builder.addCase(GoogleAuth.fulfilled, (state, action) => {
      if (action.payload.email) {
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        if (action.payload.uid == "6izBOGyOxWbYnWY3MZuPxjj2iik1") {
          state.role = "admin";
        } else {
          state.role = "user";
        }
      }
      state.isLoggedIn = true;
      state.responseCase.error = null;
    });

    builder.addCase(GoogleAuth.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.responseCase.error = action.payload;
      }
    });

    // logout user

    builder.addCase(LogoutAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = false;
        state.email = "";
        state.uid = "";
      }
    });

    // login user
    builder.addCase(LoginAuth.fulfilled, (state, action) => {
      if (action.payload.email) {
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        if (action.payload.uid == "6izBOGyOxWbYnWY3MZuPxjj2iik1") {
          state.role = "admin";
        } else {
          state.role = "user";
        }
      }
      state.isLoggedIn = true;
      state.responseCase.error = null;
      state.responseCase.pending = "fulfilled";
    });

    builder.addCase(LoginAuth.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.responseCase.error = action.payload;
      }
      state.responseCase.pending = "rejected";
    });
    builder.addCase(LoginAuth.pending, (state) => {
      state.responseCase.pending = "pending";
      state.responseCase.error = null;
    });
  },
});

export default AuthSlice.reducer;
