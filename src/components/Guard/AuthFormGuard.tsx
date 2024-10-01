import { useAppSelector } from "@/store/MainHooks";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthFormGuard() {
  const { isLoggedIn } = useAppSelector((state) => state.AuthSlice);

  return isLoggedIn ? <Navigate to={"/"} /> : <Outlet />;
}
