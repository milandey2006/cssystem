import Link from "next/link";
import {
  Cloud,
  Wifi,
  Clock,
  ShieldCheck,
  Server,
  Smartphone,
  Factory,
  Building2,
  Dumbbell,
  ScanFace,
  Fingerprint,
  FileSpreadsheet,
  ReceiptIndianRupee,
  Users,
  DoorOpen,
  Check,
  X,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { PayslipMock, VisitorMock, RetentionMock } from "./ProductMockups";
import { PRODUCT, MACHINE_BRANDS, MACHINE_BRANDS_TEXT } from "./plans";
import ScaledScreen from "./ScaledScreen";
import ProductTour from "./ProductTour";
import WorkforceApp from "./WorkforceApp";
import {
  BASE,
  DEMO_HREF,
  JsonLd,
  softwareJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  PrimaryCta,
  SecondaryCta,
  HowItWorks,
  FaqSection,
  GuidesSection,
  FinalCta,
} from "./shared";

// Landing page for Attenza — the cloud biometric attendance / payroll / VMS
// product built inside Champion Security System. Everything here is from the
// product brief; nothing invented. No public pricing on purpose: every
// button leads to a demo or the contact page.

const FOR_WHO = [
  ["Factories", `${BASE}/attendance-payroll-software`],
  ["Offices & shops", `${BASE}/attendance-payroll-software`],
  ["Multi-branch businesses", `${BASE}/attendance-payroll-software`],
  ["Housing societies", `${BASE}/society-visitor-management`],
  ["Gyms", `${BASE}/gym-management-software`],
];

const BEFORE = [
  "Attendance stuck on eTimeTrackLite on one office PC",
  "Punches lost whenever that PC is switched off",
  "Static IP, port forwarding and VPN just to see data",
  "Salary worked out by hand in Excel every month",
  "Gate register on paper; no record of who came in",
];
const AFTER = [
  "Live attendance from every machine, on any phone",
  "Machine keeps punches offline and sends them when back",
  "No PC, no static IP, no port forwarding, no VPN",
  "Salary slips and PF/ESI files made from attendance",
  "Live gate log and visitor approval from the face machine",
];

const DIFFERENTIATORS = [
  {
    icon: Wifi,
    title: "No PC, no static IP",
    body: "The machine connects to the cloud on its own — no eTimeTrackLite, no static IP, no port forwarding, no VPN.",
  },
  {
    icon: Clock,
    title: "Clock fixed automatically",
    body: "The common eSSL wrong-time problem is corrected on its own, and you can set the time from the app.",
  },
  {
    icon: ShieldCheck,
    title: "No face/finger data on the server",
    body: "Templates are never stored on the server — only who punched, when, and how they verified. A real privacy point.",
  },
  {
    icon: Building2,
    title: "Many machines & branches",
    body: "Several machines per company, each tagged to a branch, managed from one panel. Branch logins see only their branch.",
  },
];

const SEGMENTS = [
  {
    icon: Factory,
    eyebrow: "Factories, offices & shops",
    title: "Attendance and payroll software without the register",
    href: `${BASE}/attendance-payroll-software`,
    linkText: "Attendance & payroll software",
    points: [
      "Fixed, rotational and night shifts; shift auto-detected from the first punch",
      "Automatic IN/OUT pairing, grace minutes, late-mark and overtime rules",
      "Leave, holidays, miss-punch requests from the staff app with HR approval",
      "Full India payroll: PF (EPF/EPS/EDLI), ESI, Professional Tax, TDS",
      "Payslips, PF ECR & ESI upload files, Form B wage register",
      "eSSL-style daily & monthly reports — screen, Excel, CSV and PDF",
    ],
    Mock: PayslipMock,
  },
  {
    icon: Building2,
    eyebrow: "Housing societies",
    title: "Visitor management with a face-recognition gate",
    href: `${BASE}/society-visitor-management`,
    linkText: "Society visitor management",
    points: [
      "Live gate log from the face machine: who came in / went out, when, which gate",
      "Guard registers a visitor with a photo at the gate",
      "The flat gets an approval request on the resident app",
      "On approval the visitor's face goes on the gate for one entry, then is removed",
      "Residents approve visitors and see their own gate history from any phone",
      "Society reports, monthly and per flat",
    ],
    Mock: VisitorMock,
    flip: true,
  },
  {
    icon: Dumbbell,
    eyebrow: "Gyms",
    title: "Gym software with face check-in and who to call today",
    href: `${BASE}/gym-management-software`,
    linkText: "Gym management software",
    points: [
      "Members, plans, renewals, dues and payments (UPI / cash / card)",
      "Check-ins from the face machine or a kiosk",
      "Member app with plan, visits and receipts",
      "A retention list: who is about to expire, who stopped coming, who is new",
      "Call / WhatsApp buttons right next to each name",
      "Trainer PT sessions and commission in payroll",
    ],
    Mock: RetentionMock,
  },
];

const FAQ = [
  {
    q: "What is Attenza?",
    a: "Attenza is cloud software that connects eSSL, ZKTeco, Mivanta, Morx and Matrix Comsec biometric face and fingerprint machines straight to the internet and turns every punch into attendance, payroll, gate logs and visitor approvals — for factories, offices, housing societies and gyms.",
  },
  {
    q: "Which biometric machines does it work with?",
    a: `${MACHINE_BRANDS_TEXT} face and fingerprint machines that support cloud push (ADMS / Cloud Server) mode. Machines without that mode cannot connect — we'll help you check your model.`,
  },
  {
    q: "Do I need a PC or eTimeTrackLite running all the time?",
    a: "No. The machine talks to the cloud by itself. You do not need eTimeTrackLite, a static IP, port forwarding or a VPN.",
  },
  {
    q: "What happens if the internet goes down?",
    a: "The machine keeps the punches in its own memory and sends them to the cloud automatically when the internet is back. Nothing is lost.",
  },
  {
    q: "Are fingerprints or faces stored on your server?",
    a: "No. Face and fingerprint templates stay on the machine. The server only keeps the user ID, the time, and how the person verified.",
  },
  {
    q: "Can I manage several branches and machines?",
    a: "Yes. One company can have many branches and machines, each machine tagged to a branch. Head office sees all branches; branch logins see only their own.",
  },
  {
    q: "Are PF / ESI / PT calculations correct?",
    a: "The rates are configurable and the files (PF ECR, ESI) are generated from attendance. We recommend you confirm the rates with your CA before finalising.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on how many people, machines and branches you have. Book a free demo or contact us and we'll suggest the right setup and share the price.",
  },
  {
    q: "Can I try it first?",
    a: `Yes. You get a free ${PRODUCT.trialDays}-day trial with your own machine connected.`,
  },
];

const TITLE = "Cloud Biometric Attendance & Payroll Software | Attenza";
const DESCRIPTION =
  "Cloud attendance software for eSSL, ZKTeco, Mivanta, Morx & Matrix machines: live attendance, payroll with PF / ESI, society visitors and gym check-ins.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "biometric attendance software",
    "cloud attendance software",
    "eSSL cloud attendance",
    "Mivanta attendance software",
    "Morx biometric software",
    "Matrix Comsec attendance",
    "ZKTeco ADMS software",
    "attendance and payroll software",
    "face attendance machine software India",
    "visitor management system for society",
    "gym management software India",
    "multi-branch attendance",
    "eTimeTrackLite alternative",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: BASE,
    images: [{ url: "/og/attenza.png", width: 1200, height: 630, alt: "Attenza — cloud biometric attendance & payroll software" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/attenza.png"],
  },
};

const FEATURE_LIST = [
  `Works with ${MACHINE_BRANDS_TEXT} machines in cloud push (ADMS) mode`,
  "No PC, no static IP, no port forwarding",
  "Live attendance from every machine",
  "Fixed, rotational and night shifts",
  "Overtime, late-mark, half-day and sandwich rules",
  "India payroll with PF, ESI and Professional Tax",
  "PF ECR and ESI upload files, payslips, Form B",
  "Multi-branch with branch logins",
  "Staff app, resident app and member app",
  "Society gate log and visitor approval",
  "Gym check-ins, renewals and retention list",
];

export default function AttenzaPage() {
  return (
    <div className="overflow-x-hidden">
      <JsonLd data={softwareJsonLd({ name: PRODUCT.name, description: DESCRIPTION, path: BASE, features: FEATURE_LIST })} />
      <JsonLd data={faqJsonLd(FAQ)} />
      <JsonLd data={breadcrumbJsonLd([["Software", "/software"], [PRODUCT.name, BASE]])} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.4),transparent_60%)]" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 pt-16 md:pt-24 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-green-300">
            <ShieldCheck className="w-4 h-4" /> Cloud biometric attendance software · by Champion Security System
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Your eSSL / ZKTeco biometric machine, <span className="text-blue-400">now on the cloud.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {PRODUCT.name} connects your {MACHINE_BRANDS_TEXT} face &amp; fingerprint machines straight to the internet —
            and turns every punch into attendance, payroll, gate logs and visitor approvals.
            <strong className="text-white"> No PC, no static IP, no port forwarding.</strong>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <PrimaryCta />
            <SecondaryCta />
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <li className="inline-flex items-center gap-1.5"><Wifi className="w-4 h-4 text-green-400" /> No PC, no static IP</li>
            <li className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> Free {PRODUCT.trialDays}-day trial</li>
            <li className="inline-flex items-center gap-1.5"><ScanFace className="w-4 h-4 text-green-400" /> Face &amp; fingerprint</li>
          </ul>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 mt-12 md:mt-16 pb-16 md:pb-20">
          <div className="absolute inset-x-10 top-6 bottom-20 rounded-[2rem] bg-blue-600/30 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <ScaledScreen interactive>
              <WorkforceApp scrollable={false} demoHref={DEMO_HREF} />
            </ScaledScreen>
            <div className="hidden sm:flex absolute -bottom-6 -left-3 md:-left-6 w-64 items-center gap-3 rounded-xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/5 p-4">
              <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5" />
              </span>
              <p className="text-xs font-semibold leading-snug">Machine → cloud → your phone, in seconds</p>
            </div>
          </div>
          <p className="mt-10 text-center text-xs text-gray-500">Sample data shown. Every name and number is made up.</p>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-gray-700 font-medium">
          <span className="text-gray-500 text-sm font-semibold">Made for</span>
          {FOR_WHO.map(([w, href]) => (
            <Link key={w} href={href} className="hover:text-blue-700">{w}</Link>
          ))}
        </div>
      </section>

      {/* Before / after */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Still tied to that one office PC?</h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Old biometric software runs on a PC with eTimeTrackLite. Switch it off and punches stop. {PRODUCT.name} puts the machine on the cloud instead.
          </p>
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

      <HowItWorks />

      {/* Product tour */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Take a look inside</h2>
          <p className="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            The real screens, filled with sample data. Pick your type of business and click around.
          </p>
          <ProductTour demoHref={DEMO_HREF} />
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why it&apos;s different from PC-based attendance software</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
                <span className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></span>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-20 md:space-y-28">
          {SEGMENTS.map(({ icon: Icon, eyebrow, title, href, linkText, points, Mock, flip }) => (
            <div key={title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={flip ? "lg:order-2" : ""}>
                <p className="inline-flex items-center gap-2 text-blue-700 font-bold mb-2"><Icon className="w-5 h-5" />{eyebrow}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{title}</h2>
                <ul className="mt-6 space-y-4">
                  {points.map((p) => (
                    <li key={p} className="flex gap-3 text-lg text-gray-700">
                      <span className="mt-1 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0"><Check className="w-4 h-4" /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">
                  {linkText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={`bg-gradient-to-br from-blue-50 to-gray-100 rounded-3xl p-5 sm:p-8 ${flip ? "lg:order-1" : ""}`} data-nosnippet>
                <Mock />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supported machines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Works with the biometric machines you already have</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {MACHINE_BRANDS_TEXT} face and fingerprint machines with cloud push (ADMS / Cloud Server) mode. One setting on the device and you&apos;re connected.
          </p>
          <ul className="mb-8 flex flex-wrap justify-center gap-3" aria-label="Supported machine brands">
            {MACHINE_BRANDS.map((b) => (
              <li key={b} className="rounded-xl bg-white border-2 border-gray-200 px-6 py-3 text-xl font-extrabold tracking-tight text-gray-900 shadow-sm">
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              [ScanFace, "Face machines"],
              [Fingerprint, "Fingerprint machines"],
              [Server, "ADMS / Cloud Server mode"],
              [DoorOpen, "Gate & access controllers"],
            ].map(([Icon, label]) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-5 py-2.5 font-semibold text-gray-800 shadow-sm">
                <Icon className="w-5 h-5 text-blue-700" />{label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Not sure if your model supports it? We&apos;ll check it for you — or read{" "}
            <Link href="/blog/connect-essl-biometric-machine-to-cloud-adms" className="text-blue-700 underline">how to connect an eSSL machine to the cloud</Link>.
          </p>
        </div>
      </section>

      {/* Payroll & reports depth */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Payroll and reports done right for India</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              [ReceiptIndianRupee, "Statutory ready", "PF (EPF / EPS / EDLI), ESI and Professional Tax with editable slabs, plus TDS, loans and arrears."],
              [FileSpreadsheet, "Every file you file", "PF ECR upload file, ESI upload file, Form B wage register, bank transfer file, salary register."],
              [CalendarCheck, "eSSL-style reports", "Daily and monthly grids — In / Out / Hours / OT / Status — as screen, Excel, CSV and PDF, by branch or machine."],
              [Users, "Multi-branch", "One company, many branches and machines from one panel; head office sees all, branch logins see their own."],
              [Smartphone, "Staff app", "Attendance calendar, payslips, leave and miss-punch requests — staff log in with their mobile number."],
              [ShieldCheck, "Separate & backed up", "Each company's data is separate, on HTTPS, with daily plus off-server backups."],
            ].map(([Icon, title, body]) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <span className="w-11 h-11 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></span>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href={`${BASE}/attendance-payroll-software`} className="font-semibold text-blue-700 hover:underline">
              Everything in attendance & payroll →
            </Link>
          </p>
        </div>
      </section>

      <GuidesSection
        title="Guides: attendance, payroll & biometric machines"
        intro="How-tos from our team — from connecting an eSSL machine to the cloud to calculating salary, overtime and PF."
      />

      <FaqSection items={FAQ} />

      <FinalCta />
    </div>
  );
}
