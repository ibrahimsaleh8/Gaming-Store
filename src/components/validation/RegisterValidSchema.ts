import { object, ref, string } from "yup";

export const RegisterSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  rePassword: string()
    .oneOf([ref("password")], "Passwords doesn't match")
    .required("Please confirm your password"),
});
