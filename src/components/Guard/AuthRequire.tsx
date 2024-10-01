import { isUserLogged } from "@/store/Auth/Actions/IsUserLogged";
import { useAppDispatch, useAppSelector } from "@/store/MainHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SmallLoader from "../common/feedback/SmallLoader";

export default function AuthRequire() {
  const { isLoggedIn, responseCase } = useAppSelector(
    (state) => state.AuthSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(isUserLogged());
    };
  }, [dispatch, isLoggedIn]);
  return responseCase.pending == "pending" ? (
    <div className="h-screen flex justify-center items-center text-xl">
      Loading... <SmallLoader />
    </div>
  ) : responseCase.pending == "fulfilled" ? (
    isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to={"/login"} />
    )
  ) : null;
}
