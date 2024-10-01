import { Skeleton } from "@/components/ui/skeleton";

export default function SkelatonProdInfo() {
  return (
    <div className="flex items-start gap-2 mt-3 lg:flex-row flex-col-reverse overflow-x-hidden">
      <div className="flex items-start flex-col flex-1 gap-4">
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-[40rem] w-[60rem]" />
        <Skeleton className="h-6 md:w-[80%] w-full " />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      {/* Skelaton sidebar */}
      <div className="sideBar-pro-info md:mt-14">
        <Skeleton className="h-96 w-full" />
        <div className="flex flex-col gap-7 mt-4">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-6 md:w-[80%] w-full " />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
