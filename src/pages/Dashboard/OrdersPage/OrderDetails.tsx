import SmallLoader from "@/components/common/feedback/SmallLoader";
import { OrderStatusType, PaymentForm } from "@/components/common/Types";
import OrderProductCard from "@/components/Dasboard/OrderProductCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { GetSpesificOrder } from "@/store/Orders/Actions/GetSpesificOrder";
import { UpdateOrder } from "@/store/Orders/Actions/UpdateOrder";
import { reintialOrder } from "@/store/Orders/OrdersSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { order, error, pending } = useAppSelector(
    (state) => state.OrdersSlice
  );
  useEffect(() => {
    if (params.id) {
      dispatch(GetSpesificOrder(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    return () => {
      dispatch(reintialOrder());
    };
  }, [dispatch]);
  const UpdateOrderBtn = (status: OrderStatusType) => {
    const data: PaymentForm = {
      ...order[0],
      status: status,
    };
    if (params.id) {
      dispatch(UpdateOrder({ data, id: params.id }));
    }
  };

  return (
    <>
      {pending == "pending" ? (
        <>
          Loading <SmallLoader />
        </>
      ) : order.length > 0 ? (
        order.map((el, i) => (
          <div className="flex w-full flex-col gap-5" key={i}>
            {/* User Info */}

            <div>
              <div className="small-card-text">
                User Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-person-vcard"
                  viewBox="0 0 16 16">
                  <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                </svg>
              </div>

              <div className="user-info relative bg-yellow-text text-black md:w-96 w-full p-4 rounded-lg flex flex-col gap-4">
                <p>Name: {el.name}</p>
                <p className="font-bold">Email: {el.email}</p>
              </div>
            </div>

            {/* Products Info */}

            <div>
              <div className="small-card-text">
                Products Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-cart4"
                  viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
              </div>

              <div className="p-4 bg-second-black flex flex-col rounded-lg gap-2">
                <p className="text-lg">Order Products : </p>
                <div className="products flex flex-wrap gap-2">
                  {el.products?.map((e, i) => (
                    <OrderProductCard
                      amount={e.amount}
                      card_img={e.card_img}
                      price={e.price}
                      titel={e.title}
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Info */}

            <div>
              <div className="small-card-text">
                Bitcoin Transaction ID
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-credit-card-fill"
                  viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                </svg>
              </div>
              <div className="bg-yellow-text text-lg text-black p-4 rounded-lg flex flex-col gap-4">
                <p className="break-all">ID: {el.paymnetInfo.transactionID}</p>
                <p className="font-bold">Total Amount: {el.total}$</p>
              </div>
            </div>

            {/* Order Status */}

            <div>
              <div className="small-card-text">
                Order Status
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-clipboard2-pulse-fill"
                  viewBox="0 0 16 16">
                  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                  <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z" />
                </svg>
              </div>
              <div className="p-4 rounded-lg bg-second-black flex flex-col gap-2">
                <div className="flex items-center gap-1 ">
                  Current Status:{" "}
                  {el.status == "pending" ? (
                    <p className="text-yellow-text uppercase font-bold">
                      {el.status}
                    </p>
                  ) : el.status == "completed" ? (
                    <p className="text-success-color font-bold uppercase">
                      {el.status}
                    </p>
                  ) : (
                    <p className="text-error uppercase font-bold">
                      {el.status}
                    </p>
                  )}
                </div>
                <p>Change Satus :</p>
                <div className="buttons flex gap-2 flex-wrap ">
                  <Button
                    onClick={() => UpdateOrderBtn("pending")}
                    className="bg-yellow-text text-black hover:bg-second-black border hover:text-yellow-text duration-200 border-yellow-text ">
                    Pending
                  </Button>
                  <Button
                    onClick={() => UpdateOrderBtn("completed")}
                    className="bg-success-color hover:bg-second-black border hover:text-success-color duration-200 border-success-color">
                    Completed
                  </Button>
                  <Button
                    onClick={() => UpdateOrderBtn("rejected")}
                    className="bg-error hover:bg-second-black border hover:text-error duration-200 border-error">
                    Rejected
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        error && <p className="text-error text-lg">{error}</p>
      )}
    </>
  );
}
