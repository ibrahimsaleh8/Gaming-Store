import { PaymentForm } from "@/components/common/Types";
import { createSlice } from "@reduxjs/toolkit";
import { GetAllOrders } from "./Actions/GetAllOrders";
import { GetSpesificOrder } from "./Actions/GetSpesificOrder";
import { UpdateOrder } from "./Actions/UpdateOrder";
import { GetUserOrders } from "./Actions/GetUserOrders";

type initialState = {
  pending: "pending" | "fulfilled" | "rejected" | "idle";
  error: null | string;
  data: PaymentForm[];
  order: PaymentForm[];
  userOrder: PaymentForm[];
};
const initialState: initialState = {
  error: null,
  pending: "idle",
  data: [],
  order: [],
  userOrder: [],
};
const OrdersSlice = createSlice({
  name: "OrdersSlice",
  reducers: {
    reintialOrder: (state) => {
      state.order = [];
    },
  },
  initialState,
  extraReducers: (builder) => {
    //Get All Orders

    builder.addCase(GetAllOrders.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
      state.error = null;
      state.pending = "fulfilled";
    });
    builder.addCase(GetAllOrders.pending, (state) => {
      state.pending = "pending";
      state.error = null;
    });
    builder.addCase(GetAllOrders.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.error = action.payload;
      }
      state.pending = "rejected";
    });

    //Get Spesific Order

    builder.addCase(GetSpesificOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.order = action.payload;
      }
      state.error = null;
      state.pending = "fulfilled";
    });
    builder.addCase(GetSpesificOrder.pending, (state) => {
      state.pending = "pending";
      state.error = null;
    });
    builder.addCase(GetSpesificOrder.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.error = action.payload;
      }
      state.pending = "rejected";
    });

    // Update Order
    builder.addCase(UpdateOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.order = action.payload;
      }
      state.error = null;
      state.pending = "fulfilled";
    });
    builder.addCase(UpdateOrder.pending, (state) => {
      state.pending = "pending";
      state.error = null;
    });
    builder.addCase(UpdateOrder.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.error = action.payload;
      }
      state.pending = "rejected";
    });

    // Get User Orders
    builder.addCase(GetUserOrders.fulfilled, (state, action) => {
      if (action.payload) {
        state.userOrder = action.payload;
      }
      state.error = null;
      state.pending = "fulfilled";
    });
    builder.addCase(GetUserOrders.pending, (state) => {
      state.pending = "pending";
      state.error = null;
    });
    builder.addCase(GetUserOrders.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.error = action.payload;
      }
      state.pending = "rejected";
    });
  },
});

export default OrdersSlice.reducer;
export const { reintialOrder } = OrdersSlice.actions;
