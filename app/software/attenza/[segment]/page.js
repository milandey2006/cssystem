import Link from "next/link";
import { notFound } from "next/navigation";
import { Factory, Building2, Dumbbell, Check, X, ArrowRight, Wifi, ShieldCheck } from "lucide-react";
import { PRODUCT } from "../plans";
import { SEGMENT_PAGES, getSegment } from "../segments";
import ScaledScreen from "../ScaledScreen";
import WorkforceApp from "../WorkforceApp";
import { DashboardScreen, GateLogScreen } from "../AppScreens";
import { PayslipMock, VisitorMock, RetentionMock, GymCheckinMock } from "../ProductMockups";
import {
  BASE,
  DEMO_HREF,
  JsonLd,
  softwareJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  Breadcrumbs,
  PrimaryCta,
  SecondaryCta,
  HowItWorks,
  FaqSection,
  GuidesSection,
  FinalCta,
} from "../shared";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEGMENT_PAGES.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }) {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) return {};
  const path = `${BASE}/${s.slug}`;
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: s.metaTitle,
      description: s.metaDescription,
      url: path,
      images: [{ url: `/og/attenza-${s.slug}.png`, width: 1200, height: 630, alt: s.metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.metaTitle,
      description: s.metaDescription,
      images: [`/og/attenza-${s.slug}.png`],
    },
  };
}

const ICONS = { factory: Factory, building: Building2, gym: Dumbbell };

function Showcase({ type }) {
  if (type === "company") {
    return (
      <div className="space-y-6">
        <ScaledScreen interactive>
          <WorkforceApp demoHref={DEMO_HREF} />
        </ScaledScreen>
        <p className="text-center text-sm text-gray-400">It&apos;s clickable — try the menu, filters and buttons. Sample data; every name is made up.</p>
      </div>
    );
  }
  if (type === "society") {
    return (
      <div className="space-y-6">
        <ScaledScreen><DashboardScreen /></ScaledScreen>
        <p className="text-center text-sm text-gray-400">Sample data shown. Every name and number is made up.</p>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto" data-nosnippet>
      <RetentionMock />
    </div>
  );
}

const SIDE_MOCK = { company: PayslipMock, society: VisitorMock, gym: GymCheckinMock };

export default async function SegmentPage({ params }) {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) notFound();

  const Icon = ICONS[s.icon];
  const path = `${BASE}/${s.slug}`;
  const trail = [["Software", "/software"], [PRODUCT.name, BASE], [s.nav, path]];
  const others = SEGMENT_PAGES.filter((o) => o.slug !== s.slug);
  const SideMock = SIDE_MOCK[s.screen];

  return (
    <div className="overflow-x-hidden">
      <JsonLd
        data={softwareJsonLd({
          name: `${PRODUCT.name} — ${s.h1}`,
          description: s.metaDescription,
          path,
          features: s.features.flatMap((f) => f.items),
        })}
      />
      <JsonLd data={faqJsonLd(s.faq)} />
      <JsonLd data={breadcrumbJsonLd(trail)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.4),transparent_60%)]" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 pt-6">
          <Breadcrumbs trail={trail} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 pt-10 md:pt-16 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-green-300">
            <Icon className="w-4 h-4" /> {s.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
            {s.h1} <span className="text-blue-400">{s.h1Accent}</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">{s.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <PrimaryCta />
            <SecondaryCta />
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <li className="inline-flex items-center gap-1.5"><Wifi className="w-4 h-4 text-green-400" /> No PC, no static IP</li>
            {s.ticks.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-green-400" /> {t}</li>
            ))}
            <li className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-400" /> Free {PRODUCT.trialDays}-day trial</li>
          </ul>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 mt-12 md:mt-16 pb-16 md:pb-20">
          <div className="absolute inset-x-10 top-6 bottom-20 rounded-[2rem] bg-blue-600/30 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <Showcase type={s.screen} />
          </div>
        </div>
      </section>

      {/* Problems → answer */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{s.problemsTitle}</h2>
            <ul className="space-y-4">
              {s.problems.map((p) => (
                <li key={p} className="flex gap-3 text-lg text-gray-700">
                  <X className="w-6 h-6 text-red-600 shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg text-gray-900 font-semibold">
              {PRODUCT.name} connects your eSSL / ZKTeco machine to the cloud and does the rest — live, on any phone.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-3xl p-5 sm:p-8" data-nosnippet>
            {s.screen === "society" ? (
              <ScaledScreen><GateLogScreen /></ScaledScreen>
            ) : (
              <SideMock />
            )}
          </div>
        </div>
      </section>

      {/* Visitor flow (societies) */}
      {s.flow && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{s.flowTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              <ol className="contents">
                {s.flow.map(([t, body], i) => (
                  <li key={t} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <span className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">{i + 1}</span>
                    <h3 className="font-bold text-lg text-gray-900 mb-1.5">{t}</h3>
                    <p className="text-gray-700">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10 max-w-md mx-auto" data-nosnippet><VisitorMock /></div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className={`py-16 md:py-24 ${s.flow ? "bg-gray-50" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{s.featuresTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {s.features.map(({ title, items }) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-gray-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks className={s.flow ? "bg-white" : "bg-gray-50"} />

      <GuidesSection slugs={s.guides} title="Guides & how-tos" intro="Practical articles from our team on the questions we get asked most." />

      <FaqSection items={s.faq} />

      {/* Other segments */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{PRODUCT.name} also works for</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {others.map((o) => {
              const OIcon = ICONS[o.icon];
              return (
                <Link key={o.slug} href={`${BASE}/${o.slug}`} className="group inline-flex items-center gap-3 rounded-xl bg-white border border-gray-200 px-5 py-4 text-left hover:border-blue-300 hover:shadow transition">
                  <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><OIcon className="w-5 h-5" /></span>
                  <span>
                    <span className="block font-semibold text-gray-900">{o.h1}</span>
                    <span className="text-sm text-blue-700 inline-flex items-center gap-1">See how <ArrowRight className="w-3.5 h-3.5" /></span>
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="mt-6">
            <Link href={BASE} className="font-semibold text-blue-700 hover:underline">See everything {PRODUCT.name} does →</Link>
          </p>
        </div>
      </section>

      <FinalCta title={s.finalTitle} />
    </div>
  );
}
