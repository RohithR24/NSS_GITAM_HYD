"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, Plus, ChevronDown, ChevronUp, X } from 'lucide-react';

interface Initiative {
  images: string[];
  caption: string;
  description: string;
}

interface InitiativeFocusArea {
  id: string;
  name: string;
  initiatives: Initiative[];
}

const initiativeFocusAreas: InitiativeFocusArea[] = [
  {
    id: "education",
    name: "Education",
    initiatives: [
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Literacy campaign in rural areas",
        description: "A comprehensive literacy program targeting rural communities to improve reading and writing skills."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Computer education for underprivileged children",
        description: "Providing computer literacy and basic programming skills to underprivileged children to bridge the digital divide."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Adult education programs",
        description: "Offering continuing education opportunities for adults to enhance their skills and knowledge."
      },
    ],
  },
  {
    id: "environment",
    name: "Environment",
    initiatives: [
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Tree plantation drive",
        description: "Organizing large-scale tree planting events to combat deforestation and promote environmental awareness."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Plastic-free campus campaign",
        description: "Implementing measures to reduce plastic usage on campus and promote eco-friendly alternatives."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Water conservation project",
        description: "Developing and implementing strategies to conserve water resources in the local community."
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    initiatives: [
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Blood donation camp",
        description: "Organizing regular blood donation drives to support local healthcare facilities."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "COVID-19 awareness program",
        description: "Educating the community about COVID-19 prevention measures and vaccination importance."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Yoga and meditation workshop",
        description: "Conducting workshops to promote mental and physical well-being through yoga and meditation practices."
      },
    ],
  },
  {
    id: "community",
    name: "Community Service",
    initiatives: [
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Village adoption program",
        description: "Adopting nearby villages to provide comprehensive development support and resources."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Cleanliness drive in local community",
        description: "Organizing regular clean-up events to maintain cleanliness in local neighborhoods."
      },
      {
        images: ["/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400","/placeholder.svg?height=300&width=400"],
        caption: "Elderly care initiative",
        description: "Providing support and companionship to elderly members of the community through various programs."
      },
    ],
  },
];

const InitiativeDashboard: React.FC = () => {
  const [focusAreas, setFocusAreas] = useState<InitiativeFocusArea[]>(initiativeFocusAreas);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const [editingInitiative, setEditingInitiative] = useState<{ areaId: string; index: number } | null>(null);

  const handleDeleteInitiative = (areaId: string, index: number) => {
    setFocusAreas(prevAreas => 
      prevAreas.map(area => 
        area.id === areaId 
          ? { ...area, initiatives: area.initiatives.filter((_, i) => i !== index) }
          : area
      )
    );
  };

  const handleEditInitiative = (areaId: string, index: number) => {
    setEditingInitiative({ areaId, index });
  };

  const handleSaveInitiative = (areaId: string, index: number, updatedInitiative: Initiative) => {
    setFocusAreas(prevAreas => 
      prevAreas.map(area => 
        area.id === areaId 
          ? { 
              ...area, 
              initiatives: area.initiatives.map((init, i) => 
                i === index ? updatedInitiative : init
              ) 
            }
          : area
      )
    );
    setEditingInitiative(null);
  };

  const handleAddInitiative = (areaId: string) => {
    const newInitiative: Initiative = {
      images: ["/placeholder.svg?height=300&width=400"],
      caption: "New Initiative",
      description: "Description for the new initiative."
    };

    setFocusAreas(prevAreas => 
      prevAreas.map(area => 
        area.id === areaId 
          ? { ...area, initiatives: [...area.initiatives, newInitiative] }
          : area
      )
    );
  };

  const toggleExpandArea = (areaId: string) => {
    setExpandedArea(prevArea => prevArea === areaId ? null : areaId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Initiative Dashboard</h1>
      {focusAreas.map(area => (
        <div key={area.id} className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div 
            className="bg-blue-500 text-white p-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpandArea(area.id)}
          >
            <h2 className="text-xl font-semibold">{area.name}</h2>
            {expandedArea === area.id ? <ChevronUp /> : <ChevronDown />}
          </div>
          {expandedArea === area.id && (
            <div className="p-4">
              {area.initiatives.map((initiative, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  {editingInitiative?.areaId === area.id && editingInitiative.index === index ? (
                    <EditInitiativeForm
                      initiative={initiative}
                      onSave={(updatedInitiative) => handleSaveInitiative(area.id, index, updatedInitiative)}
                      onCancel={() => setEditingInitiative(null)}
                    />
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2">{initiative.caption}</h3>
                      <p className="text-gray-600 mb-2">{initiative.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {initiative.images.map((img, imgIndex) => (
                          <img key={imgIndex} src={img} alt={`Initiative ${index + 1} - Image ${imgIndex + 1}`} className="w-20 h-20 object-cover rounded" />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditInitiative(area.id, index)}
                          className="bg-yellow-500 text-white p-2 rounded"
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteInitiative(area.id, index)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddInitiative(area.id)}
                className="mt-4 bg-green-500 text-white p-2 rounded flex items-center"
              >
                <Plus size={16} className="mr-2" /> Add New Initiative
              </motion.button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface EditInitiativeFormProps {
  initiative: Initiative;
  onSave: (updatedInitiative: Initiative) => void;
  onCancel: () => void;
}

const EditInitiativeForm: React.FC<EditInitiativeFormProps> = ({ initiative, onSave, onCancel }) => {
  const [editedInitiative, setEditedInitiative] = useState<Initiative>(initiative);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedInitiative(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    setEditedInitiative(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const handleAddImage = () => {
    setEditedInitiative(prev => ({
      ...prev,
      images: [...prev.images, "/placeholder.svg?height=300&width=400"]
    }));
  };

  const handleRemoveImage = (index: number) => {
    setEditedInitiative(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(editedInitiative); }} className="space-y-4">
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
        <input
          type="text"
          id="caption"
          name="caption"
          value={editedInitiative.caption}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={editedInitiative.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        {editedInitiative.images.map((img, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="ml-2 p-2 bg-red-500 text-white rounded"
            >
              <X size={16} />
            </motion.button>
          </div>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleAddImage}
          className="mt-2 p-2 bg-green-500 text-white rounded flex items-center"
        >
          <Plus size={16} className="mr-2" /> Add Image
        </motion.button>
      </div>
      <div className="flex justify-end space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </motion.button>
      </div>
    </form>
  );
};

export default InitiativeDashboard;