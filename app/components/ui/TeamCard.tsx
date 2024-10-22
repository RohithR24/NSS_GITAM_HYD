import React from "react";
import { Edit, Trash } from "lucide-react";

interface TeamCardProps<T extends { name: string; image: string | File | null }> {
  data: T;
  displayFields: (item: T) => { label: string; value: string }[];
  onEdit: (data: T) => void;
  onDelete: () => void;
}

const TeamCard = <T extends { name: string; image: string | File | null; memberType: string }>({
  data,
  displayFields,
  onEdit,
  onDelete,
}: TeamCardProps<T>) => (
  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-2">
    <div className="flex items-center">
      {data.image && typeof data.image === "string" && (
        <img
          src={data.image}
          alt={data.name}
          className="w-10 h-10 rounded-full mr-2"
        />
      )}
      <div>
        {displayFields(data).map(({ label, value }) => (
          <p key={label} className="text-sm text-gray-500">
            <strong>{label}: </strong> {value}
          </p>
        ))}
      </div>
    </div>
    <div>
      <button onClick={() => onEdit(data)} className="text-blue-500 mr-2">
        <Edit size={18} />
      </button>
      {data.memberType !=='head'? <button onClick={onDelete} className="text-red-500">
        <Trash size={18} />
      </button>: <></> }
      {/* <button onClick={onDelete} className="text-red-500">
        <Trash size={18} />
      </button> */}
    </div>
  </div>
);

export default TeamCard;
