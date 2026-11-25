"use client";
// A clickable copy of the company (Workforce) side of the app, filled with
// sample data from workforceData.js. It is drawn at 1200 x 760 and scaled to
// fit by ScaledScreen. Filters, search, cell details and the employee editor
// all work, but nothing is saved anywhere and every name is made up.
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutGrid,
  ScanLine,
  CalendarCheck,
  Users,
  Clock,
  CalendarX2,
  Sun,
  ListChecks,
  Banknote,
  BarChart3,
  HardDrive,
  SlidersHorizontal,
  Search,
  X,
  ArrowRight,
  MousePointerClick,
} from "lucide-react";
import { PRODUCT } from "./plans";
import { SCREEN_W, SCREEN_H } from "./AppScreens";
import {
  COMPANY,
  YEAR,
  MONTH_NAME,
  MONTH_DAYS,
  TODAY,
  BRANCHES,
  DEPARTMENTS,
  SHIFTS,
  ROTATION_GROUPS,
  EMPLOYEES,
  MONTH,
  SUMMARIES,
  TOTAL_OT,
  EST_SALARY,
  STATUS_OF,
  hhmm,
  dur,
  weekday,
  isSunday,
  rupees,
  DAY_LABEL,
} from "./workforceData";

export const MODULES = ["Dashboard", "Attendance", "Employees", "Shifts & roster", "Reports"];

const NAV = [
  { group: "Daily", items: [["Dashboard", LayoutGrid], ["Punch kiosk", ScanLine], ["Attendance", CalendarCheck]] },
  { group: "People", items: [["Employees", Users], ["Shifts & roster", Clock], ["Leave", CalendarX2], ["Holidays", Sun], ["Approvals", ListChecks]] },
  { group: "Money", items: [["Payroll", Banknote], ["Reports", BarChart3]] },
  { group: "Setup", items: [["Devices", HardDrive], ["Settings", SlidersHorizontal]] },
];

// What the modules we don't draw do — straight from the product brief.
const OTHER_MODULES = {
  "Punch kiosk": "Open a kiosk screen at reception or the gate for quick check-ins.",
  Leave: "Leave balances and requests. Staff apply from the staff app, HR approves.",
  Holidays: "Holiday list for the whole company or for one branch.",
  Approvals: "Miss-punch requests, leave and overtime waiting for a manager's OK.",
  Payroll: "Salary calculated from attendance, payslips, and PF / ESI files, all from the same numbers.",
  Devices: "Every machine with its online status. Machine clocks are corrected automatically.",
  Settings: "Company rules: half day for late / early, late-mark penalties, sandwich rule, overtime rules.",
};

/* ------------------------------- small bits ------------------------------ */

const STATUS_STYLE = {
  Present: "bg-green-50 text-green-700",
  Late: "bg-orange-50 text-orange-700",
  "Half day": "bg-amber-50 text-amber-700",
  Absent: "bg-red-50 text-red-600",
  "On leave": "bg-violet-50 text-violet-700",
  "Week off": "bg-gray-100 text-gray-500",
  Holiday: "bg-sky-50 text-sky-700",
};
const CELL_STYLE = {
  P: "bg-green-50 text-green-700",
  HD: "bg-amber-50 text-amber-700",
  A: "bg-red-50 text-red-600",
  L: "bg-violet-50 text-violet-700",
  WO: "bg-gray-100 text-gray-400",
  H: "bg-sky-50 text-sky-700",
};
const LEGEND = [["P", "Present"], ["HD", "Half day"], ["A", "Absent"], ["L", "Leave"], ["WO", "Week off"], ["H", "Holiday"]];

const statusText = (rec) => {
  if (!rec) return "";
  if (rec.status) return rec.status;
  if (rec.s === "P") return rec.late ? "Late" : "Present";
  if (rec.s === "L") return "On leave";
  return STATUS_OF[rec.s];
};

const Badge = ({ children, className = "" }) => (
  <span className={`inline-block whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ${className}`}>{children}</span>
);

