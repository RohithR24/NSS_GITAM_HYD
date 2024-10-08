"use client";

import React, { useEffect, useState } from "react";
import { TeamDataProps } from "@/types";
import { Tabs, TeamMemberCard } from "@/components/ui/index";

const teamTabTitles = [
  { id: "faculty", name: "Faculty Team" },
  { id: "student", name: "Student Team" },
];

export default function TeamStructure({ teamData }: TeamDataProps) {
  const [activeTab, setActiveTab] = useState<string>(teamTabTitles[0].id);
  const [selectedTeam, setSelectedTeam] = useState(teamData.faculty);

  // Synchronize the selected team with the active tab
  useEffect(() => {
    setSelectedTeam(
      activeTab === "student" ? teamData.students : teamData.faculty
    );
  }, [activeTab, teamData]);

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
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Head Member Card */}
            {activeTab !== "Student Team" && (
              <div className="flex flex-col items-center justify-center">
                {" "}
                <TeamMemberCard member={teamData.head} isHead />
                <div className="w-px h-16 bg-gray-300 my-8"></div>
              </div>
            )}

            {/* Selected Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {selectedTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
