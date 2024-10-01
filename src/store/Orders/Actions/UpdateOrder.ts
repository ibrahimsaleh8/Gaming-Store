import { PaymentForm } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
type ArgType = {
  data: PaymentForm;
  id: string;
};
export const UpdateOrder = createAsyncThunk(
  "OrdersSlice/updateOrder",
  async ({ data, id }: ArgType, { rejectWithValue }) => {
    try {
      const dataRef = doc(db, "orders", id);
      await updateDoc(dataRef, data);
      const resp: PaymentForm[] = [data];
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
