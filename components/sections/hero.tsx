import React from "react";
import { campus2, campus1, hero } from "../../public/images/index";

const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${campus1.src})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content in the center */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4">
          NSS GITAM, Hyderabad
        </h1>

        {/* Centered Horizontal Rule Relative to Text */}
        <span className="block h-0.5 w-full max-w-xs border-t-2 border-white mb-8"></span>

        <p className="text-lg md:text-xl lg:text-2xl font-semibold">
          NOT ME BUT YOU
        </p>
      </div>
    </div>
  );
};

export default Hero;
