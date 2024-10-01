import { useAppSelector } from "@/store/MainHooks";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRequire() {
  const { role } = useAppSelector((state) => state.AuthSlice);

  return role == "admin" ? <Outlet /> : <Navigate to={"/"} />;
}
