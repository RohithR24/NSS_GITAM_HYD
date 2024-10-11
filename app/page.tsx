"use client"
import {
  Hero,
  Statistics,
  Initiatives,
  Collaborations,
  Team,
  Footer,
} from "@/app/components/sections/index";
import Link from "next/link";
export default function Home() {

  return (
    <div className="">
      <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
            About Us
          </Link>
      <Hero />
      <section className="px-0 py-10">
        <Statistics />
      </section>
      <section className="px-0 py-10 ">
        <Initiatives />
      </section>
      <section className="px-0 py-10 ">
        <Collaborations />
      </section>
      <section>
        <Team />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
