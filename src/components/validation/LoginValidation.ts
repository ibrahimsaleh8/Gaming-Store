import { object, string } from "yup";

export const LoginSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
});
