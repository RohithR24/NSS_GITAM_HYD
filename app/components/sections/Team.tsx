"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { TeamCarousel, TeamStructure } from "@/app/components/ui/index";
import { fetchAllTeams } from "@/api/index";
import { TeamProps } from "@/types";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";



export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await fetchAllTeams();
        setTeams(fetchedTeams);
        setSelectedTeam(fetchedTeams[0].name);
      } catch (error) {
        console.error("Error in fetching teams:", error);
        setTeams([]);
      }
    };
    fetchTeams();
  }, []);

  const selectedTeamData = useMemo(
    () => teams.find((team) => team.name === selectedTeam),
    [selectedTeam, teams]
  );

  const handleYearSelect = (team: string) => {
    setSelectedTeam(team)
  }

  const handleTeamSelect = useCallback((teamName: string) => {
    setSelectedTeam(teamName);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl px-6 py-12">
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold text-[#000040] mb-6">Our Team</h1>
          <p className="mt-6 text-xl text-[#000040] max-w-2xl mx-auto">
            Meet the dedicated individuals who drive our mission forward. With
            experienced faculty and passionate students at the helm, we are
            committed to making a lasting impact in our community.
          </p>
        </div>

        {/* Team Buttons */}
        <div className="w-full mb-12 ">
          {/* Desktop view */}
          <div className="hidden md:block">
          <TeamCarousel
            years={teams.map(team => team.name)}
            selectedYear={selectedTeam}
            onYearSelect={handleYearSelect}
          />
          </div>
          
          {/* Mobile view */}
          <div className="md:hidden">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-full bg-[#000040] text-white px-6 py-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="font-bold">{selectedTeam}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10">
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      className={`w-full text-left px-6 py-4 text-sm font-medium ${
                        selectedTeam === team.name
                          ? "bg-[#cc4444] text-white"
                          : "text-[#000040] hover:bg-[#f0f0f0]"
                      }`}
                      onClick={() => {
                        setSelectedTeam(team.name);
                        setIsOpen(false);
                      }}
                    >
                      {team.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Structure */}
        <motion.div
          key={selectedTeam}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          //className="bg-white text-[#000040] p-8 rounded-lg shadow-lg border border-[#000040]"
        >
          {selectedTeamData ? (
            <TeamStructure
              key={selectedTeamData.id}
              teamData={selectedTeamData}
            />
          ) : (
            <p className="text-[#000040] text-lg">Select a team to see its structure</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}