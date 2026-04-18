import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client"

const fallbackBrandSeoCards = [
  { name: "Hanwha", desc: "Hanwha Vision (formerly Samsung Techwin) provides high-end AI-based CCTV cameras for commercial and high-security projects. Hanwha cameras are known for advanced video analytics, strong cybersecurity, and excellent image clarity." },
  { name: "Honeywell", desc: "Honeywell Security delivers enterprise-grade CCTV surveillance and access control systems. Trusted globally, their robust infrastructure is designed for large-scale industrial and commercial security operations." },
  { name: "Matrix CCTV", desc: "Matrix Comsec is a leading provider of comprehensive IP video surveillance and telecom solutions. Their cameras and NVRs ensure seamless centralized management for proactive security monitoring." },
  { name: "Axis Communications", desc: "Axis Communications pioneers intelligent network video solutions. Their IP cameras offer unparalleled low-light performance, smart AI analytics, and scalable architectures for future-proof security." },
  { name: "Panasonic i-Pro", desc: "Panasonic i-Pro brings professional-grade intelligent surveillance sensing. Known for extreme reliability and edge AI capabilities, i-Pro cameras ensure crystal-clear video evidence in the toughest environments." },
  { name: "Trassir", desc: "Trassir offers powerful Video Management System (VMS) software and dedicated servers. Their intelligent video analytics help businesses automate security monitoring and achieve deep situational awareness." },
  { name: "Milesight", desc: "Milesight specializes in innovative AIoT and video surveillance products. Their 5G and AI-powered smart cameras offer cutting-edge connectivity and superior video processing for modern smart buildings." },
  { name: "Prama", desc: "Prama is India's leading indigenous security brand, offering high-quality CCTV solutions. Designed for local requirements, Prama delivers cost-effective and highly reliable video surveillance systems." },
  { name: "ESSL Security", desc: "eSSL Security is India's premier brand for biometric attendance and access control. Their fingerprint and face recognition systems integrate seamlessly to streamline workforce management." },
  { name: "Biomax", desc: "Biomax provides advanced facial recognition and fingerprint biometric devices. Their cloud-based time attendance systems are perfect for centralized corporate and warehouse monitoring." },
  { name: "OneTouch", desc: "OneTouch specializes in smart video door phones and advanced home automation systems. Their IP intercoms deliver secure, app-based remote access for premium residential complexes." },
  { name: "Godrej", desc: "Godrej Security Solutions provides trusted mechanical and electronic security. From high-security vaults to digital locks and CCTV, Godrej is a legacy brand ensuring absolute peace of mind." },
  { name: "Yale", desc: "Yale delivers premium smart locks and digital door security solutions. Renowned worldwide, their biometric and RFID locks integrate perfectly into modern smart home and office ecosystems." },
  { name: "D-Link", desc: "D-Link offers reliable networking switches and robust PoE infrastructure. Their high-performance switches provide the stable power and bandwidth necessary for seamless IP CCTV deployments." },
  { name: "TP-Link", desc: "TP-Link is a global leader in networking and WiFi infrastructure. Their enterprise Omada switches and routers ensure uninterrupted, high-speed connectivity for massive IP camera networks." },
  { name: "Netgear", desc: "Netgear provides business-class networking switches and secure storage solutions. Their ProAV and PoE+ switches deliver the exact power and reliability required for intensive surveillance video streaming." },
  { name: "Mivanta", desc: "Mivanta provides expert access control and security automation solutions. Their comprehensive product line helps businesses implement secure physical entry points with sophisticated logic." },
  { name: "CommScope", desc: "CommScope excels in enterprise cabling and structured networking infrastructure. Their premium CAT6 and optical fiber cables guarantee lossless data transmission for mission-critical security networks." },
  { name: "Delton", desc: "Delton Cables are highly trusted for CCTV and communication wiring. Their durable co-axial and networking cables ensure long-lasting, interference-free connectivity for all security hardware." }
];

export default async function CSSClientsSlider() {
  let sanityBrandCards = [];
  try {
    sanityBrandCards = await client.fetch('*[_type == "brandSeoCard"] | order(order asc) { name, description }');
  } catch (error) {
    console.error("Error fetching brand partners from Sanity:", error);
  }

  // Fallback to hardcoded array if Sanity data is empty
  const displayCards = sanityBrandCards && sanityBrandCards.length > 0 
    ? sanityBrandCards.map(b => ({ name: b.name, desc: b.description })) 
    : fallbackBrandSeoCards;

  return (
    <div className="mt-12">
      {/* Trusted By Industry Leaders - SEO Cards */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-wide mb-4">Trusted By Industry Leaders</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            We partner with the world's leading technology brands to deliver top-tier, certified security systems and networking infrastructure for your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCards.map((brand, index) => (
            <Link href={`/faq`} key={index} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block cursor-pointer">
              <h3 className="text-blue-600 font-bold text-xl mb-3 group-hover:text-blue-800 transition-colors">{brand.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{brand.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="text-center mt-12 mb-16">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-md font-medium text-gray-600 bg-gray-50 py-6 rounded-2xl max-w-5xl mx-auto border border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
            <span>15+ Technology Partners</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            <span>Since 2008</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
            <span>2000+ Satisfied Clients</span>
          </div>
        </div>
      </div>
    </div>
  )
}
