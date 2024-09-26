import React from "react";
import {
  blood,
  bookdonation,
  bookdonation2,
  volunteer,
  collaboration
} from "../../public/icons/index";
import Image from "next/image";
const Statistics = () => {
  return (
    <section className="flex flex-col">
      <p className="font-semibold text-2xl md:text-3xl text-center">
        Our Outstanding Impact
      </p>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-center items-center bg-[#b7c4ff] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
          <div className="flex flex-row justify-center items-center">
            <Image
              src={volunteer}
              alt="volunteer icon"
              width={45}
              height={45}
            />
            <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
              500+
            </p>
          </div>
          <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
            Active Volunteers
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#b7c4ff] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
          <div className="flex flex-row justify-center items-center">
            <Image
              src={blood}
              alt="Blood Donation icon"
              width={45}
              height={45}
            />
            <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
              20+
            </p>
          </div>
          <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
            Blood Donation Camps
          </p>
        </div>
        <div 
          className="flex flex-col justify-center items-center bg-[#b7c4ff] filter brightness-30 px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
        {/* className="flex flex-col justify-center items-center bg-[#b7c4ff] filter brightness-30 px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center"> */}
          <div className="flex flex-row justify-center items-center">
            <Image
              src={bookdonation}
              alt="Book Donation icon"
              width={45}
              height={45}
            />
            <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
              30+
            </p>
          </div>
          <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
            Book Distributions
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-[#b7c4ff] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
          <div className="flex flex-row justify-center items-center">
            <Image
              src={collaboration}
              alt="collaboration icon"
              width={45}
              height={45}
            />

            <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
              10+
            </p>
          </div>
          <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
            Active Collaborations
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
