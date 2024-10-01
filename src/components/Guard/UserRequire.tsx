import { useAppSelector } from "@/store/MainHooks";
import { Navigate, Outlet } from "react-router-dom";

export default function UserRequire() {
  const { role } = useAppSelector((state) => state.AuthSlice);

  return role == "user" ? <Outlet /> : <Navigate to={"/"} />;
}
