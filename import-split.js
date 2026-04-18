import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bp2n78ti',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const generalFaqs = [
  { question: "What types of security systems do you install?", answer: "We install a wide range of security systems including CCTV cameras (IP and Analog), Biometric Attendance Systems, Access Control Systems, Video Door Phones, and Visitor Management Systems from top global brands." },
  { question: "Do you provide installation services outside Mumbai?", answer: "Our primary focus is Mumbai and Andheri, but we do take up larger corporate or industrial projects in surrounding areas like Thane, Navi Mumbai, and Palghar depending on the project scope." },
  { question: "Do you offer maintenance and support after installation?", answer: "Yes, absolutely! We provide comprehensive Annual Maintenance Contracts (AMC) and 24/7 technical support to ensure your security systems are always functioning optimally." },
  { question: "How long does a typical installation take?", answer: "The installation time depends on the size of the premises and the number of cameras/devices. A standard office setup might take 1-2 days, while larger industrial projects could take a few weeks. We always provide a timeline before starting the work." },
  { question: "Are your technicians trained and certified?", answer: "Our technicians are highly trained and regularly updated on the latest technologies directly by our OEM partners. We ensure neat, professional, and precise installations every time." }
];

const brandData = [
  { name: "Hanwha", desc: "Hanwha Vision (formerly Samsung Techwin) provides high-end AI-based CCTV cameras for commercial and high-security projects. Hanwha cameras are known for advanced video analytics, strong cybersecurity, and excellent image clarity.", faqQuestion: "Why should I choose Hanwha Vision cameras?" },
  { name: "Honeywell", desc: "Honeywell Security delivers enterprise-grade CCTV surveillance and access control systems. Trusted globally, their robust infrastructure is designed for large-scale industrial and commercial security operations.", faqQuestion: "What does Honeywell Security offer?" },
  { name: "Matrix CCTV", desc: "Matrix Comsec is a leading provider of comprehensive IP video surveillance and telecom solutions. Their cameras and NVRs ensure seamless centralized management for proactive security monitoring.", faqQuestion: "What are the benefits of Matrix CCTV systems?" },
  { name: "Axis Communications", desc: "Axis Communications pioneers intelligent network video solutions. Their IP cameras offer unparalleled low-light performance, smart AI analytics, and scalable architectures for future-proof security.", faqQuestion: "Why use Axis Communications?" },
  { name: "Panasonic i-Pro", desc: "Panasonic i-Pro brings professional-grade intelligent surveillance sensing. Known for extreme reliability and edge AI capabilities, i-Pro cameras ensure crystal-clear video evidence in the toughest environments.", faqQuestion: "What is special about Panasonic i-Pro?" },
  { name: "Trassir", desc: "Trassir offers powerful Video Management System (VMS) software and dedicated servers. Their intelligent video analytics help businesses automate security monitoring and achieve deep situational awareness.", faqQuestion: "How does Trassir help my business?" },
  { name: "Milesight", desc: "Milesight specializes in innovative AIoT and video surveillance products. Their 5G and AI-powered smart cameras offer cutting-edge connectivity and superior video processing for modern smart buildings.", faqQuestion: "What makes Milesight cameras unique?" },
  { name: "Prama", desc: "Prama is India's leading indigenous security brand, offering high-quality CCTV solutions. Designed for local requirements, Prama delivers cost-effective and highly reliable video surveillance systems.", faqQuestion: "Is Prama a good CCTV brand?" },
  { name: "ESSL Security", desc: "eSSL Security is India's premier brand for biometric attendance and access control. Their fingerprint and face recognition systems integrate seamlessly to streamline workforce management.", faqQuestion: "Why use eSSL Security for biometrics?" },
  { name: "Biomax", desc: "Biomax provides advanced facial recognition and fingerprint biometric devices. Their cloud-based time attendance systems are perfect for centralized corporate and warehouse monitoring.", faqQuestion: "What does Biomax specialize in?" },
  { name: "OneTouch", desc: "OneTouch specializes in smart video door phones and advanced home automation systems. Their IP intercoms deliver secure, app-based remote access for premium residential complexes.", faqQuestion: "What products does OneTouch provide?" },
  { name: "Godrej", desc: "Godrej Security Solutions provides trusted mechanical and electronic security. From high-security vaults to digital locks and CCTV, Godrej is a legacy brand ensuring absolute peace of mind.", faqQuestion: "Are Godrej security solutions reliable?" },
  { name: "Yale", desc: "Yale delivers premium smart locks and digital door security solutions. Renowned worldwide, their biometric and RFID locks integrate perfectly into modern smart home and office ecosystems.", faqQuestion: "Why choose Yale smart locks?" },
  { name: "D-Link", desc: "D-Link offers reliable networking switches and robust PoE infrastructure. Their high-performance switches provide the stable power and bandwidth necessary for seamless IP CCTV deployments.", faqQuestion: "What role does D-Link play in security?" },
  { name: "TP-Link", desc: "TP-Link is a global leader in networking and WiFi infrastructure. Their enterprise Omada switches and routers ensure uninterrupted, high-speed connectivity for massive IP camera networks.", faqQuestion: "How does TP-Link support CCTV networks?" },
  { name: "Netgear", desc: "Netgear provides business-class networking switches and secure storage solutions. Their ProAV and PoE+ switches deliver the exact power and reliability required for intensive surveillance video streaming.", faqQuestion: "Why use Netgear for surveillance networks?" },
  { name: "Mivanta", desc: "Mivanta provides expert access control and security automation solutions. Their comprehensive product line helps businesses implement secure physical entry points with sophisticated logic.", faqQuestion: "What does Mivanta offer?" },
  { name: "CommScope", desc: "CommScope excels in enterprise cabling and structured networking infrastructure. Their premium CAT6 and optical fiber cables guarantee lossless data transmission for mission-critical security networks.", faqQuestion: "Why use CommScope cabling?" },
  { name: "Delton", desc: "Delton Cables are highly trusted for CCTV and communication wiring. Their durable co-axial and networking cables ensure long-lasting, interference-free connectivity for all security hardware.", faqQuestion: "Are Delton cables good for CCTV?" }
];

async function seedData() {
  console.log('Cleaning up old brandPartner docs...');
  const oldDocs = await client.fetch('*[_type == "brandPartner"]._id');
  for (const id of oldDocs) {
    await client.delete(id);
  }
  
  // Note: we don't delete generalFaq as they are already fine. If they exist twice, user can delete.
  
  console.log('Seeding Brand SEO Cards...');
  for (let i = 0; i < brandData.length; i++) {
    const doc = {
      _type: 'brandSeoCard',
      name: brandData[i].name,
      description: brandData[i].desc,
      order: i,
    };
    await client.create(doc);
  }

  console.log('Seeding Brand FAQs...');
  for (let i = 0; i < brandData.length; i++) {
    const doc = {
      _type: 'brandFaq',
      question: brandData[i].faqQuestion,
      answer: brandData[i].desc,
      order: i,
    };
    await client.create(doc);
  }

  console.log('Seeding completed successfully!');
}

seedData().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
