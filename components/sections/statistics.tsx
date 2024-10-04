// import React from "react";
// import {
//   blood,
//   bookdonation,
//   bookdonation2,
//   volunteer,
//   collaboration
// } from "../../public/icons/index";
// import Image from "next/image";


// const Statistics = () => {
//   return (
//     <section className="flex flex-col">
//       <p className="font-semibold text-2xl md:text-3xl text-center">
//         Our Outstanding Impact
//       </p>
//       <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
//         <div className="flex flex-col justify-center items-center bg-[#b7c4ff] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
//           <div className="flex flex-row justify-center items-center">
//             <Image
//               src={volunteer}
//               alt="volunteer icon"
//               width={45}
//               height={45}
//             />
//             <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
//               500+
//             </p>
//           </div>
//           <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
//             Active Volunteers
//           </p>
//         </div>
//         <div className="flex flex-col justify-center items-center bg-[#b7c4ff] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
//           <div className="flex flex-row justify-center items-center">
//             <Image
//               src={blood}
//               alt="Blood Donation icon"
//               width={45}
//               height={45}
//             />
//             <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
//               20+
//             </p>
//           </div>
//           <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
//             Blood Donation Camps
//           </p>
//         </div>
//         <div 
//           className="flex flex-col justify-center items-center bg-[#b7c4ff] filter brightness-30 px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
//         {/* className="flex flex-col justify-center items-center bg-[#b7c4ff] filter brightness-30 px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center"> */}
//           <div className="flex flex-row justify-center items-center">
//             <Image
//               src={bookdonation}
//               alt="Book Donation icon"
//               width={45}
//               height={45}
//             />
//             <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
//               30+
//             </p>
//           </div>
//           <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
//             Book Distributions
//           </p>
//         </div>
//         <div className="flex flex-col justify-center items-center bg-[#b7c4ff] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
//           <div className="flex flex-row justify-center items-center">
//             <Image
//               src={collaboration}
//               alt="collaboration icon"
//               width={45}
//               height={45}
//             />

//             <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
//               10+
//             </p>
//           </div>
//           <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
//             Active Collaborations
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Statistics;



"use client"

import React, { useState } from 'react'
import { motion, useAnimation, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Hand, Droplet, Book, Users } from 'lucide-react'

interface StatCardProps {
  icon: React.ReactNode
  endNumber: number
  label: string
}

const countVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const StatCard: React.FC<StatCardProps> = ({ icon, endNumber, label }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
      const timer = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < endNumber) {
            return prevCount + 1
          }
          clearInterval(timer)
          return prevCount
        })
      }, 1)
      return () => clearInterval(timer)
    }
  }, [inView, controls, endNumber])

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
      initial="hidden"
      animate={controls}
      variants={countVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl text-indigo-600 mb-4">{icon}</div>
      <motion.h3 className="text-5xl font-bold mb-2">
        {count}+
      </motion.h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Our Outstanding Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={<Hand className="w-12 h-12" />} endNumber={500} label="Active Volunteers" />
          <StatCard icon={<Droplet className="w-12 h-12" />} endNumber={20} label="Blood Donation Camps" />
          <StatCard icon={<Book className="w-12 h-12" />} endNumber={30} label="Book Distributions" />
          <StatCard icon={<Users className="w-12 h-12" />} endNumber={10} label="Active Collaborations" />
        </div>
      </div>
    </div>
  )
}