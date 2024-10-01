import { WishListType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getWishListAction = createAsyncThunk(
  "wishlistSlice/getWishListAction",
  async (uid: string, { rejectWithValue }) => {
    try {
      const ref = collection(db, "wishlist");
      const q = query(ref, where("uid", "==", uid));
      const items: WishListType[] = [];
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return [{ id: "", products: [], uid }];
      }
      querySnapshot.docs.map((doc) =>
        items.push({ ...doc.data(), id: doc.id } as WishListType)
      );

      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
