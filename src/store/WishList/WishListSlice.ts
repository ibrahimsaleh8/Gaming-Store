import { wishlistProductType } from "@/components/common/Types";
import { createSlice } from "@reduxjs/toolkit";
import { getWishListAction } from "./Actions/GetWishListAction";
import { updateWishList } from "./Actions/UpdateWishListAction";
type wishListSliceType = {
  wisListProduct: wishlistProductType[];
  wishListId: string;
};
const initialState: wishListSliceType = {
  wisListProduct: [],
  wishListId: "",
};
const wishlistSlice = createSlice({
  name: "wishlistSlice",
  reducers: {
    reintialWishList: (state) => {
      state.wisListProduct = [];
      state.wishListId = "";
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getWishListAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.wisListProduct = action.payload[0].products;
        state.wishListId = action.payload[0].id;
      }
    });
    builder.addCase(updateWishList.fulfilled, (state, action) => {
      state.wisListProduct = action.payload.products;
      state.wishListId = action.payload.id;
    });
  },
});

export default wishlistSlice.reducer;
export const { reintialWishList } = wishlistSlice.actions;
