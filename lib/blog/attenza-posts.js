// Attendance / payroll / biometric guides that support the Attenza product
// pages (/software/attenza/*). Written to answer real search questions; every
// product statement matches the product brief. Legal and statutory points are
// hedged with "confirm with your CA" on purpose.

const ATT = "/software/attenza/attendance-payroll-software";

export const attenzaPosts = [
  /* ------------------------------------------------------------------ */
  {
    slug: "sandwich-leave-rule-explained",
    product: "attenza",
    title: "Sandwich Leave Rule Explained (With Examples)",
    description:
      "Sandwich leave rule explained with examples: how weekends and holidays between leave days are counted, common variations, and how to apply it fairly.",
    excerpt:
      "Leave on Saturday and Monday — is Sunday leave too? Here's how the sandwich rule works, with clear examples.",
    category: "Attendance & Payroll",
    tags: ["sandwich leave rule", "sandwich leave policy", "leave rules India", "week off rules", "attendance rules"],
    coverImage: "/blog/attenza/sandwich-leave-rule-explained.jpg",
    publishedAt: "2026-11-19",
    author: "Milan Dey",
    readTime: "5 min read",
    sources: [
      { title: "Government makes the four Labour Codes effective (21 Nov 2025) — Press Information Bureau", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2192463" },
    ],
    content: [
      {
        type: "paragraph",
        text:
          "The sandwich leave rule is one of the most common — and most argued-about — attendance rules in Indian companies. In one line: if an employee is on leave (or absent) on the working days on both sides of a week off or holiday, the week off or holiday in between is also counted as leave. The non-working day is \"sandwiched\" between leave days, so it is treated the same way.",
      },
      { type: "heading", text: "Why companies use the sandwich rule" },
      {
        type: "paragraph",
        text:
          "Without it, an employee can take Saturday and Monday off and get a four-day break while only using two days of leave. Across a large team, around every long weekend and festival, that adds up. The sandwich rule makes a long break cost what it actually is.",
      },
      { type: "heading", text: "Sandwich rule examples" },
      { type: "subheading", text: "Example 1: Leave on Saturday and Monday" },
      {
        type: "paragraph",
        text:
          "Sunday is the week off. The employee takes leave on Saturday and Monday. Under the sandwich rule, Sunday is also counted as leave — three days of leave, not two.",
      },
      { type: "subheading", text: "Example 2: A mid-week holiday" },
      {
        type: "paragraph",
        text:
          "Wednesday is a festival holiday. The employee takes leave on Tuesday and Thursday. Wednesday is sandwiched, so the employee is charged three days of leave.",
      },
      { type: "subheading", text: "Example 3: Leave on one side only" },
      {
        type: "paragraph",
        text:
          "The employee takes Friday off and comes back on Monday. Saturday and Sunday are not sandwiched, because Monday was a working day. Only Friday counts as leave.",
      },
      { type: "subheading", text: "Example 4: Unpaid absence" },
      {
        type: "paragraph",
        text:
          "The employee is absent without leave on Saturday and Monday. If your policy applies the sandwich rule to absence, Sunday also becomes unpaid — so three days are deducted from salary, not two. This is where most disputes start, so the rule must be written down clearly.",
      },
      { type: "heading", text: "Common variations" },
      {
        type: "paragraph",
        text: "There is no single standard version. Companies usually pick one of these and write it into the leave policy:",
      },
      {
        type: "list",
        items: [
          "Apply it only to unpaid absence, not to approved paid leave",
          "Apply it to week offs but not to national or festival holidays",
          "Apply it only when both sides are full days (not half days)",
          "Apply it only when the leave on either side is longer than a set number of days",
          "Apply it to everyone except certain grades or departments",
        ],
      },
      { type: "heading", text: "Is the sandwich rule legal in India?" },
      {
        type: "paragraph",
        text:
          "No Indian law specifically requires or bans the sandwich rule — it is a company policy. What matters is that it is written into your leave policy, appointment letter or standing orders, communicated to staff in advance, and applied the same way to everyone. Leave and wage rules come from your state's Shops & Establishments law and the labour codes in force since 21 November 2025, and they differ by state and type of establishment — so check your policy with your HR advisor or CA before you deduct salary under it.",
      },
      { type: "heading", text: "Why applying it by hand goes wrong" },
      {
        type: "paragraph",
        text:
          "To apply the sandwich rule manually, someone has to look at every employee's month, spot each week off or holiday, check both sides, and remember which version of the rule applies. It is slow, easy to miss, and when two people get treated differently for the same pattern, it causes arguments at salary time.",
      },
      {
        type: "paragraph",
        text: "In ",
        links: [{ text: "Attenza's attendance and payroll software", href: ATT }],
        suffix:
          ", the sandwich rule is one of the company rules you set once — alongside week-off eligibility, half days for late coming and missing-OUT handling. Attendance comes straight from your eSSL / ZKTeco machine, the rule is applied the same way to everyone, and payroll uses the result.",
      },
    ],
    faq: [
      {
        q: "What is the sandwich leave rule?",
        a: "If an employee is on leave or absent on the working days on both sides of a week off or holiday, the week off or holiday in between is also counted as leave or absence.",
      },
      {
        q: "Does the sandwich rule apply to half days?",
        a: "It depends on your written policy. Many companies apply it only when the days on both sides are full days of leave or absence.",
      },
      {
        q: "Is a public holiday counted under the sandwich rule?",
        a: "Only if your policy says so. Some companies apply the sandwich rule to week offs but not to national or festival holidays. Confirm your policy with your HR advisor or CA.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "essl-machine-not-connecting-cloud-adms",
    product: "attenza",
    title: "eSSL Machine Not Connecting to the Cloud (ADMS)? 9 Things to Check",
    description:
      "eSSL or ZKTeco machine not connecting to the cloud in ADMS mode? Check these 9 things: model support, gateway, DNS, server address, port and HTTPS.",
    excerpt:
      "Most ADMS connection problems come down to one of nine settings. Here's the checklist we use.",
    category: "Biometric & Access Control",
    tags: ["eSSL ADMS not connecting", "eSSL cloud server setting", "ZKTeco ADMS offline", "biometric machine not connecting to server"],
    coverImage: "/blog/attenza/essl-machine-not-connecting-cloud-adms.jpg",
    publishedAt: "2026-11-20",
    author: "Milan Dey",
    readTime: "6 min read",
    sources: [
      { title: "ZKTeco MB10-VL User Manual — Cloud Server Setting (COMM. menu)", url: "https://s3.ap-southeast-1.amazonaws.com/zkteco.co.th/files/20260721/ZK_MB10-VL%C2%A0UM_EN%C2%A0v1.2_20220424_A4.pdf" },
      { title: "ZKTeco SenseFace 3 Series User Manual — communication settings", url: "https://s3.ap-southeast-1.amazonaws.com/zkteco.co.th/files/20240625/ZK_SenseFace%203%20Series_UM_EN%20v1.0_20240325.pdf" },
    ],
    content: [
      {
        type: "paragraph",
        text:
          "In ADMS (Cloud Server / push) mode, an eSSL or ZKTeco machine calls the cloud server by itself over the internet. When it works, it's the simplest setup there is — no PC, no static IP, no port forwarding. When it doesn't connect, the cause is almost always one of the settings below. Go through them in order.",
      },
      { type: "heading", text: "1. Does your model support ADMS?" },
      {
        type: "paragraph",
        text:
          "Look in the machine's communication menu — on ZKTeco-based machines, including most eSSL models, it is under COMM. → Cloud Server Setting (the exact name varies by model and firmware). If there is no cloud server or ADMS option at all, that machine cannot push to the cloud, and no setting will fix it.",
      },
      { type: "heading", text: "2. Is the machine actually on the network?" },
      {
        type: "paragraph",
        text:
          "Check the Ethernet or Wi-Fi settings. The machine needs a valid IP address in your network's range, the right subnet mask and — very important — the correct gateway (usually your router's IP). A wrong gateway means the machine can talk to the local network but never reaches the internet. If it uses a cable, make sure the port light is on.",
      },
      { type: "heading", text: "3. Is DNS set?" },
      {
        type: "paragraph",
        text:
          "If the server address is a domain name, the machine must be able to look it up. A DNS server of 0.0.0.0 or a blank DNS field is one of the most common reasons an ADMS machine never connects. Set DNS to your router's IP or another working DNS server.",
      },
      { type: "heading", text: "4. Is the server address typed exactly right?" },
      {
        type: "paragraph",
        text:
          "Enter the server address exactly as your cloud provider gives it, with no spaces. Most firmware has an \"Enable Domain Name\" switch on the same screen: turn it on if the address is a domain name (ZKTeco's manuals show it in the form http://yourdomain), and off if it is a plain IP address. One wrong letter is enough to stop everything, and these keypads make typos easy.",
      },
      { type: "heading", text: "5. Port and HTTPS" },
      {
        type: "paragraph",
        text:
          "The port and the HTTPS switch must match what the server expects. For Attenza, use port 80 with HTTPS turned off on the machine.",
      },
      { type: "heading", text: "6. Is a proxy server enabled by mistake?" },
      {
        type: "paragraph",
        text:
          "Some firmware has an \"Enable proxy server\" option next to the cloud settings. Unless your network really uses a proxy, it should be off.",
      },
      { type: "heading", text: "7. Is the network blocking the machine?" },
      {
        type: "paragraph",
        text:
          "Guest Wi-Fi, some office firewalls and some ISP routers block devices or outgoing connections. If everything above is correct, try the machine on a different network connection to rule this out.",
      },
      { type: "heading", text: "8. Restart after saving" },
      {
        type: "paragraph",
        text:
          "Many machines only apply new communication settings after a restart. Save, restart, and give it a minute before checking again.",
      },
      { type: "heading", text: "9. Does the cloud software know this machine?" },
      {
        type: "paragraph",
        text:
          "Cloud systems identify a machine by its serial number. If the machine is online but punches don't appear, check that it has been added to your account and assigned to the right company or branch.",
      },
      { type: "heading", text: "Will I lose punches while it's offline?" },
      {
        type: "paragraph",
        text:
          "No. The machine keeps punches in its own memory and sends them once the connection is back. Fix the connection and the backlog arrives on its own.",
      },
      {
        type: "paragraph",
        text: "Setting up from scratch? Read our step-by-step guide on ",
        links: [{ text: "how to connect an eSSL biometric machine to the cloud", href: "/blog/connect-essl-biometric-machine-to-cloud-adms" }],
        suffix: ".",
      },
      {
        type: "paragraph",
        text: "If you're moving to ",
        links: [{ text: "Attenza", href: "/software/attenza" }],
        suffix:
          ", our team will help you check your model and settings. The Devices screen shows each machine as online or offline, the users on it, the raw punch log and a clock check — so you can see at a glance when something is wrong.",
      },
    ],
    faq: [
      {
        q: "Where is the Cloud Server setting on an eSSL machine?",
        a: "On ZKTeco-based machines, including most eSSL models, it is under Menu → COMM. → Cloud Server Setting. The exact name varies by model and firmware. If there is no such option, the model may not support ADMS.",
      },
      {
        q: "Do I need a static IP for ADMS?",
        a: "No. In ADMS mode the machine calls the cloud server itself, so you don't need a static IP, port forwarding or a VPN — just a working internet connection.",
      },
      {
        q: "Will I lose punches while the machine is offline?",
        a: "No. The machine stores punches in its memory and sends them to the cloud once it reconnects.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "late-coming-rules-grace-time-half-day",
    product: "attenza",
    title: "Late Coming Rules: Grace Time, Late Marks and Half Days Explained",
    description:
      "Late coming rules explained: grace time, late marks, when lateness becomes a half day, and early going — with a worked example and fairness checklist.",
    excerpt:
      "Grace time, late marks and half days — how to write a late coming policy that's fair and easy to apply.",
    category: "Attendance & Payroll",
    tags: ["late coming policy", "late mark rules", "grace time attendance", "half day rules", "late coming deduction"],
    coverImage: "/blog/attenza/late-coming-rules-grace-time-half-day.jpg",
    publishedAt: "2026-11-21",
    author: "Milan Dey",
    readTime: "5 min read",
    sources: [
      { title: "The Payment of Wages Act, 1936 (Section 9: deductions for absence) — Ministry of Labour & Employment", url: "https://samadhan.labour.gov.in/whatsnew/ThePaymentofWagesAct1936_0.pdf" },
      { title: "Government makes the four Labour Codes effective (21 Nov 2025) — Press Information Bureau", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2192463" },
    ],
    content: [
      {
        type: "paragraph",
        text:
          "Every company has a late coming policy — but in many, it lives in someone's head. That's when it turns into arguments: one person gets a half day cut for coming in at 9:40, another doesn't. A clear policy has four parts: grace time, late marks, a half-day cutoff and early going.",
      },
      { type: "heading", text: "1. Grace time" },
      {
        type: "paragraph",
        text:
          "Grace time is the window after shift start in which a punch still counts as on time. Many companies use somewhere between 5 and 15 minutes. With a 9:00 shift and 10 minutes of grace, a punch at 9:09 is on time and 9:11 is late.",
      },
      { type: "heading", text: "2. Late marks" },
      {
        type: "paragraph",
        text:
          "A punch after the grace time earns a late mark. On its own, one late mark usually costs nothing — the point is to count them. A common rule is that a certain number of late marks in a month (often three) adds up to a half day deducted, and more add further deductions.",
      },
      { type: "heading", text: "3. When lateness becomes a half day" },
      {
        type: "paragraph",
        text:
          "Separately, very late arrival is often treated as a half day straight away — for example, coming in more than two hours after shift start. The same logic usually applies to leaving early: going home well before shift end counts as a half day.",
      },
      { type: "heading", text: "A worked example" },
      {
        type: "paragraph",
        text: "Shift 9:00 – 18:00, grace 10 minutes, 3 late marks = half day, arrival after 11:00 = half day. In one month an employee punches in:",
      },
      {
        type: "list",
        items: [
          "9:08 on three days — on time (within grace)",
          "9:20, 9:35 and 9:18 on three days — three late marks, which together make one half day",
          "11:25 on one day — a half day by itself",
          "Everything else on time",
        ],
      },
      {
        type: "paragraph",
        text: "Result: two half days for the month — one from late marks, one from very late arrival.",
      },
      { type: "heading", text: "Keep it fair" },
      {
        type: "list",
        items: [
          "Write the policy down and share it before you apply it",
          "Apply it the same way to everyone in the same role",
          "Make sure the machine's clock is right — a clock that's 15 minutes fast makes everyone late",
          "Give people a way to raise a miss-punch or correction request",
          "Deduct only as the law allows: a deduction for absence must be in proportion to the time absent (Payment of Wages Act, 1936, Section 9 — now consolidated into the Code on Wages, 2019). Confirm with your HR advisor or CA",
        ],
      },
      {
        type: "paragraph",
        text: "The clock point matters more than people think — read ",
        links: [{ text: "why biometric machines show the wrong time", href: "/blog/biometric-machine-wrong-time-fix" }],
        suffix: ".",
      },
      { type: "heading", text: "Let the software apply it" },
      {
        type: "paragraph",
        text: "In ",
        links: [{ text: "Attenza", href: ATT }],
        suffix:
          ", grace minutes are set per shift and the company rules include half day for late coming or early going and monthly late-mark penalties. Punches come straight from your eSSL / ZKTeco machine, the machine clock is corrected automatically, and late coming and early going reports are ready every day.",
      },
    ],
    faq: [
      {
        q: "What is a reasonable grace time for attendance?",
        a: "Many companies use between 5 and 15 minutes after shift start. Pick one, write it into the policy and apply it consistently.",
      },
      {
        q: "How many late marks make a half day?",
        a: "It depends on your policy. A common rule is three late marks in a month equal one half day.",
      },
      {
        q: "Can late coming be deducted from salary?",
        a: "Only according to a written policy and wage law. Deductions for absence must be in proportion to the time absent (Payment of Wages Act, Section 9, now part of the Code on Wages, 2019). Confirm with your HR advisor or CA before deducting.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "night-shift-attendance-across-midnight",
    product: "attenza",
    title: "Night Shift Attendance: How to Count Punches That Cross Midnight",
    description:
      "Night shift attendance: why 22:00–06:00 shifts break date-based software, and how shift windows and IN/OUT pairing count them as one working day.",
    excerpt:
      "IN on Monday night, OUT on Tuesday morning — and suddenly two broken days. Here's how to count night shifts properly.",
    category: "Attendance & Payroll",
    tags: ["night shift attendance", "overnight shift attendance", "shift crossing midnight", "biometric night shift"],
    coverImage: "/blog/attenza/night-shift-attendance-across-midnight.jpg",
    publishedAt: "2026-11-22",
    author: "Milan Dey",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text:
          "A security guard punches IN at 21:55 on Monday and OUT at 06:05 on Tuesday. That's one normal eight-hour duty. But in a lot of attendance software it shows up as Monday: \"IN only — missing OUT\" and Tuesday: \"OUT only\". The result is a half day or absent on both days, a missed-punch report full of noise, and an unhappy guard at salary time.",
      },
      { type: "heading", text: "Why it happens" },
      {
        type: "paragraph",
        text:
          "Simple software groups punches by calendar date. Anything before midnight belongs to Monday, anything after belongs to Tuesday. That works for day shifts and breaks every shift that crosses midnight.",
      },
      { type: "heading", text: "The right way: shift windows" },
      {
        type: "paragraph",
        text:
          "Instead of the calendar date, punches should be matched to a shift. A night shift is defined as 22:00 to 06:00 (crossing midnight). Any punch near 22:00 starts that shift, the punch near 06:00 ends it, and the whole duty counts for the day the shift started. Hours, overtime and late marks are then worked out against that shift.",
      },
      { type: "heading", text: "Things that make it harder" },
      {
        type: "list",
        items: [
          "Rotating staff — the same person is on day shift one week and night shift the next",
          "Early arrival — a guard who comes at 21:30 should still land on the right shift",
          "Missing OUT — someone forgets to punch out at 6 in the morning",
          "Overtime after 06:00 when the next guard is late",
          "A holiday falling on the night the shift started",
          "A machine clock that has drifted, pushing punches onto the wrong side of midnight",
        ],
      },
      { type: "heading", text: "What good attendance software does" },
      {
        type: "list",
        items: [
          "Lets you define shifts that cross midnight",
          "Auto-detects the shift from the first punch, so rotating staff don't need a roster change every week",
          "Pairs IN and OUT automatically, so staff don't have to press IN or OUT keys",
          "Has a clear rule for missing-OUT punches, plus a way for staff to request a correction",
          "Keeps the machine clock correct",
        ],
      },
      {
        type: "paragraph",
        text: "Night shifts often come with overtime too — see ",
        links: [{ text: "how to calculate overtime from biometric attendance", href: "/blog/overtime-calculation-biometric-attendance-india" }],
        suffix: ".",
      },
      {
        type: "paragraph",
        text: "",
        links: [{ text: "Attenza", href: ATT }],
        suffix:
          " supports fixed, rotational and night shifts across midnight, auto-detects the shift from the first punch, pairs IN/OUT automatically and handles missing OUT punches — with miss-punch requests from the staff app and the machine clock corrected automatically.",
      },
    ],
    faq: [
      {
        q: "Which date does a night shift count on?",
        a: "Usually the date the shift started. A 22:00 Monday to 06:00 Tuesday shift counts as Monday's attendance.",
      },
      {
        q: "What if an employee forgets to punch out after a night shift?",
        a: "Your policy should say how a missing OUT is treated, and staff should be able to raise a miss-punch request for HR to approve.",
      },
      {
        q: "Can the same employee rotate between day and night shifts?",
        a: "Yes. Use rotational shifts or let the software detect the shift from the first punch, so the right shift is picked each day.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "face-vs-fingerprint-attendance-machine",
    product: "attenza",
    title: "Face vs Fingerprint Attendance Machine: Which Should You Buy?",
    description:
      "Face vs fingerprint attendance machine: which to buy for an office, factory, society or gym — worn fingerprints, hygiene, placement and cloud support.",
    excerpt:
      "Fingerprint is cheaper; face is contactless. Which one fits your workplace — and what to check before you buy.",
    category: "Biometric & Access Control",
    tags: ["face attendance machine", "fingerprint attendance machine", "face vs fingerprint", "face recognition attendance India", "eSSL face machine"],
    coverImage: "/blog/attenza/face-vs-fingerprint-attendance-machine.jpg",
    publishedAt: "2026-11-23",
    author: "Milan Dey",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text:
          "Both face and fingerprint machines do the same job — record who came in and when. Which one you should buy depends on who will use it, where it's mounted and what software it has to work with. Here's how we help customers decide.",
      },
      { type: "heading", text: "Fingerprint machines" },
      {
        type: "paragraph",
        text:
          "Fingerprint machines are the classic choice. They are usually cheaper, compact and well understood. They work very well in offices where people have clean, undamaged fingertips.",
      },
      {
        type: "list",
        items: [
          "Usually lower cost",
          "Small and easy to mount",
          "Struggle with worn, cut, dry or dirty fingers — common in factories, construction, kitchens and housekeeping",
          "Everyone touches the same sensor",
        ],
      },
      { type: "heading", text: "Face recognition machines" },
      {
        type: "paragraph",
        text:
          "Face machines identify people from a short look at the camera. Because nothing is touched, they suit places with a lot of people, dirty or gloved hands, or hygiene concerns.",
      },
      {
        type: "list",
        items: [
          "Contactless and quick",
          "Work for staff whose fingerprints don't read well",
          "Usually cost more than basic fingerprint machines",
          "Placement matters: avoid strong sunlight or a bright doorway directly behind the person",
        ],
      },
      { type: "heading", text: "Which one for which place" },
      {
        type: "list",
        items: [
          "Office with a small team: fingerprint is usually enough",
          "Factory, warehouse or site with manual work: face, or a machine that does both",
          "Housing society gate: face — residents, staff and approved visitors walk in without touching anything",
          "Gym: face — quick member check-in with sweaty hands",
        ],
      },
      { type: "heading", text: "Many machines do both" },
      {
        type: "paragraph",
        text:
          "A lot of current eSSL / ZKTeco models support face, fingerprint and card or PIN together. That gives you a fallback for the person whose face or finger doesn't register on a particular day.",
      },
      { type: "heading", text: "Check this before you buy" },
      {
        type: "list",
        items: [
          "Cloud support: if you want attendance on your phone without a PC, the model must support ADMS / Cloud Server mode",
          "Capacity: enough face and fingerprint users for your headcount, with room to grow",
          "Network: Ethernet or Wi-Fi at the mounting point",
          "Mounting: under cover, at a comfortable height, out of direct sunlight",
        ],
      },
      {
        type: "paragraph",
        text: "We supply and install eSSL face and fingerprint machines in Mumbai — ",
        links: [{ text: "talk to us", href: "/contact" }],
        suffix: " and we'll suggest a model that fits your site and headcount.",
      },
      {
        type: "paragraph",
        text: "Either type connects to ",
        links: [{ text: "Attenza", href: "/software/attenza" }],
        suffix:
          " in ADMS mode. Face and fingerprint templates stay on the machine — the server only keeps the user ID, the time and how the person verified.",
      },
    ],
    faq: [
      {
        q: "Is a face or fingerprint attendance machine better for a factory?",
        a: "Usually face, or a machine that supports both. Manual work wears down fingerprints, so fingerprint-only machines often fail to read some workers.",
      },
      {
        q: "Can face and fingerprint machines connect to the cloud?",
        a: "Yes, if the model supports ADMS / Cloud Server mode. Check this before buying if you want attendance without a PC.",
      },
      {
        q: "Are biometric templates sent to the cloud?",
        a: "With Attenza, no. Face and fingerprint templates stay on the machine; only the user ID, time and verification method reach the server.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "overtime-calculation-biometric-attendance-india",
    product: "attenza",
    title: "How to Calculate Overtime From Biometric Attendance (India)",
    description:
      "How to calculate overtime in India from biometric attendance: when OT starts, the hourly rate formula with a worked example, rounding and caps.",
    excerpt:
      "When overtime starts, how to work out the hourly rate, and how rounding and caps keep it fair — with a worked example.",
    category: "Attendance & Payroll",
    tags: ["overtime calculation India", "overtime calculation formula", "OT calculation from attendance", "factory overtime rules", "overtime payment"],
    coverImage: "/blog/attenza/overtime-calculation-biometric-attendance-india.jpg",
    publishedAt: "2026-11-24",
    author: "Milan Dey",
    readTime: "6 min read",
    sources: [
      { title: "The Factories Act, 1948 (Section 59: extra wages for overtime) — Ministry of Labour & Employment", url: "https://www.labour.gov.in/static/uploads/2025/06/b878b8d9f3d9abc62fbe0a6c92f606e3.pdf" },
      { title: "Government makes the four Labour Codes effective (21 Nov 2025) — Press Information Bureau", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2192463" },
    ],
    content: [
      {
        type: "paragraph",
        text:
          "Overtime is where attendance and payroll meet — and where mistakes cost real money in both directions. Get it wrong one way and you overpay; get it wrong the other way and you underpay people who stayed late. Here's a clear way to calculate overtime from biometric punches.",
      },
      { type: "heading", text: "Step 1: Decide when overtime starts" },
      {
        type: "paragraph",
        text:
          "Overtime is time worked beyond the normal working hours. In practice, companies count it from one of these points:",
      },
      {
        type: "list",
        items: [
          "After the shift end time (for example, after 18:00 on a 9:00 – 18:00 shift)",
          "After a set number of hours worked in the day",
          "After a set number of hours in the week",
        ],
      },
      {
        type: "paragraph",
        text:
          "Under Section 59 of the Factories Act, 1948, a worker who works more than nine hours in a day or more than 48 hours in a week is entitled to overtime at twice the ordinary rate of wages. The four labour codes that came into force on 21 November 2025 keep overtime at twice the normal rate, and existing rules continue during the transition. Shops and offices follow state Shops & Establishments rules, which can differ — confirm what applies to you with your CA or labour consultant.",
      },
      { type: "heading", text: "Step 2: Work out the hourly rate" },
      {
        type: "paragraph",
        text:
          "Hourly rate = monthly ordinary wages ÷ days basis ÷ normal hours per day. Under the Factories Act, the \"ordinary rate of wages\" means basic wages plus allowances — but not bonus or overtime pay. Confirm the exact components with your CA.",
      },
      { type: "heading", text: "A worked example" },
      {
        type: "list",
        items: [
          "Ordinary wages: ₹15,000 a month",
          "Days basis: 26 days, 8 hours a day",
          "Hourly rate: 15,000 ÷ 26 ÷ 8 = ₹72.12",
          "Overtime rate at twice the ordinary rate: ₹144.23 an hour",
          "Overtime worked in the month: 12 hours",
          "Overtime pay: 12 × 144.23 = ₹1,730.77",
        ],
      },
      {
        type: "paragraph",
        text: "The days basis (calendar, 26 or 30 days) changes the answer — see ",
        links: [{ text: "how to calculate salary from attendance in India", href: "/blog/calculate-salary-from-attendance-india" }],
        suffix: " for how each option works.",
      },
      { type: "heading", text: "Step 3: Rounding, caps and approval" },
      {
        type: "list",
        items: [
          "Rounding: count overtime in blocks (for example 30 minutes) and ignore a few minutes after shift end",
          "Daily and monthly caps: limit how much overtime can be paid",
          "Approval: only pay overtime a manager has approved",
          "Holiday overtime: a separate rate for work on holidays",
        ],
      },
      { type: "heading", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Counting early arrival as overtime when the policy only pays after shift end",
          "A machine clock that's wrong, inflating or cutting every OT entry",
          "Night shifts split across two dates, so overtime never shows up",
          "Missing OUT punches treated as zero — or as a full day",
          "Working it out in Excel from a printout, with no record of who approved what",
        ],
      },
      {
        type: "paragraph",
        text: "",
        links: [{ text: "Attenza", href: ATT }],
        suffix:
          " calculates overtime from your eSSL / ZKTeco punches with rounding, daily and monthly caps, manager approval and a separate holiday OT rate. The OT day-wise report shows every hour, and the same figures flow into payroll and the payslip.",
      },
    ],
    faq: [
      {
        q: "What is the overtime rate in India?",
        a: "Under the Factories Act (Section 59) — work beyond 9 hours a day or 48 hours a week — and under the labour codes in force since 21 November 2025, overtime is paid at twice the ordinary rate of wages. Rules for shops and offices can differ by state — confirm with your CA or labour consultant.",
      },
      {
        q: "How do I calculate the hourly rate for overtime?",
        a: "Divide monthly ordinary wages by your days basis (for example 26) and by normal hours per day. Multiply by the overtime multiplier and the overtime hours.",
      },
      {
        q: "Should early arrival count as overtime?",
        a: "Only if your policy says so. Many companies count overtime only after the shift end time, or only when a manager approves it.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "multi-branch-attendance-management",
    product: "attenza",
    title: "How to Manage Attendance Across Multiple Branches From One Dashboard",
    description:
      "Manage attendance across multiple branches from one dashboard: why per-branch registers fail and how cloud attendance with branch logins fixes it.",
    excerpt:
      "Every branch with its own PC and Excel sheet? Here's how to see every branch live from one place.",
    category: "Attendance & Payroll",
    tags: ["multi-branch attendance", "multi location attendance system", "branch attendance software", "biometric attendance multiple locations"],
    coverImage: "/blog/attenza/multi-branch-attendance-management.jpg",
    publishedAt: "2026-11-25",
    author: "Milan Dey",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text:
          "With one office, attendance is simple. With three branches, a plant and a warehouse, it usually becomes this: each site has its own biometric machine, its own PC running eTimeTrackLite and its own Excel sheet emailed to head office at month end. Head office sees nothing until it's too late to fix.",
      },
      { type: "heading", text: "Where per-branch attendance breaks down" },
      {
        type: "list",
        items: [
          "Head office can't see who is present today at any branch",
          "Each branch applies late and half-day rules its own way",
          "Data arrives late, in different formats, and has to be retyped",
          "When a branch PC is off or crashes, punches stop syncing",
          "Remote access needs static IPs, port forwarding or VPNs at every site",
        ],
      },
      { type: "heading", text: "What a good multi-branch setup looks like" },
      {
        type: "list",
        items: [
          "Every machine at every branch reports to one cloud system",
          "Each machine is tagged to its branch",
          "One set of company rules, with holidays set company-wide or per branch",
          "Branch managers log in and see only their branch",
          "Head office sees all branches, live",
          "One payroll run for everyone",
        ],
      },
      { type: "heading", text: "How the machines connect" },
      {
        type: "paragraph",
        text:
          "With eSSL / ZKTeco machines in ADMS (Cloud Server) mode, each machine calls the cloud server by itself. A branch only needs a normal internet connection — no PC, no static IP, no VPN back to head office.",
      },
      {
        type: "paragraph",
        text: "Step-by-step setup: ",
        links: [{ text: "how to connect an eSSL biometric machine to the cloud", href: "/blog/connect-essl-biometric-machine-to-cloud-adms" }],
        suffix: ".",
      },
      { type: "heading", text: "Moving branches over without chaos" },
      {
        type: "list",
        items: [
          "List every machine, its branch and whether it supports ADMS",
          "Agree one set of shifts and rules before you switch",
          "Connect one branch first, check a week of attendance, then add the rest",
          "Give each branch manager their own login",
        ],
      },
      {
        type: "paragraph",
        text: "In ",
        links: [{ text: "Attenza", href: ATT }],
        suffix:
          ", one company can have many branches and machines in one panel. Head office sees everything; branch logins see only their own branch. The \"Branches today\" dashboard shows present, late and absent for each branch and which machines are online.",
      },
    ],
    faq: [
      {
        q: "Do I need a static IP at each branch?",
        a: "No. In ADMS mode each eSSL / ZKTeco machine connects to the cloud itself over a normal internet connection.",
      },
      {
        q: "Can a branch manager see other branches?",
        a: "With branch-limited logins, no — they see only their own branch. Head office sees all branches.",
      },
      {
        q: "Can different branches have different holidays?",
        a: "Yes. Holidays can be set for the whole company or for individual branches.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "gym-member-retention-who-to-call",
    product: "attenza",
    title: "Gym Member Retention: Who to Call Today (and Why)",
    description:
      "Gym member retention: the three lists to call every day — about to expire, stopped coming and new members — what to say, and why check-ins matter.",
    excerpt:
      "Members rarely quit loudly — they just stop coming. Here's the daily call list that keeps them.",
    category: "Society & Gym Management",
    tags: ["gym member retention", "gym renewal reminder", "gym management software India", "gym membership renewal"],
    coverImage: "/blog/attenza/gym-member-retention-who-to-call.jpg",
    publishedAt: "2026-11-26",
    author: "Milan Dey",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text:
          "Very few gym members walk up to the desk and cancel. Most just come a little less, then stop, then quietly don't renew. By the time the plan expires, the habit is gone. The gyms that keep members are the ones that notice early — and pick up the phone.",
      },
      { type: "heading", text: "The three lists to call every day" },
      { type: "subheading", text: "1. About to expire" },
      {
        type: "paragraph",
        text:
          "Members whose plan ends in the next week or so. Call before the plan runs out, not after — renewing is an easy yes when they are still coming in.",
      },
      { type: "subheading", text: "2. Stopped coming" },
      {
        type: "paragraph",
        text:
          "Members with an active plan who haven't checked in for a while — say a week to ten days. This is the most valuable call of the day. A friendly \"we haven't seen you — everything okay?\" brings back people who were about to drift away.",
      },
      { type: "subheading", text: "3. New members" },
      {
        type: "paragraph",
        text:
          "The first few weeks decide whether a new member becomes a regular. A quick call after the first week — how is it going, do you need a plan from a trainer — makes them feel noticed.",
      },
      { type: "heading", text: "What to say" },
      {
        type: "list",
        items: [
          "About to expire: remind them of the date, ask how training is going, offer to renew at the desk or by UPI",
          "Stopped coming: no guilt — ask if something changed (timing, injury, travel) and suggest a time to come back",
          "New: ask about goals, introduce a trainer, check they know the timings",
        ],
      },
      { type: "heading", text: "Why it needs check-in data" },
      {
        type: "paragraph",
        text:
          "You can only build the \"stopped coming\" list if you know when each member last came. A paper register or a front desk that's too busy to log everyone won't give you that. A face machine at the entrance records every visit automatically, without anyone typing.",
      },
      {
        type: "paragraph",
        text: "Choosing a machine? Read ",
        links: [{ text: "face vs fingerprint attendance machines", href: "/blog/face-vs-fingerprint-attendance-machine" }],
        suffix: ".",
      },
      { type: "heading", text: "Make it a daily habit" },
      {
        type: "paragraph",
        text:
          "Set a fixed time every day — before the evening rush — for the front desk to work through the list. Note what each member said, so the next call starts where the last one ended.",
      },
      {
        type: "paragraph",
        text: "",
        links: [{ text: "Attenza for gyms", href: "/software/attenza/gym-management-software" }],
        suffix:
          " builds the list for you: check-ins come from the face machine or a kiosk, and the retention list shows who is about to expire, who stopped coming and who is new — with call and WhatsApp buttons next to each name. Plans, renewals, dues and payments (UPI, cash or card) live in the same place.",
      },
    ],
    faq: [
      {
        q: "When should a gym call a member who stopped coming?",
        a: "Early — after about a week to ten days without a visit, while the habit can still be rebuilt.",
      },
      {
        q: "How early should gyms send renewal reminders?",
        a: "About a week before the plan ends, while the member is still coming in regularly.",
      },
      {
        q: "How do I know which members stopped coming?",
        a: "You need check-in data. A face machine at the entrance logs every visit automatically, so the software can list members who haven't come recently.",
      },
    ],
  },
];
