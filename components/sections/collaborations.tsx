import React from "react";
import Image from "next/image";
import { campus2, campus1, hero } from "../../public/images/index";
import { TJIYLC, NtrTrust, LionsClub, GHMC1, HarithHaramLogo  } from "../../public/images/index";
const Collaborations = () => {
  return (
    <section className="flex flex-col bg-white my-10">
      <p className="font-semibold text-2xl md:text-3xl text-center">
        Collaborations
      </p>

      
      <div className=" relative mt-10 grid grid-cols-4 items-center gap-2 sm:max-w-xl sm:grid-cols-6 lg:mx-0 lg:max-w-full lg:grid-cols-5">
        <Image
          className="col-span-2 max-h-36 w-full object-contain lg:col-span-1"
          src={HarithHaramLogo}
          alt="Transistor"
          width="200"
          height="200"
        />
        <Image
          className="col-span-2 max-h-36 w-full object-contain lg:col-span-1"
          src={TJIYLC}
          alt="Reform"
          width="200"
          height="200"
        />
        <Image
          className="col-span-2 max-h-36 w-full object-contain lg:col-span-1"
          src={LionsClub}
          alt="Tuple"
          width="200"
          height="200"
        />
        <Image
          className="col-span-2 max-h-36 w-full object-contain sm:col-start-2 lg:col-span-1"
          src={NtrTrust}
          alt="SavvyCal"
          width="200"
          height="200"
        />
        <Image
          className="col-span-2 col-start-2 max-h-36 w-full object-contain sm:col-start-auto lg:col-span-1"
          src={GHMC1}
          alt="Statamic"
          width="200"
          height="200"
        />
      </div>
    </section>
  );
};

export default Collaborations;
