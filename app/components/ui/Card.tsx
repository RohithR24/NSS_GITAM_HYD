import React from "react";
import Image from "next/image";
import {CardProps} from "@/types";

import { BookDistribution, HarithaHaram } from "@/public/images";

const Card = ({image, title, content  }: CardProps) => {

  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
      <Image src={BookDistribution} alt="Image" />
    </div>

    
    <div className="p-4">
      <h6 className="mb-2 text-slate-800 text-xl font-semibold">
       {title}
      </h6>
      <p className="text-slate-600 leading-normal font-light">
        {content}
      </p>
    </div>
  </div>  
  );
};

export default Card;
