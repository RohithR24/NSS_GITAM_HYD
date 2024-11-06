"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, MapPin, Calendar } from "lucide-react";

interface ModalData {
  title: string;
  images: string[];
  content: string;
  location: string;
  date: string;
}

interface InitiativesModalProps {
  isModelOpen: boolean;
  closeModal: () => void;
  
}

const modalData: ModalData[] = [
  {
    title: "Community Clean-up Drive",
    images: [
      "/placeholder.svg?height=400&width=600&text=Clean-up+1",
      "/placeholder.svg?height=400&width=600&text=Clean-up+2",
      "/placeholder.svg?height=400&width=600&text=Clean-up+3",
    ],
    content: "Join us for a community-wide clean-up initiative to make our neighborhood cleaner and greener. We'll be focusing on local parks and streets, providing all necessary equipment.",
    location: "Central Park, Hyderabad",
    date: "July 15, 2023",
  },
  {
    title: "Educational Workshop Series",
    images: [
      "/placeholder.svg?height=400&width=600&text=Workshop+1",
      "/placeholder.svg?height=400&width=600&text=Workshop+2",
      "/placeholder.svg?height=400&width=600&text=Workshop+3",
    ],
    content: "Participate in our educational workshop series covering topics from environmental sustainability to digital literacy. Expert speakers will guide interactive sessions.",
    location: "GITAM University Auditorium",
    date: "August 5-7, 2023",
  },
];

export default function InitiativesModal({ isModelOpen, closeModal }: InitiativesModalProps) {
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % modalData[currentModalIndex].images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + modalData[currentModalIndex].images.length) %
        modalData[currentModalIndex].images.length
    );
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      }
    },
    [closeModal, nextImage, prevImage]
  );

  useEffect(() => {
    if (isModelOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModelOpen, handleKeyDown]);

  if (!isModelOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90vw] max-w-4xl h-[90vh] rounded-lg overflow-hidden flex flex-col">
        <div className="bg-[#000040] text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {modalData[currentModalIndex].title}
          </h3>
          <button
            onClick={closeModal}
            className="text-white hover:text-[#cc4444] transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative flex-grow overflow-hidden">
          <div className="flex h-full transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
            {modalData[currentModalIndex].images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-full h-full relative">
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-[#000040] p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-[#000040] p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="p-6 bg-white overflow-y-auto">
          <p className="text-[#000040] mb-4">
            {modalData[currentModalIndex].content}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-[#000040] mb-4">
            <div className="flex items-center mb-2 sm:mb-0">
              <MapPin size={16} className="mr-2 text-[#cc4444]" />
              <span>{modalData[currentModalIndex].location}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-[#cc4444]" />
              <span>{modalData[currentModalIndex].date}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {modalData[currentModalIndex].images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex
                      ? "bg-[#cc4444]"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#000040] text-white rounded hover:bg-[#cc4444] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}