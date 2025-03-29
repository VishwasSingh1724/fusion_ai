"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import WaveyImage from "./WaveyImage";
export default function FeaturedSection({ content, contentClassName }) {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end 0.3"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <section className="relative bg-transparent h-screen w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900" />
      <div className="relative pt-16 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Featured Solutions
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our featured sections crafted to enhance your experience.
          </p>
        </motion.div>

        <motion.div
          className="h-[46rem] overflow-x-auto flex justify-center relative space-x-12 rounded-lg py-4"
          ref={ref}
        >
          <div className="relative flex items-start px-4">
            <div className="max-w-2xl">
              {content.map((item, index) => (
                <div key={item.title + index} className="mb-72 mt-24">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.4,
                      y: activeCard === index ? 0 : 20,
                      scale: activeCard === index ? 1.1 : 1,
                    }}
                    className="text-3xl font-bold text-white"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.5,
                      y: activeCard === index ? 0 : 10,
                    }}
                    className="text-lg text-white/70 mt-6 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
              <div className="h-32" />
            </div>
          </div>
          <div className="hidden lg:block sticky -top-14 ">
            <div
              className={cn(
                "h-[90vh] w-[650px] rounded-lg overflow-hidden z-40", // Increased height and width
                contentClassName
              )}
            >
              <WaveyImage
                imageUrl={content[activeCard].imageUrl}
                effect={content[activeCard].effect}
                className="w-full h-full object-cover mb-5"
              />
            </div>
          </div>
        </motion.div> 
      </div>
    </section>
  );
}
