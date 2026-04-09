"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Marquee from "@/component/Marquee"
import Header from "../component/header";
import Footer from "../component/footer";
import WhatsAppButton from "@/component/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Primary SEO */}
        <title>Champion Security System | CCTV Camera, Biometric & Access Control Mumbai</title>
        <meta name="description" content="Champion Security System Mumbai – Authorised dealer & installer of Hanwha, Matrix, Honeywell CCTV cameras, eSSL & Mantra biometric attendance systems, access control, VMS & visitor management solutions in Mumbai & Andheri." />
        <meta name="keywords" content="
          Hanwha CCTV Camera Installation Mumbai, Matrix CCTV Camera Dealer Mumbai, Honeywell CCTV Camera Installation, AI CCTV Camera Installation Mumbai, IP CCTV Camera Dealer Near Me, Security Camera Installation Andheri Mumbai, CCTV Camera Sale Service Installation Mumbai, Hanwha Matrix Honeywell CCTV Supplier, AI Video Analytics CCTV Camera, Smart CCTV Camera System Mumbai,
          ESSL Biometric Attendance System Mumbai, ESSL Fingerprint Attendance Machine, ESSL Face Recognition Attendance System, ESSL Access Control System Installation, ESSL Biometric Dealer Mumbai, Employee Attendance Machine ESSL,
          Mantra Biometric Attendance System, Mantra Cloud Biometric Solution, Mantra Fingerprint Attendance Machine, Mantra Face Recognition Biometric, Mantra Attendance Software Cloud Based, Mantra Biometric Installation Mumbai,
          Access Control System Installation Mumbai, Door Access Control System Dealer, RFID Card Access Control System, Biometric Access Control System, Office Entry Access Control System, Axis Access Control System Installation,
          Visitor Management Software Mumbai, Visitor Entry Management System, Digital Visitor Management Software, Cloud Visitor Management System, Office Visitor Management Solution, Visitor Pass Management Software,
          CCTV Camera Installation Near Me, Biometric Attendance System Near Me, Access Control System Near Me, Security System Supplier Mumbai, Champion Security System Mumbai, CCTV Camera Service Andheri Mumbai,
          Hanwha AI CCTV Camera Dealer, Matrix AI CCTV Camera System, Honeywell AI CCTV Installation, AI Video Analytics Surveillance System, Smart CCTV Camera Office Warehouse, Society CCTV Surveillance System, Hotel CCTV Camera Installation, Hospital CCTV Surveillance System, Industrial CCTV Camera Installation,
          Hanwha VMS Software Installation, Matrix VMS Software Solution, Honeywell VMS Software Setup, VMS Video Management Software, Video Management Solution VMS, Centralised CCTV Monitoring Software, Enterprise VMS CCTV System, CCTV Monitoring Software Mumbai,
          AI CCTV Camera Office Installation, Warehouse AI CCTV Camera System, Commercial AI Surveillance Camera, IP CCTV Camera Installation Mumbai, Security Camera System Near Me, Champion Security System Mumbai AI CCTV VMS,
          Biometric Attendance System Mumbai, eSSL Biometric Attendance System, Mantra Biometric Attendance Machine, Vi Mantra Biometric Device, Centralised Attendance Software, Cloud Based Attendance System, Real Time Attendance Report Software, Fingerprint Attendance Machine Mumbai, Face Recognition Attendance System, RFID Card Attendance System,
          Centralised Biometric Attendance System, Multi Location Attendance Software, Online Attendance Monitoring Software, Employee Attendance Management System, Biometric Attendance Software Cloud, Office Attendance System Installation, Warehouse Attendance System Biometric, Factory Attendance System Software,
          eSSL Mantra Biometric Dealer Mumbai, Mantra Cloud Attendance Software, Real Time Attendance Tracking System, Centralised Attendance Report Software, Biometric Attendance System Near Me,
          V Mantra Biometric Device, V Mantra Biometric Device Mumbai, V Mantra Attendance System, Mantra Biometric Attendance Machine Installation, Office Attendance System Biometric, Warehouse Attendance System Biometric,
          Cloud Based Attendance Software, Centralised Attendance Management System, Real Time Attendance Report System, Online Employee Attendance System, Multi Location Attendance Software, Biometric Attendance Cloud Software,
          Visitor Management Software Mumbai, Digital Visitor Record Software, Cloud Visitor Management System, Office Visitor Management Software, Visitor Entry Management System,
          VMS Data Management Software, Cloud Data Storage Management, Centralised Data Management System, Security Data Management Software, Video Management Software VMS, Cloud Data Storage Management System, Centralised Data Management Software, Attendance Data Cloud Storage,
          Hanwha CCTV Camera Installation, Matrix CCTV Camera Dealer, Honeywell CCTV Camera Installation, AI CCTV Camera Installation, IP CCTV Camera System Mumbai, Security Camera Installation Near Me, CCTV Camera Sale Service Mumbai,
          Access Control System Installation, RFID Card Access Control System, Door Access Control System Mumbai, Biometric Access Control System,
          Champion Security System Mumbai, Security System Supplier Mumbai, CCTV and Biometric Installation Mumbai,
          Biometric Attendance System Installation, Biometric Device Dealer Mumbai, Mantra Biometric Software Cloud, Attendance System Device Installation, Champion Security System Biometrics Mumbai
        " />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Champion Security System" />
        <link rel="canonical" href="https://www.championsecuritysystem.com/" />

        {/* Open Graph (Facebook / LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.championsecuritysystem.com/" />
        <meta property="og:title" content="Champion Security System | CCTV, Biometric & Access Control Mumbai" />
        <meta property="og:description" content="Authorised dealer & installer of Hanwha, Matrix, Honeywell CCTV cameras, eSSL & Mantra biometric attendance systems, VMS & access control in Mumbai." />
        <meta property="og:image" content="https://www.championsecuritysystem.com/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Champion Security System" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Champion Security System | CCTV, Biometric & Access Control Mumbai" />
        <meta name="twitter:description" content="Hanwha, Matrix & Honeywell CCTV camera installation, eSSL & Mantra biometric attendance, access control & VMS solutions in Mumbai." />
        <meta name="twitter:image" content="https://www.championsecuritysystem.com/og-image.jpg" />

        {/* Geo / Local SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Maharashtra, India" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <div className="relative flex min-h-screen flex-col">

          <Marquee 
            speed={90}
            backgroundColor="bg-[#1e3a8a]"
            textColor="text-white"
            className="py-2 text-sm font-medium"
          >
           We are Authorised Partners with Hanwha, Honeywell, Matrix, Panasonic i-Pro, and Axis Communications. We have STQC and BIS certification for all our cameras. CCTV Installation and Services in Mumbai.
          </Marquee>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* WhatsApp Button - Now handles its own office hours logic */}
          <WhatsAppButton
            phoneNumber="+918080806288"
            message="Hello! I'm interested in your services."
          />
        </div>
      </body>
    </html>
  );
}
