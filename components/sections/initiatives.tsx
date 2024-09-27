import React from "react";
import { Card } from "@/components/ui";
import { Initiatives } from "@/constants";

const InitiativesSection = () => {
  return (
    <section className="flex flex-col">
      <p className="font-semibold text-2xl md:text-3xl text-center">
        Initiatives
      </p>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Initiatives.map((item, key) => (
          <Card
            key={key}                                                    
            image={item.image}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>                                                                                
    </section>
  );
};

export default InitiativesSection;
