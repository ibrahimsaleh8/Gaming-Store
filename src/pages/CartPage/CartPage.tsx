import CardCart from "@/components/CartComponents/CardCart";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import { CartProductType } from "@/components/common/Types";
import { UpdateCartProducts } from "@/store/Cart/Actions/UpdateCartProducts";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateCartPrice } from "@/store/Cart/CartSlice";
import { useCheckValidDiscountCodeMutation } from "@/store/Discount/DiscountCodesApi";

export default function CartPage() {
  const { cartData, resFeedBack } = useAppSelector((state) => state.cartSlice);
  const { uid } = useAppSelector((state) => state.AuthSlice);
  const [discountCode, setDiscountCode] = useState("");

  // Discount code
  const [isValideCode, { isLoading, data, isSuccess }] =
    useCheckValidDiscountCodeMutation();
  const [codePercent, setCodePercent] = useState(0);

  const dispatch = useAppDispatch();

  const HandleIncreaseAmount = (newElement: CartProductType, type: string) => {
    const index = cartData.findIndex((el) => el.title === newElement.title);

    if (index !== -1) {
      let updatedCartData;

      // Handle delete case
      if (type === "delete") {
        updatedCartData = [
          ...cartData.slice(0, index),
          ...cartData.slice(index + 1),
        ]; // Remove the product by slicing out the product at the found index
      }
      // Handle increase
      else if (type === "increase") {
        if (cartData[index].amount < 10) {
          const updatedProductData = {
            ...cartData[index],
            amount: cartData[index].amount + 1,
          };
          updatedCartData = [
            ...cartData.slice(0, index),
            updatedProductData,
            ...cartData.slice(index + 1),
          ];
        } else {
          ToastSweeat(2000).fire({
            title: "Max Amount is 10",
            icon: "error",
          });
          return;
        }
      }
      // Handle decrease
      else {
        if (cartData[index].amount > 1) {
          const updatedProductData = {
            ...cartData[index],
            amount: cartData[index].amount - 1,
          };
          updatedCartData = [
            ...cartData.slice(0, index),
            updatedProductData,
            ...cartData.slice(index + 1),
          ];
        } else {
          return;
        }
      }

      // Dispatch the updated cart to Firestore
      dispatch(UpdateCartProducts({ prod: updatedCartData, uid }));
    }
  };

  const HandleValidCode = () => {
    if (discountCode.trim().length > 0) {
      isValideCode(discountCode).then((e) => {
        if (e.data?.code) {
          setCodePercent(e.data?.percent);
        }
      });
    }
  };

  let sum = 0;
  if (cartData.length > 0) {
    cartData.map((e) => {
      sum += Number(e.amount) * Number(e.price);
    });
  }

  const total = (sum - (sum * codePercent) / 100).toFixed(2);
  return (
    <div className="min-h-[60vh]">
      {cartData.length > 0 ? (
        <>
          {/* Show Cart Info */}
          <div className="flex flex-col gap-3 py-3">
            {cartData.length > 0 &&
              cartData.map((e, i) => (
                <CardCart
                  data={e}
                  key={i}
                  handleAmountFunctuions={HandleIncreaseAmount}
                  loading={resFeedBack.pending}
                />
              ))}
          </div>

          {/* Discount section */}

          <hr className="my-3 " />
          <div className=" flex items-start justify-between flex-col md:flex-row gap-2">
            <div className="flex flex-col items-start justify-start w-fit">
              <label
                htmlFor="discount-inpt"
                className="flex items-center gap-1 my-1">
                Do You have Discount code ?
                {isSuccess && data.isValide && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-success-color">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
                {isSuccess && !data.isValide && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-error">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m14.5 9.5-5 5" />
                    <path d="m9.5 9.5 5 5" />
                  </svg>
                )}
                {!isSuccess && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-color">
                    <path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    <path d="M9 9h.01" />
                    <path d="m15 9-6 6" />
                    <path d="M15 15h.01" />
                  </svg>
                )}
              </label>
              <div className="flex items-center gap-1">
                <Input
                  onChange={(e) => setDiscountCode(e.target.value)}
                  id="discount-inpt"
                  type="text"
                  className="text-black"
                  placeholder="Discount Code"
                  disabled={isSuccess && data.isValide}
                />
                <Button
                  onClick={HandleValidCode}
                  className="bg-blue-color hover:bg-second-black"
                  disabled={isSuccess && data.isValide}
                  type="button">
                  {isLoading ? "Checking..." : "Check"}
                </Button>
              </div>

              {isSuccess && !data.isValide && (
                <p className="text-error font-bold mt-1 flex items-center gap-1">
                  Code is Wrong
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-x">
                    <circle cx={12} cy={12} r={10} />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </p>
              )}
            </div>
            <div className="flex justify-end flex-col items-start my-2 flex-wrap md:w-[30rem] w-full  ml-auto ">
              <p className="text-2xl font-bold tracking-widest relative">
                <span className="text-yellow-text">CART</span> TOTALS
                <span className="w-28 h-[1px] bg-low-white absolute right-[-125px] top-1/2 -translate-y-1/2"></span>
              </p>
              <p className="py-2 w-full ">Subtotal: {sum.toFixed(2)}$</p>
              <p className="py-2 border-t w-full border-second-low-white">
                Discount:{" "}
                {codePercent > 0 ? (
                  <span className="text-success-color">{codePercent}%</span>
                ) : (
                  <>{codePercent}%</>
                )}
              </p>
              <p className="font-bold py-2 border-t w-full border-second-low-white">
                Total: {total}$
              </p>
              <Link
                to={"/cart/payment"}
                onClick={() => dispatch(updateCartPrice(total))}
                className="bg-yellow-text text-black font-bold hover:bg-black hover:text-white border border-yellow-text hover:border-white duration-300 px-4 py-2 rounded">
                Go to check out
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl md:text-3xl text-yellow-text font-bold text-center mt-4">
            Cart is Empty
          </h1>
        </>
      )}
    </div>
  );
}
