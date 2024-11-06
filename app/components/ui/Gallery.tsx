"use client"
import { BookDistribution } from "@/public/images";
import { Initiative, InitiativeProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import { InitiativesModal } from "@/app/components/ui/index";

  
const Gallery = ({id, name, initiatives}: InitiativeProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(id);
    const [initiative, setInitiative] = useState<Initiative> ();
    const openModal = (initiative : Initiative) => {
      setInitiative(initiative);
      setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);
  return (
    <div>  
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {initiatives.map((initiative, index) => (
              <div
                onClick={() => openModal(initiative)}
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={initiative.images && initiative.images.length > 0 ? initiative.images[0] : ""}
                  alt={initiative.caption}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">{initiative.caption}</p>
                </div>
              </div>
            ))}
        </motion.div>
      </AnimatePresence>

      {/* Initiatives Modal */}
      {isOpen && (
        <InitiativesModal isModelOpen={isOpen} closeModal={closeModal}  initiativeData={initiative}/>
      )}
    </div>
  );
};

export default Gallery;
