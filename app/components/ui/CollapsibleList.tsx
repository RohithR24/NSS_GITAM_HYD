import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleListProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onAddItem: () => void;
}

const CollapsibleList = <T extends {}>({
  title,
  items,
  renderItem,
  onAddItem,
}: CollapsibleListProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div
        className="bg-blue-100 p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isExpanded && (
        <div className="p-4">
          {items.map(renderItem)}
          <button
            onClick={onAddItem}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mt-2"
          >
            Add {title}
          </button>
        </div>
      )}
    </div>
  );
};

export default CollapsibleList;
