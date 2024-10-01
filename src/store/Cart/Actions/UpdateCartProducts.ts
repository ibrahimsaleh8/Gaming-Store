import { CartProductType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
type argType = {
  uid: string;
  prod: CartProductType[];
};
export const UpdateCartProducts = createAsyncThunk(
  "cartSlice/UpdateCartProducts",
  async (data: argType, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "carts", data.uid);
      await updateDoc(docRef, { products: data.prod });
      return data.prod;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
