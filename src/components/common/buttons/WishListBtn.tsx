import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { platformType, WishListType } from "../Types";
import { updateWishList } from "@/store/WishList/Actions/UpdateWishListAction";
import { ToastSweeat } from "../feedback/Toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
type WishListArg = {
  card_img: string;
  platform: platformType;
  price: number;
  title: string;
  heart: boolean;
};
export default function WishListBtn({
  card_img,
  platform,
  price,
  title,
  heart,
}: WishListArg) {
  const { wisListProduct, wishListId } = useAppSelector(
    (state) => state.WishListSlice
  );
  const { uid, isLoggedIn } = useAppSelector((state) => state.AuthSlice);
  let dataWished: WishListType = {
    id: wishListId,
    products: wisListProduct,
    uid,
  };
  const [wished, setWished] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setWished(wisListProduct.findIndex((el) => el.title == title) !== -1);
    }
  }, [isLoggedIn, title, wisListProduct]);
  const dispatch = useAppDispatch();
  const UpdateWishList = () => {
    if (isLoggedIn && dataWished) {
      // Add
      if (!wished) {
        dataWished = {
          ...dataWished,
          products: [
            ...dataWished.products,
            { card_img, platform, price, title },
          ],
        };
      }
      // Delete
      else {
        dataWished = {
          ...dataWished,
          products: dataWished?.products.filter((el) => el.title !== title),
        };
      }
      dispatch(updateWishList(dataWished));
    } else {
      ToastSweeat(2000).fire({
        title: "Please Login First",
        icon: "error",
      });
    }
  };

  return (
    <>
      {heart ? (
        <div
          onClick={UpdateWishList}
          className="wishList absolute top-2 cursor-pointer right-2">
          {wished ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                fill="currentColor"
                className="text-error"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                fill="currentColor"
                className="text-error"
                viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            </>
          )}
        </div>
      ) : (
        <>
          <Button
            className="bg-[#ff0038] hover:bg-error"
            onClick={UpdateWishList}>
            {wished ? "Remove from wishlist" : "Add to wishlist"}
          </Button>
        </>
      )}
    </>
  );
}
