import { PaymentForm } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

export const GetUserOrders = createAsyncThunk(
  "OrdersSlice/getUserOrders",
  async (uid: string, { rejectWithValue }) => {
    try {
      const coll = collection(db, "orders");
      const q = query(coll, where("uid", "==", uid));
      const data = await getDocs(q);
      const result: PaymentForm[] = [];
      data.docs.map((el) => {
        result.push({ ...el.data() } as PaymentForm);
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
