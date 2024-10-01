import { auth } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
type dataArg = {
  email: string;
  password: string;
};
interface SerializedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}
export const registerWithEmail = createAsyncThunk(
  "authSlice/registerWithEmail",
  async ({ email, password }: dataArg, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const serializedUser: SerializedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      return serializedUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
