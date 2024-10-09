"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {teamStructure} from '@/constants/index'
import {TeamStructure} from '@/components/ui/index'

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState(teamStructure[0])
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary overflow-hidden">
      {/* <BackgroundPattern year={selectedTeam.year} /> */}
      <div className="relative z-10 w-full max-w-4xl px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto pb-4">
          {teamStructure.map((team) => (
            <motion.button
              key={team.year}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTeam.year === team.year
                  ? 'bg-blue-600 text-primary-foreground shadow-xl border-b-2 border-red-500'
                  : 'bg-secondary text-secondary-foreground hover:border-b-2  hover:border-red-500'
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
          
            <TeamStructure  teamData = {selectedTeam}/>
        </motion.div>
      </div>
    </div>
  )
}