import SmallLoader from "@/components/common/feedback/SmallLoader";
import { ProductType } from "@/components/common/Types";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetAllProductsQuery } from "@/store/FetchData/FetchAllData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function DashAllProduct() {
  const tableHead = [
    { title: "Image" },
    { title: "Title" },
    { title: "Platform" },
    { title: "Price" },
    { title: "Action" },
  ];
  const { isSuccess, isLoading, data } = useGetAllProductsQuery();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searched, setSearched] = useState<ProductType[]>([]);
  const HandleSearch = (title: string) => {
    if (data) {
      const filterd = data?.filter((el) =>
        el.title.toLowerCase().includes(title.toLowerCase())
      );
      setSearched(filterd);
    }
  };
  useEffect(() => {
    setProducts(searched);
  }, [searched]);

  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data);
    }
  }, [data, isSuccess]);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-2 justify-center mt-3">
          Loading.. <SmallLoader />
        </div>
      ) : (
        isSuccess && (
          <>
            <div className="search-input">
              <Input
                onChange={(e) => HandleSearch(e.target.value.trim())}
                type="search"
                placeholder="Search"
                className="rounded-full text-white bg-main-Background focus-visible:ring-offset-1 border-second-low-white"
              />
            </div>
            <Table>
              <TableCaption>A list of all products.</TableCaption>
              <TableHeader>
                <TableRow>
                  {tableHead.map((el, i) => (
                    <TableHead key={i} className="font-bold">
                      {el.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <img
                        loading="lazy"
                        className="md:h-24 md:w-auto h-16 w-12"
                        src={e.card_img}
                        alt={e.title}
                      />
                    </TableCell>
                    <TableCell className="break-words">{e.title}</TableCell>
                    <TableCell className="font-bold">{e.platform}</TableCell>
                    <TableCell>{e.price}$</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={`/dashboard/edit/${e.title}`}
                              className="success-btn flex  w-fit py-2 px-2 rounded-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-settings-2">
                                <path d="M20 7h-9" />
                                <path d="M14 17H5" />
                                <circle cx={17} cy={17} r={3} />
                                <circle cx={7} cy={7} r={3} />
                              </svg>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total Products :</TableCell>
                  <TableCell className="text-right">
                    {products.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )
      )}
    </>
  );
}
