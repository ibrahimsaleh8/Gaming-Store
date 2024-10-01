import SmallLoader from "@/components/common/feedback/SmallLoader";
import UserOrderCard from "@/components/Dasboard/UserOrderCard";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { GetUserOrders } from "@/store/Orders/Actions/GetUserOrders";
import { useEffect } from "react";

const UserOrders = () => {
  const { uid } = useAppSelector((state) => state.AuthSlice);
  const { userOrder, pending, error } = useAppSelector(
    (state) => state.OrdersSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid) {
      dispatch(GetUserOrders(uid));
    }
  }, [dispatch, uid]);

  return (
    <div>
      {pending === "pending" && (
        <div className="flex items-center">
          Loading <SmallLoader />
        </div>
      )}

      {pending === "fulfilled" && userOrder.length > 0 && (
        <div className="flex flex-col gap-3">
          {userOrder.map((el, i) => (
            <UserOrderCard
              email={el.email}
              name={el.name}
              total={el.total}
              key={i}
              products={el.products}
              status={el.status}
            />
          ))}
        </div>
      )}

      {pending === "fulfilled" && userOrder.length === 0 && (
        <p className="text-xl flex items-center justify-center">
          No Orders yet
        </p>
      )}

      {pending === "rejected" && error && (
        <p className="text-lg text-error">{error}</p>
      )}
    </div>
  );
};

export default UserOrders;
