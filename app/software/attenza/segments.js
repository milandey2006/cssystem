// Content for the three Attenza landing pages. Every feature here comes from
// the product brief — nothing invented. Each page targets its own search
// intent so they don't compete with each other or with the main page.

export const SEGMENT_PAGES = [
  {
    slug: "attendance-payroll-software",
    nav: "Attendance & payroll",
    icon: "factory",
    metaTitle: "Biometric Attendance & Payroll Software for India | Attenza",
    metaDescription:
      "Attendance & payroll software for eSSL, ZKTeco, Mivanta, Morx & Matrix machines: shifts, overtime, leave, payslips, PF ECR & ESI files, multi-branch.",
    keywords: [
      "biometric attendance software",
      "attendance and payroll software",
      "payroll software India",
      "eSSL cloud attendance software",
      "Mivanta attendance software",
      "Morx attendance software",
      "Matrix Comsec attendance software",
      "attendance software for factory",
      "multi-branch attendance software",
      "PF ECR generator",
      "salary software with biometric attendance",
    ],
    eyebrow: "For factories, offices & shops",
    h1: "Biometric attendance & payroll software",
    h1Accent: "that works straight from your eSSL machine",
    intro:
      "Attenza takes punches straight from your eSSL, ZKTeco, Mivanta, Morx or Matrix Comsec machine, works out attendance with your shifts and company rules, and turns it into salary, payslips and PF / ESI files — for one branch or many. No PC, no eTimeTrackLite, no static IP.",
    ticks: ["Shifts, OT & leave rules", "PF / ESI / PT payroll", "Multi-branch"],
    screen: "company",
    problemsTitle: "Still running attendance like this?",
    problems: [
      "Attendance stuck on eTimeTrackLite on one office PC",
      "Punches lost whenever that PC is switched off",
      "Salary worked out by hand in Excel every month",
      "Every branch keeps its own register and sends it in late",
    ],
    featuresTitle: "Everything from punch to payslip",
    features: [
      {
        title: "Attendance & shifts",
        items: [
          "Fixed, rotational and night shifts that cross midnight",
          "Shift auto-detected from the first punch",
          "Automatic IN / OUT pairing — staff don't press IN or OUT keys",
          "Grace minutes, half day for late coming or early going",
          "Monthly late-mark penalties, sandwich rule, week-off eligibility",
          "Missing-OUT handling",
        ],
      },
      {
        title: "Leave, holidays & overtime",
        items: [
          "Leave and holidays — company-wide or per branch",
          "Miss-punch requests from the staff app with HR approval",
          "Overtime rounding, daily and monthly caps",
          "Manager approval for overtime",
          "Separate holiday overtime rate",
        ],
      },
      {
        title: "Payroll for India",
        items: [
          "Salary per day on calendar, fixed 26 or fixed 30 days",
          "Mid-month joining and leaving, salary revisions from a date",
          "Basic, DA, HRA, allowances, incentives, bonus and arrears",
          "Loan EMI, TDS and other deductions",
          "PF (EPF / EPS / EDLI split, wage ceiling), ESI and Professional Tax with editable state slabs",
          "Lock (finalise) a month, or see a to-date payroll mid-month",
        ],
      },
      {
        title: "Files & payslips",
        items: [
          "Payslips on screen and PDF, with day-by-day attendance",
          "PF ECR upload file",
          "ESI upload file",
          "Bank transfer file",
          "Form B wage register and salary register",
        ],
      },
      {
        title: "eSSL-style reports",
        items: [
          "Daily: in / out / work duration, all punches, late coming, early going, missed punch, absent",
          "Monthly: work-duration grid, muster roll, OT day-wise, in-out register, absenteeism, leave register",
          "Payroll: salary register, reconciliation vs last month, department cost, PF / ESI statements, PT summary",
          "Every report as screen, Excel, CSV and PDF — by department, branch or machine",
        ],
      },
      {
        title: "Multi-branch & staff app",
        items: [
          "One company, many branches and machines, one panel",
          "Head office sees every branch; branch logins see only theirs",
          "\"Branches today\": present / late / absent per branch and which machines are online",
          "Staff app: attendance calendar, payslips, leave and miss-punch requests — login with mobile number",
        ],
      },
    ],
    faq: [
      {
        q: "Can Attenza calculate salary from biometric attendance automatically?",
        a: "Yes. Punches from the machine become attendance using your shifts and rules, and the payroll uses that attendance — pay days on calendar, 26 or 30 days, mid-month joining and leaving, overtime, deductions and statutory contributions.",
      },
      {
        q: "Does it generate PF ECR and ESI upload files?",
        a: "Yes. It makes the PF ECR upload file, the ESI upload file, a bank transfer file and the Form B wage register from the same payroll. Rates are configurable — we recommend you confirm them with your CA before filing.",
      },
      {
        q: "Can I manage attendance for multiple branches?",
        a: "Yes. One company can have many branches and machines. Head office sees everything; branch logins only see their own branch. The dashboard shows present, late and absent per branch and which machines are online.",
      },
      {
        q: "Does it handle night shifts that cross midnight?",
        a: "Yes. Night shifts across midnight, rotational shifts and auto-detecting the shift from the first punch are all supported, so a 22:00 – 06:00 shift is counted as one working day.",
      },
      {
        q: "Can employees see their own attendance and payslips?",
        a: "Yes. The staff app shows their attendance calendar and payslips and lets them apply for leave or raise a miss-punch request. They log in with their mobile number.",
      },
      {
        q: "Which biometric machine brands does it work with?",
        a: "eSSL, ZKTeco, Mivanta, Morx and Matrix Comsec face and fingerprint machines that support cloud push (ADMS / Cloud Server) mode. Tell us your model and we'll confirm.",
      },
      {
        q: "Do I still need eTimeTrackLite or a PC?",
        a: "No. eSSL, ZKTeco, Mivanta, Morx and Matrix Comsec machines with cloud push (ADMS) mode connect to the cloud by themselves. No PC, no static IP, no port forwarding and no VPN.",
      },
    ],
    guides: [
      "calculate-salary-from-attendance-india",
      "pf-ecr-file-generate-from-attendance",
      "overtime-calculation-biometric-attendance-india",
      "late-coming-rules-grace-time-half-day",
      "sandwich-leave-rule-explained",
      "multi-branch-attendance-management",
    ],
    finalTitle: "Run attendance and payroll from the machine you already have",
  },
  {
    slug: "society-visitor-management",
    nav: "Society visitor management",
    icon: "building",
    metaTitle: "Visitor Management System for Housing Societies | Attenza",
    metaDescription:
      "Visitor management system for housing societies: a face-recognition gate log, visitors approved by the flat on the resident app, one-entry face access.",
    keywords: [
      "visitor management system for society",
      "society gate management app",
      "society visitor management app",
      "face recognition gate for society",
      "housing society security app",
      "digital gate register",
    ],
    eyebrow: "For housing societies",
    h1: "Visitor management for housing societies",
    h1Accent: "with a face-recognition gate",
    intro:
      "Replace the paper gate register with a live gate log from your eSSL, ZKTeco, Mivanta, Morx or Matrix Comsec face machine. Visitors are approved by the flat before they walk in — and their face works for one entry only.",
    ticks: ["Live gate log", "Flat approves visitors", "Resident app"],
    screen: "society",
    problemsTitle: "The gate today",
    problems: [
      "Gate register on paper — nobody can search it",
      "No record of who actually came in or went out",
      "Visitors let in without the flat knowing",
    ],
    flowTitle: "How a visitor gets in",
    flow: [
      ["Guard registers the visitor", "At the gate, with a photo."],
      ["The flat approves", "The flat gets an approval request — by link or on the resident app."],
      ["Face goes on the gate", "On approval, the visitor's face is put on the gate machine for a limited time."],
      ["One entry, then removed", "The visitor walks in with their face once, then is removed automatically. If they don't come, access expires."],
    ],
    featuresTitle: "Everything the committee and the gate need",
    features: [
      {
        title: "Live gate log",
        items: [
          "Who came in or went out, when, and through which gate",
          "Filters by date, person, flat, type and IN / OUT",
          "Counts per person",
          "Download as PDF or Excel",
        ],
      },
      {
        title: "Residents, staff & guards",
        items: [
          "People enrolled on the machine appear automatically",
          "The committee adds the flat and type — resident, staff or guard",
          "Face templates stay on the machine; only gate ID, name and punch times are kept",
        ],
      },
      {
        title: "Resident app",
        items: [
          "Works on any phone and can be installed",
          "Approve visitors",
          "See your own gate history",
          "Notifications",
        ],
      },
      {
        title: "Society reports",
        items: ["Monthly reports per person", "Flat-wise reports", "PDF and Excel"],
      },
    ],
    faq: [
      {
        q: "How does visitor approval work?",
        a: "The guard registers the visitor at the gate with a photo. The flat gets an approval request by link or on the resident app. Once approved, the visitor's face is added to the gate machine for one entry and removed automatically afterwards.",
      },
      {
        q: "What happens if the visitor doesn't come?",
        a: "Their access expires on its own, so no stale faces stay on the gate machine.",
      },
      {
        q: "Do residents need to install an app?",
        a: "The resident app works on any phone and can be installed, but approval requests can also come as a link.",
      },
      {
        q: "Are residents' faces stored on your server?",
        a: "No. Face templates stay on the gate machine. The server only keeps the gate ID, name, punch time and how the person verified.",
      },
      {
        q: "Which machine do we need at the gate?",
        a: "A face-recognition machine from eSSL, ZKTeco, Mivanta, Morx or Matrix Comsec that supports cloud push (ADMS / Cloud Server) mode. We can help you check your model — and supply and install one if you need it.",
      },
      {
        q: "Can the committee download the gate register?",
        a: "Yes. The gate log and monthly reports can be filtered and downloaded as PDF or Excel.",
      },
    ],
    guides: [
      "society-visitor-management-face-recognition-gate",
      "face-vs-fingerprint-attendance-machine",
      "essl-machine-not-connecting-cloud-adms",
      "connect-essl-biometric-machine-to-cloud-adms",
      "biometric-machine-wrong-time-fix",
    ],
    finalTitle: "Put a face-recognition gate on your society",
  },
  {
    slug: "gym-management-software",
    nav: "Gym management",
    icon: "gym",
    metaTitle: "Gym Management Software with Face Check-in | Attenza",
    metaDescription:
      "Gym management software for India: face check-ins, plans, renewals and dues, UPI / cash / card payments, a member app and a daily who-to-call list.",
    keywords: [
      "gym management software India",
      "gym attendance software",
      "gym face recognition check in",
      "gym member retention software",
      "gym renewal reminder",
      "gym billing software",
    ],
    eyebrow: "For gyms",
    h1: "Gym management software",
    h1Accent: "with face check-in and a who-to-call list",
    intro:
      "Members check in with their face on an eSSL, ZKTeco, Mivanta, Morx or Matrix Comsec machine. Attenza tracks plans, renewals and dues — and every day shows you who is about to expire, who stopped coming and who is new, with call and WhatsApp buttons.",
    ticks: ["Face check-in", "Renewals & dues", "Retention list"],
    screen: "gym",
    problemsTitle: "Sound familiar?",
    problems: [
      "Members quietly stop coming, then don't renew",
      "No idea who stopped coming until the plan has run out",
      "Renewals and dues tracked in a notebook or WhatsApp",
    ],
    featuresTitle: "Everything a gym front desk needs",
    features: [
      {
        title: "Members & billing",
        items: [
          "Members, plans and renewals",
          "Dues and payments — UPI, cash or card",
          "Receipts for every payment",
        ],
      },
      {
        title: "Check-ins",
        items: [
          "Check-in with the face machine or a kiosk",
          "Every visit logged automatically",
          "Works with eSSL, ZKTeco, Mivanta, Morx and Matrix Comsec face machines in ADMS mode",
        ],
      },
      {
        title: "Retention list",
        items: [
          "Who is about to expire",
          "Who stopped coming",
          "Who is new",
          "Call and WhatsApp buttons next to each name",
        ],
      },
      {
        title: "Member app & trainers",
        items: [
          "Member app with plan, visits and receipts",
          "Trainer PT sessions",
          "Trainer commission in payroll",
        ],
      },
    ],
    faq: [
      {
        q: "Can gym members check in with their face?",
        a: "Yes. Members check in on an eSSL / ZKTeco face machine (or a kiosk) and every visit is logged automatically.",
      },
      {
        q: "What is the retention list?",
        a: "A daily list of members who are about to expire, who have stopped coming and who are new — with call and WhatsApp buttons so the front desk can follow up the same day.",
      },
      {
        q: "Can members see their plan and receipts?",
        a: "Yes. The member app shows their plan, visits and receipts.",
      },
      {
        q: "Which payments can I record?",
        a: "You can record payments by UPI, cash or card against a member's plan, and track dues.",
      },
      {
        q: "Does it handle trainer PT sessions and commission?",
        a: "Yes. Trainer PT sessions are tracked and the commission flows into payroll.",
      },
    ],
    guides: [
      "gym-member-retention-who-to-call",
      "face-vs-fingerprint-attendance-machine",
      "connect-essl-biometric-machine-to-cloud-adms",
      "essl-machine-not-connecting-cloud-adms",
    ],
    finalTitle: "Know who to call before they stop coming",
  },
];

export const getSegment = (slug) => SEGMENT_PAGES.find((s) => s.slug === slug);
