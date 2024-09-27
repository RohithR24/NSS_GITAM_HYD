import React from "react";
import { Card } from "@/components/ui";
import { InitiativesData } from "@/constants";

const Initiatives = () => {
  return (
    <section className="flex flex-col">
      <p className="font-semibold text-2xl md:text-3xl text-center">
        Initiatives
      </p>
        <div className="relative grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          {InitiativesData.map((item, key) => (
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

export default Initiatives;
