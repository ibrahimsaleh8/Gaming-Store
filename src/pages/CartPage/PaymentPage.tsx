import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { yupResolver } from "@hookform/resolvers/yup";
import { PaymentSchema } from "@/components/validation/PaymentValidation";
import { PaymentForm } from "@/components/common/Types";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { useNavigate } from "react-router-dom";
import { makeOrder } from "@/store/Cart/Actions/MakeOrderAction";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import { UpdateCartProducts } from "@/store/Cart/Actions/UpdateCartProducts";

export default function PaymentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentForm>({
    mode: "onChange",
    resolver: yupResolver(PaymentSchema),
  });
  const { cartPrice, resFeedBack, cartData } = useAppSelector(
    (state) => state.cartSlice
  );
  const { uid } = useAppSelector((state) => state.AuthSlice);
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((value) => {
    let data = value;
    data = {
      ...data,
      products: cartData,
      uid,
      status: "pending",
      total: cartPrice,
    };
    dispatch(makeOrder(data))
      .unwrap()
      .then(() => {
        dispatch(UpdateCartProducts({ prod: [], uid }));
        ToastSweeat(3000)
          .fire({
            icon: "success",
            title:
              "Your info submited success and admin will check it and send the product to your email",
          })
          .then(() => nav("/"));
      })
      .catch((err) =>
        ToastSweeat(3000).fire({
          title: err,
          icon: "error",
        })
      );
  });
  const nav = useNavigate();
  useEffect(() => {
    if (cartPrice == 0) {
      nav("/cart");
    }
  }, [cartPrice, nav]);
  const HandleAddressCopy = () => {
    navigator.clipboard.writeText("12wseBwwgYzjd3rGVCsazwm2PwaeJ3WMb4");
    ToastSweeat(1000).fire({
      title: "Address Copied",
      icon: "success",
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="flex  flex-col p-2 gap-4 justify-center items-center ">
          <div className="userInfo lg:w-1/3  w-full  flex flex-col gap-2">
            <p className="text-xl font-bold tracking-widest mt-2">Your info</p>
            <div>
              <label htmlFor="name">Name</label>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            {errors.name && (
              <p className="text-error my-1">{errors.name.message}</p>
            )}
            <div>
              <label htmlFor="mail">Email</label>
              <Input
                {...register("email")}
                id="mail"
                type="email"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-error my-1">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col lg:w-1/3  w-full">
            <p className="text-xl font-bold tracking-widest my-2">
              Payment info
            </p>
            <div className="choose-payment-method ">
              <div className="flex items-center gap-2 bg-yellow-text py-2 px-4 rounded-lg text-black">
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    className="bi bi-currency-bitcoin"
                    viewBox="0 0 16 16">
                    <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927z" />
                  </svg>
                  Bitcoin
                </p>
              </div>
            </div>
            <div className="card-info flex flex-col gap-2 mt-2">
              <div>
                <label htmlFor="address">
                  Send to this address {cartPrice}$
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    defaultValue={"12wseBwwgYzjd3rGVCsazwm2PwaeJ3WMb4"}
                    disabled
                    id="address"
                    type="text"
                  />
                  <div onClick={HandleAddressCopy} className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-copy"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </div>
                </div>

                <label htmlFor="tra-id">Transaction id</label>
                <Input
                  {...register("paymnetInfo.transactionID")}
                  id="tra-id"
                  type="text"
                  placeholder="f4655b660ea830ec3f2a510b0786a86f0125068fb6602e7d27a8c1ade4a3097d"
                />
              </div>
              {errors.paymnetInfo && (
                <p className="text-error my-1">
                  {errors.paymnetInfo?.transactionID?.message}
                </p>
              )}
            </div>
            <p className="font-bold my-2">You will pay {cartPrice}$</p>
            <Button className="success-btn mt-auto w-fit px-6">
              {resFeedBack.pending == "pending" ? "Loading..." : "Pay"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
