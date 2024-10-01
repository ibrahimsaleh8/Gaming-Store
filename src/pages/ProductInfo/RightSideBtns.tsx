import AddToCartBtn from "@/components/common/buttons/AddToCartBtn";
import WishListBtn from "@/components/common/buttons/WishListBtn";
import { platformType } from "@/components/common/Types";
import ShareBtn from "@/components/Product-info/ShareBtn";
type RightSideProps = {
  title: string;
  price: number;
  platform: platformType;
  relase_date: string;
  card_img: string;
};
export default function RightSideBtns({
  card_img,
  platform,
  price,
  title,
  relase_date,
}: RightSideProps) {
  return (
    <div className="sideBar-pro-info">
      <div>
        <img className="h-64 rounded-md mx-auto md:mx-0" src={card_img} />
      </div>
      <div className="text flex flex-col gap-4 flex-1 px-2">
        <h1 className="title text-xl ">{title}</h1>
        <div className="price font-bold">{price}$</div>
        <AddToCartBtn
          card_img={card_img}
          platform={platform}
          price={price}
          title={title}
          full={true}
        />
        <WishListBtn
          card_img={card_img}
          heart={false}
          platform={platform}
          price={price}
          title={title}
        />
        <div className="some-info flex flex-col gap-2 mt-2 md:mt-6">
          <div className="flex items-center justify-between text-sm gap-3 border-b py-2 border-low-white">
            <p>Release date :</p>
            <p>{relase_date}</p>
          </div>
          <div className="flex items-center justify-between text-sm gap-3 border-b py-2 border-low-white">
            <p>Platform :</p>
            <p>{platform}</p>
          </div>
        </div>
        <ShareBtn />
      </div>
    </div>
  );
}
