import "./globals.css";
import { Inter } from 'next/font/google'

import Header from "../component/header";
import Footer from "../component/footer";
const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: "Champion Security System",
  description: "Champion Security System is a leading provider of advanced security solutions, specializing in CCTV, access control, and alarm systems. We are committed to delivering top-notch security services to protect your home and business.",
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
