import Link from "next/link";
import {
  FileText,
  ReceiptText,
  Package,
  ScanLine,
  Smartphone,
  CalendarCheck,
  Wallet,
  Briefcase,
  MapPinned,
  LayoutTemplate,
  Share2,
  Building2,
  Check,
  MessageCircle,
  Phone,
} from "lucide-react";
import { BUSINESS } from "@/lib/seo";

// The business software made inside Champion Security System, offered to other
// installers and service businesses. Name and prices live here in one place:
// change them before this page goes live.
const PRODUCT = {
  name: "SiteDesk",
  trialDays: 14,
};

// Plans follow what each plan really includes in the software (plans.js there).
// price: null shows "Ask for price"; put a number (₹ per year) to show it.
const PLANS = [
  {
    name: "Starter",
    price: null,
    forWho: "For the owner and office",
    users: "2 office logins",
    features: [
      "Quotations, estimates and proforma bills",
      "GST tax invoices (CGST + SGST or IGST)",
      "Payments received",
      "20 ready quotation formats with your letterhead",
      "Suppliers list and daily work log",
    ],
  },
  {
    name: "Pro",
    price: null,
    forWho: "For a business with a field team",
    users: "5 office logins, up to 15 staff",
    highlight: true,
    features: [
      "Everything in Starter",
      "Stock with serial numbers and barcode scan",
      "Staff app: punch in / out from the phone",
      "Attendance and salary slips",
      "Jobs for your technicians",
      "Expenses",
    ],
  },
  {
    name: "Business",
    price: null,
    forWho: "For bigger teams and many branches",
    users: "Unlimited logins and staff",
    features: [
      "Everything in Pro",
      "Live team location",
      "Site visits",
      "Change every part of your quotation design",
      "Your own terms and conditions templates",
    ],
  },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Quotation in 2 minutes",
    text: "Pick items, the rates and GST fill themselves, and the quotation comes out on your own letterhead. Share it as a link or print a PDF.",
  },
  {
    icon: ReceiptText,
    title: "GST tax invoices",
    text: "Invoice numbers by financial year, HSN codes, and CGST + SGST or IGST worked out from the place of supply. Make an invoice from a quotation in one click.",
  },
  {
    icon: Package,
    title: "Stock you can trust",
    text: "Every camera's serial number is tracked: when it came in, which invoice and customer it went to. Stock never goes below zero, even when two branches bill at the same time.",
  },
  {
    icon: ScanLine,
    title: "Barcode scanning",
    text: "Scan the box with your phone camera or a barcode gun to find the product, add stock or pick the exact piece going out.",
  },
  {
    icon: Smartphone,
    title: "Staff app",
    text: "Technicians punch in and out from their phone, see today's job, and log expenses.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance and salary",
    text: "Attendance comes straight from the staff app, and salary slips are made from it.",
  },
  {
    icon: Briefcase,
    title: "Jobs and site visits",
    text: "Give work to your team and see what is pending and what is done.",
  },
  {
    icon: MapPinned,
    title: "Team location",
    text: "See where your field team is during working hours.",
  },
  {
    icon: Wallet,
    title: "Payments and expenses",
    text: "Note payments received and money spent, and see what is still to come.",
  },
  {
    icon: LayoutTemplate,
    title: "20 ready formats",
    text: "Classic, GST bill book, service contract (AMC), guards and staff supply, material + labour and more. Your logo and colours on all of them.",
  },
  {
    icon: Share2,
    title: "Share with a link",
    text: "Your customer opens the quotation or invoice from a link on WhatsApp, with no app and no login.",
  },
  {
    icon: Building2,
    title: "Many branches",
    text: "One common stock for all branches, and the history shows which branch and which person moved every piece.",
  },
];

const FOR_WHO = [
  "CCTV and security installers",
  "Electrical and networking contractors",
  "AC and appliance service",
  "Solar installers",
  "Security guard and housekeeping agencies",
  "Interior, painting and fabrication work",
];

const FAQ = [
  {
    q: "Do I need to install anything?",
    a: "No. It opens in the browser on your computer or phone. Your field staff use a small Android app to punch in and out.",
  },
  {
    q: "Can I use my own letterhead and terms?",
    a: "Yes. Your name, logo, colours, bank details and terms are printed on every quotation and invoice. Pick from 20 ready formats and change them as you like.",
  },
  {
    q: "Does it handle GST?",
    a: "Yes. Invoices show HSN codes and split GST into CGST + SGST for your own state or IGST for other states, based on the place of supply.",
  },
  {
    q: "Can other businesses see my data?",
    a: "No. Every business has its own separate account; your quotations, stock and staff are only visible to the people you invite.",
  },
  {
    q: "How do I start?",
    a: `Book a free demo on WhatsApp. We set it up with your letterhead and show you how it works, and you can use it free for ${PRODUCT.trialDays} days.`,
  },
];

