"use client";
import { useState } from "react";
import { Factory, Building2, LayoutGrid, List, BarChart3, Users, MousePointerClick } from "lucide-react";
import ScaledScreen from "./ScaledScreen";
import WorkforceApp, { MODULES } from "./WorkforceApp";
import { DashboardScreen, GateLogScreen, ReportsScreen, PeopleScreen } from "./AppScreens";

const SEGMENTS = [
  { key: "company", label: "Companies & factories", icon: Factory },
  { key: "society", label: "Housing societies", icon: Building2 },
];

const COMPANY_CAPTIONS = {
  Dashboard: "Who is in, who is late, who is absent — live, for every branch. Switch to yesterday, filter by department or status.",
  Attendance: "The whole month on one grid, worked out from the punches. Click any cell to see the in, out, hours and overtime.",
  Employees: "Your staff list with branch, shift and salary. Try search, Edit, Add employee or Delete (there's an Undo).",
  "Shifts & roster": "Morning, evening and night shifts that cross midnight, plus rotation groups. Overtime is on or off per shift.",
  Reports: "Monthly work duration, attendance summary and daily reports. Change the report or department and the table follows.",
};

const SOCIETY_TABS = [
  { key: "dash", label: "Dashboard", icon: LayoutGrid, Screen: DashboardScreen, caption: "Who came through the gate today, hour by hour, with the latest punches live." },
  { key: "log", label: "Gate log", icon: List, Screen: GateLogScreen, caption: "Every punch with time, flat, type and how they verified. Filter, then download Excel, CSV or PDF." },
  { key: "reports", label: "Reports", icon: BarChart3, Screen: ReportsScreen, caption: "A month on one screen — entries per person per day, earliest and latest, in PDF and Excel." },
  { key: "people", label: "People", icon: Users, Screen: PeopleScreen, caption: "Everyone enrolled on the machine appears by themselves. Add the flat and type — faces and fingerprints stay on the machine." },
];

const Pill = ({ active, onClick, icon: Icon, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300"
    }`}
  >
    {Icon && <Icon className="h-4 w-4" />} {children}
  </button>
);

export default function ProductTour({ demoHref }) {
  const [segment, setSegment] = useState("company");
  const [module, setModule] = useState(MODULES[0]);
  const [societyTab, setSocietyTab] = useState(SOCIETY_TABS[0].key);
  const tab = SOCIETY_TABS.find((t) => t.key === societyTab);
  const caption =
    segment === "company"
      ? COMPANY_CAPTIONS[module] ?? "Part of the full app — we show this one live on a demo call."
      : tab.caption;

  return (
    <div>
      <div className="mx-auto flex w-fit rounded-2xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
        {SEGMENTS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSegment(key)}
            aria-pressed={segment === key}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors sm:px-6 ${
              segment === key ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {segment === "company"
          ? MODULES.map((m) => (
              <Pill key={m} active={m === module} onClick={() => setModule(m)}>{m}</Pill>
            ))
          : SOCIETY_TABS.map(({ key, label, icon }) => (
              <Pill key={key} active={key === societyTab} onClick={() => setSocietyTab(key)} icon={icon}>{label}</Pill>
            ))}
      </div>

      <p className="mx-auto mt-4 min-h-[3rem] max-w-2xl text-center text-gray-600">{caption}</p>
      {segment === "company" && (
        <p className="-mt-1 mb-1 hidden items-center justify-center gap-1.5 text-sm font-semibold text-blue-700 md:flex">
          <MousePointerClick className="h-4 w-4" /> It&apos;s clickable — try the menu, filters and buttons
        </p>
      )}

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-blue-50 to-gray-100 p-3 sm:p-6">
        {segment === "company" ? (
          <ScaledScreen interactive>
            <WorkforceApp
              screen={MODULES.includes(module) ? module : undefined}
              onScreenChange={setModule}
              demoHref={demoHref}
            />
          </ScaledScreen>
        ) : (
          <ScaledScreen key={tab.key}>
            <tab.Screen />
          </ScaledScreen>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">Sample data shown. Every name and number is made up.</p>
    </div>
  );
}
