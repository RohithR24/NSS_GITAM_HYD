import Image from "next/image";
import Hero from "@/components/sections/hero";
import Statistics from "@/components/sections/statistics";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-16 lg:p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Hero /> 
      <section className='padding-b' > <Statistics /> </section>
    </div>
  );
}
