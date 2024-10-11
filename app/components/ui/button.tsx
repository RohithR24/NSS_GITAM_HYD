import React from 'react'

export function Button({  ...props }) {
  return (
    <button
      className={`
        bg-[#FF0000] 
        hover:bg-[#CC0000] 
        text-white 
        font-bold 
        py-3 
        px-6 
        rounded-full 
        text-lg 
        shadow-lg 
        hover:shadow-xl 
        transition-all 
        duration-300
         
      `}
      {...props}
    >
      {/* {children} */}
    </button>
  )
}