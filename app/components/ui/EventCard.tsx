import React from "react";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { calculateTimeDifference, parseEventDate } from "@/utility/index";
import { EventCardProps } from "@/types";

export const EventCard: React.FC<{ event: EventCardProps }> = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  React.useEffect(() => {
    if (!event.isPast) {
      const timer = setInterval(() => {
        const now = new Date();

        const eventDate = parseEventDate(event.date, event.time);

        // Validate if the eventDate is correct
        if (isNaN(eventDate.getTime())) {
          console.error("Invalid event date or time format.");
          clearInterval(timer);
          return;
        }

        // Calculate and set the time left
        setTimeLeft(calculateTimeDifference(eventDate, now));
      }, 1000);

      // Clean up the timer when the component unmounts
      return () => clearInterval(timer);
    }
  }, [event]);

  return (
    <div className="mb-6 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg bg-blue-50 rounded-lg border border-blue-200">
      <div className="md:flex">
        <div className="md:w-1/3 p-4 hidden lg:block">
          <div className="relative h-48 md:h-full">
            <Image
              src={event.poster}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-2/3 lg:w-full">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              {event.title}
            </h2>
            <div className="flex items-center text-blue-600 mb-2">
              <div className="flex items-center bg-blue-100 p-2 rounded-lg shadow-sm border border-blue-300 mb-4">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-blue-900 font-medium text-lg">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <span className="text-blue-700"> at </span>
                  <span className="font-semibold">{event.time}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center text-blue-600 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              {!event.isPast && (
                <div className="flex items-center justify-center space-x-4 bg-blue-100 p-3 rounded-lg shadow-md text-blue-900 font-bold text-lg">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{timeLeft.split(" ")[0]}</span>{" "}
                    {/* Days */}
                    <span className="text-sm text-blue-600">Days</span>
                  </div>
                  <span className="text-2xl">:</span> 
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{timeLeft.split(" ")[1]}</span>{" "}
                    {/* Hours */}
                    <span className="text-sm text-blue-600">Hours</span>
                  </div>
                  <span className="text-2xl">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{timeLeft.split(" ")[2]}</span>{" "}
                    {/* Minutes */}
                    <span className="text-sm text-blue-600">Minutes</span>
                  </div>
                  <span className="text-2xl">:</span> 
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{timeLeft.split(" ")[3]}</span>{" "}
                    {/* Seconds */}
                    <span className="text-sm text-blue-600">Seconds</span>
                  </div>
                </div>
              )}
              {!event.isPast && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
                  onClick={() => window.open(event.registrationLink, "_blank")}
                >
                  Register Now
                </button>
              )}
            </div>
            <p className="text-blue-900">
              {expanded ? event.description : event.teaser}
            </p>
          </div>
          <div className="p-4 flex justify-between items-center border-t border-blue-200">
            <button
              className="text-blue-600 border border-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors flex items-center"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Show More"}
              {expanded ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </button>
            {!event.isPast && (
              <div className="flex space-x-2">
                <button
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors"
                  onClick={() => alert("Share on Facebook")}
                >
                  <Facebook />
                </button>
                <button
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors"
                  onClick={() => alert("Share on Twitter")}
                >
                  <Twitter />
                </button>
                <button
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors"
                  onClick={() => alert("Share on Instagram")}
                >
                  <Instagram />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <div className="md:hidden mb-4">
              <div className="relative h-48 w-full">
                <Image
                  src={event.poster}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              Event Objectives
            </h3>
            <ul className="list-disc list-inside text-blue-900 mb-4">
              {event.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
            {!event.isPast && (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
                onClick={() => window.open(event.registrationLink, "_blank")}
              >
                Register Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
