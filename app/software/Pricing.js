"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { PRODUCT, PLANS, YEARLY_DISCOUNT, COMPARE_ROWS } from "./plans";

const rupees = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

// The contact page reads ?plan= and ?billing= and writes them into the message.
const contactHref = (plan, yearly) =>
  `/contact?plan=${encodeURIComponent(plan)}&billing=${yearly ? "yearly" : "monthly"}`;

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      {/* Monthly / Yearly switch */}
      <div className="flex justify-center mb-10">
        <div role="group" aria-label="Billing period" className="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
          {[
            [false, "Monthly"],
            [true, `Yearly · save ${Math.round(YEARLY_DISCOUNT * 100)}%`],
          ].map(([value, label]) => (
            <button
              key={label}
              type="button"
              aria-pressed={yearly === value}
              onClick={() => setYearly(value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                yearly === value ? "bg-gray-900 text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const perMonth = yearly ? plan.monthly * (1 - YEARLY_DISCOUNT) : plan.monthly;
          const perYear = plan.monthly * 12 * (1 - YEARLY_DISCOUNT);
          const saved = plan.monthly * 12 - perYear;
          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.highlight
                  ? "bg-gray-900 text-white shadow-2xl lg:-my-4 lg:py-11 ring-4 ring-blue-600"
                  : "bg-white text-gray-900 border border-gray-200 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-bold shadow">
                  Recommended · best value
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className={`mt-1 ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>{plan.forWho}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold tracking-tight">{rupees(perMonth)}</span>
                <span className={`pb-2 ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>/ month</span>
              </div>
              <p className={`mt-1 text-sm min-h-10 ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>
                {yearly
                  ? <>Billed {rupees(perYear)} a year + GST. <strong className={plan.highlight ? "text-green-400" : "text-green-700"}>You save {rupees(saved)}.</strong></>
                  : <>Billed monthly + GST. Pay yearly and save {rupees(saved)}.</>}
              </p>
              <p className={`mt-4 text-sm font-semibold ${plan.highlight ? "text-blue-300" : "text-blue-700"}`}>{plan.users}</p>

              <ul className="mt-5 space-y-3 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-green-400" : "text-green-600"}`} />
                    <span>{f}</span>
                  </li>
                ))}
                {(plan.missing || []).map((f) => (
                  <li key={f} className="flex items-start gap-3 text-gray-400">
                    <X className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="line-through decoration-gray-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={contactHref(plan.name, yearly)}
                className={`mt-8 text-center font-semibold rounded-lg py-3.5 transition-colors ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
                }`}
              >
                {plan.highlight ? `Start with ${plan.name}` : `Choose ${plan.name}`}
              </Link>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-600 mt-10">
        All plans start with a free {PRODUCT.trialDays}-day trial. Prices are per company, plus 18% GST.
      </p>

      {/* Side-by-side comparison */}
      <div className="mt-14 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[560px] text-left">
          <caption className="sr-only">Compare the plans</caption>
          <thead>
            <tr className="border-b border-gray-200">
              <th scope="col" className="px-5 py-4 text-gray-900 font-bold">Compare plans</th>
              {PLANS.map((p) => (
                <th key={p.name} scope="col" className={`px-5 py-4 text-center font-bold ${p.highlight ? "bg-blue-50 text-blue-900" : "text-gray-900"}`}>
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(([label, ...values]) => (
              <tr key={label} className="border-b border-gray-100 last:border-0">
                <th scope="row" className="px-5 py-3 font-medium text-gray-800">{label}</th>
                {values.map((v, i) => (
                  <td key={i} className={`px-5 py-3 text-center ${PLANS[i].highlight ? "bg-blue-50/60" : ""}`}>
                    {v === true ? <Check aria-label="Included" className="w-5 h-5 text-green-600 inline" />
                      : v === false ? <X aria-label="Not included" className="w-5 h-5 text-gray-300 inline" />
                      : <span className="text-gray-900 font-semibold">{v}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
