"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { teamStructure } from "@/constants/index";
import { TeamStructure } from "@/app/components/ui/index";

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState(teamStructure[0]);
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

        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto pb-4">
          {teamStructure.map((team) => (
            <motion.button
              key={team.year}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTeam.year === team.year
                  ? "bg-blue-600 text-primary-foreground shadow-xl border-b-2 border-red-500"
                  : "bg-secondary text-secondary-foreground hover:border-b-2  hover:border-red-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTeam(team)}
            >
              {team.year}
            </motion.button>
          ))}
        </div>
        <motion.div
          key={selectedTeam.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
        >
          <TeamStructure teamData={selectedTeam} />
        </motion.div>
      </div>
    </div>
  );
}
