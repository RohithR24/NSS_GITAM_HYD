// import React from 'react'

// const TeamStructure = () => {
//   return (
//     <div>TeamStructure</div>
//   )
// }

// export default TeamStructure

"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { Coordinator, Avatar } from "@/public/team/index";
import { TeamDataProps, TeamProfileProps } from "@/types";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string | any;
  social: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

const teamStructure: {
  Head: TeamMember;
  members: TeamMember[];
} = {
  Head: {
    id: 1,
    name: "Dr. P.V Nagendra Kumar ",
    role: "NSS Co-Ordinator",
    image: Coordinator,
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
      facebook: "https://facebook.com/johndoe",
    },
  },
  members: [
    {
      id: 2,
      name: "Faculty 1",
      role: "Program Co-Ordinator",
      image: Avatar,
      social: {
        linkedin: "https://linkedin.com/in/alicejohnson",
        instagram: "https://instagram.com/alicejohnson",
      },
    },
    {
      id: 3,
      name: "Faculty 2",
      role: "Program Co-Ordinator",
      image: Avatar,
      social: {
        linkedin: "https://linkedin.com/in/bobsmith",
        facebook: "https://facebook.com/bobsmith",
      },
    },
    {
      id: 4,
      name: "Faculty 3",
      role: "Program Co-Ordinator",
      image: Avatar,
      social: {
        instagram: "https://instagram.com/carolwilliams",
        facebook: "https://facebook.com/carolwilliams",
      },
    },
    {
      id: 5,
      name: "Faculty 4",
      role: "Program Co-Ordinator",
      image: Avatar,
      social: {
        linkedin: "https://linkedin.com/in/davidbrown",
        instagram: "https://instagram.com/davidbrown",
      },
    },
  ],
};

const SocialLinks: React.FC<{ social: TeamMember["social"] }> = ({
  social,
}) => (
  <div className="flex items-center justify-center space-x-2 bg-color-white">
    {social.linkedin && (
      <a
        href={social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <Linkedin size={20} />
      </a>
    )}
    {social.instagram && (
      <a
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-800"
      >
        <Instagram size={20} />
      </a>
    )}
    {social.facebook && (
      <a
        href={social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-800 hover:text-blue-900"
      >
        <Facebook size={20} />
      </a>
    )}
  </div>
);

const TeamMemberCard: React.FC<{
  member: TeamMember;
  isHead?: boolean;
}> = ({ member, isHead = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-2">
        <Image
          src={member.image}
          alt={member.name}
          width={isHead ? 200 : 150}
          height={isHead ? 200 : 150}
          className="rounded-full border-4 border-primary-500 shadow-lg"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
      {/* {!isHovered && (<p className="text-sm text-gray-600">{member.role}</p>)} */}
      <div className="flex justify-center items-center my-2">
        <AnimatePresence>
          {isHovered ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className=" bottom-full left-1/2 transform -translate-x-1/2"
            >
              <SocialLinks social={member.social} />
            </motion.div>
          ) : (
            <p className="text-sm text-gray-600">{member.role}</p>
          )}
        </AnimatePresence>
      </div>

      {/* <SocialLinks social={member.social} /> */}
    </motion.div>
  );
};

const focusAreas = ["faculty", "student"];

export default function TeamStructure({ teamData }: TeamDataProps) {
  const [activeTab, setActiveTab] = useState(focusAreas[0]);
  const [selectedTeam, setSelectedTeam] = useState(teamData.faculty);

  function onTabSelect(area: string){
    setActiveTab(area);
    if(activeTab === "student"){
      setSelectedTeam(teamData.students)
    }
    else{
      setSelectedTeam(teamData.faculty)
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {focusAreas.map((area, key) => (
              <button
                key={key}
                onClick={() => onTabSelect(area)}
                className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === area
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                aria-current={activeTab === area ? "page" : undefined}
              >
                {area}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <TeamMemberCard member={teamData.head} isHead={true} />
            <div className="w-px h-16 bg-gray-300 my-8"></div>
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
