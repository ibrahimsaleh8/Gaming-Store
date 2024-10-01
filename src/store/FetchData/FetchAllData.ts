import { ProductType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import HandleError from "@/store/HandleError";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
type ArgProd = {
  data: ProductType;
  id: string;
};
type CatArg = { category: string; title: string };
export const getAllProdSlice = createApi({
  reducerPath: "apiGetAllProds",
  tagTypes: ["product"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductType[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "products"));
          const items: ProductType[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ ...doc.data(), id: doc.id } as ProductType);
          });
          return { data: items };
        } catch (error) {
          return HandleError(error);
        }
      },
      providesTags: ["product"],
    }),
    getAllCategories: builder.query<object[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "categories"));
          const items: object[] = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          return { data: items };
        } catch (error) {
          return HandleError(error);
        }
      },
    }),
    EditProduct: builder.mutation<void, ArgProd>({
      async queryFn({ data, id }) {
        try {
          const dataRef = doc(db, "products", id);
          await updateDoc(dataRef, data);
          return { data: undefined };
        } catch (error) {
          return HandleError(error);
        }
      },
      invalidatesTags: ["product"],
    }),
    getProdWithTitle: builder.query<ProductType[], string>({
      async queryFn(title) {
        try {
          const productsCollectionRef = collection(db, "products");
          const q = query(productsCollectionRef, where("title", "==", title));
          const querySnapshot = await getDocs(q);
          const items: ProductType[] = [];
          if (querySnapshot.empty) {
            throw new Error();
          }
          querySnapshot.docs.map((doc) =>
            items.push({ ...doc.data(), id: doc.id } as ProductType)
          );
          return { data: items };
        } catch (error) {
          return HandleError(error);
        }
      },
      providesTags: ["product"],
    }),
    getProdByCategory: builder.query<ProductType[], CatArg>({
      async queryFn({ category, title }) {
        try {
          const productsCollectionRef = collection(db, "products");
          const q = query(
            productsCollectionRef,
            where("platform", "==", category)
          );
          const querySnapshot = await getDocs(q);
          let items: ProductType[] = [];
          if (querySnapshot.empty) {
            throw new Error();
          }
          querySnapshot.docs.map((doc) =>
            items.push({ ...doc.data(), id: doc.id } as ProductType)
          );
          items = items.filter((el) => el.title !== title);
          return { data: items };
        } catch (error) {
          return HandleError(error);
        }
      },
    }),
    addProduct: builder.mutation<void, ProductType>({
      async queryFn(data) {
        try {
          const coll = collection(db, "products");
          await addDoc(coll, data);
          return { data: undefined };
        } catch (error) {
          return HandleError(error);
        }
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetProdWithTitleQuery,
  useEditProductMutation,
  useGetProdByCategoryQuery,
  useAddProductMutation,
} = getAllProdSlice;
