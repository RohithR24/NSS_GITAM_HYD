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
  
  export const StatCard: React.FC<StatCardProps> = ({ icon, endNumber, label }) => {
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
        className=" bg-[#b7c4ff] rounded-lg shadow-lg hover:shadow-5xl transition-all duration-300 ease-in-out card flex flex-col items-center justify-between p-6 min-h-36 hover:shadow-nssRed-dark"
        initial="hidden"
        animate={controls}
        variants={countVariants}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex flex-row justify-center items-center gap-2">
          <Image src={icon} alt="collaboration icon" width={45} height={45} />
          <motion.h3 className="text-5xl font-bold mb-2">{count}+</motion.h3>
        </div>
  
        <p className="text-gray-600 mt-2 text-center leading-tight">{label}</p>
      </motion.div>
    );
  };