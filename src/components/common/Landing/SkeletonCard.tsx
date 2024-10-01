import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full sm:w-44  md:w-56">
      <Skeleton className="h-44  w-full sm:w-44  md:w-56 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-10" />
        <div className="flex  gap-5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
