"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit, Plus, ChevronDown, ChevronUp, X, Calendar } from "lucide-react";
import {
  addInitiativeFB,
  deleteInitiativeFB,
  fetchFocusAreas,
  updateInitiativeFB,
  uploadImage,
} from "@/api";
import { Initiative, InitiativeFocusArea } from "@/types";

const InitiativeDashboard: React.FC = () => {
  const [focusAreas, setFocusAreas] = useState<InitiativeFocusArea[]>([]);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const [editingInitiative, setEditingInitiative] = useState<{
    areaId: string;
    index: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFocusAreas();
        setFocusAreas(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleDeleteInitiative = async (
    areaId: string,
    initiativeId: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      await deleteInitiativeFB(areaId, initiativeId);
      setSuccess("Initiative deleted successfully!");

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

  const handleSaveInitiative = async (
    areaId: string,
    initiativeId: string,
    updatedInitiative: Initiative
  ) => {
    setLoading(true);
    setError(null);

    try {
      await updateInitiativeFB(areaId, updatedInitiative, initiativeId);
      setSuccess("Initiative updated successfully!");

      setFocusAreas((prevAreas) =>
        prevAreas.map((area) =>
          area.id === areaId
            ? {
                ...area,
                initiatives: area.initiatives.map((initiative) =>
                  initiative.id === initiativeId
                    ? updatedInitiative
                    : initiative
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
      images: [],
      caption: "New Initiative",
      description: "Description for the new initiative.",
      location: "Default Location",
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      await addInitiativeFB(areaId, newInitiative, newInitiative.id);
      setSuccess("Initiative added successfully!");

      setFocusAreas((prevAreas) =>
        prevAreas.map((area) =>
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
    setExpandedArea((prevArea) => (prevArea === areaId ? null : areaId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#000040]">
        Initiative Dashboard
      </h1>
      {focusAreas.map((area) => (
        <div
          key={area.id}
          className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div
            className="bg-[#000040] text-white p-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpandArea(area.id)}
          >
            <h2 className="text-xl font-semibold">{area.name}</h2>
            {expandedArea === area.id ? <ChevronUp /> : <ChevronDown />}
          </div>
          {expandedArea === area.id && (
            <div className="p-4">
              {area.initiatives.map((initiative, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  {editingInitiative?.areaId === area.id &&
                  editingInitiative.index === index ? (
                    <EditInitiativeForm
                      initiative={initiative}
                      onSave={(updatedInitiative) =>
                        handleSaveInitiative(
                          area.id,
                          updatedInitiative.id,
                          updatedInitiative
                        )
                      }
                      onCancel={() => setEditingInitiative(null)}
                    />
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2 text-[#000040]">
                        {initiative.caption}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {initiative.description}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Location: {initiative.location}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Date: {initiative.date}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {initiative.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`Initiative ${index + 1} - Image ${
                              imgIndex + 1
                            }`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditInitiative(area.id, index)}
                          className="bg-[#cc4444] text-white p-2 rounded"
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleDeleteInitiative(area.id, initiative.id)
                          }
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
                className="mt-4 bg-[#cc4444] text-white p-2 rounded flex items-center"
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

const EditInitiativeForm: React.FC<EditInitiativeFormProps> = ({
  initiative,
  onSave,
  onCancel,
}) => {
  const [editedInitiative, setEditedInitiative] = useState<Initiative>(initiative);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedInitiative((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      try {
        const uploadedImageUrls = await Promise.all(
          Array.from(files).map(async (file) => {
            const imageUrl = await uploadImage(file, initiative.id);
            return imageUrl;
          })
        );

        setEditedInitiative((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedImageUrls],
        }));
      } catch (error) {
        console.error("Failed to upload images:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setEditedInitiative((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(editedInitiative);
      }}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="caption"
          className="block text-sm font-medium text-[#000040]"
        >
          Caption
        </label>
        <input
          type="text"
          id="caption"
          name="caption"
          value={editedInitiative.caption}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#cc4444] focus:ring focus:ring-[#cc4444] focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#000040]"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={editedInitiative.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#cc4444] focus:ring focus:ring-[#cc4444] focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-[#000040]"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={editedInitiative.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#cc4444] focus:ring focus:ring-[#cc4444] focus:ring-opacity-50"
        />
      </div>
      <div className="relative">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-[#000040]"
        >
          Date
        </label>
        <div className="relative">
          <input
            type="date"
            id="date"
            name="date"
            value={editedInitiative.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#cc4444] focus:ring focus:ring-[#cc4444] focus:ring-opacity-50 pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#000040] mb-2">
          Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#cc4444] focus:ring focus:ring-[#cc4444] focus:ring-opacity-50"
        />
        {uploading && <p>Uploading images...</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {editedInitiative.images.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt={`Initiative image ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <motion.button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <X size={12} />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-[#000040] rounded"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          
          type="submit"
          className={`px-4 py-2 rounded ${uploading ? "bg-gray-400" : "bg-[#cc4444] text-white"}`}
          disabled={uploading}
        >
          Save
        </motion.button>
      </div>
    </form>
  );
};

export default InitiativeDashboard;