const Button = ({ dark, onClick, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
      dark ? "bg-gray-900 text-white hover:bg-gray-700" : "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
    } ${className}`}
  >
    {children}
  </button>
);

const Select = ({ label, value, onChange, options, w = 130 }) => (
  <label className="block" style={{ width: w }}>
    <span className="mb-1 block text-[11.5px] font-medium text-gray-700">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-2 py-[6px] text-[12px] text-gray-900 outline-none focus:border-blue-500"
    >
      {options.map((o) => {
        const [v, l] = Array.isArray(o) ? o : [o, o];
        return <option key={v} value={v}>{l}</option>;
      })}
    </select>
  </label>
);

const SearchBox = ({ value, onChange, w = 220, placeholder = "Name or code" }) => (
  <label className="block" style={{ width: w }}>
    <span className="mb-1 block text-[11.5px] font-medium text-gray-700">Search</span>
    <span className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2.5 py-[6px] focus-within:border-blue-500">
      <Search className="h-3.5 w-3.5 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[12px] text-gray-900 outline-none placeholder:text-gray-400"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search">
          <X className="h-3.5 w-3.5 text-gray-400" />
        </button>
      )}
    </span>
  </label>
);

const Card = ({ title, right, children, className = "" }) => (
  <div className={`rounded-xl border border-gray-200 bg-white ${className}`}>
    {title && (
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
        <p className="text-[13.5px] font-semibold text-gray-900">{title}</p>
        {right}
      </div>
    )}
    {children}
  </div>
);

const PageHead = ({ title, subtitle, actions }) => (
  <div className="flex items-start justify-between border-b border-gray-200 bg-[#f6f6f5] px-7 pb-4 pt-5">
    <div>
      <h3 className="text-[22px] font-semibold leading-tight text-gray-900">{title}</h3>
      <p className="mt-0.5 text-[12.5px] text-gray-500">{subtitle}</p>
    </div>
    {actions && <div className="flex gap-2">{actions}</div>}
  </div>
);

const matches = (e, q) => !q || `${e.name} ${e.code}`.toLowerCase().includes(q.trim().toLowerCase());
const idx = (code) => EMPLOYEES.findIndex((e) => e.code === code);

/* -------------------------------- Dashboard ------------------------------ */

function DashboardView({ go, notify }) {
  const [day, setDay] = useState(TODAY);
  const [dept, setDept] = useState("All");
  const [dir, setDir] = useState("All");
  const [status, setStatus] = useState("All");
  const [q, setQ] = useState("");

  const today = EMPLOYEES.map((e, i) => ({ e, rec: MONTH[i][TODAY - 1] }));
  const presentToday = today.filter(({ rec }) => rec.s === "P" || rec.s === "HD").length;
  const lateToday = today.filter(({ rec }) => rec.late).length;
  const leaveToday = today.filter(({ rec }) => rec.s === "L").length;
  const absentToday = today.filter(({ rec }) => rec.s === "A").length;

  const rows = EMPLOYEES.map((e, i) => {
    const rec = MONTH[i][day - 1];
    const st = statusText(rec);
    const last = rec.punches[rec.punches.length - 1];
    return { e, rec, st, last };
  });
  const present = rows.filter((r) => r.rec.punches.length).length;
  const totalPunches = rows.reduce((s, r) => s + r.rec.punches.length, 0);
  const shown = rows.filter(
    (r) =>
      (dept === "All" || r.e.dept === dept) &&
      (dir === "All" || r.last?.dir === dir) &&
      (status === "All" || r.st === status) &&
      matches(r.e, q)
  );

  const stats = [
    ["Headcount", EMPLOYEES.length, `${BRANCHES.length} branches`, "text-gray-900"],
    ["Present today", presentToday, `incl. ${lateToday} late`, "text-green-700"],
    ["Absent today", absentToday, `${leaveToday} on leave`, "text-red-600"],
    ["Late today", lateToday, "Beyond grace period", "text-orange-600"],
    ["OT this month", `${TOTAL_OT.toFixed(1)}h`, "Across all employees", "text-gray-900"],
    ["Est. salary cost", rupees(EST_SALARY), MONTH_NAME, "text-gray-900"],
  ];

  return (
    <>
      <PageHead
        title="Dashboard"
        subtitle="Today at a glance"
        actions={<><Button onClick={() => go("Punch kiosk")}>Open kiosk</Button><Button dark onClick={() => go("Payroll")}>Payroll</Button></>}
      />
      <div className="space-y-4 px-7 py-5">
        <div className="grid grid-cols-6 gap-3">
          {stats.map(([label, value, sub, color]) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white px-3.5 py-3">
              <p className="text-[11.5px] text-gray-600">{label}</p>
              <p className={`mt-1 text-[24px] font-semibold leading-none tabular-nums ${color}`}>{value}</p>
              <p className="mt-1.5 text-[10.5px] text-gray-500">{sub}</p>
            </div>
          ))}
        </div>

        <Card
          title="Employee punch monitor"
          right={<div className="flex gap-1.5"><Button onClick={() => notify("Excel")}>Excel</Button><Button onClick={() => notify("PDF")}>PDF</Button></div>}
        >
          <div className="flex items-end gap-2.5 px-4 pt-3">
            <div>
              <span className="mb-1 block text-[11.5px] font-medium text-gray-700">Date</span>
              <div className="flex gap-1.5">
                <Button dark={day === TODAY} onClick={() => setDay(TODAY)}>Today</Button>
                <Button dark={day === TODAY - 1} onClick={() => setDay(TODAY - 1)}>‹ Previous day</Button>
              </div>
            </div>
            <Select label="Department" value={dept} onChange={setDept} options={["All", ...DEPARTMENTS]} w={130} />
            <Select label="Last punch" value={dir} onChange={setDir} options={["All", "IN", "OUT"]} w={90} />
            <Select label="Status" value={status} onChange={setStatus} options={["All", "Present", "Late", "Half day", "Absent", "On leave"]} w={110} />
            <SearchBox value={q} onChange={setQ} w={190} />
          </div>

          <div className="mx-4 mt-3 flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-[12px]">
            <span className="font-semibold text-gray-900">{DAY_LABEL(day)}</span>
            {day === TODAY && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" /> Live
              </span>
            )}
            <span className="ml-2 text-gray-600">Present</span>
            <span className="h-1.5 w-28 overflow-hidden rounded-full bg-gray-200">
              <span className="block h-full rounded-full bg-green-600" style={{ width: `${(present / EMPLOYEES.length) * 100}%` }} />
            </span>
            <strong className="tabular-nums">{present}</strong>
            <span className="text-gray-600">Not present</span>
            <span className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
              <span className="block h-full rounded-full bg-red-500" style={{ width: `${((EMPLOYEES.length - present) / EMPLOYEES.length) * 100}%` }} />
            </span>
            <strong className="tabular-nums">{EMPLOYEES.length - present}</strong>
            <span className="text-gray-600">· {totalPunches} punches in all</span>
            <span className="ml-auto flex gap-1 text-[10px] font-semibold">
              <span className="rounded border border-green-200 bg-green-50 px-1.5 text-green-700">IN</span>
              <span className="rounded border border-blue-200 bg-blue-50 px-1.5 text-blue-700">OUT</span>
            </span>
          </div>

          <div className="px-4 pb-4 pt-3">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] text-gray-600">
                  {["Code", "Name", "Department", "First punch", "Last punch", "Hours", "Direction", "Punch records", "Status"].map((h) => (
                    <th key={h} className="px-2.5 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map(({ e, rec, st, last }) => {
                  const p = rec.punches;
                  return (
                    <tr key={e.code} className={`border-b border-gray-100 ${st === "Absent" ? "bg-red-50/40" : st === "On leave" ? "bg-violet-50/40" : ""}`}>
                      <td className="px-2.5 py-[7px] font-mono text-[11px] text-gray-600">{e.code}</td>
                      <td className="px-2.5 font-semibold text-gray-900">{e.name}</td>
                      <td className="px-2.5 text-gray-700">{e.dept}</td>
                      <td className="px-2.5 tabular-nums">{p[0] ? hhmm(p[0].min) : "—"}</td>
                      <td className="px-2.5 tabular-nums">{last && p.length > 1 ? hhmm(last.min) : "—"}</td>
                      <td className="px-2.5 tabular-nums font-medium">{dur(rec.worked || 0)}</td>
                      <td className="px-2.5">
                        {last ? (
                          <Badge className={last.dir === "IN" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}>{last.dir}</Badge>
                        ) : "—"}
                      </td>
                      <td className="px-2.5">
                        <span className="flex flex-wrap gap-1">
                          {p.length ? p.map((x, k) => (
                            <span
                              key={k}
                              className={`rounded px-1.5 py-px font-mono text-[10.5px] ${x.dir === "IN" ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-800"}`}
                            >
                              {hhmm(x.min)}
                            </span>
                          )) : <span className="text-gray-400">{rec.note ?? "No punches"}</span>}
                        </span>
                      </td>
                      <td className="px-2.5"><Badge className={STATUS_STYLE[st]}>{st}</Badge></td>
                    </tr>
                  );
                })}
                {!shown.length && (
                  <tr><td colSpan={9} className="py-6 text-center text-gray-500">No one matches these filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          {BRANCHES.map((b, bi) => {
            const list = today.filter(({ e }) => e.branch === b);
            const p = list.filter(({ rec }) => rec.s === "P" || rec.s === "HD").length;
            const l = list.filter(({ rec }) => rec.late).length;
            const a = list.length - p;
            const machines = bi === 0 ? "2 of 2" : "1 of 1";
            return (
              <Card key={b}>
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold">{b}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" /> {machines} machines online
                    </span>
                  </div>
                  <div className="mt-2.5 flex gap-4 text-[12px]">
                    <span><strong className="text-[18px] text-green-700">{p}</strong> present</span>
                    <span><strong className="text-[18px] text-orange-600">{l}</strong> late</span>
                    <span><strong className="text-[18px] text-red-600">{a}</strong> absent / leave</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ------------------------------- Attendance ------------------------------ */

function AttendanceView({ notify }) {
  const [branch, setBranch] = useState("All branches");
  const [sel, setSel] = useState({ i: 0, d: TODAY - 1 });
  const list = EMPLOYEES.map((e, i) => ({ e, i })).filter(({ e }) => branch === "All branches" || e.branch === branch);
  const rec = MONTH[sel.i][sel.d - 1];
  const selEmp = EMPLOYEES[sel.i];
  const st = statusText(rec);

  return (
    <>
      <PageHead
        title="Attendance"
        subtitle="Monthly grid. Click any cell to see the punches."
        actions={<Button onClick={() => notify("CSV")}>Export CSV</Button>}
      />
      <div className="px-7 py-5">
        <div className="flex items-end gap-2.5">
          <Select label="Month" value="11" onChange={() => {}} options={[["11", `${MONTH_NAME} ${YEAR}`]]} w={150} />
          <Select label="Branch" value={branch} onChange={setBranch} options={["All branches", ...BRANCHES]} w={160} />
          <span className="mb-1.5 ml-2 inline-flex items-center gap-1.5 text-[11.5px] text-gray-500">
            <MousePointerClick className="h-3.5 w-3.5" /> Try clicking a cell
          </span>
        </div>

        <Card className="mt-4" title={`${MONTH_NAME} ${YEAR}`}>
          <table className="w-full table-fixed border-collapse text-[10px]">
            <colgroup>
              <col style={{ width: 138 }} />
              {[...Array(MONTH_DAYS)].map((_, i) => <col key={i} />)}
              <col style={{ width: 26 }} /><col style={{ width: 26 }} /><col style={{ width: 26 }} /><col style={{ width: 34 }} /><col style={{ width: 44 }} />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                <th className="px-3 py-1.5 text-left text-[11px] font-medium">Employee</th>
                {[...Array(MONTH_DAYS)].map((_, i) => (
                  <th key={i} className="py-1 text-center font-semibold leading-tight">
                    {String(i + 1).padStart(2, "0")}
                    <span className={`block text-[8.5px] font-normal ${isSunday(i + 1) ? "text-red-500" : "text-gray-400"}`}>{weekday(i + 1)}</span>
                  </th>
                ))}
                {["P", "A", "L", "OT", "Pay days"].map((h) => <th key={h} className="text-center text-[10px] font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {list.map(({ e, i }) => {
                const sm = SUMMARIES[i];
                return (
                  <tr key={e.code} className="border-b border-gray-100">
                    <td className="px-3 py-1">
                      <span className="block truncate text-[11.5px] font-semibold text-gray-900">{e.name}</span>
                      <span className="block text-[9.5px] text-gray-500">{e.code}</span>
                    </td>
                    {MONTH[i].map((r, d) => {
                      const active = sel.i === i && sel.d === d + 1;
                      if (!r) return <td key={d} className="border-l border-white" />;
                      return (
                        <td key={d} className="border-l border-white p-0">
                          <button
                            type="button"
                            onClick={() => setSel({ i, d: d + 1 })}
                            className={`relative block h-[30px] w-full text-center text-[9.5px] font-semibold ${CELL_STYLE[r.s]} ${
                              active ? "ring-2 ring-inset ring-blue-600" : "hover:brightness-95"
                            }`}
                          >
                            {r.s}
                            {r.late && <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-orange-500" />}
                            {r.ot > 0 && <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-blue-600" />}
                          </button>
                        </td>
                      );
                    })}
                    <td className="text-center font-semibold text-green-700">{sm.P}</td>
                    <td className="text-center font-semibold text-red-600">{sm.A}</td>
                    <td className="text-center font-semibold text-violet-700">{sm.L}</td>
                    <td className="text-center tabular-nums">{sm.ot.toFixed(1)}</td>
                    <td className="text-center font-bold tabular-nums">{sm.payDays}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 text-[11px] text-gray-600">
            {LEGEND.map(([k, l]) => (
              <span key={k} className="inline-flex items-center gap-1">
                <span className={`rounded px-1 text-[9.5px] font-semibold ${CELL_STYLE[k]}`}>{k}</span> {l}
              </span>
            ))}
            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Late</span>
            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Overtime</span>
          </div>
        </Card>

        <Card className="mt-3">
          <div className="flex items-center gap-5 px-4 py-3 text-[12px]">
            <div className="min-w-[180px]">
              <p className="font-semibold text-gray-900">{selEmp.name}</p>
              <p className="text-[11px] text-gray-500">{DAY_LABEL(sel.d)} · {SHIFTS[selEmp.shift].name}</p>
            </div>
            <Badge className={STATUS_STYLE[st]}>{st}</Badge>
            {rec.punches.length ? (
              <>
                <span>In <strong className="tabular-nums">{hhmm(rec.punches[0].min)}</strong></span>
                <span>Out <strong className="tabular-nums">{rec.punches.length > 1 ? hhmm(rec.punches[rec.punches.length - 1].min) : "—"}</strong></span>
                <span>Worked <strong className="tabular-nums">{dur(rec.worked)}</strong></span>
                <span>OT <strong className="tabular-nums">{rec.ot ? `${rec.ot}h` : "—"}</strong></span>
                <span className="text-gray-500">{rec.punches.length} punches</span>
              </>
            ) : (
              <span className="text-gray-500">{rec.note ?? "No punches on this day"}</span>
            )}
            <span className="ml-auto"><Button onClick={() => notify("edit")}>Edit punches</Button></span>
          </div>
        </Card>
      </div>
    </>
  );
}

/* -------------------------------- Employees ------------------------------ */

const blank = (n) => ({ code: `E${String(n).padStart(3, "0")}`, name: "", branch: BRANCHES[0], dept: DEPARTMENTS[0], shift: "GEN", gross: 18000, app: null, isNew: true });

function EmployeesView({ notify }) {
  const [list, setList] = useState(EMPLOYEES);
  const [branch, setBranch] = useState("All branches");
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState([]);
  const [editing, setEditing] = useState(null);

  const shown = list.filter((e) => (branch === "All branches" || e.branch === branch) && matches(e, q));
  const allPicked = shown.length > 0 && shown.every((e) => picked.includes(e.code));
  const toggle = (code) => setPicked((p) => (p.includes(code) ? p.filter((c) => c !== code) : [...p, code]));

  const save = () => {
    if (!editing.name.trim()) return;
    const { isNew, ...emp } = editing;
    setList((l) => (isNew ? [...l, emp] : l.map((e) => (e.code === emp.code ? emp : e))));
    setEditing(null);
    notify(isNew ? `Added ${emp.name} (sample only)` : `Saved ${emp.name} (sample only)`, true);
  };
  const remove = (emp) => {
    const before = list;
    setList((l) => l.filter((e) => e.code !== emp.code));
    notify(`Removed ${emp.name}`, true, () => setList(before));
  };

  return (
    <>
      <PageHead
        title="Employees"
        subtitle="Master records, shift and salary structure"
        actions={
          <>
            <Button onClick={() => notify("Excel")}>Excel import / export</Button>
            <Button dark onClick={() => setEditing(blank(list.length + 1))}>Add employee</Button>
          </>
        }
      />
      <div className="px-7 py-5">
        <div className="flex items-end gap-2.5">
          <Select label="Branch" value={branch} onChange={setBranch} options={["All branches", ...BRANCHES]} w={160} />
          <SearchBox value={q} onChange={setQ} w={220} />
          {picked.length > 0 && (
            <span className="mb-0.5 ml-2 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-800">
              {picked.length} selected
              <button type="button" className="underline" onClick={() => notify("Shift change", true)}>Change shift</button>
              <button type="button" className="underline" onClick={() => setPicked([])}>Clear</button>
            </span>
          )}
        </div>

        <Card className="mt-4" title={`${shown.length} ${shown.length === 1 ? "employee" : "employees"}`}>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[11px] text-gray-600">
                <th className="w-9 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={allPicked}
                    onChange={() => setPicked(allPicked ? [] : shown.map((e) => e.code))}
                    className="h-3.5 w-3.5 cursor-pointer accent-gray-900"
                    aria-label="Select all"
                  />
                </th>
                {["Code", "Name", "Branch", "Department", "Shift", "Week off", "Gross", "Status", "Staff app", ""].map((h, i) => (
                  <th key={i} className={`px-2.5 py-2 font-medium ${h === "Gross" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.code} className={`border-b border-gray-100 ${picked.includes(e.code) ? "bg-blue-50/40" : ""}`}>
                  <td className="px-3">
                    <input type="checkbox" checked={picked.includes(e.code)} onChange={() => toggle(e.code)} className="h-3.5 w-3.5 cursor-pointer accent-gray-900" aria-label={`Select ${e.name}`} />
                  </td>
                  <td className="px-2.5 py-[7px] font-mono text-[11px] font-semibold">{e.code}</td>
                  <td className="px-2.5 font-medium text-gray-900">{e.name}</td>
                  <td className="px-2.5 text-gray-700">{e.branch}</td>
                  <td className="px-2.5 text-gray-700">{e.dept}</td>
                  <td className="px-2.5 text-gray-700">{SHIFTS[e.shift].name}</td>
                  <td className="px-2.5 text-gray-700">Sun</td>
                  <td className="px-2.5 text-right tabular-nums">{rupees(e.gross)}</td>
                  <td className="px-2.5"><Badge className="bg-green-50 text-green-700">active</Badge></td>
                  <td className="px-2.5">
                    {e.app === "Active" && <Badge className="bg-blue-50 text-blue-700">Active</Badge>}
                    {e.app === "Invited" && <Badge className="bg-amber-50 text-amber-800">Invited</Badge>}
                    {!e.app && <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-2.5">
                    <span className="flex justify-end gap-1.5">
                      <Button onClick={() => setEditing({ ...e })}>Edit</Button>
                      <Button onClick={() => remove(e)} className="!text-red-600">Delete</Button>
                    </span>
                  </td>
                </tr>
              ))}
              {!shown.length && <tr><td colSpan={11} className="py-6 text-center text-gray-500">No employees match.</td></tr>}
            </tbody>
          </table>
        </Card>
      </div>

      {editing && (
        <div className="absolute inset-0 z-20 flex justify-end bg-black/20" onClick={() => setEditing(null)}>
          <div className="h-full w-[340px] overflow-y-auto bg-white p-5 shadow-2xl" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-semibold">{editing.isNew ? "Add employee" : `Edit ${editing.code}`}</p>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close"><X className="h-4 w-4 text-gray-500" /></button>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-[11.5px] font-medium text-gray-700">Name</span>
                <input
                  autoFocus
                  value={editing.name}
                  onChange={(ev) => setEditing({ ...editing, name: ev.target.value })}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-gray-300 px-2.5 py-[7px] text-[12.5px] outline-none focus:border-blue-500"
                />
              </label>
              <Select label="Branch" value={editing.branch} onChange={(v) => setEditing({ ...editing, branch: v })} options={BRANCHES} w="100%" />
              <Select label="Department" value={editing.dept} onChange={(v) => setEditing({ ...editing, dept: v })} options={DEPARTMENTS} w="100%" />
              <Select
                label="Shift"
                value={editing.shift}
                onChange={(v) => setEditing({ ...editing, shift: v })}
                options={Object.values(SHIFTS).map((s) => [s.code, s.name])}
                w="100%"
              />
              <label className="block">
                <span className="mb-1 block text-[11.5px] font-medium text-gray-700">Gross salary / month</span>
                <input
                  type="number"
                  value={editing.gross}
                  onChange={(ev) => setEditing({ ...editing, gross: Number(ev.target.value) || 0 })}
                  className="w-full rounded-lg border border-gray-300 px-2.5 py-[7px] text-[12.5px] tabular-nums outline-none focus:border-blue-500"
                />
              </label>
              <p className="rounded-lg bg-gray-50 px-3 py-2 text-[11px] leading-relaxed text-gray-600">
                In the real app you also set the salary structure, PF / ESI, week off and the machine user ID here.
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              <Button dark onClick={save} className={editing.name.trim() ? "" : "opacity-50"}>Save</Button>
              <Button onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* --------------------------------- Shifts -------------------------------- */

function ShiftsView({ notify }) {
  const [ot, setOt] = useState(Object.fromEntries(Object.values(SHIFTS).map((s) => [s.code, s.ot])));
  const [openGroup, setOpenGroup] = useState(true);
  const roster = Object.values(SHIFTS).map((s) => ({ s, people: EMPLOYEES.filter((e) => e.shift === s.code) }));
  const name = (code) => EMPLOYEES[idx(code)].name;

  return (
    <>
      <PageHead title="Shifts & roster" subtitle="Fixed, overnight and rotational groups" />
      <div className="space-y-4 px-7 py-5">
        <Card title="Shifts" right={<Button dark onClick={() => notify("Add shift", true)}>Add shift</Button>}>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[11px] text-gray-600">
                {["Code", "Name", "Timing", "Break", "Full day", "Grace in", "OT", ""].map((h, i) => (
                  <th key={i} className="px-4 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(SHIFTS).map((s) => (
                <tr key={s.code} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 font-mono text-[11px] font-semibold">{s.code}</td>
                  <td className="px-4 font-medium">
                    {s.name}
                    {s.end < s.start && <Badge className="ml-2 bg-indigo-50 text-indigo-700">crosses midnight</Badge>}
                  </td>
                  <td className="px-4 tabular-nums">{hhmm(s.start)} – {hhmm(s.end)}</td>
                  <td className="px-4">{s.brk} min</td>
                  <td className="px-4">{s.full}</td>
                  <td className="px-4">{s.grace} min</td>
                  <td className="px-4">
                    <button
                      type="button"
                      onClick={() => setOt({ ...ot, [s.code]: !ot[s.code] })}
                      className={`relative h-5 w-9 rounded-full transition-colors ${ot[s.code] ? "bg-green-600" : "bg-gray-300"}`}
                      aria-label={`Overtime for ${s.name}`}
                    >
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${ot[s.code] ? "left-[18px]" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 text-right"><Button onClick={() => notify("Edit shift", true)}>Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Rotation groups" right={<Button dark onClick={() => notify("Add group", true)}>Add group</Button>}>
          {ROTATION_GROUPS.map((g) => (
            <div key={g.name} className="px-4 py-3">
              <button type="button" onClick={() => setOpenGroup(!openGroup)} className="flex w-full items-center justify-between text-left">
                <span>
                  <span className="block text-[13px] font-semibold">{g.name}</span>
                  <span className="block text-[11.5px] text-gray-500">{g.pattern} · {g.members.length} people</span>
                </span>
                <span className="text-[11.5px] font-medium text-blue-700">{openGroup ? "Hide people" : "Show people"}</span>
              </button>
              {openGroup && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {g.members.map((c) => (
                    <span key={c} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11.5px]">{name(c)}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Card>

        <Card title={`Today's roster — ${TODAY} Nov ${YEAR}`}>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-[11px] text-gray-600">
                <th className="px-4 py-2 font-medium">Shift</th>
                <th className="px-4 py-2 text-right font-medium">Headcount</th>
                <th className="px-4 py-2 font-medium">Employees</th>
              </tr>
            </thead>
            <tbody>
              {roster.map(({ s, people }) => (
                <tr key={s.code} className="border-b border-gray-100">
                  <td className="px-4 py-2.5">
                    <span className="block font-semibold">{s.name}</span>
                    <span className="block text-[11px] text-gray-500">{hhmm(s.start)} – {hhmm(s.end)}</span>
                  </td>
                  <td className="px-4 text-right font-semibold tabular-nums">{people.length}</td>
                  <td className="px-4 text-gray-700">{people.map((p) => p.name).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

/* --------------------------------- Reports ------------------------------- */

const REPORTS = [
  ["duration", "Monthly work duration (in / out / hours)"],
  ["summary", "Monthly attendance summary"],
  ["daily", `Daily attendance — ${TODAY} Nov`],
];

function ReportsView({ notify }) {
  const [type, setType] = useState("duration");
  const [dept, setDept] = useState("All departments");
  const [half, setHalf] = useState(2);
  const list = EMPLOYEES.map((e, i) => ({ e, i })).filter(({ e }) => dept === "All departments" || e.dept === dept);
  const days = half === 1 ? [...Array(15)].map((_, k) => k + 1) : [...Array(15)].map((_, k) => k + 16);
  const title = REPORTS.find(([k]) => k === type)[1];

  return (
    <>
      <PageHead title="Reports" subtitle="Daily and monthly attendance, work duration, payroll and statutory reports" />
      <div className="px-7 py-5">
        <div className="flex items-end gap-2.5">
          <Select label="Report" value={type} onChange={setType} options={REPORTS} w={290} />
          <Select label="Department" value={dept} onChange={setDept} options={["All departments", ...DEPARTMENTS]} w={160} />
          <Select label="Month" value="11" onChange={() => {}} options={[["11", `${MONTH_NAME} ${YEAR}`]]} w={140} />
          <Button onClick={() => notify("CSV")}>CSV</Button>
          <Button onClick={() => notify("Excel")}>Excel</Button>
          <Button dark onClick={() => notify("PDF")}>PDF</Button>
        </div>

        <Card
          className="mt-4"
          title={`${title.replace(` — ${TODAY} Nov`, "")} — ${type === "daily" ? DAY_LABEL(TODAY) : `${MONTH_NAME} ${YEAR}`}`}
          right={
            type === "duration" ? (
              <span className="flex rounded-lg bg-gray-100 p-0.5 text-[11.5px] font-medium">
                {[1, 2].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHalf(h)}
                    className={`rounded-md px-2.5 py-1 ${half === h ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                  >
                    {h === 1 ? "1 – 15" : "16 – 30"}
                  </button>
                ))}
              </span>
            ) : (
              <span className="text-[11.5px] text-gray-500">{list.length} rows</span>
            )
          }
        >
          {type === "duration" && (
            <table className="w-full table-fixed border-collapse text-[10.5px]">
              <colgroup>
                <col style={{ width: 44 }} /><col style={{ width: 118 }} /><col style={{ width: 56 }} />
                {days.map((d) => <col key={d} />)}
                <col style={{ width: 112 }} />
              </colgroup>
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50 text-gray-600">
                  <th className="py-1.5 text-left pl-2 font-medium">Code</th>
                  <th className="text-left font-medium">Name</th>
                  <th />
                  {days.map((d) => (
                    <th key={d} className={`text-center font-medium ${isSunday(d) ? "text-red-500" : ""}`}>{String(d).padStart(2, "0")} {weekday(d)}</th>
                  ))}
                  <th className="text-center font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {list.map(({ e, i }) => {
                  const sm = SUMMARIES[i];
                  const recs = days.map((d) => MONTH[i][d - 1]);
                  const line = (label, fn, last) => (
                    <tr key={label} className={last ? "border-b border-gray-300" : ""}>
                      <td className="pl-2 align-top font-mono text-[10px] text-gray-600">{label === "In" ? e.code : ""}</td>
                      <td className="align-top">
                        {label === "In" && <span className="font-semibold text-gray-900">{e.name}</span>}
                        {label === "Out" && <span className="text-gray-500">{e.dept}</span>}
                      </td>
                      <td className="pr-1 text-right text-gray-500">{label}</td>
                      {recs.map((r, k) => fn(r, k))}
                      <td className="text-center text-[10px] font-semibold text-gray-700">
                        {label === "Status" && `P${sm.P} HD${sm.HD} A${sm.A} L${sm.L} = ${sm.payDays}`}
                        {label === "OT" && sm.ot > 0 && `${sm.ot.toFixed(1)}h`}
                      </td>
                    </tr>
                  );
                  const cell = (r, k, v, cls = "") => <td key={k} className={`py-[3px] text-center tabular-nums ${cls}`}>{r ? v : ""}</td>;
                  const hasP = (r) => r && r.punches.length;
                  return [
                    line("In", (r, k) => cell(r, k, hasP(r) ? hhmm(r.punches[0].min) : "", r?.late ? "font-semibold text-orange-600" : "")),
                    line("Out", (r, k) => cell(r, k, hasP(r) && r.punches.length > 1 ? hhmm(r.punches[r.punches.length - 1].min) : "")),
                    line("Work dur.", (r, k) => cell(r, k, hasP(r) ? dur(r.worked) : "", "text-gray-700")),
                    line("OT", (r, k) => cell(r, k, r?.ot ? r.ot.toFixed(1) : "", "font-semibold text-blue-700")),
                    line("Status", (r, k) => cell(r, k, r?.s, r ? `font-semibold ${CELL_STYLE[r.s]}` : ""), true),
                  ];
                })}
              </tbody>
            </table>
          )}

          {type === "summary" && (
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] text-gray-600">
                  {["Code", "Name", "Department", "Present", "Half day", "Absent", "Leave", "Week off", "Holiday", "Late marks", "OT hrs", "Pay days"].map((h, k) => (
                    <th key={h} className={`px-2.5 py-2 font-medium ${k > 2 ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(({ e, i }) => {
                  const s = SUMMARIES[i];
                  return (
                    <tr key={e.code} className="border-b border-gray-100 tabular-nums">
                      <td className="px-2.5 py-[7px] font-mono text-[11px]">{e.code}</td>
                      <td className="px-2.5 font-semibold">{e.name}</td>
                      <td className="px-2.5 text-gray-700">{e.dept}</td>
                      <td className="px-2.5 text-right text-green-700">{s.P}</td>
                      <td className="px-2.5 text-right text-amber-700">{s.HD}</td>
                      <td className="px-2.5 text-right text-red-600">{s.A}</td>
                      <td className="px-2.5 text-right text-violet-700">{s.L}</td>
                      <td className="px-2.5 text-right text-gray-500">{s.WO}</td>
                      <td className="px-2.5 text-right text-sky-700">{s.H}</td>
                      <td className="px-2.5 text-right text-orange-600">{s.late}</td>
                      <td className="px-2.5 text-right">{s.ot.toFixed(1)}</td>
                      <td className="px-2.5 text-right font-bold">{s.payDays}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {type === "daily" && (
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] text-gray-600">
                  {["Code", "Name", "Department", "Shift", "In", "Out", "Worked", "OT", "Status"].map((h) => (
                    <th key={h} className="px-2.5 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(({ e, i }) => {
                  const r = MONTH[i][TODAY - 1];
                  const st = statusText(r);
                  const p = r.punches;
                  return (
                    <tr key={e.code} className="border-b border-gray-100 tabular-nums">
                      <td className="px-2.5 py-[7px] font-mono text-[11px]">{e.code}</td>
                      <td className="px-2.5 font-semibold">{e.name}</td>
                      <td className="px-2.5 text-gray-700">{e.dept}</td>
                      <td className="px-2.5 text-gray-700">{SHIFTS[e.shift].name}</td>
                      <td className="px-2.5">{p[0] ? hhmm(p[0].min) : "—"}</td>
                      <td className="px-2.5">{p.length > 1 && p[p.length - 1].dir === "OUT" ? hhmm(p[p.length - 1].min) : "—"}</td>
                      <td className="px-2.5">{dur(r.worked || 0)}</td>
                      <td className="px-2.5">{r.ot ? `${r.ot}h` : "—"}</td>
                      <td className="px-2.5"><Badge className={STATUS_STYLE[st]}>{st}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  );
}

/* ------------------------- modules we don't draw ------------------------- */

function OtherModule({ label, icon: Icon, demoHref, go }) {
  return (
    <>
      <PageHead title={label} subtitle="Part of the full app" />
      <div className="flex flex-1 items-center justify-center px-7 py-16">
        <div className="max-w-[420px] text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon className="h-6 w-6" />
          </span>
          <p className="mt-4 text-[17px] font-semibold text-gray-900">{label}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600">{OTHER_MODULES[label]}</p>
          <p className="mt-1 text-[12px] text-gray-500">We show this one live, on a call.</p>
          <div className="mt-5 flex justify-center gap-2">
            <a href={demoHref} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-blue-700">
              Book a free demo <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Button onClick={() => go("Dashboard")}>Back to dashboard</Button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------- app ---------------------------------- */

const VIEWS = {
  Dashboard: DashboardView,
  Attendance: AttendanceView,
  Employees: EmployeesView,
  "Shifts & roster": ShiftsView,
  Reports: ReportsView,
};

const TOAST_TEXT = {
  Excel: "In the real app this downloads an Excel file.",
  PDF: "In the real app this downloads a PDF.",
  CSV: "In the real app this downloads a CSV file.",
  edit: "In the real app HR can add or fix a punch here, and it is logged.",
};

export default function WorkforceApp({ screen: controlled, onScreenChange, scrollable = true, demoHref = "/contact" }) {
  const [own, setOwn] = useState("Dashboard");
  const screen = controlled ?? own;
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const main = useRef(null);

  const go = (s) => {
    setOwn(s);
    onScreenChange?.(s);
  };
  // Tiny message at the bottom of the app, e.g. for download buttons.
  const notify = (key, literal = false, undo) => {
    clearTimeout(timer.current);
    setToast({ text: literal ? key : TOAST_TEXT[key] ?? `${key} works in the real app.`, undo });
    timer.current = setTimeout(() => setToast(null), undo ? 4500 : 2600);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (main.current) main.current.scrollTop = 0;
  }, [screen]);

  const View = VIEWS[screen];
  const icon = useMemo(() => NAV.flatMap((g) => g.items).find(([l]) => l === screen)?.[1], [screen]);

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl bg-white text-left text-gray-900 shadow-2xl ring-1 ring-black/10"
      style={{ width: SCREEN_W, height: SCREEN_H }}
    >
      <div className="flex h-[34px] shrink-0 items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="mx-auto rounded-md bg-white px-16 py-[3px] text-[11px] text-gray-500 ring-1 ring-gray-200">
          {PRODUCT.name} · {COMPANY}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[200px] shrink-0 flex-col border-r border-gray-200 bg-white">
          <div className="flex items-center gap-2.5 px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-[15px] font-extrabold text-white">
              {PRODUCT.name[0]}
            </span>
            <span className="leading-tight">
              <span className="block text-[14px] font-semibold">{PRODUCT.name}</span>
              <span className="block text-[11px] text-gray-500">{COMPANY}</span>
            </span>
          </div>
          <nav className="min-h-0 flex-1 overflow-hidden px-2.5">
            {NAV.map(({ group, items }) => (
              <div key={group} className="mt-2">
                <p className="px-2 pb-1 text-[11px] font-medium text-gray-500">{group}</p>
                {items.map(([label, Icon]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => go(label)}
                    className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[6px] text-left text-[13px] transition-colors ${
                      label === screen ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${label === screen ? "text-blue-600" : "text-gray-400"}`} />
                    {label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="border-t border-gray-200 px-4 py-2.5">
            <p className="text-[12.5px] font-semibold">HR Admin</p>
            <p className="text-[11px] text-gray-500">Owner</p>
          </div>
        </aside>
        <main className="relative flex min-w-0 flex-1 flex-col bg-[#f6f6f5]">
          <div ref={main} className={`flex min-h-0 flex-1 flex-col ${scrollable ? "overflow-y-auto" : "overflow-hidden"}`}>
            {View ? <View go={go} notify={notify} /> : <OtherModule label={screen} icon={icon ?? LayoutGrid} demoHref={demoHref} go={go} />}
          </div>
          {!scrollable && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#f6f6f5] to-transparent" />
          )}
          {toast && (
            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-gray-900 px-4 py-2.5 text-[12.5px] text-white shadow-xl">
              {toast.text}
              {toast.undo && (
                <button
                  type="button"
                  className="font-semibold text-blue-300 hover:text-blue-200"
                  onClick={() => {
                    toast.undo();
                    setToast(null);
                  }}
                >
                  Undo
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
