// Name, prices and what each plan includes - change them here only.
// Basic is kept small on purpose (no stock, no staff) so Pro reads as the obvious choice.

export const PRODUCT = {
  name: "SiteDesk",
  trialDays: 14,
};

export const YEARLY_DISCOUNT = 0.12; // 12% off when paid for the whole year

export const PLANS = [
  {
    name: "Basic",
    monthly: 500,
    forWho: "For one person sending quotations",
    users: "1 office login",
    features: [
      "Quotations, estimates and proforma bills",
      "GST tax invoices",
      "Payments received",
      "3 ready quotation formats",
    ],
    missing: [
      "Stock with serial numbers",
      "Barcode scanning",
      "Staff attendance and salary",
      "Jobs for technicians",
    ],
  },
  {
    name: "Pro",
    monthly: 1000,
    highlight: true,
    forWho: "Everything a growing installer needs",
    users: "3 office logins and up to 15 staff",
    features: [
      "Everything in Basic",
      "All 20 quotation formats",
      "Stock with serial numbers",
      "Barcode scanning with the phone camera",
      "Staff punch in / out from their phone",
      "Attendance and salary slips",
      "Jobs for technicians",
      "Expenses and daily work log",
    ],
  },
  {
    name: "Business",
    monthly: 1250,
    forWho: "For bigger teams with branches",
    users: "Unlimited logins and staff",
    features: [
      "Everything in Pro",
      "Many branches on one stock",
      "Live team location",
      "Site visits",
      "Design every part of your quotation",
      "Your own terms and conditions templates",
      "Priority support on WhatsApp",
    ],
  },
];

// [feature, Basic, Pro, Business] - true / false / text
export const COMPARE_ROWS = [
  ["Office logins", "1", "3", "Unlimited"],
  ["Field staff", false, "Up to 15", "Unlimited"],
  ["Quotations, estimates, proforma", true, true, true],
  ["GST tax invoices", true, true, true],
  ["Quotation formats", "3", "20", "20 + full editor"],
  ["Stock with serial numbers", false, true, true],
  ["Barcode scanning", false, true, true],
  ["Attendance and salary slips", false, true, true],
  ["Jobs and expenses", false, true, true],
  ["Branches", false, "1", "Many"],
  ["Live team location", false, false, true],
  ["Priority support", false, false, true],
];

// Who answers questions about the software (shown on /software and on /contact when a
// visitor comes from it; software enquiries from the contact form are e-mailed here too).
export const SALES_CONTACT = {
  name: "Milan Dey",
  phone: "+91 99877 03344",
  email: "deymilan066@gmail.com",
};
export const salesTel = `tel:${SALES_CONTACT.phone.replace(/\s/g, "")}`;
export const salesWhatsApp = (text) =>
  `https://wa.me/${SALES_CONTACT.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
