import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import { LoginSchema } from "@/components/validation/LoginValidation";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { LoginAuth } from "@/store/Auth/Actions/LoginAuth";
type Inputs = {
  email: string;
  password: string;
};

export const useLoginPage = () => {
  // Auth
  const dispatch = useAppDispatch();
  const { responseCase } = useAppSelector((state) => state.AuthSlice);

  // Auth
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });

  const nav = useNavigate();

  const onSubmit = handleSubmit((data: Inputs) => {
    dispatch(LoginAuth(data))
      .unwrap()
      .then(() => {
        ToastSweeat(1000)
          .fire({
            title: "Login successfully",
            icon: "success",
          })
          .then(() => nav("/"));
      })
      .catch((err) => {
        ToastSweeat(3000).fire({
          title: "(" + err.message.split("(")[1],
          icon: "error",
        });
      });
  });

  return {
    onSubmit,
    errors,
    register,
    responseCase,
  };
};
