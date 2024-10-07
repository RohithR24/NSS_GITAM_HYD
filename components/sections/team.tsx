"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamStructure } from '../ui'
import {teamStructure} from '@/constants/index'

interface Team { 
  id: number
  name: string
  year: number
  description: string
}

const teams: Team[] = [
  { id: 1, name: "Team Alpha", year: 2020, description: "Pioneering innovation in AI" },
  { id: 2, name: "Team Beta", year: 2021, description: "Revolutionizing user interfaces" },
  { id: 3, name: "Team Gamma", year: 2022, description: "Advancing cloud technologies" },
  { id: 4, name: "Team Delta", year: 2023, description: "Exploring quantum computing" },
  { id: 5, name: "Team Epsilon", year: 2024, description: "Developing sustainable tech solutions" },
]

const focusAreas = ["faculty", "student"]
// const BackgroundPattern: React.FC<{ year: number }> = ({ year }) => {
//   const baseYear = 2020
//   const complexity = (year - baseYear) * 5
  
//   return (
//     <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <pattern id={`pattern-${year}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
//           <circle cx="10" cy="10" r={2 + complexity * 0.2} fill="currentColor" opacity="0.1" />
//           {complexity > 5 && (
//             <path d={`M0,0 L${10 + complexity},${10 + complexity}`} stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
//           )}
//           {complexity > 10 && (
//             <rect x="0" y="0" width={5 + complexity * 0.5} height={5 + complexity * 0.5} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
//           )}
//         </pattern>
//       </defs>
//       <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${year})`} />
//     </svg>
//   )
// }

export default function Team() {


  
  const [selectedTeam, setSelectedTeam] = useState(teamStructure[0])
  const [selectedTeamData, setselectedTeamData] = useState(focusAreas[0])
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
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
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
          {/* <h3 className="text-2xl font-bold mb-2">{selectedTeam.name}</h3>
          <p className="text-muted-foreground mb-4">Established: {selectedTeam.year}</p>
          <p>{selectedTeam.description}</p> */}
        </motion.div>
      </div>
    </div>
  )
}