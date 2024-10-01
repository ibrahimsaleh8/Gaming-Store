import ProductCardLanding from "@/components/common/Landing/ProductCardLanding";
import { useAppSelector } from "@/store/MainHooks";
import { Link } from "react-router-dom";
export default function WishListPage() {
  const { wisListProduct } = useAppSelector((state) => state.WishListSlice);
  return (
    <div className="min-h-[70vh] py-5">
      <p className="text-xl tracking-widest md:text-2xl font-bold my-2 text-yellow-text">
        My Wishlist
      </p>

      {wisListProduct.length > 0 ? (
        <div className="cards-container py-2 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {wisListProduct.map((e, i) => (
            <ProductCardLanding
              key={i}
              i={i}
              img={e.card_img}
              platform={e.platform}
              price={e.price}
              title={e.title}
              addTocartShow={true}
              heart={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="currentColor"
              className="text-error"
              viewBox="0 0 16 16">
              <path d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38 38 0 0 0 .867-.59m-.303-1.01-.971-3.237 1.74-2.608a1 1 0 0 0 .103-.906l-1.3-3.468 1.45-1.813c1.861-.948 4.446.002 5.197 2.11.691 1.94-.055 5.521-6.219 9.922m-1.25 1.137a36 36 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3zm-2.3-3.06-.442-1.106a1 1 0 0 1 .034-.818l1.305-2.61L4.564 3.35a1 1 0 0 1 .168-.991l1.032-1.24c-1.688-.449-3.7.398-4.456 2.128-.711 1.627-.413 4.55 3.706 8.229Z" />
            </svg>
          </p>

          <p className="text-xl text-center my-5 tracking-widest md:text-2xl font-bold ">
            You haven't added anything to your wishlist yet.
          </p>
          <Link
            className="px-5 py-2 bg-yellow-text text-black font-bold border border-yellow-text rounded-md hover:bg-black hover:text-yellow-text duration-300"
            to={"/"}>
            Shop For Games
          </Link>
        </div>
      )}
    </div>
  );
}
