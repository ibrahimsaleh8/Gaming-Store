import { Link } from "react-router-dom";
import errorVector from "../assets/ErrorVector.webp";
export default function Error404() {
  return (
    <div className="h-screen p-2 flex items-center justify-center gap-3 flex-col">
      <img
        loading="lazy"
        src={errorVector}
        className="h-96 rounded-md"
        alt="Error Vector"
      />
      <p className="text-5xl font-bold ">
        4<span className="text-error">0</span>4
      </p>
      <p className="text-2xl font-bold">OOPS! Page not Found</p>
      <p className="text-second-low-white">
        The page you are looking for has been moved or doesn’t exist anymore, if
        you like you can return to our homepage.
      </p>
      <Link
        className="px-5 tracking-wide py-2 bg-yellow-text text-black font-bold rounded-lg"
        to={"/"}>
        Go Home Page
      </Link>
    </div>
  );
}
