"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the Three.js component with no SSR
const UnrollImage = dynamic(() => import("@/components/unrollImage"), {
  ssr: false,
});

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Tool",
      description:
        "Select from our range of AI-powered tools for your specific needs",
      image:
        "https://image.pollinations.ai/prompt/3d%20illustration%20of%20a%20small%20ai%20white%20a%20bit%20box%20shaped%20bot%20thinkin%20selecting%20or%20choosing%20from%20the%20options%20available%20on%20website%20in%20laptop%20of%20different%20ai%20Feature%20to%20Select%20from%20our%20range%20of%20AI-powered%20tools%20for%20your%20specific%20needs%20image%2C%20music%2C%20chat%2C%20code%20floating%20icons%20with%20light%20purple%20background%20front-top%20view%20show%20in%20bubble%20cloud%20?width=1497&height=1094&seed=1617199&enhance=true&nologo=true&model=flux", // Replace with actual image paths
      isImageLeft: true,
    },
    {
      step: "02",
      title: "Input Your Requirements",
      description: "Describe what you want to create or achieve",
      image:
        "https://image.pollinations.ai/prompt/3d%20illustration%20of%20a%20small%20ai%20white%20a%20bit%20box%20shaped%20bot%20typing%20or%20inserting%20an%20input%20in%20the%20floating%20transparent%20glass%20morphism%20prompt%20input%20field%20light%20purple%20background.%20Floating%20input%20area%20contains%20text%20%22prompt%20here%22%20.%20Also%20bubble%20cloud%20contains%20text%20%22generating%22%0Akeep%20the%20spelling%20accurate%0A?width=1497&height=1094&seed=1617234&enhance=true&nologo=true&model=flux",
      isImageLeft: false,
    },
    {
      step: "03",
      title: "Get Results Instantly",
      description:
        "Receive AI-generated content in seconds and enhance your productivity",
      image:"https://image.pollinations.ai/prompt/3d%20illustration%20of%20an%20cute%20small%20ai%20white%20a%20bit%20box%20shaped%20bot%20presenting%20generated%20assets%20as%20in%20floating%20icons%20of%20media%20type%20like%20image%2Cmusic%2Cchat%2Ccode%20%20with%20light%20purple%20background?width=1497&height=1094&seed=1617128&nologo=true&model=flux",
      isImageLeft: true,
    },
  ];

  return (
    <section className="relative bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-700" />

      <div className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get started with our AI tools in three simple steps
          </p>
        </motion.div>

        <div className="space-y-24"></div>
        {steps.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="relative group"
  >
    <div
      className={`flex flex-col mb-32 lg:flex-row ${
        item.isImageLeft ? '' : 'lg:flex-row-reverse'
      } items-center gap-16`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-[400px] relative flex justify-center">
        <Suspense fallback={<div className="w-full h-full bg-white/10 animate-pulse" />}>
          <UnrollImage imageUrl={item.image} />
        </Suspense>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="w-full lg:w-1/2 relative bg-white/5 backdrop-blur-sm rounded-xl p-8 transition-colors duration-300 hover:bg-white/10"
      >
        <motion.div
          className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent absolute -top-8 left-0"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {item.step}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
        <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
          {item.description}
        </p>
      </motion.div>
    </div>
  </motion.div>
))}

      </div>
    </section>
  );
}
