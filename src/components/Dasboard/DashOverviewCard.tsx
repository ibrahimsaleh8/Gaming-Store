import { Link } from "react-router-dom";
type Props = {
  url: string;
  titel: string;
  number?: number;
  icon: React.ReactNode;
};
export default function DashOverviewCard({ icon, titel, url, number }: Props) {
  return (
    <Link to={url} className="overview-card  group ">
      <div className="text flex flex-col items-start  gap-1">
        <p className="font-bold">{titel}</p>
        {number && <p className="text-xl ">{number}</p>}
      </div>
      <div className="icon w-12 flex items-center text-yellow-text justify-center rounded-xl group-hover:bg-second-black duration-300  bg-main-Background h-12">
        {icon}
      </div>
    </Link>
  );
}
