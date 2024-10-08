"use client";

import React, { useEffect, useState } from "react";
import { Gallery, Tabs } from "@/components/ui/index";

interface FocusArea {
  id: string;
  name: string;
  initiatives: {
    image: string;
    caption: string;
  }[];
}

const initiativeTabTitles = [
  { id: "education", name: "Education" },
  { id: "environment", name: "Environment" },
  { id: "health", name: "Health" },
  { id: "community", name: "Community Service" },
];

const focusAreas: FocusArea[] = [
  {
    id: "education",
    name: "Education",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Literacy campaign in rural areas",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Computer education for underprivileged children",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Adult education programs",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Adult education programs",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Adult education programs",
      },
    ],
  },
  {
    id: "environment",
    name: "Environment",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Tree plantation drive",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Plastic-free campus campaign",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Water conservation project",
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Blood donation camp",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "COVID-19 awareness program",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Yoga and meditation workshop",
      },
    ],
  },
  {
    id: "community",
    name: "Community Service",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Village adoption program",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Cleanliness drive in local community",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Elderly care initiative",
      },
    ],
  },
];

export default function Initiatives() {
  const [activeTab, setActiveTab] = useState(focusAreas[0].id);
  const [selectedInitiative, setSelectedInitiative] = useState(focusAreas[0]);

  const handleTabSelect = (selectedArea: string) => {
    console.log("Selected Tab", selectedArea);
    setActiveTab(selectedArea);
  };

  useEffect(() => {
    const foundInitiative = focusAreas.find((area) => area.id === activeTab);
    if (foundInitiative) {
      setSelectedInitiative(foundInitiative);
    }
  }, [activeTab, selectedInitiative]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Focus Areas of Impact
      </h2>
      <p className="text-xl text-gray-600 text-center mb-12">
        Explore the diverse initiatives of the National Service Scheme across
        various domains.
      </p>

      {/* Tabs */}

      <Tabs
        title={initiativeTabTitles}
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
      />

      {/*Gallery of Initiatives with photo and caption */}
      <Gallery
        id={selectedInitiative.id}
        name={selectedInitiative.name}
        initiatives={selectedInitiative.initiatives}
      />
    </div>
  );
}
