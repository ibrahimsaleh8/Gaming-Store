import SmallLoader from "@/components/common/feedback/SmallLoader";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import { DiscounatCodesType } from "@/components/common/Types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddDiscountCodeMutation } from "@/store/Discount/DiscountCodesApi";
import { useState } from "react";
type Props = {
  Codes: DiscounatCodesType[];
};
export default function AddDiscountDialog({ Codes }: Props) {
  const [disCode, setDisCode] = useState("");
  const [percent, setPercent] = useState("");

  const [AddNewCode, { isLoading }] = useAddDiscountCodeMutation();

  const GeneratCode = () => {
    const alphaSm = "abcdefghijklmnopqrstuvwxyz";
    const alphaCp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += alphaSm[Math.floor(Math.random() * (26 - 0) + 0)];
      result += alphaCp[Math.floor(Math.random() * (26 - 0) + 0)];
      result += num[Math.floor(Math.random() * (10 - 0) + 0)];
    }
    setDisCode(result);
  };
  const AddNewDiscountCode = () => {
    if (disCode.trim().length == 0 || percent.length == 0) {
      ToastSweeat(2000).fire({
        title: "Please Check the code and percent",
        icon: "error",
      });
    } else if (+percent > 100 || +percent == 0) {
      ToastSweeat(2000).fire({
        title: "Max Percent is 100 and Min Percent is 1",
        icon: "error",
      });
    } else {
      if (Codes.findIndex((el) => el.code == disCode) == -1) {
        AddNewCode({ code: disCode, percent: +percent })
          .then(() =>
            ToastSweeat(2000).fire({
              title: "New Code Added Success",
              icon: "success",
            })
          )
          .catch((err) =>
            ToastSweeat(2000).fire({
              title: err,
              icon: "error",
            })
          );
      } else {
        ToastSweeat(2000).fire({
          title: "This code is already exist",
          icon: "error",
        });
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="px-5 py-3 bg-white flex items-center gap-2 text-black rounded-md">
        Add New Code
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
          className="lucide lucide-square-plus">
          <rect width={18} height={18} x={3} y={3} rx={2} />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-main-Background border-low-white">
        <DialogHeader>
          <DialogTitle>Add New Discount Code</DialogTitle>
          <DialogDescription>
            put the code of the discount or make button Generate to make a
            random code and put the percent of the discount
          </DialogDescription>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                type="text"
                onChange={(e) => setDisCode(e.target.value)}
                placeholder="Code"
                value={disCode}
                maxLength={9}
              />
              <Button
                onClick={GeneratCode}
                type="button"
                className="bg-blue-color hover:bg-main-Background border hover:text-blue-color border-blue-color">
                Generate
              </Button>
            </div>
            <Input
              onChange={(e) => setPercent(e.target.value)}
              type="number"
              placeholder="Percent %"
              max={100}
              min={0}
            />
            <Button onClick={AddNewDiscountCode} className="success-btn">
              {isLoading ? (
                <>
                  Loading... <SmallLoader />
                </>
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
