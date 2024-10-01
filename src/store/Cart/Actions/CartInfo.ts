import { CartProductType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

export const getCartInfo = createAsyncThunk(
  "cartSlice/getCartIngfo",
  async (uid: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "carts", uid);
      let items: CartProductType[] = [];
      const data = await getDoc(docRef);
      if (data.data()) {
        items = data.data()?.products;
      }
      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
