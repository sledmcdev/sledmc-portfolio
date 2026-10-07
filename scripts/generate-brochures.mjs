// Generates the demo sector brochures (A4 SVG) used by the Sector Pathways dialog.
// Usage: node scripts/generate-brochures.mjs
// Replace the generated files with the client's real brochures when available
// (any image format works; update the paths in data/collections/sector-pathways.json).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lionPng = readFileSync(join(root, "public/images/brand/lion-motif-gold.png")).toString("base64");

const NAVY = "#0B1422";
const NAVY_2 = "#16284A";
const GOLD = "#D4AF37";
const INK = "#0A0A0A";
const FONT = "'Inter Tight', 'Segoe UI', Arial, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const BROCHURES = [
  {
    file: "drivers/brochure-1.svg",
    eyebrow: "FLAGSHIP SECTOR PATHWAY",
    title: ["Professional", "Drivers"],
    tagline: "C / CE heavy vehicle careers across Europe",
    roles: ["International C/CE Truck Driver", "Heavy Goods Vehicle Operator", "Regional Distribution Driver", "Coach & Logistics Driver"],
    why: ["EU-standard salaries from €2,200+", "Code 95 / CQC pathway support", "Legal contracts & worker protection", "Visa & relocation guidance"],
    modules: ["EU Road Rules", "Tachograph", "Defensive Driving", "Cargo & CMR", "Workplace English"],
  },
  {
    file: "hospitality/brochure-1.svg",
    eyebrow: "SECTOR PATHWAY",
    title: ["Hospitality", "& Culinary"],
    tagline: "Hotel, restaurant & guest-service careers",
    roles: ["Hotel Front Office & Guest Relations", "Restaurant & Banquet Service", "Housekeeping Attendant", "Room & Laundry Supervisor"],
    why: ["Seasonal & permanent contracts", "Accommodation often included", "Career growth in EU hotel groups", "Sri Lankan hospitality is world-renowned"],
    modules: ["Guest Service", "Food Hygiene", "European Etiquette", "Language", "Teamwork"],
  },
  {
    file: "hospitality/brochure-2.svg",
    eyebrow: "SPECIALIST TRACK",
    title: ["Culinary &", "Kitchen Track"],
    tagline: "From Sri Lankan kitchens to European restaurants",
    roles: ["Commis Chef / Line Cook", "Chef de Partie", "Pastry & Bakery Assistant", "Kitchen Steward"],
    why: ["HACCP food-safety certification", "Exposure to European cuisines", "Structured kitchen brigade training", "Pathway to senior chef roles"],
    modules: ["HACCP", "Knife Skills", "EU Cuisine Basics", "Kitchen Safety", "Workplace Italian"],
  },
  {
    file: "logistics/brochure-1.svg",
    eyebrow: "SECTOR PATHWAY",
    title: ["Logistics &", "Warehousing"],
    tagline: "Modern distribution & supply-chain careers",
    roles: ["Warehouse Operator", "Fork-lift / Reach-truck Operator", "Picking & Packing Specialist", "Inventory Controller"],
    why: ["High demand across EU hubs", "Fork-lift certification support", "Shift allowances & overtime pay", "Safe, regulated workplaces"],
    modules: ["Warehouse Safety", "WMS Systems", "Fork-lift", "Inventory", "Workplace English"],
  },
  {
    file: "skilled-trades/brochure-1.svg",
    eyebrow: "SECTOR PATHWAY",
    title: ["Skilled", "Trades"],
    tagline: "Certified technical careers in European industry",
    roles: ["MIG / TIG Certified Welder", "Industrial Electrician", "Automotive Mechanic", "Construction Technician"],
    why: ["Skills recognised across the EU", "Trade-test & certification support", "Long-term & permanent contracts", "Strong salary progression"],
    modules: ["EU Safety (HSE)", "Technical Drawings", "Trade Testing", "Tools & Standards", "Language"],
  },
];

function bullets(items, x, y, gap, size = 13) {
  return items
    .map(
      (t, i) =>
        `<circle cx="${x}" cy="${y + i * gap - 4}" r="3.5" fill="${GOLD}"/>` +
        `<text x="${x + 14}" y="${y + i * gap}" font-size="${size}" fill="${INK}">${esc(t)}</text>`
    )
    .join("");
}

function chips(items, x, y) {
  let cx = x;
  let cy = y;
  return items
    .map((t) => {
      const w = Math.round(t.length * 5.9 + 20);
      if (cx + w > 560) {
        cx = x;
        cy += 30;
      }
      const out =
        `<rect x="${cx}" y="${cy}" width="${w}" height="24" rx="12" fill="none" stroke="${GOLD}" stroke-width="1.2"/>` +
        `<text x="${cx + w / 2}" y="${cy + 16}" font-size="11" font-weight="600" fill="${NAVY}" text-anchor="middle">${esc(t)}</text>`;
      cx += w + 8;
      return out;
    })
    .join("");
}

function brochure(b) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="595" height="842" viewBox="0 0 595 842" font-family="${FONT}">
  <defs>
    <linearGradient id="top" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY_2}"/><stop offset="1" stop-color="${NAVY}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.7">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.28"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="595" height="842" fill="#FBF8F1"/>
  <rect width="595" height="380" fill="url(#top)"/>
  <rect width="595" height="380" fill="url(#glow)"/>
  <image href="data:image/png;base64,${lionPng}" x="300" y="96" width="290" height="266" opacity="0.22"/>

  <text x="40" y="58" font-size="15" font-weight="800" fill="#fff" letter-spacing="2">SLEDMC</text>
  <text x="40" y="74" font-size="9" fill="${GOLD}" letter-spacing="3">ACADEMY · SRI LANKA → EUROPE</text>
  <line x1="40" y1="150" x2="80" y2="150" stroke="${GOLD}" stroke-width="2"/>
  <text x="92" y="154" font-size="11" font-weight="700" fill="${GOLD}" letter-spacing="3">${esc(b.eyebrow)}</text>
  <text x="40" y="214" font-size="50" font-weight="900" fill="#fff" letter-spacing="-1.5">${esc(b.title[0])}</text>
  <text x="40" y="268" font-size="50" font-weight="900" fill="${GOLD}" letter-spacing="-1.5">${esc(b.title[1])}</text>
  <text x="40" y="310" font-size="15" fill="#C9D3E3">${esc(b.tagline)}</text>

  <rect y="380" width="595" height="6" fill="${GOLD}"/>

  <text x="40" y="434" font-size="12" font-weight="800" fill="${NAVY}" letter-spacing="2">ROLES WE PREPARE YOU FOR</text>
  ${bullets(b.roles, 44, 462, 24)}

  <text x="40" y="580" font-size="12" font-weight="800" fill="${NAVY}" letter-spacing="2">WHY THIS PATHWAY</text>
  ${bullets(b.why, 44, 608, 24)}

  <text x="40" y="712" font-size="12" font-weight="800" fill="${NAVY}" letter-spacing="2">ACADEMY MODULES INCLUDED</text>
  ${chips(b.modules, 40, 726)}

  <rect y="790" width="595" height="52" fill="${NAVY}"/>
  <text x="40" y="821" font-size="11" fill="#fff">Ayubowan! Start your journey · www.sledmc.lk · +94 11 000 0000</text>
  <text x="555" y="821" font-size="10" fill="${GOLD}" text-anchor="end" letter-spacing="1">DEMO BROCHURE</text>
</svg>
`;
}

for (const b of BROCHURES) {
  const out = join(root, "public/images/academic/sector-pathways", b.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, brochure(b));
  console.log("wrote", out);
}
