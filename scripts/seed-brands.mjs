// One-time seed: creates the Brand Category + Brand documents for every
// brand already used on the products, so they all show up in the Studio
// ready for a logo. Safe to run more than once (idempotent):
//   - creates categories/brands only if they don't already exist
//   - fixes the two mis-typed brand values you already created
//     ("Panasonic" -> "Panasonic i-Pro", "Matrix" -> "Matrix Comsec"),
//     keeping the logos you uploaded.
//
// Run from the project root:
//   SANITY_WRITE_TOKEN=your_token_here node scripts/seed-brands.mjs
//
// Get the token at https://sanity.io/manage -> your project -> API ->
// Tokens -> Add API token -> permission "Editor" -> copy it.

import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error(
    "\n  Missing token. Run like:\n  SANITY_WRITE_TOKEN=xxxx node scripts/seed-brands.mjs\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bp2n78ti",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token,
  useCdn: false,
});

const CATEGORIES = [
  { title: "Surveillance / CCTV", description: "IP cameras, NVRs and complete CCTV systems.", order: 1 },
  { title: "Access Control & Biometric", description: "Fingerprint, face and card-based attendance and door access.", order: 2 },
  { title: "Video Door Phones", description: "Video intercom and door-entry systems.", order: 3 },
  { title: "Networking", description: "PoE switches, network infrastructure and cabling.", order: 4 },
];

// filterValue must match the exact `brand` value on the products.
const BRANDS = [
  { name: "Hanwha Vision", filterValue: "Hanwha Vision", category: "Surveillance / CCTV", order: 1 },
  { name: "Honeywell", filterValue: "Honeywell", category: "Surveillance / CCTV", order: 2 },
  { name: "Matrix Comsec", filterValue: "Matrix Comsec", category: "Surveillance / CCTV", order: 3 },
  { name: "Panasonic i-PRO", filterValue: "Panasonic i-Pro", category: "Surveillance / CCTV", order: 4 },
  { name: "Prama", filterValue: "Prama", category: "Surveillance / CCTV", order: 5 },
  { name: "D-Link", filterValue: "DLink", category: "Networking", order: 1 },
  { name: "eSSL", filterValue: "eSSL", category: "Access Control & Biometric", order: 1 },
  { name: "BioMax", filterValue: "BioMax", category: "Access Control & Biometric", order: 2 },
  { name: "OneTouch", filterValue: "OneTouch", category: "Video Door Phones", order: 1 },
];

// Brand docs you already made with a value that doesn't match the products.
const ALIAS_FIX = { Panasonic: "Panasonic i-Pro", Matrix: "Matrix Comsec" };

async function run() {
  // 1. Categories
  const catId = {};
  for (const c of CATEGORIES) {
    const existing = await client.fetch(
      `*[_type=="brandCategory" && title==$t][0]._id`,
      { t: c.title }
    );
    if (existing) {
      catId[c.title] = existing;
      console.log("· category exists:", c.title);
    } else {
      const doc = await client.create({ _type: "brandCategory", ...c });
      catId[c.title] = doc._id;
      console.log("✓ created category:", c.title);
    }
  }

  // 2. Fix the mis-typed brand values (keeps their uploaded logos)
  for (const [wrong, right] of Object.entries(ALIAS_FIX)) {
    const docs = await client.fetch(
      `*[_type=="brand" && filterValue==$v]{ _id }`,
      { v: wrong }
    );
    for (const d of docs) {
      await client.patch(d._id).set({ filterValue: right }).commit();
      console.log(`✓ fixed brand value: "${wrong}" -> "${right}"`);
    }
  }

  // 3. Create any missing brand docs
  for (const b of BRANDS) {
    const existing = await client.fetch(
      `*[_type=="brand" && filterValue==$v][0]._id`,
      { v: b.filterValue }
    );
    if (existing) {
      console.log("· brand exists:", b.name);
      continue;
    }
    await client.create({
      _type: "brand",
      name: b.name,
      filterValue: b.filterValue,
      order: b.order,
      category: { _type: "reference", _ref: catId[b.category] },
    });
    console.log("✓ created brand:", b.name);
  }

  console.log("\nDone. Open the Studio → 🔰 Brands (logos) and add logos.\n");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
