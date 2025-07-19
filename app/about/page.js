"use client";

import React from "react";
import {
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaClock,
  FaBullseye,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import handShake from "@/public/handshake.jpg";
import Image from "next/image";
import banner from "@/public/about/banner.jpg";

const page = () => {
  return (
    <div>
      <section className="relative bg-gray-900 text-white py-20 px-4">
        <Image
          src={banner}
          className="absolute inset-0 object-cover w-full h-full z-0"
          alt="Security services banner"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About US</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Champion Security System has been at the forefront of security
            technology, providing innovative solutions to protect homes and
            businesses for over 17 years
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-[480px] aspect-square bg-gray-100 rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src={handShake}
                  alt="Hero Image"
                  className="object-cover rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            {/* Text content */}
            <div className="space-y-4 order-1 lg:order-2">
              <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                Our Story
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                From Humble Beginnings
              </h2>
              <p className="text-gray-500 md:text-lg">
                Founded in 2008 by Rajesh Dey, Champion Security System began
                with a clear mission: to deliver reliable and quality-driven
                security solutions across India. What started as a humble
                venture quickly scaled up with the opening of a dedicated office
                and a growing team by 2010.
              </p>
              <p className="text-gray-500 md:text-lg">
                By 2014, the company had taken a major step forward by
                officially registering under its current name, solidifying its
                commitment to professionalism and structured growth. Over the
                years, Champion Security System has consistently aligned itself
                with large-scale enterprises and complex infrastructure
                projects, showcasing technical expertise and operational
                excellence. From enabling advanced security frameworks across
                retail chains to designing robust networking solutions for
                critical institutions, the company has built a reputation for
                innovation and dependability.
              </p>
              <p className="text-gray-500 md:text-lg">
                Even amidst the unprecedented challenges of the Covid-19
                pandemic, Champion stepped up to deliver vital surveillance
                infrastructure for healthcare and civic bodies, earning
                accolades for its resilience and contribution. Today, with its
                involvement in metro-scale smart city developments, the company
                continues to evolve — integrating modern technologies like
                voice-enabled systems and IoT-based solutions and AI based
                security solutions — while staying grounded in its core values
                of service, safety, and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              Our Purpose
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
              Mission & Values
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
              Our mission guides everything we do, and our values define how we
              do it.
            </p>
          </div>

          {/* Our Mission - Unified Card Style */}
          <div className="mb-16 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                <FaBullseye className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
                To provide peace of mind through innovative security solutions
                that protect what matters most to our customers.
              </p>
            </div>
          </div>

          {/* Our Values - Existing Card Grid (slightly refined for consistency) */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Our Core Values
            </h3>{" "}
            {/* Changed heading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value Card 1: Integrity */}
              <Card className="rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
                    <FaShieldAlt className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">Integrity</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    We operate with honesty and transparency in all our
                    dealings.
                  </p>
                </CardContent>
              </Card>

              {/* Value Card 2: Excellence */}
              <Card className="rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                    <FaAward className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">
                    Excellence
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    We strive for excellence in every product and service we
                    provide.
                  </p>
                </CardContent>
              </Card>

              {/* Value Card 3: Customer Focus */}
              <Card className="rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4">
                    <FaUsers className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">
                    Customer Focus
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Our customers&apos; needs drive our decisions and
                    innovations.
                  </p>
                </CardContent>
              </Card>

              {/* Value Card 4: Reliability */}
              <Card className="rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                    <FaClock className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">
                    Reliability
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    We deliver on our promises and stand behind our products and
                    services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen flex items-center justify-center bg-white py-12 md:py-24">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className=" flex flex-col space-y-2 items-center justify-center">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">
                Our Achievements
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Milestones & Recognition
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                Our journey of growth and excellence over the years
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-12 relative">
            {/* Timeline Items */}
            {[
              {
                year: "2008",
                title: "Company Founded",
                desc: "Champion Security System was founded by Rajesh Dey with a mission to provide quality security solutions.",
              },
              {
                year: "2010",
                title: "Expansion",
                desc: "Opened our first dedicated office and expanded our team to 10 employees.",
              },
              {
                year: "2014-15",
                title: "Company Registration",
                desc: 'We got officially registered as "Champion Security System"',
              },
              {
                year: "2017-18",
                title: "Projects with Aditya Birla Group",
                desc: "We worked with Aditya Birla Group 160+ stores Pan India in Pantaloons. Also along with Aditya Birla Group, we worked with 20+ stores Pan India of Sugar Cosmetics.",
              },
              {
                year: "2019",
                title: "Reserved Bank of India",
                desc: "Networking solutions for all the data centers of Reserve Bank of India.",
              },
              {
                year: "2020-22",
                title: "Covid-19 Pandemic MMRDA, MMRC, MCGM Projects",
                desc: "We provided CCTV security solutions for MMRDA, MMRC, Mahada and MCGM projects during the Covid-19 pandemic in the hospitals more than 13+ hospitals and awarded as Covid Warriors by Municipal Corporation of Greater Mumbai.",
              },
              {
                year: "2024-25",
                title: "Mumbai Metro Rail Corporation Limited",
                desc: "We are working with Mumbai Metro Corporation for the security solutions and Open Voice Command of all the 27 stations Elevators of Mumbai Aqua Metro Line 3.",
              },
            ].map((item, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-gray-200">
                {/* Dot */}
                <div className="absolute left-[-9px] top-1 h-4 w-4 rounded-full bg-black shadow-sm"></div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base">{item.year}</span>
                    <div className="w-12 h-px bg-gray-300"></div>
                    <span className="text-gray-500">{item.title}</span>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">
                Testimonials
              </div>
              {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
          Dont just take our word for it - hear from our satisfied customers
        </p> */}
            </div>
          </div>

          {/* Testimonials Grid */}
          {/* <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-12">
      {[
        {
          quote: `"Exceptional professionalism from start to finish. The administrative staff, the owner, and the CCTV security camera engineers were courteous and knowledgeable. The engineers took the time to discuss optimal camera positioning, meticulously programmed our devices, and executed a clean installation with neatly concealed wires. The service provided by this team is not only top-notch but also offers great value for money when compared to other quotes. Highly recommended!"`,
          name: "- Mukesh Soni",
        },
        {
          quote: `"The team exhibited exceptional courtesy, and their prompt response to my call was truly commendable. The immediate and efficient service they provided reflects their dedication to customer satisfaction. I am highly impressed and would confidently recommend their services. In a world where reliable service matters, they've certainly set a commendable standard."`,
          name: "- Ajay Shinde",
        },
        {
          quote: `"Appreciate Champion Security system commitment to continuous improvement. They keep us updated on new features and upgrades for our CCTV system.Their support team is efficient and helpful."`,
          name: "- Kajal",
        },
        {
          quote: `"I recently had a CCTV system installed by Champion Security Systems and I am extremely satisfied with the results. The Installation process was quick and hassle-free and the technicians were professional and knowledgeable. I appreciate the thoroughness of their work and would highly recommend this company to those in need of reliable and effective security solutions."`,
          name: "- Pralhad Joglekar",
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-gray-100 p-2">
            </div>
            <div>
              <p className="text-gray-500 italic mb-4">{item.quote}</p>
              <p className="font-semibold">{item.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div> */}

          <script
            src="https://static.elfsight.com/platform/platform.js"
            data-use-service-core
            defer
          ></script>
          <div
            className="elfsight-app-13ffe455-64fd-42a5-8966-7153d87beb9a"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>
    </div>
  );
};

export default page;
