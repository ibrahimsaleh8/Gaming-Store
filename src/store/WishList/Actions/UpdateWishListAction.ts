import { WishListType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const updateWishList = createAsyncThunk(
  "wishlistSlice/updateWishListAction",
  async (data: WishListType, { rejectWithValue }) => {
    try {
      if (data.id.length == 0) {
        const addNewWishList = await addDoc(collection(db, "wishlist"), {
          uid: data.uid,
          products: [],
        });
        return {
          id: addNewWishList.id,
          uid: data.uid,
          products: data.products,
        };
      }
      const ref = doc(db, "wishlist", data.id);

      await setDoc(ref, data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
