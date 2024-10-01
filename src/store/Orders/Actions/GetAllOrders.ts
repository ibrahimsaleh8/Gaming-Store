import { PaymentForm } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export const GetAllOrders = createAsyncThunk(
  "OrdersSlice/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const coll = collection(db, "orders");
      const data = await getDocs(coll);
      const response: PaymentForm[] = [];
      data.docs.map((el) =>
        response.push({ ...el.data(), anotherID: el.id } as PaymentForm)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