const phoneDigits = BUSINESS.telephone.replace(/[^\d]/g, "");
const whatsappLink = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
  `Hello, I would like a free demo of ${PRODUCT.name}, the quotation, invoice and stock software.`
)}`;

export const metadata = {
  title: `${PRODUCT.name}: Quotation, GST Invoice, Stock & Staff Software for Installers`,
  description: `${PRODUCT.name} by Champion Security System: make quotations and GST invoices in minutes, keep stock with serial numbers and barcode scanning, and manage your field team's attendance and salary. Built by an installer, for installers.`,
  alternates: { canonical: "/software" },
  openGraph: {
    title: `${PRODUCT.name} | Business software for installers and service businesses`,
    description:
      "Quotations, GST invoices, stock with serial numbers, staff attendance and salary in one place.",
    url: "/software",
  },
};

function DemoButtons({ dark = false }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-7 rounded-md transition duration-200"
      >
        <MessageCircle className="w-5 h-5" /> Book a free demo on WhatsApp
      </a>
      <a
        href={`tel:${BUSINESS.telephone}`}
        className={`inline-flex items-center justify-center gap-2 font-semibold py-3 px-7 rounded-md transition duration-200 ${
          dark
            ? "bg-white text-gray-900 hover:bg-gray-200"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        <Phone className="w-5 h-5" /> Call {BUSINESS.telephone}
      </a>
    </div>
  );
}

export default function SoftwarePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-400 font-semibold mb-3">
            Built by Champion Security System, installers in Mumbai since {BUSINESS.foundingDate}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            {PRODUCT.name}: quotations, GST invoices, stock and your field team in one place
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Stop juggling Excel, paper registers and WhatsApp forwards. Make a
            quotation in two minutes, turn it into a GST invoice, and know
            exactly where every camera and every technician is.
          </p>
          <DemoButtons dark />
          <p className="text-sm text-gray-400 mt-4">
            Free {PRODUCT.trialDays}-day trial. We set it up with your letterhead.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Everything a service business needs
            </h2>
            <p className="text-gray-600 text-lg">
              From the first quotation to the salary of the technician who installed it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Who it is for</h2>
            <p className="text-gray-600 text-lg">
              Any business that sends quotations, keeps stock and has a team in the field.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOR_WHO.map((who) => (
              <li key={who} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 font-medium">
                <span className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </span>
                {who}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-gray-50" id="plans">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple yearly plans</h2>
            <p className="text-gray-600 text-lg">
              Start with a free {PRODUCT.trialDays}-day trial, then pick the plan that fits your team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-7 flex flex-col border ${
                  plan.highlight ? "border-2 border-blue-600 shadow-lg" : "border-gray-200 shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <span className="self-start mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-sm font-semibold">
                    Most chosen
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.forWho}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {plan.price ? `₹${plan.price.toLocaleString("en-IN")}` : "Ask for price"}
                  {plan.price && <span className="text-base font-medium text-gray-600"> / year + GST</span>}
                </p>
                <p className="text-sm text-gray-600 mb-6">{plan.users}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-800">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center font-semibold rounded-md py-3 transition duration-200 ${
                    plan.highlight ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  Book a free demo
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">How to start</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ["Book a free demo", "Message us on WhatsApp. We show you the software on a short video call."],
              ["We set it up for you", "Your letterhead, products and team are added, so you start working from day one."],
              [`Use it free for ${PRODUCT.trialDays} days`, "Make real quotations and invoices. Choose a plan only if it helps your business."],
            ].map(([title, text], i) => (
              <li key={title} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <span className="w-10 h-10 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center mb-4">{i + 1}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Questions</h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group bg-white border border-gray-200 rounded-xl px-5 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-gray-900 text-lg">
                  {q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="py-16 bg-gray-900 text-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See it working on your own letterhead</h2>
          <p className="text-gray-300 text-lg mb-8">
            A 15-minute demo shows you a quotation, an invoice and your stock, made with your own name and logo.
          </p>
          <DemoButtons dark />
          <p className="text-sm text-gray-400 mt-6">
            Prefer to write? <Link href="/contact" className="underline">Use our contact page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
