import { auth } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";

export const LogoutAction = createAsyncThunk(
  "authSlice/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await signOut(auth).then(() => true);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
