"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import {
  createEventFB,
  deleteEventById,
  fetchEventsFB,
  updateEvent,
  uploadImageToFirebase,
} from "@/api";
import { EventCardProps } from "@/types";

// NSS Colors
const NSS_NAVY = "#000040";
const NSS_ORANGE = "#cc4444";


export default function EventsAdmin() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventCardProps | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await fetchEventsFB();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const openModal = (event: EventCardProps | null = null) => {
    setCurrentEvent(
      event || {
        id: String(Date.now()),
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        teaser: "",
        poster: "",
        objectives: [""],
        registrationLink: "",
        isPast: false,
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (currentEvent) {
      try {
        if (currentEvent.id) {
          await updateEvent(currentEvent.id, currentEvent)
          setEvents(events.map(event => event.id === currentEvent.id ? currentEvent : event))
        } else {
          const id = await createEventFB(currentEvent)
          setEvents([...events, { ...currentEvent, id }])
        }
        closeModal()
      } catch (error) {
        console.error("Error handling submit:", error)
      }
    }
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEventById(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file && currentEvent) {
      try {
        const imageUrl = await uploadImageToFirebase(file);
        setCurrentEvent({ ...currentEvent, poster: imageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#f0f0f5" }}
    >
      <h1
        className="text-4xl font-bold text-center mb-12"
        style={{ color: NSS_NAVY }}
      >
        NSS Events Admin
      </h1>

      <div className="mb-8 text-center">
        <button
          onClick={() => openModal()}
          className="px-6 py-3 rounded-full text-white font-bold transition-all duration-300"
          style={{
            backgroundColor: NSS_ORANGE,
            boxShadow: "0 4px 6px rgba(204, 68, 68, 0.25)",
          }}
        >
          <Plus className="inline-block mr-2" size={20} />
          Add New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={event.poster}
                alt={event.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: NSS_NAVY }}
              >
                {event.title}
              </h2>
              <p className="text-sm mb-2" style={{ color: NSS_ORANGE }}>
                {event.date} at {event.time}
              </p>
              <p className="text-sm mb-4" style={{ color: NSS_NAVY }}>
                {event.location}
              </p>
              <p className="text-sm mb-4">{event.teaser}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => openModal(event)}
                  className="px-4 py-2 rounded text-white font-bold"
                  style={{ backgroundColor: NSS_NAVY }}
                >
                  <Edit className="inline-block mr-2" size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="px-4 py-2 rounded text-white font-bold"
                  style={{ backgroundColor: NSS_ORANGE }}
                >
                  <Trash2 className="inline-block mr-2" size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ color: NSS_NAVY }}>
              {currentEvent.id ? "Edit Event" : "Add New Event"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={currentEvent.title}
                    onChange={(e) =>
                      setCurrentEvent({
                        ...currentEvent,
                        title: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={currentEvent.date}
                    onChange={(e) =>
                      setCurrentEvent({ ...currentEvent, date: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={currentEvent.time}
                    onChange={(e) =>
                      setCurrentEvent({ ...currentEvent, time: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={currentEvent.location}
                    onChange={(e) =>
                      setCurrentEvent({
                        ...currentEvent,
                        location: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={currentEvent.description}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="teaser"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teaser
                </label>
                <input
                  type="text"
                  id="teaser"
                  value={currentEvent.teaser}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, teaser: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="poster"
                  className="block text-sm font-medium text-gray-700"
                >
                  Poster
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="poster"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded text-white font-bold"
                    style={{ backgroundColor: NSS_NAVY }}
                  >
                    <Upload className="inline-block mr-2" size={16} />
                    Upload Image
                  </button>
                  {currentEvent.poster && (
                    <span className="ml-3 text-sm text-gray-600">
                      Image selected
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Objectives
                </label>
                {currentEvent.objectives.map((objective, index) => (
                  <div key={index} className="flex mt-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...currentEvent.objectives];
                        newObjectives[index] = e.target.value;
                        setCurrentEvent({
                          ...currentEvent,
                          objectives: newObjectives,
                        });
                      }}
                      className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newObjectives = currentEvent.objectives.filter(
                          (_, i) => i !== index
                        );
                        setCurrentEvent({
                          ...currentEvent,
                          objectives: newObjectives,
                        });
                      }}
                      className="ml-2 px-2 py-1 rounded text-white font-bold"
                      style={{ backgroundColor: NSS_ORANGE }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentEvent({
                      ...currentEvent,
                      objectives: [...currentEvent.objectives, ""],
                    })
                  }
                  className="mt-2 px-4 py-2 rounded text-white font-bold"
                  style={{ backgroundColor: NSS_NAVY }}
                >
                  Add Objective
                </button>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="registrationLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Link
                </label>
                <input
                  type="url"
                  id="registrationLink"
                  value={currentEvent.registrationLink}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      registrationLink: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={currentEvent.isPast}
                    onChange={(e) =>
                      setCurrentEvent({
                        ...currentEvent,
                        isPast: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2">Is Past Event</span>
                </label>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded text-white font-bold"
                  style={{ backgroundColor: NSS_ORANGE }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-white font-bold"
                  style={{ backgroundColor: NSS_NAVY }}
                >
                  {currentEvent.id ? "Update" : "Add"} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
