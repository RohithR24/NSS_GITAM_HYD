import React from "react";
import { Card } from "@/components/ui";
//import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Itc } from "@/public/images/index";
import Image from "next/image";

const initiatives = () => {
  return (
    <section className="flex flex-col">
      <p className="font-semibold text-2xl md:text-3xl text-center">
        Initiatives
      </p>
      <div className="relative grid grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default initiatives;
