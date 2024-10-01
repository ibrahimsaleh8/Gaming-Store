import Swal from "sweetalert2";
import { CartProductType } from "../common/Types";
import { Button } from "../ui/button";
interface Props {
  data: CartProductType;
  handleAmountFunctuions: (e: CartProductType, type: string) => void;
  loading: "pending" | "fulfilled" | "rejected" | "idle";
}
export default function CardCart({
  data,
  handleAmountFunctuions,
  loading,
}: Props) {
  const HandleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will delete this Product !",
      icon: "warning",
      background: "#0b0b0b",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAmountFunctuions(data, "delete");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: "#0b0b0b",
          color: "white",
        });
      }
    });
  };
  return (
    <div className="card-cart">
      <div className="prod-img">
        <img src={data.card_img} className="h-44 rounded-md" alt={data.title} />
      </div>
      <div className="flex-1 flex flex-col gap-3 py-3 font-bold">
        <div className="title md:text-lg">
          <p>{data.title}</p>
        </div>
        <div className="price">
          <p>{data.price}$</p>
        </div>
        <div className="platform bg-white w-fit px-4 py-1 rounded text-black">
          <p>{data.platform}</p>
        </div>
        <div className="amount flex items-center gap-4 w-fit">
          <Button
            disabled={loading == "pending"}
            className="amount-btn"
            onClick={() => handleAmountFunctuions(data, "increase")}>
            +
          </Button>
          <p>{data.amount}</p>
          <Button
            disabled={loading == "pending"}
            className="amount-btn"
            onClick={() => handleAmountFunctuions(data, "decrease")}>
            -
          </Button>
        </div>
      </div>
      <div onClick={HandleDelete} className="delet-btn-cart">
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
          className="lucide lucide-trash-2">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1={10} x2={10} y1={11} y2={17} />
          <line x1={14} x2={14} y1={11} y2={17} />
        </svg>
      </div>
    </div>
  );
}
