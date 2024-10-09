"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Thermometer,
  Wind,
} from "lucide-react";
import { logo, GITAM } from "@/public/images";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "About NSS", href: "/about" },
      { name: "Activities", href: "/activities" },
      { name: "Gallery", href: "/gallery" },
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
      { name: "Downloads", href: "/downloads" },
      { name: "Contact Us", href: "/contact" },
      { name: "Feedback", href: "/feedback" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <motion.div
            className="col-span-1 md:col-span-2"
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
              />
              <Image
                src={GITAM}
                alt="GITAM Logo"
                width={70}
                height={70}
              />
            </div>
            <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-blue-600 pb-1">
              NSS GITAM
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Deemed To Be University
            </p>
            <div className="flex items-center mb-2">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <p className="text-sm">
                GITAM University, Rudraram, Patancheru Mandal, Telangana, India
                - 502329
              </p>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2 flex-shrink-0" />
              <p className="text-sm">+91 9255486254</p>
            </div>
            <div className="flex items-center mb-4">
              <Mail size={16} className="mr-2 flex-shrink-0" />
              <p className="text-sm">nss.admin@gitam.edu</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </motion.div>

          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 inline-block border-b-2 border-blue-600 pb-1">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Local Weather</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Thermometer size={16} className="mr-2 flex-shrink-0" />
                <p className="text-sm">28°C</p>
              </div>
              <div className="flex items-center">
                <Wind size={16} className="mr-2 flex-shrink-0" />
                <p className="text-sm">AQI: 50</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} NSS GITAM. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
