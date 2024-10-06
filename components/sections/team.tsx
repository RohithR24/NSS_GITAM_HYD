// import React from "react";
// import { Button } from "@/components/ui/index";

// const team = () => {
//   return (
//     <section className="flex flex-col">
//       <p className="font-semibold text-2xl md:text-3xl text-center">
//         Team
//       </p>

//       <div className="font-sans">
//             <div className="lg:max-w-5xl max-w-3xl mx-auto">
//                 {/* <div className="max-w-2xl mx-auto text-center">
//                     <h2 className="text-gray-800 text-3xl font-extrabold">Meet our team</h2>
//                     <p className="text-gray-800 text-sm mt-4 leading-relaxed">Meet our team of professionals to serve you.</p>
//                 </div> */}
//                 <div className = "flex justify-center items-center py-10">
//                         <img src="https://readymadeui.com/team-1.webp" className=" h-56 object-cover" />
//                     </div>
//                 <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6 max-md:justify-center mt-12">
                    
//                     <div className="border rounded-lg overflow-hidden">
//                         <img src="https://readymadeui.com/team-1.webp" className="w-full h-56 object-cover" />

//                         <div className="p-4">
//                             <h4 className="text-gray-800 text-base font-bold">John Doe</h4>
//                             <p className="text-gray-800 text-xs mt-1">Software Engineer</p>

//                             <div className="space-x-4 mt-4">
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
//                                         <path
//                                             d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
//                                             data-original="#010002" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
//                                         <path
//                                             d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
//                                             data-original="#03a9f4" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
//                                         <path
//                                             d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
//                                             data-original="#0077b5" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border rounded-lg overflow-hidden">
//                         <img src="https://readymadeui.com/team-2.webp" className="w-full h-56 object-cover" />

//                         <div className="p-4">
//                             <h4 className="text-gray-800 text-base font-bold">Mark Adair</h4>
//                             <p className="text-gray-800 text-xs mt-1">Software Engineer</p>

//                             <div className="space-x-4 mt-4">
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
//                                         <path
//                                             d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
//                                             data-original="#010002" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
//                                         <path
//                                             d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
//                                             data-original="#03a9f4" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
//                                         <path
//                                             d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
//                                             data-original="#0077b5" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border rounded-lg overflow-hidden">
//                         <img src="https://readymadeui.com/team-3.webp" className="w-full h-56 object-cover" />

//                         <div className="p-4">
//                             <h4 className="text-gray-800 text-base font-bold">Simon Konecki</h4>
//                             <p className="text-gray-800 text-xs mt-1">Web Designer</p>

//                             <div className="space-x-4 mt-4">
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
//                                         <path
//                                             d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
//                                             data-original="#010002" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
//                                         <path
//                                             d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
//                                             data-original="#03a9f4" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
//                                         <path
//                                             d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
//                                             data-original="#0077b5" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border rounded-lg overflow-hidden">
//                         <img src="https://readymadeui.com/team-4.webp" className="w-full h-56 object-cover" />

//                         <div className="p-4">
//                             <h4 className="text-gray-800 text-base font-bold">Sophia</h4>
//                             <p className="text-gray-800 text-xs mt-1">Software Developer</p>

//                             <div className="space-x-4 mt-4">
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
//                                         <path
//                                             d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
//                                             data-original="#010002" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
//                                         <path
//                                             d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
//                                             data-original="#03a9f4" />
//                                     </svg>
//                                 </button>
//                                 <button type="button"
//                                     className="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
//                                         <path
//                                             d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
//                                             data-original="#0077b5" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <Button title="2019-2020" color={""}/>
//     </section>
//   );
// };

// export default team;
"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamStructure } from '../ui'

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

const BackgroundPattern: React.FC<{ year: number }> = ({ year }) => {
  const baseYear = 2020
  const complexity = (year - baseYear) * 5
  
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`pattern-${year}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r={2 + complexity * 0.2} fill="currentColor" opacity="0.1" />
          {complexity > 5 && (
            <path d={`M0,0 L${10 + complexity},${10 + complexity}`} stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
          )}
          {complexity > 10 && (
            <rect x="0" y="0" width={5 + complexity * 0.5} height={5 + complexity * 0.5} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
          )}
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${year})`} />
    </svg>
  )
}

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary overflow-hidden">
      {/* <BackgroundPattern year={selectedTeam.year} /> */}
      <div className="relative z-10 w-full max-w-4xl px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Team Evolution Timeline</h2>
        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto pb-4">
          {teams.map((team) => (
            <motion.button
              key={team.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTeam.id === team.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTeam(team)}
            >
              {team.name} ({team.year})
            </motion.button>
          ))}
        </div>
        <motion.div
          key={selectedTeam.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
        >
            <TeamStructure />
          {/* <h3 className="text-2xl font-bold mb-2">{selectedTeam.name}</h3>
          <p className="text-muted-foreground mb-4">Established: {selectedTeam.year}</p>
          <p>{selectedTeam.description}</p> */}
        </motion.div>
      </div>
    </div>
  )
}