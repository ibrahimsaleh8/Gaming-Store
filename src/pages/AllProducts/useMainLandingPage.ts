import { useEffect, useState } from "react";
import { ProductType } from "@/components/common/Types";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "@/store/FetchData/FetchAllData";

export default function useMainLandingPage() {
  // Fetching product and category data
  const {
    isLoading,
    data: products,
    isSuccess,
    isError,
    error,
  } = useGetAllProductsQuery();
  const { data: cats, isSuccess: succCats } = useGetAllCategoriesQuery();

  // State variables
  const [mainData, setMainData] = useState<ProductType[] | undefined>([]);
  const [catFilter, setCatFilter] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState("");
  const [searchText, setSearchText] = useState("");

  const categoriesArr = cats && succCats ? Object.keys(cats[0]) : [];

  useEffect(() => {
    if (products) {
      setMainData(products);
    }
  }, [products, isSuccess]);

  useEffect(() => {
    let filteredData = [...(products || [])];

    if (catFilter.length > 0) {
      filteredData = filteredData.filter((el) =>
        catFilter.includes(el.platform)
      );
    }

    if (priceSort === "Low price") {
      filteredData.sort((f, s) => f.price - s.price);
    } else if (priceSort === "High price") {
      filteredData.sort((f, s) => s.price - f.price);
    }

    if (searchText.length > 0) {
      filteredData = filteredData.filter((el) =>
        el.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setMainData(filteredData);
  }, [catFilter, priceSort, products, searchText]);

  const dataFilterByCat = (dataStr: string, type: string) => {
    if (type === "radio") {
      setPriceSort(dataStr);
    } else {
      setCatFilter((prev) =>
        type === "add"
          ? [...prev, dataStr]
          : prev.filter((el) => el !== dataStr)
      );
    }
  };

  const HandleSearch = (text: string) => {
    setSearchText(text);
  };

  return {
    isLoading,
    mainData,
    HandleSearch,
    dataFilterByCat,
    isSuccess,
    categoriesArr,
    isError,
    error,
  };
}
