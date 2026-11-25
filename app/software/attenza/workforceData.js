// Sample data for the company (Workforce) screens on the Attenza page.
// Everything is made up: company, branches, people and times. The numbers
// come from a small deterministic generator so the server and the browser
// always draw exactly the same month.

export const COMPANY = "Apex Components";
export const YEAR = 2026;
export const MONTH_NAME = "November";
export const MONTH_DAYS = 30;
export const TODAY = 25; // Wed 25 Nov 2026
export const NOW = 17 * 60 + 42; // 17:42, the "live" time on the dashboard
const WEEK = ["S", "M", "T", "W", "T", "F", "S"]; // Nov 2026 starts on a Sunday
export const weekday = (d) => WEEK[(d - 1) % 7];
export const isSunday = (d) => (d - 1) % 7 === 0;
const HOLIDAYS = { 9: "Diwali holiday" };

export const BRANCHES = ["Bhiwandi Plant", "Andheri Office", "Pune Warehouse"];
export const DEPARTMENTS = ["Production", "Accounts", "Sales", "Stores", "Maintenance", "Admin", "Security"];

export const SHIFTS = {
  A: { code: "A", name: "Shift A (Morning)", start: 360, end: 840, brk: 30, full: "7h 30m", grace: 5, ot: true },
  B: { code: "B", name: "Shift B (Evening)", start: 840, end: 1320, brk: 30, full: "7h 30m", grace: 5, ot: true },
  GEN: { code: "GEN", name: "General", start: 540, end: 1080, brk: 60, full: "8h 00m", grace: 10, ot: true },
  N: { code: "N", name: "Night (overnight)", start: 1320, end: 360, brk: 30, full: "7h 30m", grace: 10, ot: false },
};

export const ROTATION_GROUPS = [
  { name: "Plant rotation", pattern: "Shift A ⇄ Shift B, changes every Monday", members: ["E001", "E003", "E005", "E009", "E014"] },
];

export const EMPLOYEES = [
  { code: "E001", name: "Rajesh Kumar", branch: "Bhiwandi Plant", dept: "Production", shift: "A", gross: 22000, app: "Active" },
  { code: "E002", name: "Anita Sharma", branch: "Andheri Office", dept: "Accounts", shift: "GEN", gross: 35000, app: "Active" },
  { code: "E003", name: "Mohammed Shaikh", branch: "Bhiwandi Plant", dept: "Production", shift: "A", gross: 18500, app: null },
  { code: "E004", name: "Pooja Desai", branch: "Andheri Office", dept: "Sales", shift: "GEN", gross: 28000, app: "Active" },
  { code: "E005", name: "Santosh Pawar", branch: "Bhiwandi Plant", dept: "Maintenance", shift: "B", gross: 24000, app: "Invited" },
  { code: "E006", name: "Kiran Jadhav", branch: "Bhiwandi Plant", dept: "Stores", shift: "GEN", gross: 19000, app: null },
  { code: "E007", name: "Farhan Qureshi", branch: "Andheri Office", dept: "Sales", shift: "GEN", gross: 30000, app: "Active" },
  { code: "E008", name: "Meena Iyer", branch: "Andheri Office", dept: "Admin", shift: "GEN", gross: 26000, app: "Active" },
  { code: "E009", name: "Ganesh More", branch: "Bhiwandi Plant", dept: "Production", shift: "B", gross: 17500, app: null },
  { code: "E010", name: "Lakshmi Reddy", branch: "Pune Warehouse", dept: "Stores", shift: "GEN", gross: 21000, app: "Active" },
  { code: "E011", name: "Amit Chauhan", branch: "Pune Warehouse", dept: "Stores", shift: "A", gross: 18000, app: "Invited" },
  { code: "E012", name: "Sachin Gaikwad", branch: "Bhiwandi Plant", dept: "Security", shift: "N", gross: 16000, app: null },
  { code: "E013", name: "Divya Menon", branch: "Andheri Office", dept: "Accounts", shift: "GEN", gross: 32000, app: "Active" },
  { code: "E014", name: "Imran Ansari", branch: "Bhiwandi Plant", dept: "Production", shift: "A", gross: 18000, app: null },
];

/* ------------------------------ time helpers ----------------------------- */

const pad = (n) => String(n).padStart(2, "0");
export const hhmm = (min) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
};
export const dur = (min) => (min > 0 ? `${Math.floor(min / 60)}:${pad(min % 60)}` : "—");
const t = (s) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};

