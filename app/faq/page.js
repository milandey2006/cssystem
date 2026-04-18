import React from 'react';
import { ChevronDown } from 'lucide-react';
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Frequently Asked Questions | Champion Security System",
  description: "Find answers to common questions about CCTV installation, biometric systems, access control, and our partner brands in Mumbai.",
};

const fallbackGeneralFaqs = [
  { question: "What types of security systems do you install?", answer: "We install a wide range of security systems including CCTV cameras (IP and Analog), Biometric Attendance Systems, Access Control Systems, Video Door Phones, and Visitor Management Systems from top global brands." },
  { question: "Do you provide installation services outside Mumbai?", answer: "Our primary focus is Mumbai and Andheri, but we do take up larger corporate or industrial projects in surrounding areas like Thane, Navi Mumbai, and Palghar depending on the project scope." },
  { question: "Do you offer maintenance and support after installation?", answer: "Yes, absolutely! We provide comprehensive Annual Maintenance Contracts (AMC) and 24/7 technical support to ensure your security systems are always functioning optimally." },
  { question: "How long does a typical installation take?", answer: "The installation time depends on the size of the premises and the number of cameras/devices. A standard office setup might take 1-2 days, while larger industrial projects could take a few weeks. We always provide a timeline before starting the work." },
  { question: "Are your technicians trained and certified?", answer: "Our technicians are highly trained and regularly updated on the latest technologies directly by our OEM partners. We ensure neat, professional, and precise installations every time." }
];

const fallbackBrandFaqs = [
  { question: "Why should I choose Hanwha Vision cameras?", answer: "Hanwha Vision (formerly Samsung Techwin) provides high-end AI-based CCTV cameras for commercial and high-security projects. Hanwha cameras are known for advanced video analytics, strong cybersecurity, and excellent image clarity." },
  { question: "What does Honeywell Security offer?", answer: "Honeywell Security delivers enterprise-grade CCTV surveillance and access control systems. Trusted globally, their robust infrastructure is designed for large-scale industrial and commercial security operations." },
  { question: "What are the benefits of Matrix CCTV systems?", answer: "Matrix Comsec is a leading provider of comprehensive IP video surveillance and telecom solutions. Their cameras and NVRs ensure seamless centralized management for proactive security monitoring." },
  { question: "Why use Axis Communications?", answer: "Axis Communications pioneers intelligent network video solutions. Their IP cameras offer unparalleled low-light performance, smart AI analytics, and scalable architectures for future-proof security." },
  { question: "What is special about Panasonic i-Pro?", answer: "Panasonic i-Pro brings professional-grade intelligent surveillance sensing. Known for extreme reliability and edge AI capabilities, i-Pro cameras ensure crystal-clear video evidence in the toughest environments." },
  { question: "How does Trassir help my business?", answer: "Trassir offers powerful Video Management System (VMS) software and dedicated servers. Their intelligent video analytics help businesses automate security monitoring and achieve deep situational awareness." },
  { question: "What makes Milesight cameras unique?", answer: "Milesight specializes in innovative AIoT and video surveillance products. Their 5G and AI-powered smart cameras offer cutting-edge connectivity and superior video processing for modern smart buildings." },
  { question: "Is Prama a good CCTV brand?", answer: "Prama is India's leading indigenous security brand, offering high-quality CCTV solutions. Designed for local requirements, Prama delivers cost-effective and highly reliable video surveillance systems." },
  { question: "Why use eSSL Security for biometrics?", answer: "eSSL Security is India's premier brand for biometric attendance and access control. Their fingerprint and face recognition systems integrate seamlessly to streamline workforce management." },
  { question: "What does Biomax specialize in?", answer: "Biomax provides advanced facial recognition and fingerprint biometric devices. Their cloud-based time attendance systems are perfect for centralized corporate and warehouse monitoring." },
  { question: "What products does OneTouch provide?", answer: "OneTouch specializes in smart video door phones and advanced home automation systems. Their IP intercoms deliver secure, app-based remote access for premium residential complexes." },
  { question: "Are Godrej security solutions reliable?", answer: "Godrej Security Solutions provides trusted mechanical and electronic security. From high-security vaults to digital locks and CCTV, Godrej is a legacy brand ensuring absolute peace of mind." },
  { question: "Why choose Yale smart locks?", answer: "Yale delivers premium smart locks and digital door security solutions. Renowned worldwide, their biometric and RFID locks integrate perfectly into modern smart home and office ecosystems." },
  { question: "What role does D-Link play in security?", answer: "D-Link offers reliable networking switches and robust PoE infrastructure. Their high-performance switches provide the stable power and bandwidth necessary for seamless IP CCTV deployments." },
  { question: "How does TP-Link support CCTV networks?", answer: "TP-Link is a global leader in networking and WiFi infrastructure. Their enterprise Omada switches and routers ensure uninterrupted, high-speed connectivity for massive IP camera networks." },
  { question: "Why use Netgear for surveillance networks?", answer: "Netgear provides business-class networking switches and secure storage solutions. Their ProAV and PoE+ switches deliver the exact power and reliability required for intensive surveillance video streaming." },
  { question: "What does Mivanta offer?", answer: "Mivanta provides expert access control and security automation solutions. Their comprehensive product line helps businesses implement secure physical entry points with sophisticated logic." },
  { question: "Why use CommScope cabling?", answer: "CommScope excels in enterprise cabling and structured networking infrastructure. Their premium CAT6 and optical fiber cables guarantee lossless data transmission for mission-critical security networks." },
  { question: "Are Delton cables good for CCTV?", answer: "Delton Cables are highly trusted for CCTV and communication wiring. Their durable co-axial and networking cables ensure long-lasting, interference-free connectivity for all security hardware." }
];

export default async function FAQPage() {
  let sanityGeneralFaqs = [];
  let sanityBrandFaqs = [];
  
  try {
    sanityGeneralFaqs = await client.fetch('*[_type == "generalFaq"] | order(order asc) { question, answer }');
    const brandData = await client.fetch('*[_type == "brandFaq"] | order(order asc) { question, answer }');
    sanityBrandFaqs = brandData.map(b => ({ question: b.question, answer: b.answer }));
  } catch (error) {
    console.error("Error fetching FAQs from Sanity:", error);
  }

  const displayGeneralFaqs = sanityGeneralFaqs && sanityGeneralFaqs.length > 0 ? sanityGeneralFaqs : fallbackGeneralFaqs;
  const displayBrandFaqs = sanityBrandFaqs && sanityBrandFaqs.length > 0 ? sanityBrandFaqs : fallbackBrandFaqs;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find everything you need to know about our security systems, installation processes, and the world-class brands we partner with.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">General Installation & Support</h2>
          <div className="space-y-4">
            {displayGeneralFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-lg text-gray-800 hover:text-blue-600 transition-colors">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronDown className="text-gray-400" />
                    </span>
                  </summary>
                  <div className="text-gray-600 p-6 pt-0 border-t border-gray-50 bg-gray-50/50 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Our Technology Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayBrandFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-md text-gray-800 hover:text-blue-600 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <span className="transition group-open:rotate-180 flex-shrink-0">
                      <ChevronDown className="text-gray-400" />
                    </span>
                  </summary>
                  <div className="text-gray-600 p-5 pt-0 border-t border-gray-50 bg-gray-50/50 leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center bg-blue-600 rounded-3xl p-10 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
            Can't find the answer you're looking for? Our team is here to help with any queries you might have.
          </p>
          <a href="tel:+918080806288" className="inline-flex items-center justify-center bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg hover:-translate-y-1">
            Contact Support Today
          </a>
        </div>
      </div>
    </div>
  );
}
