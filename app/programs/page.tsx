"use client";

import React, { useEffect, useState } from "react";
import { EventCard, Tabs } from "@/app/components/ui/index";
import { programs } from "@/constants/index";
import { fetchEventsFB } from "@/api";
import { EventCardProps } from "@/types";

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(programs[0].id);
  const [events, setEvents] = useState<{ upcoming: EventCardProps[]; past: EventCardProps[] }>({
    upcoming: [],
    past: []
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await fetchEventsFB();
      setEvents({
        upcoming: fetchedEvents.filter(event => !event.isPast),
        past: fetchedEvents.filter(event => event.isPast)
      });
    };
    fetchEvents();
  }, []);

  const displayEvents = activeTab === "upcoming" ? events.upcoming : events.past;
  const title = activeTab === "upcoming" ? "Upcoming Events" : "Past Events";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-blue-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">NSS Events</h1>

      <Tabs
        title={programs.map((area) => ({ id: area.id, name: area.name }))}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">{title}</h2>
        {displayEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
