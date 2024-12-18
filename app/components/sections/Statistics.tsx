import { StatCard } from "@/app/components/ui/index";
import { SocialService } from "@/public/images";
import {
  blood,
  bookdonation,
  volunteer,
  collaboration,
} from "../../../public/icons/index";

export default function Statistics() {
  return (
    <div className="bg-[#000040] py-16">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">
          Our Outstanding Impact
        </h2>
        <div className="container mx-auto w-full px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
            <StatCard
              icon={volunteer}
              endNumber={500}
              label="Active Volunteers"
              isKFormat={false}
            />
            <StatCard
              icon={blood}
              endNumber={20}
              label="Blood Donation Camps"
              isKFormat={false}
            />
            <StatCard
              icon={bookdonation}
              endNumber={30}
              label="Book Distributions"
              isKFormat={false}
            />
            <StatCard
              icon={collaboration}
              endNumber={10}
              label="Active Collaborations"
              isKFormat={false}
            />
            <StatCard
              icon={SocialService}
              endNumber={120}
              label="Hours Social Service"
              isKFormat={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
