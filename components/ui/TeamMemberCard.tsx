"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { TeamMember } from "@/types";
import { useState } from "react";


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

export const TeamMemberCard: React.FC<{
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
          width={isHead ? 200 : 100}
          height={isHead ? 200 : 100}
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
    </motion.div>
  );
};

export default TeamMemberCard;