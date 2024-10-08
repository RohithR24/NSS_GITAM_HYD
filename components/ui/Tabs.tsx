import React from "react";
import { TabsProps } from "@/types";

const Tabs: React.FC<TabsProps> = ({ focusAreas, activeTab, onTabSelect }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-4xl">
        {/* Tabs Navigation */}
        <nav
          className="flex justify-between px-4 md:space-x-8 space-x-4"
          aria-label="Tabs"
        >
          {focusAreas.map((area, key) => (
            <button
              key={key}
              onClick={() => onTabSelect(area)}
              className={`relative group flex-grow whitespace-nowrap py-3 px-5 font-semibold text-md transition-all duration-300 ease-in-out rounded-lg ${
                activeTab === area
                  ? "text-indigo-600 shadow-lg bg-indigo-50"
                  : "text-gray-600 bg-transparent"
              }`}
              aria-current={activeTab === area ? "page" : undefined}
            >
              {area}
              
              {/* Animated Underline */}
              <span
                className={`absolute left-0 right-0 bottom-0 mx-auto h-[3px] rounded-full transition-all duration-500 ease-in-out ${
                  activeTab === area
                    ? "w-full bg-indigo-600"
                    : "w-0 group-hover:w-full bg-indigo-400"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
