import { CartProductType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

type argType = {
  uid: string;
  prod: CartProductType;
};

export const AddToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async (data: argType, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "carts", data.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingCart = docSnap.data();
        const products = existingCart.products || [];
        const productIndex = products.findIndex(
          (item: CartProductType) => item.title === data.prod.title
        );

        if (productIndex !== -1) {
          if (products[productIndex].amount >= 10) {
            throw Error("You rached the maximum  amount");
          }
          products[productIndex].amount += 1;
          await updateDoc(docRef, { products });
          return;
        } else {
          products.push(data.prod);
        }
        await updateDoc(docRef, { products });
      } else {
        await setDoc(docRef, { uid: data.uid, products: [data.prod] });
      }
      return { uid: data.uid, product: data.prod };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
