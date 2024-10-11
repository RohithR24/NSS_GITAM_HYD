"use client";

import React from "react";
import { ChevronRight, Book, Heart, Leaf, Users } from "lucide-react";

export default function about() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#000080]">
          About Us
        </h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-[#000080]">
            Our Mission
          </h2>
          <p className="text-xl leading-relaxed text-gray-700">
            The National Service Scheme (NSS) is a public service initiative
            aimed at fostering social responsibility, leadership, and personal
            growth among students. Our mission is to engage youth in meaningful
            activities that promote education, community development, and
            nation-building.
          </p>
        </section>
        <section className="mb-16 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4 text-[#000080]">
            What is NSS?
          </h2>
          <p className="text-lg text-gray-700">
            Established in 1969 under the Ministry of Youth Affairs and Sports,
            NSS was launched with the primary aim of channelizing the energy and
            skills of young students toward community welfare. With over 3.8
            million student volunteers nationwide, we are committed to creating
            a better future by addressing pressing social issues.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-[#000080]">
            Our Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Develop Leadership",
                desc: "Cultivate leadership qualities through hands-on community engagement.",
              },
              {
                title: "Foster Civic Responsibility",
                desc: "Build a sense of national pride and social responsibility by participating in public service projects.",
              },
              {
                title: "Promote Holistic Development",
                desc: "Enhance students' overall personality by providing opportunities to interact with diverse communities.",
              },
              {
                title: "Encourage Volunteerism",
                desc: "Inspire youth to volunteer their time and skills to serve their communities and make a positive difference.",
              },
            ].map((obj, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#000080] flex items-center">
                  <ChevronRight className="mr-2 text-[#FF0000]" />
                  {obj.title}
                </h3>
                <p className="text-gray-700">{obj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-[#000080] to-[#0000CC] text-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center">
              <ChevronRight className="mr-2" /> Community Development Projects:
              Successfully completed numerous projects, impacting thousands of
              individuals.
            </li>
            <li className="flex items-center">
              <ChevronRight className="mr-2" /> Volunteer Hours: NSS volunteers
              have contributed millions of hours of service across various
              initiatives.
            </li>
            <li className="flex items-center">
              <ChevronRight className="mr-2" /> Nationwide Reach: With units
              established in universities and colleges across the country, our
              presence is felt nationwide.
            </li>
          </ul>
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-[#000080]">
            Join Us
          </h2>
          <p className="text-xl mb-6 text-gray-700">
            Are you a student eager to make a difference? Do you want to develop
            leadership skills while serving your community?
          </p>
          {/* <Button className="bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Become a Volunteer
          </Button> */}
        </section>

        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4 text-[#000080]">Contact Us</h2>
          <p className="text-lg mb-4 text-gray-700">For more information about our initiatives and how you can get involved, please reach out to us at:</p>
          <ul className="text-lg text-gray-700 space-y-2">
            <li className="flex items-center"><ChevronRight className="mr-2 text-[#FF0000]" /> Email: info@nsswebsite.com</li>
            <li className="flex items-center"><ChevronRight className="mr-2 text-[#FF0000]" /> Phone: +91-XXXX-XXXXXX</li>
            <li className="flex items-center"><ChevronRight className="mr-2 text-[#FF0000]" /> Address: [University/Institution Address]</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
