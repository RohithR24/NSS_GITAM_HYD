"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit, Plus, ChevronDown, ChevronUp, X } from "lucide-react";
import { addInitiativeFB, deleteInitiativeFB, fetchFocusAreas, updateInitiativeFB } from "@/api";
import { Initiative, InitiativeFocusArea } from "@/types";



const InitiativeDashboard: React.FC = () => {
  const [focusAreas, setFocusAreas] = useState<InitiativeFocusArea[]>([]);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const [editingInitiative, setEditingInitiative] = useState<{ areaId: string; index: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Fetch data from Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFocusAreas(); // Fetch data using the separate function
        setFocusAreas(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

 

  const handleDeleteInitiative = async (areaId: string, initiativeId: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteInitiativeFB(areaId, initiativeId); // Call delete function
      setSuccess("Initiative deleted successfully!");

      // Remove initiative from the local state
      setFocusAreas((prevAreas) =>
        prevAreas.map((area) =>
          area.id === areaId
            ? {
                ...area,
                initiatives: area.initiatives.filter(
                  (initiative) => initiative.id !== initiativeId
                ),
              }
            : area
        )
      );
      console.log("Initiative successfully deleted:", initiativeId);
    } catch (error) {
      console.error("Error in handleDeleteInitiative:", error);
      setError("Failed to delete initiative.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditInitiative = (areaId: string, index: number) => {
    setEditingInitiative({ areaId, index });
  };

  const handleSaveInitiative = async (areaId: string, initiativeId: string, updatedInitiative: Initiative) => {
    setLoading(true);
    setError(null);

    try {
      await updateInitiativeFB(areaId, updatedInitiative, initiativeId); // Overwrite the initiative document in Firestore
      setSuccess("Initiative updated successfully!");

      setFocusAreas((prevAreas) =>
        prevAreas.map((area) =>
          area.id === areaId
            ? {
                ...area,
                initiatives: area.initiatives.map((initiative) =>
                  initiative.id === initiativeId ? updatedInitiative : initiative
                ),
              }
            : area
        )
      );
      setEditingInitiative(null);
    } catch (error) {
      console.error("Error in handleSaveInitiative:", error);
      setError("Failed to update initiative.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddInitiative = async (areaId: string) => {
    const newInitiative: Initiative = {
      id: Date.now().toString(),
      images: ["Image"],
      caption: "New Initiative",
      description: "Description for the new initiative.",
      location: "Default Location",
      date: new Date().toISOString().slice(0, 10)
    };

    try {
      await addInitiativeFB(areaId, newInitiative, newInitiative.id); // Call the modular add function
      setSuccess("Initiative added successfully!");

      // Update the state to include the new initiative without refetching
      setFocusAreas(prevAreas =>
        prevAreas.map(area =>
          area.id === areaId
            ? { ...area, initiatives: [...area.initiatives, newInitiative] }
            : area
        )
      );
    } catch (error) {
      setError("error");
    } finally {
      setLoading(false);
    }
  };


  const toggleExpandArea = (areaId: string) => {
    setExpandedArea(prevArea => (prevArea === areaId ? null : areaId));
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
                      onSave={updatedInitiative => handleSaveInitiative(area.id, updatedInitiative.id,  updatedInitiative)}
                      onCancel={() => setEditingInitiative(null)}
                    />
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2">{initiative.caption}</h3>
                      <p className="text-gray-600 mb-2">{initiative.description}</p>
                      <p className="text-gray-600 mb-2">Location: {initiative.location}</p>
                      <p className="text-gray-600 mb-2">Date: {initiative.date}</p>
                      {/* <div className="flex flex-wrap gap-2 mb-2">
                        {initiative.images.map((img, imgIndex) => (
                          <img key={imgIndex} src={img} alt={`Initiative ${index + 1} - Image ${imgIndex + 1}`} className="w-20 h-20 object-cover rounded" />
                        ))}
                      </div> */}
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
                          onClick={() => handleDeleteInitiative(area.id, initiative.id)}
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
      images: prev.images.map((img, i) => (i === index ? value : img))
    }));
  };

  const handleAddImage = () => {
    setEditedInitiative(prev => ({
      ...prev,
      images: [...prev.images, "image"]
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
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={editedInitiative.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={editedInitiative.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        
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

