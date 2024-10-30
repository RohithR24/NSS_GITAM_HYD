'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Droplets, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  lastUpdated: string;
}

export const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 75,
    humidity: 65,
    windSpeed: 8,
    lastUpdated: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString()
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#002347] rounded-lg p-4 shadow-lg">
      <div className="text-[#FF8C00] font-semibold mb-2">
        Long Beach, CA
      </div>
      <div className="text-gray-300 text-sm mb-4">
        Current Weather
      </div>

      {/* Temperature */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-[#003366] p-2 rounded-full">
          <Sun className="w-5 h-5 text-[#FF8C00]" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">
            {weatherData.temperature}°F
          </div>
        </div>
      </div>

      {/* Humidity */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-[#003366] p-2 rounded-full">
          <Droplets className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className="text-sm text-gray-400">Humidity</div>
          <div className="text-white">{weatherData.humidity}%</div>
        </div>
      </div>

      {/* Wind Speed */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-[#003366] p-2 rounded-full">
          <Wind className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <div className="text-sm text-gray-400">Wind Speed</div>
          <div className="text-white">{weatherData.windSpeed} mph</div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-gray-400 mt-4">
        Last Updated
        <div className="text-[#FF8C00]">{weatherData.lastUpdated}</div>
      </div>

      
    </div>
  );
};

export default Weather;