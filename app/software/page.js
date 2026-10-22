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
  X,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";
import Pricing from "./Pricing";
import { InvoiceMock, StockMock, TeamMock } from "./Mockups";
import { PRODUCT, PLANS, YEARLY_DISCOUNT, SALES_CONTACT } from "./plans";

// Landing page for the business software made inside Champion Security System.
// Name, prices and plan contents are in ./plans.js. Every button leads to the contact
// page (there is no online payment yet); the chosen plan is written into the message.

const lowest = Math.round(Math.min(...PLANS.map((p) => p.monthly)) * (1 - YEARLY_DISCOUNT));

const BEFORE = [
  "Quotations typed again and again in Word or Excel",
  "GST worked out on a calculator, mistakes on the bill",
  "Nobody knows what is really in stock",
  "Attendance in a register, salary worked out by hand",
  "Staff tasks and updates lost in WhatsApp chats",
];
const AFTER = [
  "A quotation in two minutes, on your own letterhead",
  "GST invoice in one click, CGST + SGST or IGST worked out",
  "Live stock, with every serial number traced to the customer",
  "Staff punch in from their phone, salary slips from attendance",
  "Tasks, team and payments in one place, on any phone",
];

const BIG_FEATURES = [
  {
    eyebrow: "Quotations and GST invoices",
    title: "From enquiry to invoice in minutes",
    points: [
      "Pick a product: name, rate, HSN and GST fill themselves",
      "20 ready formats with your logo, colours and bank details",
      "Turn a quotation into a GST invoice in one click",
      "Share a link on WhatsApp; your customer opens it without any app",
    ],
    Mock: InvoiceMock,
  },
  {
    eyebrow: "Stock",
    title: "Know exactly what you have, and where every piece went",
    points: [
      "Stock goes down when you save an invoice (you see the list first)",
      "Every item's serial number: when it came in, which customer has it",
      "Scan barcodes with the phone camera or a barcode gun",
      "Two branches billing the same last piece? Only one gets it; stock never goes below zero",
    ],
    Mock: StockMock,
    flip: true,
  },
  {
    eyebrow: "Your team",
    title: "Attendance, tasks and salary without the register",
    points: [
      "Staff punch in and out from their phone, with the place",
      "Give tasks to your staff and see what is pending",
      "Salary slips made from the attendance",
      "Expenses and payments noted the same day",
    ],
    Mock: TeamMock,
  },
];

const MORE_FEATURES = [
  { icon: FileText, title: "Estimates and proforma bills" },
  { icon: ReceiptText, title: "Payments received and pending" },
  { icon: LayoutTemplate, title: "AMC, GST, bill-book and more formats" },
  { icon: Building2, title: "Many branches, one stock" },
  { icon: MapPinned, title: "Live team location" },
  { icon: Briefcase, title: "Client visits and daily work log" },
  { icon: Wallet, title: "Expenses with photos" },
  { icon: Share2, title: "Share links with no login" },
];

const FOR_WHO = [
  "Traders and distributors",
  "Shops and showrooms",
  "Contractors and installers",
  "Service and repair businesses",
  "Agencies and consultants",
  "Small manufacturers",
];

const FAQ = [
  {
    q: "Do I need to install anything?",
    a: "No. It works in the browser on your computer and on any phone. Your staff punch in from their own phone.",
  },
  {
    q: "How do I pay?",
    a: "Choose a plan and leave your details on our contact page. We call you, set everything up, and you pay by UPI or bank transfer. Paying for the year saves 12%.",
  },
  {
    q: "Can I try it first?",
    a: `Yes. Every plan starts with a free ${PRODUCT.trialDays}-day trial, set up with your own letterhead.`,
  },
  {
    q: "Does it handle GST?",
    a: "Yes. Invoices carry HSN codes and split GST into CGST + SGST for your own state, or IGST for other states, from the place of supply.",
  },
  {
    q: "Can I move from Basic to Pro later?",
    a: "Yes. Your quotations, invoices and customers stay as they are; the new features simply switch on.",
  },
  {
    q: "Can other businesses see my data?",
    a: "No. Every business has its own separate account. Only the people you invite can see your quotations, stock and staff.",
  },
];

export const metadata = {
  title: `${PRODUCT.name}: Quotation, GST Invoice, Stock & Staff Software from ₹${lowest}/month`,
  description: `${PRODUCT.name}: quotations and GST invoices in minutes, stock with serial numbers and barcode scanning, staff attendance and salary. Plans from ₹${lowest} a month. Made for small and growing businesses.`,
  alternates: { canonical: "/software" },
  openGraph: {
    title: `${PRODUCT.name} | Business software for small and growing businesses`,
    description: "Quotations, GST invoices, stock with serial numbers, staff attendance and salary in one place.",
    url: "/software",
  },
};

const PrimaryCta = ({ children = "See plans and prices", href = "#plans" }) => (
  <Link href={href} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-7 rounded-lg transition-colors">
    {children} <ArrowRight className="w-5 h-5" />
  </Link>
);
const SecondaryCta = ({ dark = true }) => (
  <Link
    href="/contact?plan=Free%20demo"
    className={`inline-flex items-center justify-center gap-2 font-semibold py-3.5 px-7 rounded-lg transition-colors border ${
      dark ? "border-white/30 text-white hover:bg-white/10" : "border-gray-300 text-gray-900 hover:bg-gray-50"
    }`}
  >
    Book a free demo
  </Link>
);

