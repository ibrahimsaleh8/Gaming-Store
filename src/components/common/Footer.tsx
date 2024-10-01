import { Link } from "react-router-dom";
import Logo from "./Logo";
import SocialMediaList from "./SocialMediaList";

export default function Footer() {
  return (
    <div className="border-t mt-auto border-[#282828] w-full ">
      <div className="container py-5 flex flex-col md:flex-row gap-3 justify-around">
        <div className="flex flex-col gap-6">
          <div className="text-xl">
            <Logo />
          </div>
          <p>Developed with ❤️ By Ibrahim Saleh</p>
        </div>

        <div>
          <p className="font-bold uppercase text-yellow-text tracking-wider">
            Some Links
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            <li>
              <Link className="flex hover:underline duration-150" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="flex hover:underline duration-150" to={"/about"}>
                About us
              </Link>
            </li>
            <li>
              <Link
                className="flex hover:underline duration-150"
                to={"/contact"}>
                Contact us
              </Link>
            </li>
            <li>
              <Link className="flex hover:underline duration-150" to={"/login"}>
                Login
              </Link>
            </li>
            <li>
              <Link
                className="flex hover:underline duration-150"
                to={"/register"}>
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold uppercase text-yellow-text tracking-wider">
            Social
          </p>
          <SocialMediaList col={false} />
        </div>
      </div>
    </div>
  );
}
