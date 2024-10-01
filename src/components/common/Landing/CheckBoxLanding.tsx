import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  text: string;
  HandleFiltering: (f: string, s: string) => void;
};
export default function CheckBoxLanding({ text, HandleFiltering }: Props) {
  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox
        id={text}
        onCheckedChange={(e) => {
          if (e.valueOf()) {
            HandleFiltering(text, "add");
          } else {
            HandleFiltering(text, "remove");
          }
        }}
      />
      <label
        htmlFor={text}
        className="text-sm  leading-none hover:text-yellow-text cursor-pointer duration-100 ">
        {text}
      </label>
    </div>
  );
}