function rand(a, b, c) {
  let x = Math.imul(a + 1, 73856093) ^ Math.imul(b + 1, 19349663) ^ Math.imul(c + 1, 83492791);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

/* ------------------------------ today's punches -------------------------- */

// Punches for Wed 25 Nov up to 17:42. Night shift starts the evening before
// (negative minutes = previous day).
const TODAY_PUNCHES = {
  E001: [["05:56", "IN"], ["14:07", "OUT"]],
  E002: [["09:04", "IN"], ["13:12", "OUT"], ["13:48", "IN"]],
  E003: [["06:21", "IN"], ["14:10", "OUT"]],
  E004: [["09:47", "IN"]],
  E005: [["13:52", "IN"]],
  E006: [],
  E007: [],
  E008: [["08:55", "IN"], ["13:05", "OUT"], ["13:41", "IN"]],
  E009: [["14:12", "IN"]],
  E010: [["09:01", "IN"], ["13:30", "OUT"], ["14:05", "IN"]],
  E011: [["06:02", "IN"], ["11:15", "OUT"]],
  E012: [["-02:06", "IN"], ["06:03", "OUT"]],
  E013: [["09:10", "IN"]],
  E014: [["05:58", "IN"], ["15:32", "OUT"]],
};
const TODAY_STATUS = {
  E003: "Late", E004: "Late", E009: "Late",
  E006: "Absent", E007: "On leave", E011: "Half day",
};

const parsePunch = ([s, dir]) => ({ min: s.startsWith("-") ? -t(s.slice(1)) : t(s), dir });

/* --------------------------- one day for one person ---------------------- */

// Returns { s: P|A|L|HD|WO|H, punches:[{min,dir}], late, ot (hours), worked (min) }
export function dayRecord(empIndex, d) {
  const emp = EMPLOYEES[empIndex];
  const sh = SHIFTS[emp.shift];
  if (d > TODAY) return null;
  if (d === TODAY) return todayRecord(empIndex);
  if (isSunday(d)) return { s: "WO", punches: [] };
  if (HOLIDAYS[d]) return { s: "H", punches: [], note: HOLIDAYS[d] };
  if (emp.code === "E007" && (d === 23 || d === 24)) return { s: "L", punches: [], note: "Casual leave" };

  const r = rand(empIndex, d, 1);
  if (r < 0.035) return { s: "A", punches: [] };
  if (r < 0.07) return { s: "L", punches: [], note: r < 0.055 ? "Casual leave" : "Sick leave" };

  const late = rand(empIndex, d, 3) < 0.1;
  const inMin = sh.start + (late ? sh.grace + 4 + Math.floor(rand(empIndex, d, 2) * 35) : Math.floor(rand(empIndex, d, 2) * 18) - 12);
  const end = sh.end < sh.start ? sh.end + 1440 : sh.end;
  let outMin;
  let s = "P";
  if (r < 0.1) {
    s = "HD";
    outMin = inMin + 255 + Math.floor(rand(empIndex, d, 4) * 30);
  } else {
    outMin = end + Math.floor(rand(empIndex, d, 4) * 22) - 2;
    if (sh.ot && rand(empIndex, d, 5) < 0.16) outMin += 60 + Math.floor(rand(empIndex, d, 6) * 100);
  }
  const extra = outMin - end;
  const ot = s === "P" && sh.ot && extra >= 30 ? Math.floor(extra / 30) * 0.5 : 0;
  const punches = [{ min: inMin, dir: "IN" }];
  if (emp.shift === "GEN" && s === "P") {
    const lunch = 780 + Math.floor(rand(empIndex, d, 7) * 25);
    punches.push({ min: lunch, dir: "OUT" }, { min: lunch + 30 + Math.floor(rand(empIndex, d, 8) * 15), dir: "IN" });
  }
  punches.push({ min: outMin, dir: "OUT" });
  return { s, punches, late, ot, worked: workedMin(punches) };
}

function workedMin(punches, openUntil) {
  let total = 0;
  for (let i = 0; i < punches.length; i += 2) {
    const a = punches[i].min;
    const b = punches[i + 1] ? punches[i + 1].min : openUntil;
    if (b != null) total += b - a;
  }
  return total;
}

function todayRecord(empIndex) {
  const emp = EMPLOYEES[empIndex];
  const punches = TODAY_PUNCHES[emp.code].map(parsePunch);
  const status = TODAY_STATUS[emp.code] ?? (punches.length ? "Present" : "Absent");
  const s = { Present: "P", Late: "P", "Half day": "HD", Absent: "A", "On leave": "L" }[status];
  const sh = SHIFTS[emp.shift];
  const last = punches[punches.length - 1];
  const extra = last && last.dir === "OUT" && sh.end > sh.start ? last.min - sh.end : 0;
  const ot = sh.ot && extra >= 30 ? Math.floor(extra / 30) * 0.5 : 0;
  return {
    s,
    status,
    punches,
    late: status === "Late",
    ot,
    worked: workedMin(punches, NOW),
    note: status === "On leave" ? "Casual leave" : undefined,
  };
}

/* ----------------------------- month summaries --------------------------- */

export const MONTH = EMPLOYEES.map((_, i) =>
  [...Array(MONTH_DAYS)].map((__, d) => dayRecord(i, d + 1))
);

export function summary(empIndex) {
  const days = MONTH[empIndex].filter(Boolean);
  const c = (s) => days.filter((r) => r.s === s).length;
  const P = c("P"), A = c("A"), L = c("L"), HD = c("HD"), WO = c("WO"), H = c("H");
  return {
    P, A, L, HD, WO, H,
    late: days.filter((r) => r.late).length,
    ot: days.reduce((sum, r) => sum + (r.ot || 0), 0),
    payDays: P + L + WO + H + HD * 0.5,
  };
}

export const SUMMARIES = EMPLOYEES.map((_, i) => summary(i));

export const TOTAL_OT = SUMMARIES.reduce((s, x) => s + x.ot, 0);

// Rough salary estimate for the month: pay days so far, plus the rest of
// the month assumed present, divided by 30.
export const EST_SALARY = Math.round(
  EMPLOYEES.reduce((sum, e, i) => sum + (e.gross * Math.min(30, SUMMARIES[i].payDays + (MONTH_DAYS - TODAY))) / 30, 0)
);

export const STATUS_OF = { P: "Present", A: "Absent", L: "Leave", HD: "Half day", WO: "Week off", H: "Holiday" };

export const rupees = (n) => `₹${n.toLocaleString("en-IN")}`;

export const DAY_LABEL = (d) => {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${names[(d - 1) % 7]} ${d} Nov ${YEAR}`;
};
