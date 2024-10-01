import { useForm } from "react-hook-form";
import { ProductType } from "@/components/common/Types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ToastSweeat } from "@/components/common/feedback/Toast";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/Firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProdWithTitleQuery,
} from "@/store/FetchData/FetchAllData";

export default function useEditProduct() {
  // Params
  const param = useParams();

  // Nav
  const nav = useNavigate();

  // Fetch Data
  const {
    data: info,
    isSuccess,
    isLoading,
  } = useGetProdWithTitleQuery(param.title as string);

  // Edit Mutation

  const [editTheProduct, { isLoading: updating }] = useEditProductMutation();

  // Form Handler
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<ProductType>();

  // States
  const [cardImg, setCardImg] = useState<FileList | null>(null);
  const [productImges, setProductImges] = useState<FileList | null>(null);
  const [anotherImges, setAnotherImges] = useState<string[]>([]);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  // Effect

  useEffect(() => {
    if (isSuccess) {
      setValue("platform", info[0].platform);
      setValue("card_img", info[0].card_img);
      setValue("imges", info[0].imges);
      setAnotherImges(info[0].imges);
    }
  }, [info, isSuccess, setValue]);

  // Functions
  const UpdateData = (value: ProductType) => {
    if (value.platform !== "PC") {
      delete value.requirements;
    }
    if (info && info[0].id) {
      editTheProduct({ data: value, id: info[0].id })
        .then(() => {
          nav("/dashboard/all-products");
          ToastSweeat(2000).fire({
            title: "Data Updated Success",
            icon: "success",
          });
        })
        .catch((err) => ToastSweeat(2000).fire({ title: err, icon: "error" }));
    }
  };
  const onSubmit = handleSubmit((value) => {
    value = { ...value, imges: anotherImges };
    UpdateData(value);
  });

  const UploadCardImge = () => {
    if (getValues("title").trim().length == 0) {
      ToastSweeat(2000).fire({
        title: "Title is empty",
        icon: "error",
        timer: 2000,
      });
    }
    if (cardImg?.item) {
      const imgRef = ref(storage, `${getValues("title")}/${cardImg[0].name}`);
      const up = uploadBytesResumable(imgRef, cardImg[0]);
      up.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setValue("card_img", url);
        });
        ToastSweeat(2000).fire({
          title:
            "Image uploaded success please save change to apply the cahnges",
          icon: "success",
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
    if (getValues("title").trim().length == 0) {
      ToastSweeat(2000).fire({
        title: "Title is empty",
        icon: "error",
        timer: 2000,
      });
      return;
    }
    if (productImges) {
      let prog = 0;
      const imgUrls: string[] = [];
      for (let i = 0; i < productImges.length; i++) {
        const imgRef = ref(
          storage,
          `${getValues("title")}/${productImges[i].name}`
        );
        const up = uploadBytesResumable(imgRef, productImges[i]);
        up.then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imgUrls.push(url);
            setAnotherImges((pre) => [...pre, url]);
          });

          ToastSweeat(2000).fire({
            title:
              "Image uploaded success please save change to apply the cahnges",
            icon: "success",
          });
        });
        up.on("state_changed", (snap) => {
          prog = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress2(prog);
        });
      }
    }
  };

  const extractPathFromUrl = (url: string) => {
    const decodedUrl = decodeURIComponent(url);
    const startIdx = decodedUrl.indexOf("/o/") + 3;
    const endIdx = decodedUrl.indexOf("?alt=");
    return decodedUrl.substring(startIdx, endIdx);
  };

  const DeleteImage = (url: string) => {
    const path = extractPathFromUrl(url);
    const imageRef = ref(storage, path);
    deleteObject(imageRef)
      .then(() => {
        setAnotherImges((pre) => pre.filter((el) => el !== url));
      })
      .catch((error) => {
        ToastSweeat(2000).fire({
          title: "Error deleting image:" + error,
          icon: "error",
        });
      });
  };
  const HandleDeleteImage = (url: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#0b0b0b",
      color: "white",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteImage(url);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: "#0b0b0b",
          color: "white",
        }).then(() => {
          let value = getValues();
          value = {
            ...value,
            imges: anotherImges.filter((el) => el !== url),
          };
          UpdateData(value);
        });
      }
    });
  };
  return {
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
  };
}
