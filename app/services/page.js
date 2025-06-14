"use client";
import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Settings, Wrench, Clock, Phone, Shield, Calendar } from 'lucide-react';

const services = [
  {
    title: "Installation Services",
    description: "Professional setup of your security systems",
    features: [
      "Expert technicians",
      "Clean, professional wiring",
      "System configuration",
      "User training",
    ],
    border: "border-t-4 border-blue-400",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    button: "Schedule Installation",
    cardType: "gradient"
  },
  {
    title: "Maintenance & Support",
    description: "Keep your systems running optimally",
    features: [
      "Regular system checks",
      "Software updates",
      "Hardware repairs",
      "24/7 technical support",
    ],
    border: "border-t-4 border-green-400",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    button: "Request Maintenance",
    cardType: "dark"
  },
  {
    title: "Monitoring Services",
    description: "24/7 surveillance and alert management",
    features: [
      "24/7 professional monitoring",
      "Instant alert verification",
      "Emergency dispatch",
      "Monthly activity reports",
    ],
    border: "border-t-4 border-purple-400",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    button: "Get Monitoring",
    cardType: "minimal"
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('installation');

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
      imageAlt: 'Security system installation'
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
      imageAlt: 'Security system maintenance'
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
      imageAlt: 'Security monitoring center'
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  const renderCard = (service, idx) => {
    switch (service.cardType) {
      case 'gradient':
        return (
          <div
            key={service.title}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8 flex flex-col items-start border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="bg-white p-4 rounded-full mb-6 shadow-md">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">{service.description}</p>
            <ul className="mb-8 space-y-3 flex-grow">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-800 text-base">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl py-3 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md">
              {service.button}
            </button>
          </div>
        );

      case 'dark':
        return (
          <div
            key={service.title}
            className="bg-gray-900 text-white rounded-2xl shadow-lg p-8 flex flex-col items-start border border-gray-800 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="bg-green-500 p-4 rounded-xl mb-6 relative z-10">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white relative z-10">{service.title}</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10">{service.description}</p>
            <ul className="mb-8 space-y-3 flex-grow relative z-10">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-200 text-base">
                  <FaCheckCircle className="text-green-400 mr-3 text-lg" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-green-500 text-white font-semibold rounded-xl py-3 hover:bg-green-400 transition-all duration-200 relative z-10">
              {service.button}
            </button>
          </div>
        );

      case 'minimal':
        return (
          <div
            key={service.title}
            className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-start border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 group"
          >
            <div className="w-full flex justify-between items-start mb-6">
              <div className="bg-purple-50 p-3 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">PREMIUM</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>
            <div className="w-full mb-6">
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={feature} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 text-sm">{feature}</span>
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full border-2 border-purple-600 text-purple-600 font-semibold rounded-xl py-3 hover:bg-purple-600 hover:text-white transition-all duration-200 mt-auto">
              {service.button}
            </button>
          </div>
        );

      default:
        return null;
    }
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

      {/* Services Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Our Services</h2>
            <p className="text-gray-600 text-lg">
              We provide comprehensive security solutions tailored to your specific needs
            </p>
          </div>

          {/* Three Different Card Designs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => renderCard(service, idx))}
          </div>
        </div>
      </section>

      {/* Detailed View Section */}
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
                              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${getColorClasses(feature.color)} flex-shrink-0`}>
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
                        {content.buttonText}
                      </button>
                    </div>

                    {/* Image Section */}
                    <div className={`relative rounded-xl overflow-hidden shadow-lg ${activeTab === 'maintenance' ? 'md:order-1' : ''}`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">{content.imageAlt}</p>
                          <p className="text-xs mt-1">800 × 600</p>
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