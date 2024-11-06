"use client";

import React, { useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import { StatCardProps } from "@/types";

const countVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  endNumber,
  label,
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
      const timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < endNumber) {
            return prevCount + 1;
          }
          clearInterval(timer);
          return prevCount;
        });
      }, 1);
      return () => clearInterval(timer);
    }
  }, [inView, controls, endNumber]);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out p-8 min-h-[200px] flex flex-col items-center justify-center gap-6 hover:shadow-xl hover:shadow-[#cc4444]/20"
      initial="hidden"
      animate={controls}
      variants={countVariants}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="bg-[#000040]/10 p-4 rounded-full">
          <Image
            src={icon}
            alt={`${label} icon`}
            width={40}
            height={40}
            className="brightness-0 saturate-100"
            style={{ 
              objectFit: "contain",
              filter: "invert(9%) sepia(100%) saturate(5876%) hue-rotate(238deg) brightness(102%) contrast(143%)"
            }}
          />
        </div>
        <motion.div className="text-center">
          <span className="text-5xl font-bold text-[#cc4444] tabular-nums">
            {count}
            <span className="text-3xl ml-0.5">+</span>
          </span>
        </motion.div>
      </div>
      <p className="text-[#000040] text-center font-medium text-lg">
        {label}
      </p>
    </motion.div>
  );
};