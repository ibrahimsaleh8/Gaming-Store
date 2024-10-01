import { DiscounatCodesType } from "@/components/common/Types";
import { db } from "@/Firebase/firebase";
import HandleError from "@/store/HandleError";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
type ValideCode = {
  code: string;
  percent: number;
  id?: string;
  isValide: boolean;
};
export const DisocuntApi = createApi({
  reducerPath: "DiscountCodeApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["codes"],
  endpoints: (builder) => ({
    getDiscountCodes: builder.query<DiscounatCodesType[], void>({
      async queryFn() {
        try {
          const coll = collection(db, "discounts");
          const data = await getDocs(coll);
          const codes: DiscounatCodesType[] = [];
          data.docs.map((el) => {
            codes.push({ ...el.data(), id: el.id } as DiscounatCodesType);
          });
          return { data: codes };
        } catch (error) {
          return HandleError(error);
        }
      },
      providesTags: ["codes"],
    }),
    AddDiscountCode: builder.mutation<void, DiscounatCodesType>({
      async queryFn(data: DiscounatCodesType) {
        try {
          const coll = collection(db, "discounts");
          await addDoc(coll, data);
          return { data: undefined };
        } catch (error) {
          return HandleError(error);
        }
      },
      invalidatesTags: ["codes"],
    }),
    deletDsicountCode: builder.mutation<void, string>({
      async queryFn(id: string) {
        try {
          const ref = doc(db, "discounts", id);
          await deleteDoc(ref);
          return { data: undefined };
        } catch (error) {
          return HandleError(error);
        }
      },
      invalidatesTags: ["codes"],
    }),
    checkValidDiscountCode: builder.mutation<ValideCode, string>({
      async queryFn(code: string) {
        try {
          const productsCollectionRef = collection(db, "discounts");
          const q = query(productsCollectionRef, where("code", "==", code));
          const data = await getDocs(q);
          if (data.empty) {
            return { data: { code, isValide: false, percent: 0 } };
          }
          const result: DiscounatCodesType[] = [];
          data.docs.map((el) => {
            result.push({ ...el.data() } as DiscounatCodesType);
          });
          const res: ValideCode = { ...result[0], isValide: true };
          return { data: res };
        } catch (error) {
          return HandleError(error);
        }
      },
    }),
  }),
});

export const {
  useGetDiscountCodesQuery,
  useAddDiscountCodeMutation,
  useDeletDsicountCodeMutation,
  useCheckValidDiscountCodeMutation,
} = DisocuntApi;
