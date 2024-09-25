import Image from "next/image";
import Hero from "@/components/sections/hero";
export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen pb-20 gap-16 lg:p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Hero />
    </div>
  );
}
