import { object, string } from "yup";

export const PaymentSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  name: string()
    .min(2, "Name must be more than 2 characters")
    .required("Name is required"),
  paymnetInfo: object({
    transactionID: string()
      .min(50, "please check transaction id ")
      .required("Name is required"),
  }),
});
