import {
  Hero,
  Statistics,
  Initiatives,
  Collaborations,
  Team
} from "@/components/sections/index";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-16 lg:p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
    </div>
  );
}
