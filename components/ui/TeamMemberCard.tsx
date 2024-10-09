"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { TeamMember } from "@/types";
import { useState } from "react";

const SocialLinks: React.FC<{ social: TeamMember["social"] }> = ({
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
  member: TeamMember;
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
      whileHover={{ scale: 1.10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={member.image}
          alt={member.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      <h3
        className={`font-semibold ${
          isHead ? "text-xl" : "text-lg "
        } text-center`}
      >
        {member.name}
      </h3>
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className=" bottom-full left-1/2 transform -translate-x-1/2"
          >
            <SocialLinks social={member.social} />
          </motion.div>
        ) : (
          <p className="text-sm text-gray-600 py-1">{member.role}</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamMemberCard;
