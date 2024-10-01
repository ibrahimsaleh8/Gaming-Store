import ProductCardLanding from "./Landing/ProductCardLanding";
import SkeletonCard from "./Landing/SkeletonCard";
import { ProductType } from "./Types";

type Props = {
  isloading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: ProductType[];
  error: unknown;
};
export default function HandleFetchProducts({
  data,
  error,
  isError,
  isSuccess,
  isloading,
}: Props) {
  const SkeletonArry = Array.from({ length: 10 });

  return (
    <>
      <div className="cards-container">
        {/* Loading */}

        {isloading && SkeletonArry.map((_, i) => <SkeletonCard key={i} />)}

        {/* Data */}

        {isSuccess &&
          data &&
          data?.length > 0 &&
          data?.map((e, i) => (
            <ProductCardLanding
              i={i}
              key={e.id}
              img={e.card_img}
              platform={e.platform}
              price={e.price}
              addTocartShow={true}
              title={e.title}
              heart={true}
            />
          ))}
      </div>

      {/* Error */}
      {isError && typeof error == "string" && (
        <p className="bg-error rounded-md text-white p-3 w-full text-lg">
          {error}
        </p>
      )}
    </>
  );
}
