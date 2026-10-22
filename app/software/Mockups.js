// Small drawings of the software's screens, made of plain boxes (no screenshots to keep
// up to date). The numbers are examples.
import { MapPin, ScanLine, CheckCircle2 } from "lucide-react";

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

export function InvoiceMock({ className = "" }) {
  const lines = [
    ["Office chair, ergonomic", "8", "3,800", "30,400.00"],
    ["Laser printer", "1", "24,500", "24,500.00"],
    ["Annual service contract", "1", "12,000", "12,000.00"],
  ];
  return (
    <Frame title="Invoice SE/26-27/015" className={className}>
      <div className="p-5 text-[13px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold text-blue-900 text-base">Sharma Enterprises</p>
            <p className="text-gray-500">GSTIN 27ABCDE1234F1Z5</p>
          </div>
          <p className="font-extrabold text-blue-900 tracking-wide text-lg">TAX INVOICE</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-md border border-gray-200 p-2">
            <p className="text-[11px] font-bold text-gray-500">Bill to</p>
            <p className="font-semibold">Mehta Traders</p>
          </div>
          <div className="rounded-md border border-gray-200 p-2">
            <p className="text-[11px] font-bold text-gray-500">Place of supply</p>
            <p className="font-semibold">Maharashtra (27)</p>
          </div>
        </div>
        <table className="mt-3 w-full">
          <thead>
            <tr className="bg-blue-900 text-white text-[11px]">
              <th className="text-left font-semibold px-2 py-1.5">Item</th>
              <th className="font-semibold px-2">Qty</th>
              <th className="text-right font-semibold px-2">Rate</th>
              <th className="text-right font-semibold px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map(([item, qty, rate, amt]) => (
              <tr key={item} className="border-b border-gray-100">
                <td className="px-2 py-1.5">{item}</td>
                <td className="px-2 text-center">{qty}</td>
                <td className="px-2 text-right">{rate}</td>
                <td className="px-2 text-right font-semibold">{amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 ml-auto w-52 space-y-1">
          {[["Sub total", "66,900.00"], ["CGST", "6,021.00"], ["SGST", "6,021.00"]].map(([k, v]) => (
            <p key={k} className="flex justify-between text-gray-600"><span>{k}</span><span>₹{v}</span></p>
          ))}
          <p className="flex justify-between rounded-md bg-blue-900 text-white font-bold px-2 py-1.5 mt-1.5"><span>Grand total</span><span>₹78,942.00</span></p>
        </div>
      </div>
    </Frame>
  );
}

export function StockMock({ className = "" }) {
  const rows = [
    ["Office chair, ergonomic", "Furniture", "24", "Nos", null],
    ["Laser printer", "Electronics", "2", "Nos", "Low"],
    ["Copper wire, 2.5 sq mm", "Electrical", "305", "Mtr", null],
    ["A4 paper, 500 sheets", "Stationery", "0", "Box", "None left"],
  ];
  return (
    <Frame title="Stock" className={className}>
      <div className="p-4 text-[13px]">
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-gray-500">
          <ScanLine className="w-4 h-4" /> Scan a barcode or search…
        </div>
        <ul className="mt-3 divide-y divide-gray-100">
          {rows.map(([name, make, qty, unit, badge]) => (
            <li key={name} className="flex items-center gap-3 py-2">
              <span className="flex-1 min-w-0">
                <span className="block font-semibold truncate">{name}</span>
                <span className="block text-gray-500 text-xs">{make}</span>
              </span>
              <span className={`font-bold ${qty === "0" ? "text-red-700" : ""}`}>{qty}</span>
              <span className="text-gray-500 text-xs w-7">{unit}</span>
              {badge && (
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded border ${badge === "Low" ? "bg-amber-50 text-amber-900 border-amber-300" : "bg-red-50 text-red-800 border-red-200"}`}>
                  {badge}
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-lg bg-gray-50 border border-gray-200 p-3">
          <p className="text-xs font-bold text-gray-500 mb-1">Serial LP2410A006</p>
          <p className="text-xs text-gray-700"><strong>Went out</strong> · Invoice SE/26-27/014 · Acme Pharma · Thane branch · by Priya</p>
          <p className="text-xs text-gray-700 mt-0.5"><strong>Came in</strong> · Bought, bill 4471 · Andheri branch · by Milan</p>
        </div>
      </div>
    </Frame>
  );
}

export function TeamMock({ className = "" }) {
  const team = [
    ["Rahul Sharma", "In at 9:52 am", "Client visit, Powai", true],
    ["Priya Nair", "In at 10:05 am", "Office", true],
    ["Imran Qureshi", "In at 10:31 am", "Andheri East", true],
    ["Suresh Patil", "Not in yet", null, false],
  ];
  return (
    <Frame title="Today's team" className={className}>
      <ul className="p-4 text-[13px] divide-y divide-gray-100">
        {team.map(([name, when, where, isIn]) => (
          <li key={name} className="flex items-center gap-3 py-2.5">
            <span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white ${isIn ? "bg-green-600" : "bg-gray-400"}`}>
              {name.split(" ").map((w) => w[0]).join("")}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-semibold">{name}</span>
              <span className={`block text-xs ${isIn ? "text-gray-600" : "text-amber-700 font-semibold"}`}>{when}</span>
            </span>
            {where && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-600"><MapPin className="w-3.5 h-3.5" />{where}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mx-4 mb-4 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-900">
        <CheckCircle2 className="w-4 h-4" /> October salary slips ready from attendance
      </div>
    </Frame>
  );
}
