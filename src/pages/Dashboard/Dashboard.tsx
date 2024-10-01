import DashboadrSideBar from "@/components/Dasboard/DashboadrSideBar";
import DashboardNav from "@/components/Dasboard/DashboardNav";
import { useAppSelector } from "@/store/MainHooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { email, role } = useAppSelector((state) => state.AuthSlice);
  const nav = useNavigate();
  useEffect(() => {
    if (role == "admin") {
      nav("overview");
    } else {
      nav("user-overview");
    }
  }, [role]);
  return (
    <div className="flex">
      <DashboadrSideBar role={role} />
      <div className="flex flex-col flex-1">
        <DashboardNav email={email} />
        <div className="container  py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
