type Props = {
  titel: string;
  price: number;
  card_img: string;
  amount: number;
};
export default function OrderProductCard({
  amount,
  card_img,
  price,
  titel,
}: Props) {
  return (
    <>
      <div className="product bg-second-black p-3 w-fit rounded-md flex basis-48 flex-col items-center justify-center gap-3">
        <img src={card_img} alt={titel} className="h-28 mx-auto" />
        <div className="flex flex-col gap-2 ">
          <p>Title: {titel}</p>
          <p>Price: {price}$</p>
          <p className="font-bold text-yellow-text">Amount: {amount}</p>
        </div>
      </div>
    </>
  );
}
