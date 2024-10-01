import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";
import { platformType } from "@/components/common/Types";
import AlertMessage from "@/components/Dasboard/AlertMessage";
import useAddProduct from "./useAddProduct";

export default function AddProduct() {
  const {
    selectedPlatform,
    UploadCardImge,
    UploadAnothImges,
    onSubmit,
    alertMess,
    progress2,
    progress1,
    setProductImges,
    setCardImg,
    register,
    watch,
    setValue,
    isLoading,
  } = useAddProduct();
  return (
    <form
      onSubmit={onSubmit}
      className="lg:w-3/4 w-[95%] mx-auto flex flex-col gap-5 ">
      <AlertMessage desc={alertMess} />
      <h1 className="text-lg mt-3 flex items-center gap-3">
        ADD Product
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          className="text-yellow-text"
          viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1" />
          <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905" />
        </svg>
      </h1>
      <div className="Title">
        <label htmlFor="title">Title</label>
        <Input
          {...register("title")}
          type="text"
          id="title"
          placeholder="title"
          className="text-black"
          required
        />
      </div>
      <div className="trailer">
        <label htmlFor="trailer">Trailer Vide Link (embed video link)</label>
        <Input
          {...register("trailer")}
          type="text"
          id="trailer"
          placeholder="Video Trailer"
          className="text-black"
          required
        />
      </div>
      <div className="price">
        <label htmlFor="price">price</label>
        <Input
          {...register("price")}
          className="text-black"
          id="price"
          type="text"
          placeholder="Price"
          required
        />
      </div>
      <div className="relaease_date">
        <label htmlFor="relaease_date">Release Date</label>
        <Input
          {...register("relase_date")}
          className="text-black"
          id="relaease_date"
          type="text"
          placeholder="Price"
          required
        />
      </div>
      <div className="desc">
        <label htmlFor="description">Description</label>
        <Textarea
          {...register("description")}
          required
          className="text-black"
          placeholder="Type your message here."
          id="description"
        />
      </div>
      <div className="rating">
        <label htmlFor="rating">Rating</label>
        <Input
          {...register("rating")}
          type="text"
          id="rating"
          placeholder="rating"
          className="text-black"
          required
        />
      </div>
      <div className="the-card-img">
        <label htmlFor="card-img">Card Img</label>

        <div className="flex items-end gap-2 mb-2">
          <Input
            required
            className="text-black flex-1"
            id="card-img"
            type="file"
            onChange={(e) => setCardImg(e.target.files)}
          />
          <Button
            type="button"
            onClick={UploadCardImge}
            disabled={watch("title")?.trim().length == 0}
            className="success-btn">
            Upload Card imge
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Progress value={progress1} />
          <p>{progress1.toFixed(2)}% </p>
        </div>
        {watch("card_img")?.length > 0 && <img src={watch("card_img")}></img>}
      </div>
      <div className="product-imges">
        <label htmlFor="card-img">product imges</label>
        <div className="flex items-end gap-2">
          <Input
            onChange={(e) => setProductImges(e.target.files)}
            required
            className="text-black"
            id="card-img"
            type="file"
            multiple={true}
          />
          <Button
            disabled={watch("title")?.trim().length == 0}
            type="button"
            onClick={UploadAnothImges}
            className="success-btn">
            Upload product imges
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Progress value={progress2} />
          <p>{progress2.toFixed(2)}% </p>
        </div>
        {watch("imges")?.length > 0 &&
          watch("imges").map((e, i) => <img key={i} src={e}></img>)}
      </div>

      <div className="platform">
        <label>Platform</label>
        <Select onValueChange={(e: platformType) => setValue("platform", e)}>
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
      {selectedPlatform === "PC" && (
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
                type="text"
                placeholder="Minimum OS Version"
              />
            </div>
            <div className="cpu">
              <label htmlFor="min-cpu">CPU</label>
              <Input
                {...register("requirements.min.cpu")}
                className="text-black"
                id="min-cpu"
                type="text"
                placeholder="Minimum CPU"
              />
            </div>
            <div className="memory">
              <label htmlFor="min-memory">Memory (Ram)</label>
              <Input
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
                {...register("requirements.min.gpu")}
                className="text-black"
                id="min-gpu"
                type="text"
                placeholder="Minimum GPU"
              />
            </div>
            <div className="Storage">
              <label htmlFor="min-storage">Storage</label>
              <Input
                {...register("requirements.min.storage")}
                className="text-black"
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
                {...register("requirements.recommend.os_version")}
                className="text-black"
                id="rec-os-v"
                type="text"
                placeholder="Recommended OS Version"
              />
            </div>
            <div className="cpu">
              <label htmlFor="rec-cpu">CPU</label>
              <Input
                {...register("requirements.recommend.cpu")}
                className="text-black"
                id="rec-cpu"
                type="text"
                placeholder="Recommended CPU"
              />
            </div>
            <div className="memory">
              <label htmlFor="rec-memory">Memory (Ram)</label>
              <Input
                {...register("requirements.recommend.memory")}
                className="text-black"
                id="rec-memory"
                type="number"
                placeholder="Recommended Memory"
              />
            </div>
            <div className="GPU">
              <label htmlFor="rec-gpu">GPU</label>
              <Input
                {...register("requirements.recommend.gpu")}
                className="text-black"
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
                type="number"
                placeholder="Recommended Storage"
              />
            </div>
          </div>
        </>
      )}

      <Button type="submit" className="add-prod-btn ">
        {isLoading ? (
          <p className="flex items-center gap-2">
            Adding...
            <Loader />
          </p>
        ) : (
          "Add product"
        )}
      </Button>
    </form>
  );
}
