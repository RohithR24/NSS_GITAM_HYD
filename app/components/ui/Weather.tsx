import React, { useState, useEffect } from 'react';
import { Sun, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchWeatherAndAirQuality } from '@/api/weather';

interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  windSpeed: string | null;
  airQuality: number | null;
}

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherAndAirQuality(1, 1);
        setWeatherData(data);
      } catch (error) {
        console.log('Error calling method');
        setError("Failed to load weather data.");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

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
      <div className="text-gray-400 text-sm mb-4">Current Weather</div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-[#000040] bg-opacity-40 p-3 rounded-lg">
          <div className="text-gray-400 text-sm">Temperature</div>
          <div className="text-xl font-medium text-gray-200">
            {weatherData.temperature ?? "N/A"}°C
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#000040] bg-opacity-40 p-3 rounded-lg">
          <div className="text-gray-400 text-sm">Humidity</div>
          <div className="text-lg font-medium text-gray-200 flex items-center">
            <Droplets className="w-4 h-4 mr-1 text-[#cc4444] opacity-70" />
            {weatherData.humidity ?? "N/A"}%
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#000040] bg-opacity-40 p-3 rounded-lg">
          <div className="text-gray-400 text-sm">Wind Speed</div>
          <div className="text-lg font-medium text-gray-200 flex items-center">
            <Wind className="w-4 h-4 mr-1 text-[#cc4444] opacity-70" />
            {weatherData.windSpeed ?? "N/A"} KmpH
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Weather;