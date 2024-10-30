'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { logo, NewGitamLogo } from "@/public/images";
import { Weather } from "../ui";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      {name: "GITAM Home", href: "https://www.gitam.edu/" },
      {name: "Anti-Ragging", href: "https://gimsr.gitam.edu/committees/Anti-ragging-committee" },
      {name: "Departments", href: "https://www.gitam.edu/hyderabad/gitam-school-of-technology" },
      {name: "Campus Events", href: "https://www.gitam.edu/hyderabad/events"}
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Awards", href: "/awards" },
      { name: "Blog", href: "/blog" },
      { name: "Notice Board", href: "/notice-board" },
      { name: "Events", href: "/events" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQs", href: "/faqs" },
      { name: "Contact Us", href: "/contact" },
      { name: "Feedback", href: "/feedback" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000040] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
          {/* Logo and Contact Section - Takes 2 columns on md, 4 on lg */}
          <motion.div
            className="col-span-1 md:col-span-3 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={logo}
                alt="NSS Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
              <Image
                src={NewGitamLogo}
                alt="GITAM Logo"
                width={70}
                height={70}
                className="rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-[#cc4444] pb-1">
              NSS GITAM
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Deemed To Be University
            </p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 flex-shrink-0 text-[#cc4444] opacity-80" />
                <p className="text-sm">
                  GITAM University, Rudraram, <br/>
                  Patancheru Mandal, Telangana, <br/>
                  India - 502329
                </p>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0 text-[#cc4444] opacity-80" />
                <p className="text-sm">+91 9255486254</p>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0 text-[#cc4444] opacity-80" />
                <p className="text-sm">nss.admin@gitam.edu</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-[#cc4444] transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-[#cc4444] transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-[#cc4444] transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links Section - Each takes 1 column on md, 2 on lg */}
          <div className="col-span-1 md:col-span-2 lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((column, index) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 inline-block border-b-2 border-[#cc4444] pb-1">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-[#cc4444] transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Weather Section - Takes 1 column on md, 3 on lg */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <Weather />
          </div>
        </div>
      </div>
      <div className="bg-[#000033] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NSS GITAM. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;