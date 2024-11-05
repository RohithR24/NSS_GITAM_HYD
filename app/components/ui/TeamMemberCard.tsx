"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { TeamMemberProps } from "@/types";
import { useState } from "react";
import { Avatar, Avatar02 } from "@/public/team";

const SocialLinks: React.FC<{ social: TeamMemberProps["social"] }> = ({
  social,
}) => (
  <div className="flex items-center justify-center space-x-2 bg-color-white py-1">
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


export const TeamMemberCard: React.FC<{
  member: TeamMemberProps;
  isHead?: boolean;
  activeTab: string;
  index: number;
}> = ({ member, isHead, activeTab, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={index}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className={`relative ${isHead ? "w-48 h-48" : "w-36 h-36"} mb-4`}>
        <Image
          src={member.image === "" ? Avatar02 : member.image}
          alt={member.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full border-4 border-[#000040]"
        />
      </div>

      <h3
        className={`font-semibold ${
          isHead ? "text-xl" : "text-lg"
        } text-center text-[#000040] mb-2`}
      >
        {member.name}
      </h3>
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bottom-full left-1/2 transform -translate-x-1/2"
          >
            <SocialLinks social={member.social} />
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-[#cc4444] font-medium py-1 px-3 bg-[#fff0f0] rounded-full"
          >
            {member.role}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamMemberCard;