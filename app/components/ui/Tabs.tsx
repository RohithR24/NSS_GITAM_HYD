import React from "react";
import { TabsProps } from "@/types";

const Tabs: React.FC<TabsProps> = ({ title, activeTab, onTabSelect }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Tabs Navigation */}
        <div className="flex rounded-lg bg-blue-100 p-1">
          {title.map((area, key) => (
            <button
              key={key}
              onClick={() => onTabSelect(area.id)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === area.id ? 'bg-blue-600 text-white' : 'text-blue-800 hover:bg-blue-300'
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
