import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/components/validation/RegisterValidSchema";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { registerWithEmail } from "@/store/Auth/Actions/CreatWithEmail";
type Inputs = {
  email: string;
  password: string;
  rePassword: string;
};
export const useRegisterPage = () => {
  // Auth
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector((state) => state.AuthSlice.responseCase);

  // Auth

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });
  const nav = useNavigate();

  const onSubmit = handleSubmit((data: Inputs) => {
    const registerData = {
      email: data.email,
      password: data.password,
    };
    dispatch(registerWithEmail(registerData))
      .unwrap()
      .then(() => {
        ToastSweeat(2000)
          .fire({
            title: "Register successfully",
            icon: "success",
          })
          .then(() => {
            nav("/");
          });
      })
      .catch((err) => {
        ToastSweeat(3000).fire({
          title: "(" + err.message.split("(")[1],
          icon: "error",
        });
      });
  });

  const [showPass, setShowPass] = useState(false);
  const HandleShowPass = () => {
    setShowPass((pre) => !pre);
  };
  return {
    register,
    errors,
    onSubmit,
    showPass,
    HandleShowPass,
    pending,
  };
};
