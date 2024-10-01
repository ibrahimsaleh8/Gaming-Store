import SmallLoader from "@/components/common/feedback/SmallLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { GetAllOrders } from "@/store/Orders/Actions/GetAllOrders";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentForm } from "@/components/common/Types";
type filterStateType = "pending" | "rejected" | "completed" | "all";
export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { data, error, pending } = useAppSelector((state) => state.OrdersSlice);
  const [filterdState, setFilterdState] = useState<filterStateType>("all");
  const [dataShowing, setDataShowing] = useState<PaymentForm[]>([]);
  useEffect(() => {
    dispatch(GetAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      if (filterdState == "all") {
        setDataShowing(data);
      } else {
        const theData = data.filter((el) => el.status == filterdState);
        setDataShowing(theData);
      }
    }
  }, [data, filterdState]);

  return (
    <div>
      {pending == "pending" ? (
        <SmallLoader />
      ) : data.length > 0 ? (
        <>
          <Select
            defaultValue={"all"}
            onValueChange={(e: filterStateType) => setFilterdState(e)}>
            <SelectTrigger className="text-black w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect width={20} height={16} x={2} y={4} rx={2} />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </TableHead>
                <TableHead>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                  </svg>
                </TableHead>
                <TableHead>$</TableHead>
                <TableHead>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-file-chart-column-increasing">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M8 18v-2" />
                    <path d="M12 18v-4" />
                    <path d="M16 18v-6" />
                  </svg>
                </TableHead>
                <TableHead>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-receipt-text">
                    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                    <path d="M14 8H8" />
                    <path d="M16 12H8" />
                    <path d="M13 16H8" />
                  </svg>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataShowing.map((el, i) => (
                <TableRow key={i}>
                  <TableCell className="break-all">
                    <p>{el.email}</p>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {el.products?.length}
                  </TableCell>
                  <TableCell className="text-[11px] md:text-sm">
                    {el.total}$
                  </TableCell>

                  <TableCell>
                    {el.status == "pending" ? (
                      <p className="text-yellow-text flex items-center gap-1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z" />
                          </svg>
                        </span>
                        <span className="hidden md:flex"> {el.status}</span>
                      </p>
                    ) : el.status == "completed" ? (
                      <p className="text-success-color flex gap-1 items-center">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                          </svg>
                        </span>
                        <span className="hidden md:flex"> {el.status}</span>
                      </p>
                    ) : (
                      <p className="text-error flex gap-1 items-center">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                          </svg>
                        </span>
                        <span className="hidden md:flex"> {el.status}</span>
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      className="success-btn md:px-4 px-1 text-sm py-1 rounded-lg flex items-center gap-2 w-fit"
                      to={`${el.anotherID}`}>
                      <span className="hidden md:flex">Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
}
