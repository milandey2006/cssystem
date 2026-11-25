// Hand-made "screens" for Attenza (no real screenshots, no real customer data —
// all names and numbers here are made-up examples). Swap in demo screenshots
// later if wanted.
import { ScanFace, Fingerprint, Wifi, Clock, UserCheck, Camera, DoorOpen, Phone, MessageCircle } from "lucide-react";

const Frame = ({ title, children, className = "" }) => (
  <div className={`rounded-2xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/5 overflow-hidden ${className}`}>
    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      <span className="ml-3 text-xs font-medium text-gray-500 truncate">{title}</span>
    </div>
    {children}
  </div>
);

// Live punches arriving from the machine.
export function LivePunchMock({ className = "" }) {
  const punches = [
    ["Ramesh Kumar", "09:01", "Main Gate", "face", "in"],
    ["Sunita Devi", "09:03", "Shop Floor", "finger", "in"],
    ["Imran Shaikh", "09:04", "Main Gate", "face", "in"],
    ["Anil Gupta", "13:32", "Main Gate", "face", "out"],
  ];
  return (
    <Frame title="Live attendance" className={className}>
      <div className="p-4 text-[13px]">
        <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-green-800 font-semibold">
            <Wifi className="w-4 h-4" /> Device online · Shop Floor
          </span>
          <span className="text-green-700 text-xs font-bold">LIVE</span>
        </div>
        <ul className="divide-y divide-gray-100">
          {punches.map(([name, time, gate, verify, dir]) => (
            <li key={name + time} className="flex items-center gap-3 py-2.5">
              <span className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                {name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold truncate">{name}</span>
                <span className="block text-gray-500 text-xs inline-flex items-center gap-1">
                  {verify === "face" ? <ScanFace className="w-3 h-3" /> : <Fingerprint className="w-3 h-3" />}
                  {gate}
                </span>
              </span>
              <span className="text-right">
                <span className="block font-bold tabular-nums">{time}</span>
                <span className={`text-[11px] font-semibold ${dir === "in" ? "text-green-700" : "text-gray-500"}`}>
                  {dir === "in" ? "IN" : "OUT"}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-xs text-gray-600">
          <Clock className="w-4 h-4 text-blue-700" /> Machine clock corrected automatically
        </div>
      </div>
    </Frame>
  );
}

// Society visitor approval.
export function VisitorMock({ className = "" }) {
  return (
    <Frame title="Visitor approval" className={className}>
      <div className="p-4 text-[13px]">
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
            <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="font-bold">Courier delivery</p>
              <p className="text-gray-500 text-xs">At Main Gate · wants to meet Flat B-704</p>
            </div>
          </div>
          <div className="p-3">
            <p className="text-xs font-bold text-gray-500 mb-2">Flat B-704 is asked to approve</p>
            <div className="flex gap-2">
              <span className="flex-1 text-center rounded-lg bg-green-600 text-white font-semibold py-2">Approve</span>
              <span className="flex-1 text-center rounded-lg border border-gray-300 text-gray-700 font-semibold py-2">Deny</span>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <p className="flex items-center gap-2 text-xs text-gray-700">
            <UserCheck className="w-4 h-4 text-green-600" /> On approval, face is put on the gate for one entry
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-700">
            <DoorOpen className="w-4 h-4 text-blue-700" /> After they walk in once, it is removed automatically
          </p>
        </div>
      </div>
    </Frame>
  );
}

// Payslip from attendance.
export function PayslipMock({ className = "" }) {
  const rows = [
    ["Basic", "15,000"],
    ["HRA", "6,000"],
    ["Overtime (12 hrs)", "1,380"],
  ];
  const ded = [
    ["PF (12%)", "1,800"],
    ["ESI (0.75%)", "161"],
    ["Prof. Tax", "200"],
  ];
  return (
    <Frame title="Payslip · October" className={className}>
      <div className="p-5 text-[13px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold text-blue-900 text-base">Ramesh Kumar</p>
            <p className="text-gray-500">Shop Floor · Present 26 / 26</p>
          </div>
          <p className="font-extrabold text-blue-900 tracking-wide">PAYSLIP</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] font-bold text-gray-500 mb-1">Earnings</p>
            {rows.map(([k, v]) => (
              <p key={k} className="flex justify-between border-b border-gray-100 py-1"><span>{k}</span><span>₹{v}</span></p>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 mb-1">Deductions</p>
            {ded.map(([k, v]) => (
              <p key={k} className="flex justify-between border-b border-gray-100 py-1"><span>{k}</span><span>₹{v}</span></p>
            ))}
          </div>
        </div>
        <p className="mt-3 flex justify-between rounded-md bg-blue-900 text-white font-bold px-3 py-2">
          <span>Net pay</span><span>₹20,219</span>
        </p>
        <p className="mt-2 text-[11px] text-gray-500">PF ECR &amp; ESI files generated for the month · figures are examples</p>
      </div>
    </Frame>
  );
}

// Gym: the daily "who to call" retention list.
export function RetentionMock({ className = "" }) {
  const groups = [
    ["About to expire", "bg-amber-50 text-amber-800", [["Karan Malhotra", "Plan ends in 3 days"], ["Sana Khan", "Plan ends in 5 days"]]],
    ["Stopped coming", "bg-red-50 text-red-700", [["Rohan Kulkarni", "Last visit 12 days ago"], ["Nisha Bhatt", "Last visit 9 days ago"]]],
    ["New this week", "bg-green-50 text-green-700", [["Aditya Rane", "Joined Monday · 3 visits"]]],
  ];
  return (
    <Frame title="Who to call today" className={className}>
      <div className="p-4 text-[13px] space-y-3">
        {groups.map(([label, badge, people]) => (
          <div key={label}>
            <p className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${badge}`}>{label} · {people.length}</p>
            <ul className="mt-1.5 divide-y divide-gray-100">
              {people.map(([name, note]) => (
                <li key={name} className="flex items-center gap-3 py-2">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold truncate">{name}</span>
                    <span className="block text-xs text-gray-500">{note}</span>
                  </span>
                  <span className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700"><Phone className="w-4 h-4" /></span>
                  <span className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white"><MessageCircle className="w-4 h-4" /></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Gym: face check-ins at the front desk.
export function GymCheckinMock({ className = "" }) {
  const rows = [
    ["Priyanka Shetty", "06:12", "Annual · 214 days left", true],
    ["Vivek Nair", "06:20", "Quarterly · 41 days left", true],
    ["Karan Malhotra", "06:34", "Monthly · 3 days left", false],
    ["Megha Joshi", "06:41", "Annual · 302 days left", true],
  ];
  return (
    <Frame title="Check-ins · today" className={className}>
      <div className="p-4 text-[13px]">
        <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-green-800 font-semibold">
            <ScanFace className="w-4 h-4" /> Face machine online · Front desk
          </span>
          <span className="text-green-700 text-xs font-bold">LIVE</span>
        </div>
        <ul className="divide-y divide-gray-100">
          {rows.map(([name, time, plan, ok]) => (
            <li key={name} className="flex items-center gap-3 py-2.5">
              <span className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0 text-xs">
                {name.split(" ").map((w) => w[0]).join("")}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold truncate">{name}</span>
                <span className={`block text-xs ${ok ? "text-gray-500" : "text-amber-700 font-semibold"}`}>{plan}</span>
              </span>
              <span className="font-bold tabular-nums">{time}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-gray-500">Sample data · names are made up</p>
      </div>
    </Frame>
  );
}
