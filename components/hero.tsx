import React from 'react';
import {campus2, campus1,  hero} from "../public/images/index";

const Hero = () => {
  return (
    <div 
    className="absolute flex items-center justify-center h-screen w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${campus1.src})` }} 
    >
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center shadow-md p-4">
        Not Me, But You
      </h1>
    </div>
  );
};

export default Hero;
