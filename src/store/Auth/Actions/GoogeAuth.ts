import { auth, provider } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";

interface SerializedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}
type ErrorType = { code: string; message: string };
export const GoogleAuth = createAsyncThunk(
  "authSlice/GoogleAuth",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const serializedUser: SerializedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      return serializedUser;
    } catch (error: unknown | ErrorType) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "message" in error
      ) {
        const typedError = error as ErrorType;
        return rejectWithValue({
          code: typedError.code,
          message: typedError.message,
        });
      }
      return rejectWithValue({
        code: "unknown_error",
        message: "An unknown error occurred during authentication.",
      });
    }
  }
);
