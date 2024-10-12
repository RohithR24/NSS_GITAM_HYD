"use client";
import { campus2, campus1, hero, SpecialCamp } from "../../../public/images/index";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "./index";

export default function Hero() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow relative flex flex-col md:flex-row items-center justify-between bg-white">
        {/* Content Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex items-center justify-center h-full p-6 lg:p-8">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl mb-4">
              <span className="block">Empowering Youth,</span>
              <span className="block text-indigo-600">Serving the Nation</span>
            </h1>
            <p className="text-base text-gray-500 sm:text-lg md:text-xl mb-6">
              Join the National Service Scheme and be part of India's largest
              youth volunteer force. Develop leadership skills, engage in
              community service, and make a lasting impact on society.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4">
              <Link
                href="/join"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Join NSS
              </Link>
              <Link
                href="/learn-more"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 lg:absolute lg:inset-y-0 lg:right-0">
          <Image
            className="w-full h-56 sm:h-72 md:h-96 lg:h-full object-cover"
            src={SpecialCamp}
            alt="Students engaged in national service activities"
            width={800}
            height={600}
            priority
          />
        </div>
      </div>
    </div>
  );
}
