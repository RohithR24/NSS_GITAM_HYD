'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  lastUpdated: string | null;
}

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 75,
    humidity: 65,
    windSpeed: 8,
    lastUpdated: null // Initialize as null
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set initial time after component mounts
    setWeatherData(prev => ({
      ...prev,
      lastUpdated: new Date().toLocaleTimeString()
    }));

    const timer = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString()
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" bg-[#000033] bg-opacity-80 rounded-lg p-4 shadow-sm h-full border border-[#000066]"
    >
      <div className="text-[#cc4444] font-medium mb-2 flex items-center justify-between ">
        <span>Rudraram, TS</span>
        <Sun className="w-5 h-5 opacity-70" />
      </div>
      <div className="text-gray-400 text-sm mb-4">
        Current Weather
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-[#000040] bg-opacity-40 p-3 rounded-lg">
          <div className="text-gray-400 text-sm">Temperature</div>
          <div className="text-xl font-medium text-gray-200">
            {weatherData.temperature}°F
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#000040] bg-opacity-40 p-3 rounded-lg">
          <div className="text-gray-400 text-sm">Humidity</div>
          <div className="text-lg font-medium text-gray-200 flex items-center">
            <Droplets className="w-4 h-4 mr-1 text-[#cc4444] opacity-70" />
            {weatherData.humidity}%
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#000040] bg-opacity-40 p-3 rounded-lg">
          <div className="text-gray-400 text-sm">Wind Speed</div>
          <div className="text-lg font-medium text-gray-200 flex items-center">
            <Wind className="w-4 h-4 mr-1 text-[#cc4444] opacity-70" />
            {weatherData.windSpeed} mph
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#000066] border-opacity-20 text-xs text-gray-500">
        Last Updated
        <div className="text-[#cc4444] text-opacity-80">
          {/* Only show time after component has mounted */}
          {mounted ? weatherData.lastUpdated : 'Loading...'}
        </div>
      </div>
    </motion.div>
  );
};

export default Weather;