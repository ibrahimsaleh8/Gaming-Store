import AddDiscountDialog from "./AddDiscountDialog";
import DiscountCard from "./DiscountCard";
import SmallLoader from "@/components/common/feedback/SmallLoader";
import { useGetDiscountCodesQuery } from "@/store/Discount/DiscountCodesApi";

export default function AddDiscountPage() {
  const { isError, isLoading, isSuccess, data, error, isFetching } =
    useGetDiscountCodesQuery();
  return (
    <div>
      {isLoading && (
        <>
          Loading <SmallLoader />
        </>
      )}
      {isError && typeof error == "string" && (
        <p className="text-xl text-error">{error}</p>
      )}
      {!isFetching && isSuccess && data.length > 0 ? (
        <>
          <AddDiscountDialog Codes={data} />
          <p className="my-2 text-xl">All Discount Codes :-</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {data.map((el, i) => (
              <DiscountCard
                id={el.id}
                code={el.code}
                percent={el.percent}
                key={i}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-xl"> No Codes!</p>
      )}
    </div>
  );
}
