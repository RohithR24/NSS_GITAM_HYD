"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BlogComingSoon() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("2024-12-31T23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-[#000040] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Blog is Coming Soon!</h1>
        <p className="text-xl md:text-2xl text-[#cc4444] mb-8">Stay tuned for insights, updates, and stories</p>
        
        <div className="flex justify-center space-x-6 mb-8">
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold">{days}</span>
            <p className="text-sm text-gray-400">Days</p>
          </div>
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold">{hours}</span>
            <p className="text-sm text-gray-400">Hours</p>
          </div>
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold">{minutes}</span>
            <p className="text-sm text-gray-400">Minutes</p>
          </div>
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold">{seconds}</span>
            <p className="text-sm text-gray-400">Seconds</p>
          </div>
        </div>

        <p className="mb-8 max-w-md mx-auto">
          We’re excited to launch our blog soon! Expect engaging content covering various topics, insights, and stories from our community. Follow us to get notified when we go live!
        </p>

        
      </motion.div>
    </div>
  );
}
