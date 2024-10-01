import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormSetValue } from "react-hook-form";

import { platformType, ProductType } from "../common/Types";
type Props = {
  deafultValue: string;
  setValue: UseFormSetValue<ProductType>;
};
export default function SelectCat({ deafultValue, setValue }: Props) {
  return (
    <div className="platform">
      <label>Platform</label>
      <Select
        onValueChange={(e: platformType) => setValue("platform", e)}
        defaultValue={deafultValue}>
        <SelectTrigger className="w-[180px] text-black ">
          <SelectValue placeholder="Select a platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Platform</SelectLabel>
            <SelectItem value="PC">PC</SelectItem>
            <SelectItem value="XBOX">XBOX</SelectItem>
            <SelectItem value="PS4">PS4</SelectItem>
            <SelectItem value="PS5">PS5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
