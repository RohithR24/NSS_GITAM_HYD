"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { TeamStructure } from "@/app/components/ui/index";
import { fetchAllTeams } from "@/api/index";
import { TeamProps } from "@/types";
import { ChevronDown } from "lucide-react";

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamProps[]>([]); // Initialize with an empty array
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  // Memoized function to fetch teams to avoid re-fetching on every render
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await fetchAllTeams();
        setTeams(fetchedTeams);
        setSelectedTeam(fetchedTeams[0].name);
      } catch (error) {
        console.error("Error in fetching teams:", error);
        setTeams([]); // Set empty array in case of an error
      }
    };
    fetchTeams();
  }, []);

  // Memoize the selected team to avoid unnecessary re-renders
  const selectedTeamData = useMemo(
    () => teams.find((team) => team.name === selectedTeam),
    [selectedTeam, teams]
  );

  // Callback for selecting a team
  const handleTeamSelect = useCallback((teamName: string) => {
    setSelectedTeam(teamName);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Team</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Meet the dedicated individuals who drive our mission forward. With
            experienced faculty and passionate students at the helm, we are
            committed to making a lasting impact in our community.
          </p>
        </div>

        {/* Team Buttons */}
        <div className="w-full">
          {/* Desktop view */}
          <div className="hidden md:block bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="flex justify-center space-x-2 overflow-x-auto pb-4">
              {teams.map((team) => (
                <motion.button
                  key={team.id}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedTeam === team.name
                      ? "bg-blue-600 text-white shadow-lg border-b-4 border-red-500"
                      : "bg-white text-blue-600 hover:bg-blue-50 hover:border-b-4 hover:border-red-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTeam(team.name)}
                >
                  {team.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md flex justify-between items-center"
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
                      className={`w-full text-left px-4 py-3 text-sm font-medium ${
                        selectedTeam === team.name
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
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
          className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
        >
          {selectedTeamData ? (
            <TeamStructure
              key={selectedTeamData.id}
              teamData={selectedTeamData}
            />
          ) : (
            <p className="text-gray-600">Select a team to see its structure</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
