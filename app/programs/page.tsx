"use client";

import React, { useState } from "react";
import { EventCard, Tabs } from "@/app/components/ui/index";
import {programs}  from '@/constants/index'
import {events} from '@/constants/index'


const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(programs[0].id);
  const upcomingEvents = events.filter((event) => !event.isPast);
  const pastEvents = events.filter((event) => event.isPast);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-blue-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
        NSS Events
      </h1>
 
      <Tabs
        title={programs.map((area) => ({
          id: area.id,
          name: area.name,
        }))}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />
      <div>
        {activeTab === "upcoming" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Upcoming Events
            </h2>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        {activeTab === "past" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Past Events
            </h2>
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
