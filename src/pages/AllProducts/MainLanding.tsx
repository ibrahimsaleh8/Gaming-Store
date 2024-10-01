import WideLanding from "./WideLanding";
import SideBarProducts from "./SideBarProducts";
import { Input } from "@/components/ui/input";
import useMainLandingPage from "./useMainLandingPage";
import HandleFetchProducts from "@/components/common/HandleFetchProducts";

export default function MainLanding() {
  const {
    HandleSearch,
    dataFilterByCat,
    isLoading,
    mainData,
    isSuccess,
    categoriesArr,
    error,
    isError,
  } = useMainLandingPage();

  return (
    <div className="main-landing">
      <WideLanding />
      <div className="search-input">
        <Input
          onChange={(e) => HandleSearch(e.target.value.trim())}
          type="search"
          placeholder="Search"
          className="rounded-full text-white bg-main-Background focus-visible:ring-offset-1 border-second-low-white"
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-7">
        <SideBarProducts
          HandleFiltering={dataFilterByCat}
          platforms={categoriesArr.sort()}
        />
        <HandleFetchProducts
          data={mainData}
          error={error}
          isError={isError}
          isSuccess={isSuccess}
          isloading={isLoading}
        />
      </div>
    </div>
  );
}
