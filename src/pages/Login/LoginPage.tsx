import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLoginPage } from "./useLoginPage";
import SmallLoader from "@/components/common/feedback/SmallLoader";
import GoogleAuthButton from "@/components/common/buttons/GoogleAuthButton";
import AlertMessage from "@/components/Dasboard/AlertMessage";

const LoginPage = () => {
  const { errors, onSubmit, register, responseCase } = useLoginPage();

  return (
    <div className="min-h-[60vh]">
      <div className="lg:w-1/2 w-full  mx-auto my-2">
        <AlertMessage
          desc={
            "If You Want to Enter Admin Dashboard to try Admin Functionality Call me from social media accounts to get email and password"
          }
        />
      </div>
      <div className="form-container ">
        <div className="absolute top-0 right-0 sm:p-5 p-3 bg-yellow-text text-black font-bold rounded-bl-2xl">
          Login
        </div>
        {/* Main Form */}
        <div className=" w-full py-6  ">
          <h1 className="text-2xl my-1 mt-3 font-bold flex items-center  ">
            Welcome back !<span>&#128075;</span>
          </h1>
          <p className="my-1 mb-2 text-low-white">
            Don't have account ?{" "}
            <Link className="text-yellow-text underline" to={"/register"}>
              Register here
            </Link>
          </p>

          {/*----------------------- Inputs ------------------ */}

          <form onSubmit={onSubmit} className="inputs flex flex-col gap-5">
            <div className="email">
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="text-black"
              />
            </div>
            {errors.email && (
              <p className="text-error">*{errors.email.message}</p>
            )}
            <div className="password relative">
              <Input
                {...register("password")}
                type={"password"}
                placeholder="Password"
                className="text-black"
              />
            </div>
            {errors.password && (
              <p className="text-error">*{errors.password.message}</p>
            )}
            <div className="button">
              <Button className="bg-yellow-text w-full text-black font-bold border border-second-black hover:bg-black hover:text-yellow-text duration-300 hover:border-low-white">
                {responseCase.pending == "pending" ? (
                  <div className="flex items-center gap-2">
                    Loading... <SmallLoader />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <div className="dvider flex justify-between items-center">
              <span className="border border-second-low-white  flex-1"></span>
              <p className="text-low-white text-center mx-3">Or Login With</p>
              <span className="border border-second-low-white flex-1"></span>
            </div>

            {/* Another Register */}

            <div className="another-register">
              <GoogleAuthButton title="login" />
            </div>
          </form>
        </div>

        {/* Text */}
      </div>
    </div>
  );
};
export default LoginPage;
