import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth/AuthSlice";
import { getAllProdSlice } from "./FetchData/FetchAllData";
import cartSlice from "./Cart/CartSlice";
import OrdersSlice from "./Orders/OrdersSlice";
import { DisocuntApi } from "./Discount/DiscountCodesApi";
import WishListSlice from "./WishList/WishListSlice";
export const mainStore = configureStore({
  reducer: {
    AuthSlice,
    cartSlice,
    OrdersSlice,
    WishListSlice,
    [getAllProdSlice.reducerPath]: getAllProdSlice.reducer,
    [DisocuntApi.reducerPath]: DisocuntApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(getAllProdSlice.middleware)
      .concat(DisocuntApi.middleware),
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
