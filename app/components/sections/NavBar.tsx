"use client";

import Image from "next/image";
import {logo} from '@/public/images/index'; // Adjust this path as necessary
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';


const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`text-white hover:text-orange-300 transition-colors ${isActive ? 'font-bold' : ''}`}>
      {children}
    </Link>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky bg-blue-700 shadow-md ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image 
                src={logo} 
                alt="NSS Logo" 
                width={40} 
                height={40} 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-white">NSS, GITAM Hyderabad</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About Us</NavItem>
            <NavItem href="/programs">Programs</NavItem>
            <NavItem href="/awards">Awards</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-300"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-base font-medium text-white hover:text-orange-300 hover:bg-blue-600">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 text-base font-medium text-white hover:text-orange-300 hover:bg-blue-600">
            About Us
          </Link>
          <Link href="/programs" className="block px-3 py-2 text-base font-medium text-white hover:text-orange-300 hover:bg-blue-600">
            Programs
          </Link>
          <Link href="/awards" className="block px-3 py-2 text-base font-medium text-white hover:text-orange-300 hover:bg-blue-600">
            Awards
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium text-white hover:text-orange-300 hover:bg-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;