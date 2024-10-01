import { useParams } from "react-router-dom";
import SkelatonProdInfo from "@/components/Product-info/SkelatonProdInfo";
import HandleError from "@/store/HandleError";
import ErroMessBox from "@/components/common/feedback/ErroMessBox";
import InfoProdContainer from "./InfoProdContainer";
import { useGetProdWithTitleQuery } from "@/store/FetchData/FetchAllData";

export default function ProductInfo() {
  const params = useParams();
  const theTitle = params.prod_title;
  const { data, isSuccess, isLoading, error, isError } =
    useGetProdWithTitleQuery(theTitle as string);
  return (
    <div>
      {isLoading ? (
        <SkelatonProdInfo />
      ) : isSuccess ? (
        data.map((e, i) => <InfoProdContainer e={e} i={i} key={i} />)
      ) : (
        (isError || (!isLoading && data !== undefined)) && (
          <ErroMessBox errorMessage={HandleError(error).error.error.message} />
        )
      )}
    </div>
  );
}
