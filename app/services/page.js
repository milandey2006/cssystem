"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Settings, Wrench, Clock, Phone, Shield, Calendar } from 'lucide-react';
import install from '@/public/services/installation.jpg';
import maintenance from '@/public/services/maintain.jpg';
import monitoring from '@/public/services/monitor.jpg';

// Re-defining the services to fit the single card style with updated content
const services = [
  {
    title: "Security System Installation",
    description: "Our expert technicians ensure your security system is installed correctly and optimized for your specific needs. We handle everything from camera placement to system configuration.",
    features: [
      "Expert system design & planning",
      "Professional, clean installation",
      "System configuration & testing",
      "Comprehensive user training",
    ],
    // Only one cardType needed now, but keeping for reference if you expand later
    cardType: "gradient",
    // These colors will now be dynamic based on the service category
    mainColor: "blue", // For Installation
    IconComponent: Settings, // Main icon for the service
    buttonText: "Schedule Installation",
  },
  {
    title: "Maintenance & Support Services",
    description: "Keep your security systems performing at their best with our comprehensive maintenance services. Regular check-ups prevent issues and extend equipment life.",
    features: [
      "Preventative maintenance & checks",
      "Software & firmware updates",
      "Hardware repair & replacement",
      "Priority technical support",
    ],
    cardType: "gradient", // All cards use this style
    mainColor: "green", // For Maintenance
    IconComponent: Wrench, // Main icon for the service
    buttonText: "Request Maintenance",
  },
  {
    title: "24/7 Monitoring Services",
    description: "Our professional monitoring center provides continuous surveillance, ensuring immediate response to any alerts from your security system, day or night.",
    features: [
      "Continuous professional surveillance",
      "Rapid alert verification & response",
      "Emergency service dispatch",
      "Detailed monthly activity reports",
    ],
    cardType: "gradient", // All cards use this style
    mainColor: "purple", // For Monitoring
    IconComponent: Shield, // Main icon for the service
    buttonText: "Get Monitoring Quote",
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('installation'); // Keep for detailed view section

  const tabs = [
    { id: 'installation', label: 'Installation' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'monitoring', label: 'Monitoring' }
  ];

  const tabContent = {
    installation: {
      title: 'Professional Installation Services',
      description: 'Our expert technicians ensure your security system is installed correctly and optimized for your specific needs. We handle everything from camera placement to system configuration.',
      features: [
        {
          icon: Settings,
          title: 'Expert System Design',
          description: 'We assess your property and design a security system that provides optimal coverage with no blind spots.',
          color: 'blue'
        },
        {
          icon: Wrench,
          title: 'Professional Installation',
          description: 'Our certified technicians handle all aspects of installation, from mounting cameras to running cables and configuring software.',
          color: 'blue'
        },
        {
          icon: Clock,
          title: 'Timely Completion',
          description: 'We work efficiently to complete your installation with minimal disruption to your home or business.',
          color: 'blue'
        }
      ],
      buttonText: 'Schedule a Consultation',
      imageAlt: 'Security system installation',
      imageUrl: install // Assuming you have an image for installation
    },
    maintenance: {
      title: 'Comprehensive Maintenance Plans',
      description: 'Keep your security system performing at its best with our maintenance services. Regular maintenance prevents issues before they occur and extends the life of your equipment.',
      features: [
        {
          icon: Wrench,
          title: 'Preventative Maintenance',
          description: 'Regular system checks and cleaning to prevent issues and ensure optimal performance.',
          color: 'green'
        },
        {
          icon: Settings,
          title: 'Software Updates',
          description: 'Keep your system up-to-date with the latest firmware and software updates for enhanced security.',
          color: 'green'
        },
        {
          icon: Phone,
          title: 'Priority Support',
          description: 'Maintenance plan customers receive priority technical support and faster response times.',
          color: 'green'
        }
      ],
      buttonText: 'View Maintenance Plans',
      imageAlt: 'Security system maintenance',
      imageUrl: maintenance // Assuming you have an image for maintenance
    },
    monitoring: {
      title: '24/7 Professional Monitoring',
      description: 'Our monitoring center is staffed around the clock by trained security professionals who respond immediately to alerts from your system.',
      features: [
        {
          icon: Shield,
          title: 'Continuous Surveillance',
          description: 'Our monitoring center watches over your property 24/7, ensuring immediate response to any security events.',
          color: 'purple'
        },
        {
          icon: Phone,
          title: 'Rapid Response',
          description: 'When an alarm is triggered, our team verifies the threat and dispatches emergency services if needed.',
          color: 'purple'
        },
        {
          icon: Calendar,
          title: 'Monthly Reporting',
          description: 'Receive detailed monthly reports on system activity, alerts, and response times.',
          color: 'purple'
        }
      ],
      buttonText: 'Learn About Monitoring',
      imageAlt: 'Security monitoring center',
      imageUrl: monitoring // Assuming you have an image for monitoring
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        gradientBg: "from-blue-50 to-indigo-100",
        borderColor: "border-blue-200",
        iconBg: "bg-blue-600",
        iconText: "text-white",
        featureBulletBg: "bg-blue-500",
        buttonBg: "from-blue-600 to-indigo-600",
        buttonHover: "hover:from-blue-700 hover:to-indigo-700",
      },
      green: {
        gradientBg: "from-green-50 to-lime-100",
        borderColor: "border-green-200",
        iconBg: "bg-green-600",
        iconText: "text-white",
        featureBulletBg: "bg-green-500",
        buttonBg: "from-green-600 to-emerald-600",
        buttonHover: "hover:from-green-700 hover:to-emerald-700",
      },
      purple: {
        gradientBg: "from-purple-50 to-pink-100",
        borderColor: "border-purple-200",
        iconBg: "bg-purple-600",
        iconText: "text-white",
        featureBulletBg: "bg-purple-500",
        buttonBg: "from-purple-600 to-fuchsia-600",
        buttonHover: "hover:from-purple-700 hover:to-fuchsia-700",
      },
    };
    return colors[color] || colors.blue; // Default to blue if color not found
  };

  const renderCard = (service, idx) => {
    const colors = getColorClasses(service.mainColor);
    const IconComponent = service.IconComponent; // Get the specific icon component

    return (
      <div
        key={service.title}
        className={`bg-gradient-to-br ${colors.gradientBg} rounded-2xl shadow-lg p-8 flex flex-col items-start border ${colors.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      >
        <div className={`p-4 rounded-full mb-6 shadow-md ${colors.iconBg}`}>
          <IconComponent className={`w-8 h-8 ${colors.iconText}`} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
        <p className="text-gray-700 text-sm mb-6 leading-relaxed flex-grow">{service.description}</p>
        <ul className="mb-8 space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-800 text-base">
              <div className={`w-5 h-5 ${colors.featureBulletBg} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              {feature}
            </li>
          ))}
        </ul>
        <button className={`w-full bg-gradient-to-r ${colors.buttonBg} text-white font-semibold rounded-xl py-3 ${colors.buttonHover} transition-all duration-200 shadow-md`}>
        <Link href="/contact" passHref>
          {service.buttonText}
        </Link>
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Security Services
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Expert installation, maintenance, and monitoring services for complete peace of mind
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-md hover:bg-gray-200 transition duration-300">
              Explore Services
            </button>
            <button className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-600 transition duration-300">
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* Services Cards Section (Now using only the gradient style) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Our Services</h2>
            <p className="text-gray-600 text-lg">
              We provide comprehensive security solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => renderCard(service, idx))}
          </div>
        </div>
      </section>

      {/* Detailed View Section (This section remains unchanged as requested) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Service Details</h2>
            <p className="text-gray-600 text-lg">
              Learn more about each service and how we can help protect what matters most
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white p-1 rounded-lg shadow-sm border">
                <div className="grid grid-cols-3 gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-black text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300 ease-in-out">
              {Object.entries(tabContent).map(([key, content]) => (
                <div
                  key={key}
                  className={`${
                    activeTab === key ? 'block animate-fadeIn' : 'hidden'
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className={`space-y-6 ${activeTab === 'maintenance' ? 'md:order-2' : ''}`}>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {content.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {content.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-6">
                        {content.features.map((feature, index) => {
                          const IconComponent = feature.icon;
                          return (
                            <div key={index} className="flex items-start gap-4">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${getColorClasses(feature.color).iconBg} ${getColorClasses(feature.color).iconText} flex-shrink-0`}>
                                <IconComponent className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  {feature.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTA Button */}
                      <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 mt-8">
                      <Link href="/contact" passHref>
                        {content.buttonText}
                      </Link>
                      </button>
                    </div>

                    {/* Image Section */}
                    <div className={`relative rounded-xl overflow-hidden shadow-lg ${activeTab === 'maintenance' ? 'md:order-1' : ''}`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <p className="text-xs mt-1">
                            <Image
                              src={content.imageUrl}
                              alt={content.imageAlt}
                              className="w-full h-auto object-cover rounded-lg"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}