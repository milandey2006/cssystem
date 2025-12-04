"use client";
import React from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Users, 
  Award, 
  Cctv, 
  Server, 
  Fingerprint, 
  Lock, 
  Video, 
  Bell,
  Wifi
} from "lucide-react";

const AboutSection = () => {
  const expertise = [
    {
      title: "CCTV Systems",
      icon: <Cctv className="w-6 h-6" />,
      desc: "Advanced surveillance",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "NVR & Servers",
      icon: <Server className="w-6 h-6" />,
      desc: "Secure storage",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      title: "Access Control",
      icon: <Fingerprint className="w-6 h-6" />,
      desc: "Biometric security",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      title: "Smart Locks",
      icon: <Lock className="w-6 h-6" />,
      desc: "Digital entry",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      title: "Video Door Phones",
      icon: <Video className="w-6 h-6" />,
      desc: "Remote communication",
      color: "text-pink-500",
      bg: "bg-pink-50"
    },
    {
      title: "Alarm Systems",
      icon: <Bell className="w-6 h-6" />,
      desc: "Instant alerts",
      color: "text-red-500",
      bg: "bg-red-50"
    },
  ];

  const partners = [
    "Hanwha",
    "Honeywell",
    "Matrix CCTV",
    "Axis Communications",
    "Panasonic i-Pro",
    "Trassir",
    "Milesight",
    "Prama",
    "ESSL Security",
    "Biomax",
    "OneTouch",
    "Godrej",
    "Yale",
    "D-Link",
    "TP-Link",
    "Netgear",
    "Mivanta",
    "CommScope",
    "Delton",
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Est. 2008
            </div> */}
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              We Don't Just Install Cameras. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                We Engineer Safety.
              </span>
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-6 italic">
                "At Champion Security System, we believe true security isn't about gadgets it's about the peace of mind that comes from knowing your world is protected by us."
              </p>
              <p className="text-gray-600 pl-6">
                Proudly serving <strong>Mumbai, Andheri and Near By Areas,</strong> with professional CCTV installation and support.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 py-6 border-y border-gray-100">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-gray-900">17+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">Years Experience</span>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-gray-900">2000+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">Projects Completed</span>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-gray-900">100%</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">Client Satisfaction</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Certified Security Experts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Technical Support & Monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Customized Solutions for Every Budget</span>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="/about" 
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
              >
                Discover Our Story
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Expertise Grid */}
          <div className="relative">
            {/* Decorative background blob */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10" />
            
            <div className="grid sm:grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center border-t border-gray-100 pt-16"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Industry Leaders
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="text-xl font-bold text-gray-400 hover:text-blue-600 transition-colors cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
