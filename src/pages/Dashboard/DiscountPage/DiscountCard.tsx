import SmallLoader from "@/components/common/feedback/SmallLoader";
import { DiscounatCodesType } from "@/components/common/Types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeletDsicountCodeMutation } from "@/store/Discount/DiscountCodesApi";
import { useState } from "react";
import Swal from "sweetalert2";

export default function DiscountCard({
  code,
  percent,
  id,
}: DiscounatCodesType) {
  const [deletCode, { isLoading }] = useDeletDsicountCodeMutation();
  const [copyText, setCopyText] = useState("Copy");
  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopyText("Copied ✅");
    setTimeout(() => {
      setCopyText("Copy");
    }, 1000);
  };
  const deleteCode = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will Delete this code",
      icon: "warning",
      showCancelButton: true,
      background: "#0b0b0b",
      color: "white",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          deletCode(id)
            .then(() => {
              Swal.fire({
                title: "Deleted!",
                text: "Code has been deleted.",
                icon: "success",
                background: "#0b0b0b",
                color: "white",
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "Error!",
                text: err,
                icon: "error",
                background: "#0b0b0b",
                color: "white",
              });
            });
        }
      }
    });
  };
  return (
    <div className="disount-card border border-[#505050] flex flex-col gap-3 sm:w-96 w-full bg-[#212121] rounded-lg p-5">
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
        }}
        className="bg-yellow-text   mx-auto text-black w-9 h-9 flex items-center justify-center">
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
          className="lucide lucide-percent">
          <line x1={19} x2={5} y1={5} y2={19} />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <Input disabled defaultValue={code} type="text" placeholder="code" />
        <Button className="success-btn !mt-0" onClick={() => copy(code)}>
          {copyText}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          disabled
          defaultValue={`${percent}%`}
          type="text"
          placeholder="percent"
        />
      </div>
      <Button onClick={deleteCode} className="danger-btn">
        {isLoading ? (
          <>
            Delecting..
            <SmallLoader />
          </>
        ) : (
          "Delete"
        )}
      </Button>
    </div>
  );
}
