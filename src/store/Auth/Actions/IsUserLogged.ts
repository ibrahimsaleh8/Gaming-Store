import { auth } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";

type resType = {
  email: string | null;
  uid: string;
};

export const isUserLogged = createAsyncThunk(
  "authSlice/isLogged",
  async (_, { rejectWithValue }) => {
    try {
      const res: resType = { email: "", uid: "" };
      return new Promise<resType>((resolve, reject) => {
        onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              resolve({
                email: user.email,
                uid: user.uid,
              });
            } else {
              resolve(res);
            }
          },
          (error) => {
            reject(rejectWithValue(error));
          }
        );
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
