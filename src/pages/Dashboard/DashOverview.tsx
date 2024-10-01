import SmallLoader from "@/components/common/feedback/SmallLoader";
import DashOverviewCard from "@/components/Dasboard/DashOverviewCard";
import ProductsShart from "@/components/Dasboard/ProductsShart";
import { useGetAllProductsQuery } from "@/store/FetchData/FetchAllData";
import { Link } from "react-router-dom";

export default function DashOverview() {
  const { isSuccess, data: products, isLoading } = useGetAllProductsQuery();
  let pc = 0,
    ps4 = 0,
    ps5 = 0,
    xbox = 0;
  if (isSuccess) {
    xbox = products.filter((el) => el.platform == "XBOX").length;
    pc = products.filter((el) => el.platform == "PC").length;
    ps5 = products.filter((el) => el.platform == "PS5").length;
    ps4 = products.filter((el) => el.platform == "PS4").length;
  }
  return (
    <>
      {isLoading ? (
        <SmallLoader />
      ) : (
        isSuccess && (
          <div>
            <div className="mt-3 flex items-center md:justify-start justify-center gap-3 flex-wrap">
              <DashOverviewCard
                titel="All Products"
                url="/dashboard/all-products"
                number={products.length}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx={8} cy={21} r={1} />
                    <circle cx={19} cy={21} r={1} />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                }
              />
              <DashOverviewCard
                titel="Add New Product"
                url="/dashboard/add-product"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-cart-plus"
                    viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                }
              />
              <DashOverviewCard
                titel="All Orders"
                url="/dashboard/orders"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-minecart-loaded"
                    viewBox="0 0 16 16">
                    <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4m8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4M.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7z" />
                    <path
                      fillRule="evenodd"
                      d="M6 1a2.498 2.498 0 0 1 4 0c.818 0 1.545.394 2 1 .67 0 1.552.57 2 1h-2c-.314 0-.611-.15-.8-.4-.274-.365-.71-.6-1.2-.6-.314 0-.611-.15-.8-.4a1.497 1.497 0 0 0-2.4 0c-.189.25-.486.4-.8.4-.507 0-.955.251-1.228.638q-.136.194-.308.362H3c.13-.147.401-.432.562-.545a1.6 1.6 0 0 0 .393-.393A2.5 2.5 0 0 1 6 1"
                    />
                  </svg>
                }
              />
            </div>
            <div className="mt-7 flex gap-3 flex-col-reverse lg:flex-row">
              <ProductsShart pc={pc} ps4={ps4} ps5={ps5} xbox={xbox} />

              <div className="bg-second-black w-full text-xl flex flex-col gap-5 h-fit font-bold rounded-lg p-5">
                <div className="bg-error p-5 text-center rounded-xl  ">
                  <p className="p-4 border-2 border-dashed ">Disocunt Codes</p>
                </div>
                <div className="flex flex-col gap-4 ">
                  <Link
                    className="px-5 py-3 border border-white hover:bg-second-black hover:text-white duration-300 flex items-center gap-4 bg-white w-fit text-black rounded-lg"
                    to={"/dashboard/discounts"}>
                    Go to Discounts Page
                    <span className="bg-main-Background text-white rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </Link>
                  <p className="flex gap-3 items-center">
                    Show Discounts Code & Add New Discount Code
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
