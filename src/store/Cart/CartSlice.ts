import { createSlice } from "@reduxjs/toolkit";
import { getCartInfo } from "./Actions/CartInfo";
import { CartProductType } from "@/components/common/Types";
import { AddToCart } from "./Actions/AddToCart";
import { UpdateCartProducts } from "./Actions/UpdateCartProducts";
import { makeOrder } from "./Actions/MakeOrderAction";
type initialStateType = {
  cartLength: number;
  cartData: CartProductType[];
  resFeedBack: {
    pending: "pending" | "fulfilled" | "rejected" | "idle";
    error: null | string;
  };
  cartPrice: number;
};
const initialState: initialStateType = {
  cartLength: 0,
  cartData: [],
  resFeedBack: {
    pending: "idle",
    error: null,
  },
  cartPrice: 0,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    updateData: (state, action) => {
      const index = state.cartData.findIndex(
        (el) => el.title == action.payload
      );
      if (index !== -1) {
        state.cartData[index] = {
          ...state.cartData[index],
          amount: state.cartData[index].amount + 1,
        };
      }
    },
    reIntialiCaartSlice: (state) => {
      state.cartData = [];
      state.cartLength = 0;
    },
    updateCartPrice: (state, action) => {
      state.cartPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Info
    builder.addCase(getCartInfo.fulfilled, (state, action) => {
      if (action.payload) {
        state.cartData = action.payload;
        state.cartLength = action.payload.length;
      }
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "fulfilled";
    });
    builder.addCase(getCartInfo.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.resFeedBack.error = action.payload;
      }
      state.resFeedBack.pending = "rejected";
    });
    builder.addCase(getCartInfo.pending, (state) => {
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "pending";
    });

    // Add to Cart
    builder.addCase(AddToCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.cartData.push(action.payload.product);
        state.cartLength++;
      }
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "fulfilled";
    });
    builder.addCase(AddToCart.pending, (state) => {
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "pending";
    });
    builder.addCase(AddToCart.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.resFeedBack.error = action.payload;
      }
      state.resFeedBack.pending = "rejected";
    });

    //Update Cart Info

    builder.addCase(UpdateCartProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.cartData = action.payload;
        state.cartLength = action.payload.length;
      }
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "fulfilled";
    });
    builder.addCase(UpdateCartProducts.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.resFeedBack.error = action.payload;
      }
      state.resFeedBack.pending = "rejected";
    });
    builder.addCase(UpdateCartProducts.pending, (state) => {
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "pending";
    });

    // Make Order
    builder.addCase(makeOrder.fulfilled, (state) => {
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "fulfilled";
    });
    builder.addCase(makeOrder.rejected, (state, action) => {
      if (typeof action.payload == "string") {
        state.resFeedBack.error = action.payload;
      }
      state.resFeedBack.pending = "rejected";
    });
    builder.addCase(makeOrder.pending, (state) => {
      state.resFeedBack.error = null;
      state.resFeedBack.pending = "pending";
    });
  },
});
export default cartSlice.reducer;
export const { updateData, reIntialiCaartSlice, updateCartPrice } =
  cartSlice.actions;
