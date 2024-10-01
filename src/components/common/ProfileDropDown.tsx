import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

import LogoutButton from "./buttons/LogoutButton";
import { Link } from "react-router-dom";
type Props = {
  email: string;
  dashboard: boolean;
};
export const ProfileDropDown = ({ email, dashboard }: Props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-main-Background border-black text-white">
          <DropdownMenuLabel className="text-yellow-text ">
            {email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dashboard ? (
            <>
              <DropdownMenuItem>
                <Link className="block w-full h-full px-2 py-1.5 " to={"/"}>
                  Home Page
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {" "}
              <DropdownMenuItem>
                <Link
                  className="block w-full h-full px-2 py-1.5 "
                  to={"/dashboard"}>
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem className="px-2 py-1.5">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};
