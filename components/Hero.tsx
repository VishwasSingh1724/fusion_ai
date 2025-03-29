


'use client'

import ArrowWIcon from "../assets/icons/arrow-w.svg";
import cursorImage from "../assets/images/cursor.png";
import messageImage from "../assets/images/message.png";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Hero = () => {


  return (
    <div className="bg-black h-screen text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lf:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-300px)]"></div>
      <div className="container relative">
        {/* Version Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <a href="#" className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30">
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text [-webkit-background-clip:text]">
              Version 2.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Read More</span>
              <ArrowWIcon />
            </span>
          </a>
        </motion.div>

        {/* Hero Text and Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex relative">
            <motion.div
              className="relative inline-block"
            >
              <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-center inline-flex">
                One Task
                <br /> at a Time
              </h1>

            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.7, type: "spring" }}
              className="absolute right-[476px] top-[108px] hidden sm:inline w-[200px] h-[200px]"
            >
              <Image src={cursorImage} layout="fill" objectFit="contain" alt="Cursor Image" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.7, type: "spring" }}
              className="absolute left-[498px] top-[52px] hidden sm:inline w-[200px] h-[200px]"
            >
              <Image src={messageImage} layout="fill" objectFit="contain" alt="Message Image" />
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center"
        >
          <p className="text-center text-xl mt-8 max-w-md">
            Enjoy this new AI Tool application for your Creativity and Productivity. Lorem, ipsum dolor sit amet consectetur adipisicing elit. aliquam delectus nisi repudiandae expedita. Fugiat, autem dolores!
          </p>
        </motion.div>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={"/dashboard"}>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 hover:text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Start for Free
        </button>
      </Link>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

