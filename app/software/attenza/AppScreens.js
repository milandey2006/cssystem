// Re-creations of the real app's screens (Dashboard, Gate log, Reports,
// People), drawn in HTML so no real customer data ever appears on the site.
// Every name, flat, number and mobile here is made up. Each screen is drawn
// at a fixed 1200 x 760 "screenshot" size and scaled to fit by ScaledScreen.
import {
  LayoutGrid,
  List,
  BarChart3,
  UserPlus,
  Users,
  Smartphone,
  SlidersHorizontal,
  Search,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { PRODUCT } from "./plans";

export const SCREEN_W = 1200;
export const SCREEN_H = 760;

const SOCIETY = "Green Valley CHS";

/* ----------------------------- shared chrome ----------------------------- */

const NAV = [
  { group: "Gate", items: [
    ["Dashboard", LayoutGrid],
    ["Gate log", List],
    ["Reports", BarChart3],
    ["Visitors", UserPlus],
    ["People", Users],
  ] },
  { group: "Setup", items: [
    ["Devices", Smartphone],
    ["Settings", SlidersHorizontal],
  ] },
];

function Sidebar({ active }) {
  return (
    <aside className="flex w-[210px] shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2.5 px-4 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-[15px] font-extrabold text-white">
          {PRODUCT.name[0]}
        </span>
        <span className="leading-tight">
          <span className="block text-[14px] font-semibold text-gray-900">{PRODUCT.name}</span>
          <span className="block text-[11px] text-gray-500">{SOCIETY}</span>
        </span>
      </div>
      <nav className="flex-1 px-2.5">
        {NAV.map(({ group, items }) => (
          <div key={group} className="mt-3">
            <p className="px-2 pb-1.5 text-[11px] font-medium text-gray-500">{group}</p>
            {items.map(([label, Icon]) => (
              <div
                key={label}
                className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] ${
                  label === active ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-600"
                }`}
              >
                <Icon className={`h-4 w-4 ${label === active ? "text-blue-600" : "text-gray-400"}`} />
                {label}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-gray-200 px-4 py-3">
        <p className="text-[12.5px] font-semibold text-gray-900">Society Admin</p>
        <p className="text-[11px] text-gray-500">Owner</p>
        <div className="mt-2.5 flex justify-around text-[12px] text-gray-700">
          <span>Password</span>
          <span>Sign out</span>
        </div>
      </div>
    </aside>
  );
}

function AppFrame({ active, title, subtitle, actions, children }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/10"
      style={{ width: SCREEN_W, height: SCREEN_H }}
    >
      <div className="flex h-[34px] shrink-0 items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="mx-auto rounded-md bg-white px-16 py-[3px] text-[11px] text-gray-500 ring-1 ring-gray-200">
          {PRODUCT.name} · {SOCIETY}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <Sidebar active={active} />
        <main className="relative flex min-w-0 flex-1 flex-col bg-[#f6f6f5]">
          <div className="flex items-start justify-between border-b border-gray-200 px-7 pb-4 pt-5">
            <div>
              <h3 className="text-[22px] font-semibold leading-tight text-gray-900">{title}</h3>
              <p className="mt-0.5 text-[12.5px] text-gray-500">{subtitle}</p>
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
          <div className="min-h-0 flex-1 overflow-hidden px-7 py-5">{children}</div>
          {/* soft fade where the "screenshot" is cut off */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#f6f6f5] to-transparent" />
        </main>
      </div>
    </div>
  );
}

const Btn = ({ dark, children }) => (
  <span
    className={`inline-flex items-center rounded-lg px-3 py-1.5 text-[12px] font-semibold ${
      dark ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-800"
    }`}
  >
    {children}
  </span>
);

const TYPE_STYLE = {
  Resident: "bg-indigo-50 text-indigo-700",
  Staff: "bg-teal-50 text-teal-700",
  Guard: "bg-amber-50 text-amber-800",
};
const TypeBadge = ({ type }) => (
  <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${TYPE_STYLE[type]}`}>{type}</span>
);
const DirBadge = ({ dir }) => (
  <span
    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
      dir === "IN" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
    }`}
  >
    {dir}
  </span>
);

function Bars({ values, labels, highlight, max, height }) {
  const top = max ?? Math.max(...values);
  return (
    <div className="relative" style={{ height }}>
      {[0, 0.5, 1].map((f) => (
        <div
          key={f}
          className="absolute inset-x-0 border-t border-gray-100"
          style={{ bottom: `${f * 100}%` }}
        />
      ))}
      <div className="absolute inset-0 flex items-end gap-[3px] pl-0">
        {values.map((v, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end">
            <div
              className={`rounded-t-[3px] ${i === highlight ? "bg-blue-700" : "bg-blue-400/80"}`}
              style={{ height: `${(v / top) * 100}%` }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="absolute inset-x-0 -bottom-5 flex gap-[3px] text-[10px] text-gray-500">
          {labels.map((l, i) => (
            <span key={i} className={`flex-1 text-center ${i === highlight ? "font-semibold text-gray-900" : ""}`}>
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Dashboard ------------------------------- */

const HOURS = [3, 1, 1, 0, 0, 0, 2, 1, 9, 3, 8, 12, 9, 11, 6, 11, 8, 8, 11, 11, 21, 11, 0, 0];
const DAYS14 = [88, 103, 111, 124, 131, 139, 158, 142, 149, 171, 133, 133, 120, 147];

const LATEST = [
  ["21:47", "Rahul Verma", "B-704", "Resident", "IN", "Face"],
  ["21:32", "Sneha Patil", "A-302", "Resident", "IN", "Face"],
  ["21:18", "Ramesh Yadav", null, "Guard", "OUT", "Finger"],
  ["21:05", "Priya Nair", "C-110", "Resident", "IN", "Face"],
  ["20:58", null, null, "Resident", "IN", "Face"],
  ["20:44", "Arjun Mehta", "A-908", "Resident", "OUT", "Face"],
  ["20:31", "Sunil Kamble", null, "Staff", "OUT", "Finger"],
  ["20:12", "Kavita Rao", "B-215", "Resident", "IN", "Face"],
];

export function DashboardScreen() {
  const stats = [
    ["Punches today", "147", "all at the entry", false],
    ["People today", "58", "of 84 enrolled", true],
    ["Last punch", "21:47", "Rahul Verma", false],
    ["Gate machine", "Online", "1 of 1 connected", true],
  ];
  return (
    <AppFrame
      active="Dashboard"
      title="Dashboard"
      subtitle="Who came through the gate today. Updates live."
      actions={<><Btn>People</Btn><Btn dark>Gate log</Btn></>}
    >
      <div className="grid grid-cols-4 gap-3">
        {stats.map(([label, value, sub, green]) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-[12px] text-gray-600">{label}</p>
            <p className={`mt-1 text-[26px] font-semibold leading-none ${green ? "text-green-700" : "text-gray-900"}`}>{value}</p>
            <p className="mt-1.5 text-[11px] text-gray-500">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 border-l-4 border-l-amber-400 bg-white px-4 py-2.5 text-[12px]">
        <p className="text-gray-700">
          <strong className="text-gray-900">Fill in details:</strong> 2 people have no name · 5 residents have no flat number.
        </p>
        <Btn>Fill details</Btn>
      </div>

      <div className="mt-3 grid grid-cols-[1.45fr_1fr] gap-3">
        <div className="space-y-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 pb-8 pt-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-semibold">Today by hour</p>
              <Btn>Today&apos;s log</Btn>
            </div>
            <Bars
              values={HOURS}
              max={24}
              highlight={21}
              height={110}
              labels={HOURS.map((_, i) => (i % 3 === 0 ? String(i).padStart(2, "0") : ""))}
            />
            <p className="mt-7 text-[11px] text-gray-500">Busiest hour: 20:00 – 21:00 (21)</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 pb-8 pt-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-semibold">Last 14 days</p>
              <Btn>Count per person</Btn>
            </div>
            <Bars
              values={DAYS14}
              max={200}
              highlight={13}
              height={92}
              labels={[...Array(13)].map((_, i) => String(12 + i)).concat("Today")}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <p className="text-[13px] font-semibold">Latest at the gate</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-600" /> Live
            </span>
          </div>
          <ul className="divide-y divide-gray-100">
            {LATEST.map(([time, name, flat, type, dir, verify], i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-[9px]">
                <span className="w-11 text-[13px] font-semibold tabular-nums">{time}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[12.5px] ${name ? "font-semibold" : "text-gray-600"}`}>
                    {name ? `${name}${flat ? ` · ${flat}` : ""}` : "No name · ID 59"}
                  </span>
                  <span className="block text-[11px] text-gray-500">Main Gate · {verify}</span>
                </span>
                <TypeBadge type={type} />
                <DirBadge dir={dir} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppFrame>
  );
}

/* -------------------------------- Gate log ------------------------------- */

const LOG = [
  ["21:47:12", "Rahul Verma", "B-704", "Resident", "IN", "Face"],
  ["21:32:40", "Sneha Patil", "A-302", "Resident", "IN", "Face"],
  ["21:18:05", "Ramesh Yadav", "—", "Guard", "OUT", "Finger"],
  ["21:05:51", "Priya Nair", "C-110", "Resident", "IN", "Face"],
  ["20:58:19", "No name · ID 59", "—", "Resident", "IN", "Face"],
  ["20:44:02", "Arjun Mehta", "A-908", "Resident", "OUT", "Face"],
  ["20:31:37", "Sunil Kamble", "—", "Staff", "OUT", "Finger"],
  ["20:12:26", "Kavita Rao", "B-215", "Resident", "IN", "Face"],
  ["20:03:58", "Vikram Joshi", "B-402", "Resident", "IN", "Face"],
  ["19:56:44", "Neha Gupta", "C-506", "Resident", "OUT", "Face"],
  ["19:41:10", "Rahul Verma", "B-704", "Resident", "OUT", "Face"],
  ["19:38:27", "Deepak Shinde", "—", "Staff", "IN", "Finger"],
];

const Field = ({ label, value, w, icon: Icon, placeholder }) => (
  <div style={{ width: w }}>
    <p className="mb-1 text-[11.5px] text-gray-700">{label}</p>
    <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white px-2.5 py-[7px] text-[12px]">
      <span className={placeholder ? "text-gray-400" : "text-gray-900"}>{value}</span>
      {Icon && <Icon className="h-3.5 w-3.5 text-gray-500" />}
    </div>
  </div>
);

export function GateLogScreen() {
  return (
    <AppFrame
      active="Gate log"
      title="Gate log"
      subtitle="Every punch. Filter by date, person, flat or IN/OUT, then download."
    >
      <div className="flex items-end gap-2.5">
        <Field label="From" value="25/11/2026" w={130} icon={Calendar} />
        <Field label="To" value="25/11/2026" w={130} icon={Calendar} />
        <Field label="Search" value="Name, flat or gate ID" w={270} placeholder />
        <Field label="Type" value="Everyone" w={120} icon={ChevronDown} />
        <Field label="In / Out" value="Both" w={120} icon={ChevronDown} />
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {["Today", "Yesterday", "Last 7 days", "This month", "Last 30 days"].map((c, i) => (
          <span
            key={c}
            className={`rounded-lg px-2.5 py-1 text-[11.5px] font-medium ${
              i === 0 ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-700"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-[13px] text-gray-700">
            <strong className="text-gray-900">147</strong> punches · <strong className="text-gray-900">58</strong> people · Wed 25 Nov 2026
          </p>
          <div className="flex items-center gap-1.5">
            <span className="flex rounded-lg bg-gray-100 p-0.5 text-[11.5px] font-medium">
              <span className="rounded-md bg-white px-2.5 py-1 text-gray-900 shadow-sm">All punches</span>
              <span className="px-2.5 py-1 text-gray-500">Count per person</span>
            </span>
            <Btn>Excel</Btn>
            <Btn>CSV</Btn>
            <Btn>PDF</Btn>
          </div>
        </div>
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="border-y border-gray-200 bg-gray-50 text-[11.5px] text-gray-600">
              {["Time", "Name", "Flat", "Type", "In / Out", "Gate", "Verified by"].map((h) => (
                <th key={h} className="px-4 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td colSpan={7} className="px-4 py-1.5 text-[11.5px] font-medium text-gray-600">Wed 25 Nov 2026</td>
            </tr>
            {LOG.map(([time, name, flat, type, dir, verify], i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="px-4 py-[7px] font-mono text-[11.5px] text-gray-800">{time}</td>
                <td className={`px-4 ${name.startsWith("No name") ? "text-gray-600" : "font-semibold"}`}>{name}</td>
                <td className="px-4 text-gray-700">{flat}</td>
                <td className="px-4"><TypeBadge type={type} /></td>
                <td className="px-4"><DirBadge dir={dir} /></td>
                <td className="px-4 text-gray-700">Main Gate</td>
                <td className="px-4 text-gray-600">{verify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
}

/* -------------------------------- Reports -------------------------------- */

// Small deterministic generator so the server and browser draw the same grid.
function seq(seed, n, min, max, gapEvery = 0) {
  let x = seed;
  return [...Array(n)].map((_, i) => {
    x = (x * 9301 + 49297) % 233280;
    if (gapEvery && (i + seed) % gapEvery === 0) return 0;
    return min + Math.floor((x / 233280) * (max - min + 1));
  });
}

const TODAY = 25;
const MONTH_DAYS = 30;
// Nov 2026 starts on a Sunday.
const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

const REPORT_ROWS = [
  ["Arjun Mehta", "A-908 · Resident · ID 1", seq(3, TODAY, 1, 4, 3), "07:56", "22:41"],
  ["Rahul Verma", "B-704 · Resident · ID 12", seq(11, TODAY, 2, 8, 6), "05:23", "23:27"],
  ["Ramesh Yadav", "Guard · ID 31", seq(7, TODAY, 18, 33), "00:04", "23:58"],
  ["Sneha Patil", "A-302 · Resident · ID 8", seq(5, TODAY, 1, 4, 4), "08:12", "21:44"],
  ["Sunil Kamble", "Staff · ID 34", seq(17, TODAY, 2, 5, 7), "08:41", "20:31"],
  ["Priya Nair", "C-110 · Resident · ID 15", seq(23, TODAY, 1, 6, 5), "06:05", "23:16"],
  ["Kavita Rao", "B-215 · Resident · ID 23", seq(29, TODAY, 1, 3, 3), "07:30", "22:50"],
  ["Vikram Joshi", "B-402 · Resident · ID 21", seq(31, TODAY, 1, 5, 4), "09:02", "21:15"],
  ["Neha Gupta", "C-506 · Resident · ID 40", seq(37, TODAY, 1, 4, 3), "07:48", "22:05"],
];

const heat = (v) =>
  v === 0 ? "" :
  v < 4 ? "bg-blue-50" :
  v < 10 ? "bg-blue-100" :
  v < 20 ? "bg-blue-200" :
  v < 30 ? "bg-blue-400 text-white" :
  "bg-blue-600 text-white font-semibold";

export function ReportsScreen() {
  const totals = [...Array(TODAY)].map((_, d) =>
    REPORT_ROWS.reduce((s, r) => s + r[2][d], 0) + 60 + ((d * 37) % 45)
  );
  const grand = totals.reduce((a, b) => a + b, 0);
  return (
    <AppFrame active="Reports" title="Reports" subtitle="Monthly report per person and by flat, in PDF and Excel">
      <div className="inline-flex rounded-lg bg-gray-200/70 p-0.5 text-[12px] font-medium">
        <span className="rounded-md bg-white px-3 py-1 text-gray-900 shadow-sm">Monthly · per person</span>
        <span className="px-3 py-1 text-gray-500">Flat-wise</span>
      </div>
      <div className="mt-3 flex items-end gap-2.5">
        <Field label="Month" value="November 2026" w={140} icon={ChevronDown} />
        <Field label="Type" value="Everyone" w={130} icon={ChevronDown} />
        <Field label="Search" value="Name, flat or gate ID" w={260} placeholder />
        <span className="mb-2 ml-2 inline-flex items-center gap-1.5 text-[11.5px] text-gray-600">
          <span className="h-3 w-3 rounded border border-gray-400 bg-white" /> Show people with no entries
        </span>
      </div>

      <div className="mt-3 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-2.5">
          <p className="text-[13px] text-gray-700">
            <strong className="text-gray-900">58</strong> people came in · <strong className="text-gray-900">{grand.toLocaleString("en-IN")}</strong> entries · November 2026
          </p>
          <div className="flex gap-1.5"><Btn dark>PDF</Btn><Btn>Excel</Btn></div>
        </div>
        <table className="w-full table-fixed border-t border-gray-200 text-[10.5px]">
          <colgroup>
            <col style={{ width: 138 }} />
            {[...Array(MONTH_DAYS)].map((_, i) => <col key={i} />)}
            <col style={{ width: 34 }} /><col style={{ width: 44 }} /><col style={{ width: 42 }} /><col style={{ width: 42 }} />
          </colgroup>
          <thead>
            <tr className="text-gray-600">
              <th className="px-3 py-1.5 text-left text-[11px] font-medium">Name</th>
              {[...Array(MONTH_DAYS)].map((_, i) => {
                const wd = WEEK[i % 7];
                const weekend = i % 7 === 0 || i % 7 === 6;
                return (
                  <th key={i} className="py-1 text-center font-medium leading-tight">
                    {i + 1}
                    <span className={`block text-[9px] ${weekend ? "text-red-500" : "text-gray-400"}`}>{wd}</span>
                  </th>
                );
              })}
              {["Days", "Entries", "Earliest", "Latest"].map((h) => (
                <th key={h} className="px-1 text-center text-[10px] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REPORT_ROWS.map(([name, sub, counts, earliest, latest]) => {
              const days = counts.filter(Boolean).length;
              const entries = counts.reduce((a, b) => a + b, 0);
              return (
                <tr key={name} className="border-t border-gray-100">
                  <td className="px-3 py-[5px]">
                    <span className="block truncate text-[11.5px] font-medium text-blue-700">{name}</span>
                    <span className="block truncate text-[9.5px] text-gray-500">{sub}</span>
                  </td>
                  {[...Array(MONTH_DAYS)].map((_, d) =>
                    d < TODAY ? (
                      <td key={d} className={`text-center ${heat(counts[d])}`}>{counts[d] || ""}</td>
                    ) : (
                      <td
                        key={d}
                        style={{ backgroundImage: "repeating-linear-gradient(45deg,#f1f1f1 0 3px,transparent 3px 6px)" }}
                      />
                    )
                  )}
                  <td className="text-center font-semibold">{days}</td>
                  <td className="text-center font-semibold">{entries}</td>
                  <td className="text-center font-mono text-[10px]">{earliest}</td>
                  <td className="text-center font-mono text-[10px]">{latest}</td>
                </tr>
              );
            })}
            <tr className="border-t border-gray-300 bg-gray-50 font-semibold">
              <td className="px-3 py-1.5 text-[11px]">Total</td>
              {[...Array(MONTH_DAYS)].map((_, d) => (
                <td key={d} className="text-center text-[9.5px]">{d < TODAY ? totals[d] : ""}</td>
              ))}
              <td />
              <td className="text-center text-[10px]">{grand.toLocaleString("en-IN")}</td>
              <td /><td />
            </tr>
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
}

/* --------------------------------- People -------------------------------- */

const PEOPLE = [
  [1, "Arjun Mehta", "Committee", "A-908", "Resident", "98•••••4410", "Active", 19, "22 Nov 2026 16:26"],
  [8, "Sneha Patil", null, "A-302", "Resident", "97•••••1182", "Active", 46, "25 Nov 2026 21:32"],
  [12, "Rahul Verma", null, "B-704", "Resident", "99•••••7731", "Invite sent", 142, "25 Nov 2026 21:47"],
  [15, "Priya Nair", null, "C-110", "Resident", "98•••••0923", "Active", 27, "25 Nov 2026 21:05"],
  [21, "Vikram Joshi", null, "B-402", "Resident", null, null, 13, "25 Nov 2026 20:03"],
  [23, "Kavita Rao", null, "B-215", "Resident", "90•••••6614", "Active", 30, "25 Nov 2026 20:12"],
  [31, "Ramesh Yadav", "Night shift", null, "Guard", "70•••••2290", null, 214, "25 Nov 2026 21:18"],
  [34, "Sunil Kamble", null, null, "Staff", "88•••••5167", null, 62, "25 Nov 2026 20:31"],
  [59, null, null, null, "Resident", null, null, 8, "25 Nov 2026 20:58"],
  [40, "Neha Gupta", null, "C-506", "Resident", "98•••••3355", "Active", 21, "25 Nov 2026 19:56"],
];

export function PeopleScreen() {
  const chips = [["All", 84], ["Needs details", 6], ["Residents", 62], ["Staff", 14], ["Guards", 8], ["Moved out / inactive", 0]];
  return (
    <AppFrame
      active="People"
      title="People"
      subtitle="Everyone enrolled on the gate machine"
      actions={<Btn dark>Add person</Btn>}
    >
      <p className="max-w-[760px] text-[11.5px] leading-relaxed text-gray-500">
        People are added automatically when they are enrolled on the gate machine — the name typed on the machine comes along.
        Add the flat and type here so the log is easy to read. Fingerprints and faces stay on the machine; only the gate ID,
        name and punch times are kept here.
      </p>
      <div className="mt-3 flex items-end gap-3">
        <div className="w-[280px]">
          <p className="mb-1 text-[11.5px] text-gray-700">Search</p>
          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2.5 py-[7px] text-[12px] text-gray-400">
            <Search className="h-3.5 w-3.5" /> Name, flat, gate ID or mobile
          </div>
        </div>
        <div className="flex gap-1.5 pb-0.5">
          {chips.map(([label, n], i) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium ${
                i === 0 ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-700"
              }`}
            >
              {label} <span className={i === 0 ? "text-gray-300" : "text-gray-400"}>{n}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="border-b border-gray-200 text-[11.5px] text-gray-600">
              {["Gate ID", "Name", "Flat", "Type", "Mobile", "Resident app", "Punches (30 days)", "Last punch", ""].map((h, i) => (
                <th key={i} className={`px-3 py-2.5 font-medium ${i === 0 || i === 6 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PEOPLE.map(([id, name, note, flat, type, mobile, app, punches, last]) => (
              <tr key={id} className="border-b border-gray-100">
                <td className="px-3 py-[7px] text-right tabular-nums text-gray-800">{id}</td>
                <td className="px-3">
                  {name ? (
                    <>
                      <span className="block font-semibold">{name}</span>
                      {note && <span className="block text-[10.5px] text-gray-500">{note}</span>}
                    </>
                  ) : (
                    <span className="italic text-amber-700">Add name</span>
                  )}
                </td>
                <td className="px-3">{flat ?? (type === "Resident" ? <span className="italic text-amber-700">Add flat</span> : "—")}</td>
                <td className="px-3"><TypeBadge type={type} /></td>
                <td className="px-3 tabular-nums text-gray-700">{mobile ?? "—"}</td>
                <td className="px-3">
                  {app === "Active" && <span className="rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">Active</span>}
                  {app === "Invite sent" && <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">Invite sent</span>}
                  {!app && <span className="text-gray-400">—</span>}
                </td>
                <td className="px-3 text-right tabular-nums">{punches}</td>
                <td className="px-3 text-gray-700">{last}</td>
                <td className="px-3">
                  <span className="flex justify-end gap-1.5">
                    <Btn>Edit</Btn>
                    <Btn>Log</Btn>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
}
