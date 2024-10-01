import SocialMediaList from "@/components/common/SocialMediaList";
import ContactUs from "./Dashboard/User/ContactUs";
import { motion } from "framer-motion";

export default function ContactUsPage() {
  return (
    <div className="py-10 min-h-[70vh] ">
      <div className="flex gap-3 flex-col-reverse md:flex-row justify-center  ">
        <SocialMediaList col={true} />
        <ContactUs />
      </div>
      <div className="mt-5 flex gap-4 mx-auto justify-center items-center flex-col sm:flex-row">
        <motion.a
          href="mailto:ebrihm576@gmail.com"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-main-Background cursor-pointer text-white border border-second-low-white  p-3 sm:w-64 w-full flex flex-col justify-center items-center gap-3 rounded-lg">
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
            className="lucide lucide-mail">
            <rect width={20} height={16} x={2} y={4} rx={2} />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <p>ebrihm576@gmail.com</p>
        </motion.a>

        <motion.a
          href="https://wa.me/201015405904"
          target="_blank"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-main-Background cursor-pointer text-white border border-second-low-white  p-3 sm:w-64 w-full flex flex-col justify-center items-center gap-3 rounded-lg">
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
            className="lucide lucide-phone">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>

          <p>+20 01015405904</p>
        </motion.a>
      </div>
    </div>
  );
}