export default function SoftwarePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.35),transparent_55%)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-green-300">
              <ShieldCheck className="w-4 h-4" /> Used every day in our own business
            </p>
            <h1 className="mt-5 text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Quotations, GST invoices, stock and your team. <span className="text-blue-400">One simple app.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-xl">
              {PRODUCT.name} replaces Excel, paper registers and WhatsApp forwards for traders, shops, contractors
              and service businesses. Make a quotation in two minutes and know where every item and every person on your team is.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <PrimaryCta />
              <SecondaryCta />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
              <li className="inline-flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-green-400" /> From ₹{lowest} a month</li>
              <li className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> Free {PRODUCT.trialDays}-day trial</li>
              <li className="inline-flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-green-400" /> Works on any phone</li>
            </ul>
          </div>
          <div className="relative">
            <InvoiceMock className="lg:rotate-1" />
            <div className="hidden sm:block absolute -bottom-10 -left-6 w-64 rounded-xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/5 p-4">
              <p className="text-xs font-bold text-gray-500">Stock after this invoice</p>
              <p className="mt-1 flex justify-between text-sm"><span>Office chair</span><strong>16 left</strong></p>
              <p className="flex justify-between text-sm"><span>Laser printer</span><strong className="text-amber-700">1 left · Low</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-gray-700 font-medium">
          <span className="text-gray-500 text-sm font-semibold">Made for</span>
          {FOR_WHO.map((w) => <span key={w}>{w}</span>)}
        </div>
      </section>

      {/* Before / after */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Sound familiar?</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Most service businesses still run on paper and memory. It costs money every day.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-red-200 bg-white p-7">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Today</h3>
              <ul className="space-y-4">
                {BEFORE.map((b) => (
                  <li key={b} className="flex gap-3 text-gray-700"><X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />{b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-green-600 bg-white p-7 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-5">With {PRODUCT.name}</h3>
              <ul className="space-y-4">
                {AFTER.map((a) => (
                  <li key={a} className="flex gap-3 text-gray-900"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The three big things */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-20 md:space-y-28">
          {BIG_FEATURES.map(({ eyebrow, title, points, Mock, flip }) => (
            <div key={title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={flip ? "lg:order-2" : ""}>
                <p className="text-blue-700 font-bold mb-2">{eyebrow}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h2>
                <ul className="mt-6 space-y-4">
                  {points.map((p) => (
                    <li key={p} className="flex gap-3 text-lg text-gray-700">
                      <span className="mt-1 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0"><Check className="w-4 h-4" /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-gradient-to-br from-blue-50 to-gray-100 rounded-3xl p-5 sm:p-8 ${flip ? "lg:order-1" : ""}`}>
                <Mock />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Everything else */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">And everything else you need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MORE_FEATURES.map(({ icon: Icon, title }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
                <span className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3"><Icon className="w-5 h-5" /></span>
                <p className="font-semibold text-gray-900">{title}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-6 text-gray-700">
            <span className="inline-flex items-center gap-2"><ScanLine className="w-5 h-5 text-blue-700" /> Barcode ready</span>
            <span className="inline-flex items-center gap-2"><CalendarCheck className="w-5 h-5 text-blue-700" /> GST ready</span>
            <span className="inline-flex items-center gap-2"><Package className="w-5 h-5 text-blue-700" /> Serial numbers</span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple prices. No hidden charges.</h2>
            <p className="text-gray-600 text-lg">Pay monthly, or pay for the year and save {Math.round(YEARLY_DISCOUNT * 100)}%.</p>
          </div>
          <Pricing />
        </div>
      </section>

      {/* How to start */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Start in three steps</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {[
              ["Choose a plan", "Pick a plan above and leave your number on the contact page."],
              ["We set it up for you", "Your letterhead, products and team are added, so you start working from day one."],
              [`Use it free for ${PRODUCT.trialDays} days`, "Make real quotations and invoices. Pay only when you are happy."],
            ].map(([title, text], i) => (
              <li key={title} className="bg-white border border-gray-200 rounded-2xl p-7">
                <span className="w-11 h-11 rounded-full bg-gray-900 text-white text-lg font-bold flex items-center justify-center mb-4">{i + 1}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Questions</h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-gray-900 text-lg">
                  {q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="relative bg-gray-900 text-white px-4 py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.3),transparent_55%)]" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Run your business from one screen</h2>
          <p className="text-gray-300 text-lg mb-8">
            Pro has what most growing businesses need: stock, barcode, staff and salary, for ₹{Math.round(PLANS[1].monthly * (1 - YEARLY_DISCOUNT))} a month on the yearly plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <PrimaryCta href="/contact?plan=Pro&billing=yearly">Start with Pro</PrimaryCta>
            <SecondaryCta />
          </div>
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 rounded-2xl bg-white/5 ring-1 ring-white/15 px-6 py-4 text-left">
            <span className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0" aria-hidden="true">
              {SALES_CONTACT.name.split(" ").map((w) => w[0]).join("")}
            </span>
            <div className="text-center sm:text-left">
              <p className="font-semibold">Questions? Talk to {SALES_CONTACT.name}</p>
              <p className="text-gray-300 text-sm">
                <a href={`mailto:${SALES_CONTACT.email}`} className="underline">{SALES_CONTACT.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
