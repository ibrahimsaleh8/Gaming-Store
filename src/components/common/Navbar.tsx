import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmallNav } from "./SmallNav";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "@/store/MainHooks";
import { ProfileDropDown } from "./ProfileDropDown";
import Logo from "./Logo";
export const Navbar = () => {
  // State

  const [showSmallNav, setShowSmallNav] = useState(false);
  const { isLoggedIn, email } = useAppSelector((state) => state.AuthSlice);
  const { cartLength } = useAppSelector((state) => state.cartSlice);
  // Functions

  const HandelSmallNav = () => {
    setShowSmallNav((pre) => !pre);
  };
  return (
    <div className="main-navbar ">
      <Logo />

      <ul className="lg:flex-1 hidden lg:flex justify-center items-center gap-5">
        <motion.li
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 130,
          }}>
          <NavLink className="nav-li" to={"/"}>
            Products
          </NavLink>
        </motion.li>
        <motion.li
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 130,
          }}>
          <NavLink className="nav-li" to={"/wishlist"}>
            WishList
          </NavLink>
        </motion.li>

        <motion.li
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 130,
          }}>
          <NavLink className="nav-li" to={"/about"}>
            About us
          </NavLink>
        </motion.li>

        <motion.li
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 130,
          }}>
          <NavLink className="nav-li" to={"/contact"}>
            Contact us
          </NavLink>
        </motion.li>

        {!isLoggedIn && (
          <>
            <motion.li
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 130,
                delay: 0.8,
              }}>
              <NavLink className="nav-li" to={"register"}>
                Register
              </NavLink>
            </motion.li>
            <motion.li
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 130,
                delay: 1,
              }}>
              <NavLink className="nav-li" to={"login"}>
                Login
              </NavLink>
            </motion.li>
          </>
        )}
      </ul>

      {/* Icons */}
      <div className="icons flex justify-between items-center gap-4">
        {isLoggedIn && (
          <>
            <ProfileDropDown dashboard={false} email={email} />
          </>
        )}
        <Link to={"/cart"} className="cart relative">
          <span className="absolute top-[-15px] text-[10px] sm:text-[12px] w-5 h-5 bg-yellow-text text-black flex justify-center items-center rounded-full right-0">
            {cartLength}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </Link>

        <motion.svg
          onClick={HandelSmallNav}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 90 }}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lg:hidden cursor-pointer">
          <line x1={4} x2={20} y1={12} y2={12} />
          <line x1={4} x2={20} y1={6} y2={6} />
          <line x1={4} x2={20} y1={18} y2={18} />
        </motion.svg>
      </div>
      <AnimatePresence>
        {showSmallNav && (
          <SmallNav
            email={email}
            isLogged={isLoggedIn}
            cancelFun={HandelSmallNav}
          />
        )}
      </AnimatePresence>
      {/* Small Nav */}
    </div>
  );
};
