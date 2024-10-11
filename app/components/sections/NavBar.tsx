"use client";

import Image from "next/image";
import { NSSLogo } from '../../../public/images/index';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="text-gray-600 hover:text-primary transition-colors">
    {children}
  </Link>
);

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const router = useRouter();

  // Function to handle routing to dashboard
  const goToDashboard = () => {
    router.push('/aboutus', { scroll: false });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image 
                src={NSSLogo} 
                alt="GITAM Logo" 
                width={40} 
                height={40} 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-primary">NSS, GITAM Hyderabad</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
            {/* Render AboutUs when pathname matches */}
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About Us</NavItem>
            <NavItem href="/programs">Programs</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
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
          <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
            About Us
          </Link>
          <Link href="/programs" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
            Programs
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
