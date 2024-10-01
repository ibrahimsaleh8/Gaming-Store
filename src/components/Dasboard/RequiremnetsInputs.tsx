import { Input } from "@/components/ui/input";
import { ProductType, requirementsType } from "../common/Types";
import { UseFormRegister } from "react-hook-form";
type Props = {
  requirments: requirementsType;
  register: UseFormRegister<ProductType>;
};
export default function RequiremnetsInputs({ requirments, register }: Props) {
  return (
    <>
      {/* Minimum Requirements */}
      <div className="min-req flex flex-col gap-3">
        <h1 className="text-yellow-text text-center">
          ---- Minimum Requirement -----
        </h1>
        <div className="os-v">
          <label htmlFor="min-os-v">OS version</label>
          <Input
            {...register("requirements.min.os_version")}
            className="text-black"
            id="min-os-v"
            defaultValue={requirments.min.os_version}
            type="text"
            placeholder="Minimum OS Version"
          />
        </div>
        <div className="cpu">
          <label htmlFor="min-cpu">CPU</label>
          <Input
            {...register("requirements.min.cpu")}
            defaultValue={requirments.min.cpu}
            className="text-black"
            id="min-cpu"
            type="text"
            placeholder="Minimum CPU"
          />
        </div>
        <div className="memory">
          <label htmlFor="min-memory">Memory (Ram)</label>
          <Input
            defaultValue={requirments.min.memory}
            {...register("requirements.min.memory")}
            className="text-black"
            id="min-memory"
            type="number"
            placeholder="Minimum Memory"
          />
        </div>
        <div className="GPU">
          <label htmlFor="min-gpu">GPU</label>
          <Input
            className="text-black"
            {...register("requirements.min.gpu")}
            defaultValue={requirments.min.gpu}
            id="min-gpu"
            type="text"
            placeholder="Minimum GPU"
          />
        </div>
        <div className="Storage">
          <label htmlFor="min-storage">Storage</label>
          <Input
            className="text-black"
            {...register("requirements.min.storage")}
            defaultValue={requirments.min.storage}
            id="min-storage"
            type="number"
            placeholder="Minimum Storage"
          />
        </div>
      </div>

      {/* Recommended Requirements */}
      <div className="recommend-req flex flex-col gap-3">
        <h1 className="text-yellow-text text-center">
          ---- Recommended Requirement -----
        </h1>
        <div className="os-v">
          <label htmlFor="rec-os-v">OS version</label>
          <Input
            className="text-black"
            id="rec-os-v"
            {...register("requirements.recommend.os_version")}
            type="text"
            placeholder="Recommended OS Version"
            defaultValue={requirments.recommend.os_version}
          />
        </div>
        <div className="cpu">
          <label htmlFor="rec-cpu">CPU</label>
          <Input
            className="text-black"
            id="rec-cpu"
            {...register("requirements.recommend.cpu")}
            defaultValue={requirments.recommend.cpu}
            type="text"
            placeholder="Recommended CPU"
          />
        </div>
        <div className="memory">
          <label htmlFor="rec-memory">Memory (Ram)</label>
          <Input
            className="text-black"
            {...register("requirements.recommend.memory")}
            defaultValue={requirments.recommend.memory}
            id="rec-memory"
            type="number"
            placeholder="Recommended Memory"
          />
        </div>
        <div className="GPU">
          <label htmlFor="rec-gpu">GPU</label>
          <Input
            defaultValue={requirments.recommend.gpu}
            className="text-black"
            {...register("requirements.recommend.gpu")}
            id="rec-gpu"
            type="text"
            placeholder="Recommended GPU"
          />
        </div>
        <div className="Storage">
          <label htmlFor="rec-storage">Storage</label>
          <Input
            {...register("requirements.recommend.storage")}
            className="text-black"
            id="rec-storage"
            defaultValue={requirments.recommend.storage}
            type="number"
            placeholder="Recommended Storage"
          />
        </div>
      </div>
    </>
  );
}
