// import { footerLinks, socialMedia } from "@/constants/index";
// import { copyrightSign } from "@/public/icons";
// import { logo, NSSLogo } from "@/public/images";
// import Image from "next/image"; 


// const footer = () => {
//   return (
//     <footer className="max-container">
//       {/* Nike logo and content */}
//       <div className="flex justify-between items-start gap-20 max-lg:flex-col flex-wrap">
//         <div className="flex flex-col items-start">
//           <a href="/">
//             <Image
//               src={logo}
//               alt="logo"
//               width={150}
//               height={46}
//               className="m-0"
//             />
//           </a>
//           <p className="info-text max-w-sm mt-10 sm:max-w-sm text-white">
//           NSS GITAM Deemed To Be University
//           </p>

//           {/* Social logos */}
//           <div className="flex items-center gap-5 mt-8">
//             {socialMedia.map((logo, index) => (
//               <a href="/" key={index} className=" bg-white rounded-full p-2">
//                 <Image
//                   src={logo.src}
//                   alt={logo.alt}
//                   width={25}
//                   height={25}
//                   className="m-0"
//                 />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Product links */}
//         <div className="flex flex-1 flex-wrap justify-between gap-10 text-white ">
//           {footerLinks.map((link, index) => (
//             <div key={index}>
//               <h4 className="text-xl mb-3">{link.title}</h4>
//               <ul className="info-text">
//                 {link.links.map((item, index) => (
//                   <li key={index}>
//                     <a href="/">{item.name}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Copyright section */}
//       <div className="flex justify-between py-10 info-text max-sm:flex-col max-sm:items-center ">
//         <p className="flex gap-2 justify-start items-center cursor-pointer text-white">
//           <a href="/" className=" ">
//             <Image
//               src={copyrightSign}
//               alt={"copyrightSign"}
//               width={20}
//               height={20}
//               className="m-0 rounded-full"
//             />
//           </a>
//           Copyright. All rights reserved.
//         </p>
//         <p className=" cursor-pointer">Terms & Conditions</p>
//       </div>
//     </footer>
//   );
// };

// export default footer;


"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, MapPin, Thermometer, Wind } from 'lucide-react'
import { logo, NSSLogo } from "@/public/images";

const FooterColumn: React.FC<{ title: string; links: { label: string; href: string }[] }> = ({ title, links }) => (
  <div>
    <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const WeatherInfo: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; aqi: number } | null>(null)

  useEffect(() => {
    // Simulating API call - replace with actual API integration
    const fetchWeather = async () => {
      // Placeholder data - replace with actual API call
      const data = { temp: 28, aqi: 50 }
      setWeather(data)
    }

    fetchWeather()
  }, [])

  if (!weather) return null

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Local Weather</h3>
      <div className="flex items-center mb-2">
        <Thermometer className="mr-2" size={20} />
        <span>{weather.temp}°C</span>
      </div>
      <div className="flex items-center">
        <Wind className="mr-2" size={20} />
        <span>AQI: {weather.aqi}</span>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src={logo}
                alt="NSS Logo"
                width={100}
                height={100}
                className="mr-4"
              />
              <div>
                <h1 className="text-xl font-bold">NSS GITAM</h1>
                <p className="text-sm text-gray-400">Deemed To Be University</p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <MapPin className="mr-2 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-300 text-sm">
                GITAM Deemed to be University,<br />
                Gandhi Nagar Campus, Rushikonda,<br />
                Visakhapatnam-530045,<br />
                Andhra Pradesh, India
              </p>
            </div>
          </div>
          
          <FooterColumn
            title="Explore"
            links={[
              { label: "Awards", href: "/awards" },
              { label: "Blog", href: "/blog" },
              { label: "Notice Board", href: "/notice-board" },
            ]}
          />
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact & Weather</h2>
            <p className="text-gray-300 mb-2">nss.admin@gitam.edu</p>
            <p className="text-gray-300 mb-4">+92554862354</p>
            <WeatherInfo />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={24} />
            </Link>
            <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </Link>
            <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={24} />
            </Link>
          </div>
          <p className="text-sm text-gray-400">&copy; Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}