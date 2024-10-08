"use client";

import React, { useState } from "react";
import { Gallery, Tabs } from "@/components/ui/index";
import { initiativeFocusAreas } from "@/constants";



export default function Initiatives() {
  // Only track the active tab in the state
  const [activeTab, setActiveTab] = useState(initiativeFocusAreas[0].id);

  // Get selected initiative dynamically from the focusAreas array
  const selectedInitiative = initiativeFocusAreas.find((area) => area.id === activeTab);

  // If for any reason the selectedInitiative isn't found (edge case), provide fallback
  if (!selectedInitiative) {
    return <div>Error: Focus area not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Focus Areas of Impact
      </h2>
      <p className="text-xl text-gray-600 text-center mb-12">
        Explore the diverse initiatives of the National Service Scheme across various domains.
      </p>

      {/* Tabs */}
      <Tabs
        title={initiativeFocusAreas.map((area) => ({ id: area.id, name: area.name }))}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />

      {/* Gallery */}
      <Gallery
        id={selectedInitiative.id}
        name={selectedInitiative.name}
        initiatives={selectedInitiative.initiatives}
      />
    </div>
  );
}
