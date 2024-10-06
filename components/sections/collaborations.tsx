// import React from "react";
// import Image from "next/image";




"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { campus2, campus1, hero } from "../../public/images/index";
import { TJIYLC, NtrTrust, LionsClub, GHMC1, HarithHaramLogo  } from "../../public/images/index";
interface CollaboratorProps {
  src: any
  alt: string
}

const Collaborator: React.FC<CollaboratorProps> = ({ src, alt }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-32 h-32 md:w-40 md:h-40"
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          className="transition-all duration-300 ease-in-out filter hover:brightness-110"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Collaborations() {
  const collaborators = [
    { src: TJIYLC, alt: "TJIYLC" },
    { src: NtrTrust, alt: "NTR Trust" },
    { src: LionsClub, alt: "Lions Club" },
    { src: GHMC1, alt: "GHMC" },
    { src: HarithHaramLogo, alt: "HarithaHaram Logo" },
  ]

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Collaborations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {collaborators.map((collaborator, index) => (
            <Collaborator key={index} {...collaborator} />
          ))}
        </div>
      </div>
    </section>
  )
}