import React from "react";
import { TabsProps } from "@/types";

const Tabs: React.FC<TabsProps> = ({ title, activeTab, onTabSelect }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8">
        {/* Tabs Navigation */}
        <div className="flex rounded-lg bg-[#f0f0f0] p-2 shadow-inner">
          {title.map((area, key) => (
            <button
              key={key}
              onClick={() => onTabSelect(area.id)}
              className={`flex-1 py-3 px-6 rounded-md transition-all duration-300 text-sm font-medium ${
                activeTab === area.id
                  ? 'bg-[#000040] text-white shadow-md transform scale-105'
                  : 'text-[#000040] hover:bg-[#cc4444] hover:text-white'
              }`}
              aria-current={activeTab === area.id ? "page" : undefined}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;