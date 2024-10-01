import CheckBoxLanding from "@/components/common/Landing/CheckBoxLanding";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

type Props = {
  platforms: string[];
  HandleFiltering: (f: string, s: string) => void;
};
export default function SideBarProducts({ platforms, HandleFiltering }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className=" border border-[#3d3d3d] md:p-6 p-4 rounded-md w-full lg:w-64 h-fit flex flex-col md:gap-10 gap-5 ">
      <div>
        <h1 className="font-bold mb-4">Platforms</h1>
        <div className="categories flex flex-col gap-5 mt-2 ">
          {platforms.map((e, i) => (
            <CheckBoxLanding
              HandleFiltering={HandleFiltering}
              key={i}
              text={e}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="font-bold mb-4">Sort by</h1>

        <div className="flex flex-col gap-5 mt-2 text-black">
          <RadioGroup
            onValueChange={(e) => HandleFiltering(e, "radio")}
            defaultValue="Normal"
            className="text-white">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                defaultChecked={true}
                value="Normal"
                id="Normal"
              />
              <label htmlFor="Normal">Normal</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="High price" id="High-price" />
              <label htmlFor="High-price">High price</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Low price" id="Low-price" />
              <label htmlFor="Low-price">Low price</label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </motion.div>
  );
}
