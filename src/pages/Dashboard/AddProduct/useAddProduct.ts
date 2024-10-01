import { useNavigate } from "react-router-dom";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import { storage } from "@/Firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProductType } from "@/components/common/Types";
import { useAddProductMutation } from "@/store/FetchData/FetchAllData";
export default function useAddProduct() {
  // Add Mutation
  const [addNewProduct, { isLoading }] = useAddProductMutation();

  // Hooks
  const { register, handleSubmit, setValue, watch } = useForm<ProductType>();
  const [cardImg, setCardImg] = useState<FileList | null>(null);
  const [productImges, setProductImges] = useState<FileList | null>(null);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const nav = useNavigate();

  // Hooks

  // Functions
  const UploadCardImge = () => {
    if (watch("title").trim().length == 0) {
      ToastSweeat(2000).fire({
        title: "Title is empty",
        icon: "error",
        timer: 2000,
      });
    }
    if (cardImg?.item) {
      const imgRef = ref(storage, `${watch("title")}/${cardImg[0].name}`);
      const up = uploadBytesResumable(imgRef, cardImg[0]);
      up.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setValue("card_img", url);
        });
      });
      up.on("state_changed", (snap) => {
        const prog = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress1(prog);
      });
    } else {
      ToastSweeat(2000).fire({
        title: "Please choose image first",
        icon: "error",
        timer: 2000,
      });
    }
  };
  const UploadAnothImges = () => {
    if (watch("title").trim().length == 0) {
      ToastSweeat(2000).fire({
        title: "Title is empty",
        icon: "error",
        timer: 2000,
      });
      return;
    }

    if (productImges && productImges?.length >= 4) {
      let prog = 0;
      const imgUrls: string[] = [];
      for (let i = 0; i < productImges.length; i++) {
        const imgRef = ref(
          storage,
          `${watch("title")}/${productImges[i].name}`
        );
        const up = uploadBytesResumable(imgRef, productImges[i]);
        up.then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imgUrls.push(url);
            setValue(`imges`, imgUrls);
          });
        });
        up.on("state_changed", (snap) => {
          prog = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress2(prog);
        });
      }
    } else {
      ToastSweeat(2000).fire({
        title: "You should Upload 4 imges or more",
        icon: "error",
        timer: 2000,
      });
      return;
    }
  };
  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (watch("card_img")?.length > 0 && watch("imges")?.length >= 4) {
      if (data.platform !== "PC") {
        delete data.requirements;
      }
      addNewProduct(data)
        .then(() => {
          ToastSweeat(3000)
            .fire({ title: "added Success", icon: "success" })
            .then(() => nav("/dashboard/all-products"));
        })
        .catch((err) => {
          ToastSweeat(3000).fire({ title: err, icon: "error" });
        });
    } else {
      ToastSweeat(3000).fire({
        title: "Please upload the imges first",
        icon: "error",
      });
    }
  });
  // Functions
  const selectedPlatform = watch("platform");
  const alertMess =
    "before uploading images make sure to put the title at first ";
  return {
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
  };
}
