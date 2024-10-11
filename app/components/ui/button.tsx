import { ButtonProps } from '@/types';
import React from 'react';

export function Button({ title, styles }:ButtonProps ) {
  return (
    <button
      className={`
        bg-[#FF0000] 
        hover:bg-[#CC0000] 
        text-white 
        font-bold 
        py-3 
        px-6 
        ${styles}
        rounded-full 
        text-lg 
        shadow-lg 
        hover:shadow-xl 
        transition-all 
        duration-300
      `}
    >
      {title}
    </button>
  );
}
