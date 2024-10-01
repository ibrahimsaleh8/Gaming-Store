import React from "react";
import { CartProductType, OrderStatusType } from "../common/Types";
import ProductOrderCard from "./ProductOrderCard";
type PropsType = {
  name: string;
  email: string;
  total: number | undefined;
  products?: CartProductType[];
  status?: OrderStatusType;
};
const UserOrderCard = ({ email, name, total, products, status }: PropsType) => {
  return (
    <div className="user-order-card">
      <div className=" bg-white text-black w-8 h-8 flex items-center justify-center rounded-md ">
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
          className="lucide lucide-package">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      </div>
      <div className="text flex flex-col gap-2 mt-3 ">
        <div className="flex items-start gap-4  flex-col md:flex-row ">
          <p className="text-user-order-info">Name : {name}</p>
          <p className="text-user-order-info">Email : {email}</p>
        </div>
        <div className="flex items-start gap-4  flex-col md:flex-row ">
          <p className="text-user-order-info">Total : {total}$</p>

          {status == "completed" ? (
            <p className="text-user-order-info">
              Status : <span className="text-success-color">{status}</span>
            </p>
          ) : status == "pending" ? (
            <p className="text-user-order-info">
              Status : <span className="text-yellow-text">{status}</span>
            </p>
          ) : (
            <p className="text-user-order-info">
              Status : <span className="text-error  ">{status}</span>
            </p>
          )}
        </div>
      </div>
      {/* Products */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {products?.map((el, i) => (
          <ProductOrderCard
            key={i}
            amount={el.amount}
            card_img={el.card_img}
            platform={el.platform}
            price={el.price}
            title={el.title}
          />
        ))}
      </div>
    </div>
  );
};
export default React.memo(UserOrderCard);
