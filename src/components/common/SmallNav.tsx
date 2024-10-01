import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
type Props = {
  cancelFun: () => void;
  isLogged: boolean;
  email: string;
};
export const SmallNav = ({ cancelFun, isLogged, email }: Props) => {
  return (
    <motion.div
      initial={{
        width: "100%",
        height: "0",
        opacity: 0,
      }}
      animate={{ opacity: 1, height: "100vh" }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: "0" }}
      className="smallNav">
      <div
        className="cancel absolute right-4 top-4 cursor-pointer"
        onClick={cancelFun}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-error">
          <circle cx={12} cy={12} r={10} />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </div>
      {isLogged && email.length > 0 && (
        <div className="absolute text-white text-center top-9 ">
          <h1 className="flex items-center justify-center">
            Welcome <span>&#128075;</span>
          </h1>
          <p className="text-yellow-text">{email}</p>
        </div>
      )}
      <ul className="flex flex-col justify-center items-center gap-5 w-full">
        <motion.li
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-full">
          <NavLink className="li-small" to={"/"}>
            Products
          </NavLink>
        </motion.li>
        <motion.li
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-full">
          <NavLink className="li-small" to={"/wishlist"}>
            Wishlist
          </NavLink>
        </motion.li>

        <motion.li
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="w-full">
          <NavLink className="li-small" to={"/about"}>
            About us
          </NavLink>
        </motion.li>
        <motion.li
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="w-full">
          <NavLink className="li-small" to={"/contact"}>
            Contact us
          </NavLink>
        </motion.li>
        {!isLogged && (
          <>
            <motion.li
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="w-full">
              <NavLink className="li-small" to={"register"}>
                Register
              </NavLink>
            </motion.li>
            <motion.li
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 }}
              className="w-full">
              <NavLink className="li-small" to={"login"}>
                Login
              </NavLink>
            </motion.li>
          </>
        )}
      </ul>
    </motion.div>
  );
};
