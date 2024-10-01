import { ProductType } from "@/components/common/Types";
import ShowInfo from "./ShowInfo";
import RightSideBtns from "./RightSideBtns";
import RatingHandler from "@/components/Product-info/RatingHandler";

type Props = {
  e: ProductType;
  i: number;
};
export default function InfoProdContainer({ e, i }: Props) {
  return (
    <>
      <h1 className="title text-2xl font-bold mt-2 tracking-wide">{e.title}</h1>
      <div className="rating flex items-center gap-1 mt-2">
        <RatingHandler rating={e.rating} />
      </div>

      <div className="flex items-start gap-2 mt-3 xl:flex-row flex-col-reverse overflow-x-hidden ">
        <ShowInfo
          description={e.description}
          imges={e.imges}
          platform={e.platform}
          title={e.title}
          requirements={e.requirements}
          trailer={e.trailer}
          key={e.id}
        />
        <RightSideBtns
          relase_date={e.relase_date}
          card_img={e.card_img}
          platform={e.platform}
          price={e.price}
          title={e.title}
          key={i}
        />
      </div>
    </>
  );
}
