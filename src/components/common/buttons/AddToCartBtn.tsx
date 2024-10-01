import { Button } from "@/components/ui/button";
import { AddToCart } from "@/store/Cart/Actions/AddToCart";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { motion } from "framer-motion";
import { CartProductType, platformType } from "../Types";
import { ToastSweeat } from "../feedback/Toast";
import { updateData } from "@/store/Cart/CartSlice";
type Props = {
  full: boolean;
  id?: string;
  title: string;
  card_img: string;
  platform: platformType;
  price: number;
};
export default function AddToCartBtn({
  full,
  card_img,
  platform,
  price,
  title,
}: Props) {
  const classMainDiv = full ? "w-full" : "ml-auto";
  const { uid } = useAppSelector((state) => state.AuthSlice);
  const { cartData } = useAppSelector((state) => state.cartSlice);
  const classButton = full
    ? "add-to-card shadow-btn w-full"
    : "add-to-card shadow-btn";

  const dispatch = useAppDispatch();
  const HandleAddToCart = () => {
    if (uid.length > 0) {
      const prod: CartProductType = {
        amount: 1,
        card_img,
        platform,
        price,
        title,
      };
      const data = {
        uid,
        prod,
      };

      dispatch(AddToCart(data))
        .unwrap()
        .then(() => {
          if (cartData.findIndex((el) => el.title == title) !== -1) {
            dispatch(updateData(title));
          }
          ToastSweeat(2000).fire({
            title: "Product added Success",
            icon: "success",
          });
        })
        .catch((err) => {
          ToastSweeat(2000).fire({
            title: err,
            icon: "error",
          });
        });
    } else {
      ToastSweeat(2000).fire({
        title: "Please Login First",
        icon: "error",
      });
    }
  };
  return (
    <motion.div
      onClick={HandleAddToCart}
      className={classMainDiv}
      whileTap={{ scale: 0.95 }}>
      <Button className={classButton}>Add to cart</Button>
    </motion.div>
  );
}
