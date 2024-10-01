import { Button } from "@/components/ui/button";
import { LogoutAction } from "@/store/Auth/Actions/LogoutAction";
import { reIntialiCaartSlice } from "@/store/Cart/CartSlice";
import { useAppDispatch } from "@/store/MainHooks";
import { reintialWishList } from "@/store/WishList/WishListSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const HandleLogout = () => {
    dispatch(LogoutAction())
      .unwrap()
      .then(() => {
        dispatch(reIntialiCaartSlice());
        dispatch(reintialWishList());
      });
  };
  return (
    <Button
      className="bg-error shadow-btn w-full hover:bg-white border-2 border-error hover:text-error duration-200"
      onClick={HandleLogout}>
      Logout
    </Button>
  );
}
