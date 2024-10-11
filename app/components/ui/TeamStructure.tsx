"use client";

import React, { useState } from "react";
import { TeamDataProps } from "@/types";
import { Tabs, TeamMemberCard } from "@/app/components/ui/index";
import { teamTabTitles } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function TeamStructure({ teamData }: TeamDataProps) {
  const [activeTab, setActiveTab] = useState<string>(teamTabTitles[0].id);

  // Dynamically compute the selected team based on active tab
  const selectedTeam =
    activeTab === "student" ? teamData.students : teamData.faculty;

  const handleTabSelect = (area: string) => {
    setActiveTab(area);
  };

  return (
    <div>
      {/* Tabs Component */}
      <Tabs
        title={teamTabTitles}
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
      />

      {/* Team Structure Section */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          {/* Head Member Card */}
          {activeTab === "faculty" && (
            <div className="flex flex-col items-center justify-center">
              <TeamMemberCard
                member={teamData.head}
                isHead
                activeTab={activeTab}
                index={0}
              />
              <div className="w-px h-16 bg-gray-300 my-8"></div>
            </div>
          )}

          {/* Selected Team Members */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`grid gap-8 ${
                  selectedTeam.length <= 6
                    ? "md:grid-cols-4"
                    : "md:grid-cols-4 lg:grid-cols-4"
                }`}
              >
                {selectedTeam.map((member, index) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    activeTab={activeTab}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
      </div>
    </div>
  );
}