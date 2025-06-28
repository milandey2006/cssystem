import "./globals.css";
import { Inter } from 'next/font/google'

import Header from "../component/header";
import Footer from "../component/footer";
const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: "Champion Security System",
  description:
    "Champion Security System is a leading provider of advanced security solutions, specializing in CCTV, access control, and alarm systems. We are committed to delivering top-notch security services to protect your home and business.",
  keywords: [
    "ESSL Biometric",
    "Access Control",
    "CCTV Camera Installation",
    "CCTV Camera Installation in Mumbai",
    "CCTV Camera Installation Local Area",
    "IP Network CCTV Camera Installation",
    "Panasonic CCTV Camera Installation Services",
    "Hanwha CCTV Camera Installation Services",
    "Matrix CCTV Camera Installation Services",
    "Home CCTV Camera Installation Services",
    "Wifi CCTV Camera Installation Services",
    "CCTV Camera Installation Services in Mumbai",
    "CCTV Camera Installation Near Me",
    "CCTV Camera Installation Home Office",
    "Hanwha CCTV Camera",
    "CCTV Camera Package",
    "CCTV Camera Installation Andheri",
    "CCTV Camera Installation HD IP Network Camera",
    "Security System",
    "CCTV Camera Dealer",
    "Security System Services",
    "Security System Service Near Me",
    "Hanwha CCTV",
    "Panasonic CCTV",
    "ESSL Biometric Attendance System",
    "Biomax Biometric Attendance System",
    "Honeywell CCTV Camera Installation Services",
    "Honeywell CCTV Camera Installation Services in Mumbai",
    "Hanwha HD CCTV Camera",
    "Hanwha IP Network CCTV Camera",
    "Hanwha IP Network CCTV Camera Installation Services",
    "CCTV Camera Installation and Services",
    "CCTV Camera Installation Service",
    "CCTV Camera",
    "Hanwha",
    "Panasonic",
    "Matrix",
    "Honeywell",
    "Biometric Access Control",
    "ESSL Biometric Access Control",
    "Biometric Attendance System",
    "CCTV Camera Installation Service Near Me"
  ],
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
