import { ToastSweeat } from "@/components/common/feedback/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { motion } from "framer-motion";
import TextAnimation from "@/components/common/TextAnimation";

export default function ContactUs() {
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const sentData = {
      ...data,
      access_key: "be2875ab-8a42-4649-a32e-166f14e7bcf5",
    };
    const json = JSON.stringify(sentData);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setData({
        email: "",
        name: "",
        message: "",
      });
      ToastSweeat(2000).fire({
        title: "Message sent successfully!",
        icon: "success",
      });
    }
  };
  return (
    <div className="bg-second-black relative p-5 rounded-lg md:w-3/4  ">
      <div className="hover:bg-second-black duration-200 border border-second-black hover:border-yellow-text group absolute top-[-10px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex justify-center items-center bg-yellow-text p-2">
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
          className="text-black group-hover:text-yellow-text duration-200">
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
          <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
        </svg>
      </div>
      <div className="flex items-center gap-2 text-lg text-yellow-text">
        <p>
          <TextAnimation text={"Contact Form"} />
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col relative gap-4 mt-3 rounded-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-start flex-col md:flex-row justify-between gap-5">
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <Input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}>
          <Textarea
            name="message"
            value={data.message}
            onChange={handleChange}
            required
            placeholder="Type your message here."
          />
        </motion.div>
        <Button
          type="submit"
          className="bg-yellow-text text-black hover:bg-second-black hover:text-white duration-200 border border-yellow-text hover:border-second-low-white w-44 gap-2">
          Send
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-send-horizontal">
            <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
            <path d="M6 12h16" />
          </svg>
        </Button>
      </form>
    </div>
  );
}
