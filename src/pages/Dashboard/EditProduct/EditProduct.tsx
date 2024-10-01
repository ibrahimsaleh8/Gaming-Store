import SmallLoader from "@/components/common/feedback/SmallLoader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectCat from "@/components/Dasboard/SelectCat";
import RequiremnetsInputs from "@/components/Dasboard/RequiremnetsInputs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AlertMessage from "@/components/Dasboard/AlertMessage";
import useEditProduct from "./useEditProduct";

export default function EditProduct() {
  const {
    UploadAnothImges,
    UploadCardImge,
    onSubmit,
    progress1,
    progress2,
    setProductImges,
    setCardImg,
    register,
    watch,
    isLoading,
    HandleDeleteImage,
    updating,
    setValue,
    isSuccess,
    info,
  } = useEditProduct();
  const alertDesc = `When you make any changes it will save when you click Save Changes and if you want to upload a new image you can upload it and after it finish press Save Changes to add the new image to the Data Base and after
        delete any image you must Save Changes to work correctly and if you want
        to update the card image just upload it and Save Changes
  `;
  return (
    <div>
      {isLoading && (
        <div className="flex items-center gap-2 justify-center mt-3">
          Loading.. <SmallLoader />
        </div>
      )}

      {isSuccess &&
        info &&
        info.map((e) => (
          <form
            onSubmit={onSubmit}
            key={e.id}
            className="flex flex-col  gap-4 md:w-3/4 mx-auto">
            <AlertMessage desc={alertDesc} />
            <div className="title">
              <label htmlFor="title">Title</label>
              <Input
                className="text-black"
                {...register("title")}
                id="title"
                type="text"
                defaultValue={e.title}
                placeholder="Title"
              />
            </div>
            <div className="price">
              <label htmlFor="price">Price</label>

              <Input
                className="text-black"
                defaultValue={e.price}
                {...register("price")}
                id="price"
                type="text"
                placeholder="Price"
              />
            </div>
            <div className="desc">
              <label htmlFor="description">Description</label>
              <Textarea
                {...register("description")}
                defaultValue={e.description}
                className="text-black min-h-44  "
                placeholder="Description."
                id="description"
              />
            </div>
            <div className="rating">
              <label htmlFor="rating">Rating</label>
              <Input
                defaultValue={e.rating}
                type="text"
                {...register("rating")}
                id="rating"
                placeholder="rating"
                className="text-black"
                required
              />
            </div>
            <div className="release_date">
              <label htmlFor="release_date">release date</label>
              <Input
                {...register("relase_date")}
                defaultValue={e.relase_date}
                type="text"
                id="release_date"
                placeholder="release_date"
                className="text-black"
                required
              />
            </div>
            <div className="trailer">
              <label htmlFor="trailer">Trailer</label>
              <Input
                defaultValue={e.trailer}
                type="text"
                {...register("trailer")}
                id="trailer"
                placeholder="Trailer"
                className="text-black"
                required
              />
            </div>

            <SelectCat setValue={setValue} deafultValue={e.platform} />
            {e.platform == "PC" &&
              e.requirements &&
              watch("platform") == "PC" && (
                <RequiremnetsInputs
                  register={register}
                  requirments={e.requirements}
                />
              )}

            {/* Edit Imges */}

            <div className="img_card flex items-center gap-1 flex-wrap">
              <div>
                <label>Card imge</label>
                <img className="h-40" src={e.card_img} alt="Card imge" />
              </div>
              <div>
                <div className="upload">
                  <Input
                    onChange={(e) => setCardImg(e.target.files)}
                    type="file"
                  />
                  <Button
                    onClick={UploadCardImge}
                    type="button"
                    className="success-btn">
                    Upload
                  </Button>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <Progress value={progress1} />
                  <p>{progress1.toFixed(2)}% </p>
                </div>
              </div>
            </div>

            <div className="product_imges">
              <label>Product Imges</label>
              <div className="imges flex gap-1 flex-wrap">
                {e.imges.map((a, i) => (
                  <div key={i} className="relative">
                    <img className="h-56" src={a} alt={`all-img-${i}`} />
                    <div
                      onClick={() => HandleDeleteImage(a)}
                      className="delet-icon absolute top-1 right-1 bg-black cursor-pointer px-2 py-1 rounded-md">
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
                        className="text-error">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1={10} x2={10} y1={11} y2={17} />
                        <line x1={14} x2={14} y1={11} y2={17} />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col w-fit mt-3">
                <p>Upload Another Imges</p>
                <div className="upload w-fit ">
                  <Input
                    onChange={(e) => setProductImges(e.target.files)}
                    type="file"
                    multiple={true}
                  />
                  <Button
                    onClick={UploadAnothImges}
                    type="button"
                    className="success-btn">
                    Upload
                  </Button>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Progress value={progress2} />
                  <p>{progress2.toFixed(2)}% </p>
                </div>
              </div>
            </div>

            <Button className="success-btn">
              {updating ? "Updating..." : "Save Change"}
            </Button>
          </form>
        ))}
    </div>
  );
}
