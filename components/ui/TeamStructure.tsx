"use client";

import React, { useState } from "react";
import { TeamDataProps } from "@/types";
import { Tabs, TeamMemberCard } from "@/components/ui/index";
import { teamTabTitles } from "@/constants";

export default function TeamStructure({ teamData }: TeamDataProps) {
  const [activeTab, setActiveTab] = useState<string>(teamTabTitles[0].id);

  // Dynamically compute the selected team based on active tab
  const selectedTeam = activeTab === "student" ? teamData.students : teamData.faculty;

  const handleTabSelect = (area: string) => {
    setActiveTab(area);
  };

  return (
    <div>
      {/* Tabs Component */}
      <Tabs title={teamTabTitles} activeTab={activeTab} onTabSelect={handleTabSelect} />

      {/* Team Structure Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Head Member Card */}
            {activeTab === "faculty" && (
              <div className="flex flex-col items-center justify-center">
                <TeamMemberCard member={teamData.head} isHead activeTab={activeTab}/>
                <div className="w-px h-16 bg-gray-300 my-8"></div>
              </div>
            )}
 
            {/* Selected Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {selectedTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} activeTab = {activeTab}/>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}