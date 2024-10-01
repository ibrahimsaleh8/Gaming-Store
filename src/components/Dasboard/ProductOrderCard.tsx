import { CartProductType } from "../common/Types";

export default function ProductOrderCard({
  amount,
  card_img,
  platform,
  price,
  title,
}: CartProductType) {
  return (
    <div className="bg-main-Background border border-[#505050] relative p-3 w-44 flex flex-col items-center justify-center gap-2 rounded-lg">
      <img src={card_img} alt={title} className="h-36 rounded-lg" />
      <p>{title}</p>
      <p>{price}$</p>
      <p>{platform}</p>
      <p className="absolute top-1 right-1 bg-yellow-text text-black w-5 h-5 font-bold flex items-center justify-center rounded-full ">
        {amount}
      </p>
    </div>
  );
}
