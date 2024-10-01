import TextAnimation from "@/components/common/TextAnimation";
import avatar from "../assets/AboutAvatar.webp";
import { motion } from "framer-motion";

export default function About() {
  const descText1 =
    "Gaming Store was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of Video Games products from the comfort of their homes.";

  return (
    <div className="py-4 min-h-[80vh]">
      <p className="text-2xl font-bold tracking-wider uppercase text-yellow-text mx-auto w-fit my-2 relative">
        About <span className="text-white">Us</span>
        <span className="w-9 h-1 bg-second-low-white absolute right-[-45px] top-1/2 -translate-y-1/2"></span>
      </p>

      <div className="flex items-center md:items-start gap-8 md:flex-row flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}>
          <img
            className=" about-avatar  h-52 rounded-lg "
            src={avatar}
            alt="About Avatat"
          />
        </motion.div>

        <div className="text flex-1  flex flex-col gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="leading-[1.7] text-center text-lg md:text-start">
            <TextAnimation text={descText1} />
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="leading-[1.7] text-center text-lg md:text-start">
            this website developed by{" "}
            <span className="text-yellow-text">ibrahim saleh </span>
            and built with React Typescript, Redux Toolkit , RTK Query ,Tailwind
            css, shadcn ui , Framer motion,React Hook Form with yup Validation ,
            Firebase
          </motion.p>
        </div>
      </div>

      <p className="text-xl tracking-wider mx-auto md:mx-0 uppercase font-bold text-yellow-text  w-fit mt-10 relative">
        Why choose <span className="text-white">Us</span>
        <span className="w-9 h-1 bg-second-low-white absolute right-[-45px] top-1/2 -translate-y-1/2"></span>
      </p>

      <div className="mt-10 flex flex-wrap gap-3 lg:flex-row flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className="about-card relative border border-second-low-white bg-second-black p-7 rounded-lg lg:w-[32%] w-full">
          <div className="leading-[1.7] flex flex-col gap-4  ">
            <p className="text-yellow-text font-bold tracking-wider	">
              Convenience:
            </p>
            <p className="text-low-white">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
          }}
          className="about-card leading-[1.7] border border-second-low-white bg-second-black p-7 flex flex-col gap-4 rounded-lg lg:w-[32%] w-full">
          <p className="text-yellow-text font-bold tracking-wider	">Quality:</p>
          <p className="text-low-white">
            We offer a wide range of high-quality gaming gear from the top
            brands. Whether you're a casual gamer or a professional.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 2,
          }}
          className="about-card leading-[1.7] border border-second-low-white bg-second-black p-7 flex flex-col gap-4 rounded-lg lg:w-[32%] w-full">
          <p className="text-yellow-text font-bold tracking-wider	">
            Customer Support:
          </p>
          <p className="text-low-white">
            Our dedicated customer support team is available 24/7 to help with
            any questions or issues.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
