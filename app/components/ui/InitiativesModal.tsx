"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, MapPin, Calendar } from "lucide-react";
import { Initiative } from "@/types";
import { logo, NewGitamLogo } from "@/public/images";
import {formatDate} from '@/utility'
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
  initiativeData: Initiative | any;
}

const modalData: ModalData[] = [
  {
    title: "Community Clean-up Drive",
    images: [
      "/placeholder.svg?height=400&width=600&text=Clean-up+1",
      "/placeholder.svg?height=400&width=600&text=Clean-up+2",
      "/placeholder.svg?height=400&width=600&text=Clean-up+3",
    ],
    content:
      "Join us for a community-wide clean-up initiative to make our neighborhood cleaner and greener. We'll be focusing on local parks and streets, providing all necessary equipment.",
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
    content:
      "Participate in our educational workshop series covering topics from environmental sustainability to digital literacy. Expert speakers will guide interactive sessions.",
    location: "GITAM University Auditorium",
    date: "August 5-7, 2023",
  },
];

export default function InitiativesModal({
  isModelOpen,
  closeModal,
  initiativeData,
}: InitiativesModalProps) {
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
        {/* Instagram-style header */}
        <div className="bg-[#000040] border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="NSS Logo"
                width={32}
                height={32}
                className="rounded-full border border-gray-200"
              />
              <div className="ml-3">
                <h4 className="font-semibold text-white">
                  {initiativeData.caption}
                </h4>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{initiativeData.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-600 hover:text-[#cc4444] transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="relative flex-grow overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {initiativeData.images.length > 0 &&
              initiativeData.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full relative"
                >
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

        <div className="p-4 bg-white overflow-y-auto">
          <div className="flex items-center py-4 text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(initiativeData.date)}</span>
          </div>
          <div className="space-y-4">
            <p className="text-[#000040] text-sm">
              {initiativeData.description}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="flex space-x-2">
                {modalData[currentModalIndex].images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex
                        ? "bg-[#cc4444]"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={closeModal}
                className="text-sm px-4 py-2 bg-[#000040] text-white rounded hover:bg-[#cc4444] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
