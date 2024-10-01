import { PaymentForm } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";

export const makeOrder = createAsyncThunk(
  "cartSlice/makeOrder",
  async (data: PaymentForm, { rejectWithValue }) => {
    try {
      const docRef = collection(db, "orders");
      await addDoc(docRef, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
