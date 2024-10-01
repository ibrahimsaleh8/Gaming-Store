import { PaymentForm } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

export const GetSpesificOrder = createAsyncThunk(
  "OrdersSlice/getSpesificOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const coll = doc(db, "orders", id);
      const data = await getDoc(coll);
      return [data.data()] as PaymentForm[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
