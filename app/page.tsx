import {
  Hero,
  Statistics,
  Initiatives,
  Collaborations,
  Team,
  Footer,
} from "@/components/sections/index";
export default function Home() {
  return (
    <div className="">
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
