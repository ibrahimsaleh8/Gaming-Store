import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegisterPage } from "./useRegisterPage";
import SmallLoader from "@/components/common/feedback/SmallLoader";
import GoogleAuthButton from "@/components/common/buttons/GoogleAuthButton";

const RegisterPage = () => {
  const { errors, onSubmit, register, HandleShowPass, showPass, pending } =
    useRegisterPage();

  return (
    <div className="form-container">
      <div className="absolute top-0 right-0 sm:p-5 p-3 bg-yellow-text text-black font-bold rounded-bl-2xl">
        SignUp
      </div>

      {/* Main Form */}
      <div className="form w-full py-6 ">
        <h1 className="text-2xl my-3">Register New Account</h1>
        <p className="my-3 text-low-white">
          Already have account ?{" "}
          <Link className="text-yellow-text underline" to={"/login"}>
            Login here
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
            <p className="text-error">* {errors.email.message}</p>
          )}

          <div className="password relative">
            <Input
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="text-black"
            />
            <div
              onClick={HandleShowPass}
              className="show-pass absolute right-2 top-1/2 text-black -translate-y-1/2">
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16">
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className=""
                  viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-error">* {errors.password.message}</p>
          )}
          <div className="Repeate-password">
            <Input
              {...register("rePassword")}
              type="password"
              placeholder="Repeate Password"
              className="text-black"
            />
          </div>
          {errors.rePassword && (
            <p className="text-error">* {errors.rePassword.message}</p>
          )}
          <div className="button">
            <Button className="bg-yellow-text w-full text-black font-bold border border-second-black hover:bg-black hover:text-yellow-text duration-300 hover:border-low-white">
              {pending == "pending" ? (
                <>
                  Loading... <SmallLoader />
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="dvider flex justify-between items-center">
            <span className="border border-second-low-white  flex-1"></span>
            <p className="text-low-white text-center mx-3">Or Register With</p>
            <span className="border border-second-low-white flex-1"></span>
          </div>

          {/* Another Register */}

          <div className="another-register">
            <GoogleAuthButton title="register" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
