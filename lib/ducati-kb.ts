/* ─── Ducati Knowledge Base (mock data for RAG-style AI assistant) ─── */

export interface KBEntry {
  id: string;
  title: string;
  content: string;
  model?: string;
  yearStart?: number;
  yearEnd?: number;
  category: "specs" | "service" | "issues" | "insurance" | "buying" | "general";
  tags: string[];
}

export const DUCATI_KB: KBEntry[] = [
  /* ── Panigale V4 / V4 S / V4 R ─────────────────────────────────── */
  {
    id: "kb-001",
    title: "Panigale V4 — Engine Specifications",
    content:
      "The Ducati Panigale V4 uses the 1,103 cc Desmosedici Stradale V4 engine producing 215.5 hp (160.8 kW) at 13,000 rpm and 123.6 Nm (91.2 lb-ft) of torque at 9,500 rpm. Bore × Stroke: 81 mm × 53.5 mm. Compression ratio: 14:1. Desmodromic valve timing with four valves per cylinder. Counter-rotating crankshaft derived from MotoGP technology. Euro 5 compliant.",
    model: "Panigale V4",
    yearStart: 2018,
    yearEnd: 2025,
    category: "specs",
    tags: ["panigale", "v4", "engine", "horsepower", "torque", "desmosedici"],
  },
  {
    id: "kb-002",
    title: "Panigale V4 R — Track-Focused Specifications",
    content:
      "The Panigale V4 R features a 998 cc Desmosedici Stradale R engine producing 218 hp (162.5 kW) at 15,250 rpm and 112 Nm of torque at 11,500 rpm. Higher rev ceiling than the standard V4. Titanium connecting rods, lighter crankshaft, race-spec exhaust. With full racing exhaust: 240+ hp. Dry weight: 172 kg. Front suspension: Öhlins NPX25/30 pressurised fork, 125 mm travel. Rear: Öhlins TTX36 shock.",
    model: "Panigale V4 R",
    yearStart: 2019,
    yearEnd: 2025,
    category: "specs",
    tags: ["panigale", "v4r", "track", "race", "engine", "ohlins"],
  },
  {
    id: "kb-003",
    title: "Panigale V4 — Desmo Service Intervals",
    content:
      "Desmodromic valve clearance check: every 24,000 km (15,000 miles). Oil and filter change: every 12,000 km (7,500 miles) or annually. Air filter: every 12,000 km. Spark plugs: every 24,000 km. Timing belts: replaced by gear-driven system on Desmosedici Stradale — no belt replacement needed. Coolant: every 24,000 km. Brake fluid: every 2 years. Always use Ducati-approved Shell Advance Ultra 15W-50 oil.",
    model: "Panigale V4",
    yearStart: 2018,
    yearEnd: 2025,
    category: "service",
    tags: ["panigale", "v4", "desmo", "service", "oil", "valve", "interval"],
  },
  {
    id: "kb-004",
    title: "Panigale V4 — Known Issues",
    content:
      "Known issues on early 2018-2019 Panigale V4: (1) Fuel pump relay failure — symptoms include intermittent stalling, resolved by Ducati recall campaign. (2) Quickshifter calibration — early ECU maps could cause rough upshifts at low rpm, fixed via dealer ECU update. (3) Rear shock linkage bearing wear at ~15,000 km on track-ridden bikes — inspect at each Desmo service. (4) Headlight condensation on some 2018 models — warranty replacement available. Post-2020 models largely resolved these issues.",
    model: "Panigale V4",
    yearStart: 2018,
    yearEnd: 2025,
    category: "issues",
    tags: ["panigale", "v4", "issues", "recall", "quickshifter", "fuel pump"],
  },

  /* ── Monster 937 / 950 ─────────────────────────────────────────── */
  {
    id: "kb-005",
    title: "Monster 937 — Engine Specifications",
    content:
      "The Ducati Monster 937 uses the 937 cc Testastretta 11° L-twin engine producing 111 hp (82 kW) at 9,250 rpm and 93 Nm (68.6 lb-ft) of torque at 6,500 rpm. Bore × Stroke: 94 mm × 67.5 mm. Compression ratio: 13.3:1. Desmodromic valve timing. Wet weight: 188 kg (SP: 186 kg). Euro 5 compliant. Aluminium front frame, trellis rear subframe.",
    model: "Monster 937",
    yearStart: 2021,
    yearEnd: 2025,
    category: "specs",
    tags: ["monster", "937", "engine", "testastretta", "l-twin"],
  },
  {
    id: "kb-006",
    title: "Monster 937 — Service Intervals",
    content:
      "Oil and filter change: every 12,000 km (7,500 miles) or annually. Desmo valve clearance check: every 24,000 km (15,000 miles). Air filter: every 12,000 km. Timing belts: every 24,000 km (this model uses belt-driven cams unlike the V4). Spark plugs: every 24,000 km. Chain adjustment: every 1,000 km. Coolant: every 24,000 km. Brake fluid: every 2 years. Use Shell Advance Ultra 15W-50.",
    model: "Monster 937",
    yearStart: 2021,
    yearEnd: 2025,
    category: "service",
    tags: ["monster", "937", "service", "desmo", "belts", "oil", "valve"],
  },

  /* ── Multistrada V4 ────────────────────────────────────────────── */
  {
    id: "kb-007",
    title: "Multistrada V4 S — Engine & Electronics",
    content:
      "The Multistrada V4 S uses the 1,158 cc V4 Granturismo engine producing 170 hp (125 kW) at 10,500 rpm and 125 Nm at 8,750 rpm. First Ducati V4 without Desmodromic valves — uses conventional spring-return valves for extended 60,000 km valve service intervals. Radar-assisted ACC (Adaptive Cruise Control) front and rear. Skyhook semi-active suspension. 4 riding modes: Sport, Touring, Urban, Enduro.",
    model: "Multistrada V4",
    yearStart: 2021,
    yearEnd: 2025,
    category: "specs",
    tags: ["multistrada", "v4", "granturismo", "radar", "acc", "touring"],
  },
  {
    id: "kb-008",
    title: "Multistrada V4 — Service Intervals",
    content:
      "Oil and filter change: every 15,000 km (9,300 miles) or annually. Valve clearance check: every 60,000 km (37,300 miles) — the V4 Granturismo engine uses spring-return valves instead of Desmodromic, dramatically extending this interval. Air filter: every 15,000 km. Spark plugs: every 30,000 km. Coolant: every 30,000 km. No timing belts — gear-driven cams. Brake fluid: every 2 years.",
    model: "Multistrada V4",
    yearStart: 2021,
    yearEnd: 2025,
    category: "service",
    tags: ["multistrada", "v4", "service", "valve", "60000km", "spring"],
  },

  /* ── Scrambler 800 ─────────────────────────────────────────────── */
  {
    id: "kb-009",
    title: "Scrambler 800 — Engine Specifications",
    content:
      "The Ducati Scrambler 800 uses an 803 cc air-cooled L-twin Desmodromic engine producing 73 hp (54 kW) at 8,250 rpm and 65.2 Nm (48.1 lb-ft) of torque at 5,750 rpm. Bore × Stroke: 88 mm × 66 mm. Compression ratio: 11:1. Wet weight varies by variant: Icon 189 kg, Desert Sled 207 kg. Euro 5 compliant (2023+).",
    model: "Scrambler 800",
    yearStart: 2015,
    yearEnd: 2025,
    category: "specs",
    tags: ["scrambler", "800", "air-cooled", "l-twin", "engine"],
  },
  {
    id: "kb-010",
    title: "Scrambler 800 — Service Intervals",
    content:
      "Oil and filter change: every 12,000 km or annually. Desmo valve clearance check: every 12,000 km (tighter interval than water-cooled engines due to air-cooled thermal expansion). Timing belts: every 24,000 km. Air filter: every 12,000 km. Spark plugs: every 12,000 km. Chain: check every 1,000 km, typical replacement at 20,000–30,000 km. Use Shell Advance Ultra 15W-50.",
    model: "Scrambler 800",
    yearStart: 2015,
    yearEnd: 2025,
    category: "service",
    tags: ["scrambler", "800", "service", "desmo", "air-cooled", "belts"],
  },

  /* ── Streetfighter V4 ──────────────────────────────────────────── */
  {
    id: "kb-011",
    title: "Streetfighter V4 — Specifications",
    content:
      "The Streetfighter V4 uses the same 1,103 cc Desmosedici Stradale engine as the Panigale V4 producing 208 hp (155 kW) at 12,750 rpm and 123 Nm of torque at 11,500 rpm. Wet weight: 201 kg. Biplane aero wings generate 28 kg of downforce at 270 km/h. Riding modes: Race, Sport, Street, Wet. Öhlins NIX30 fork (S model). Brembo Stylema front calipers with 330 mm discs.",
    model: "Streetfighter V4",
    yearStart: 2020,
    yearEnd: 2025,
    category: "specs",
    tags: ["streetfighter", "v4", "naked", "engine", "aero", "brembo"],
  },

  /* ── Diavel V4 ─────────────────────────────────────────────────── */
  {
    id: "kb-012",
    title: "Diavel V4 — Specifications",
    content:
      "The Diavel V4 uses the 1,158 cc V4 Granturismo engine producing 168 hp (124 kW) at 10,750 rpm and 126 Nm of torque at 7,500 rpm. Spring-return valves (not Desmo) for 60,000 km valve intervals. Wet weight: 242 kg. 240 mm rear tyre. Öhlins suspension (S model). Riding modes: Sport, Touring, Urban. Cruise control standard. Cornering ABS.",
    model: "Diavel V4",
    yearStart: 2023,
    yearEnd: 2025,
    category: "specs",
    tags: ["diavel", "v4", "cruiser", "granturismo", "engine"],
  },

  /* ── General / Cross-model ─────────────────────────────────────── */
  {
    id: "kb-013",
    title: "Desmodromic Valve System — Explained",
    content:
      "Desmodromic ('Desmo') is Ducati's signature valve actuation system. Unlike conventional engines that use springs to close valves, Desmo uses a second rocker arm to mechanically close each valve. Advantages: precise valve control at high RPM, no valve float, enables higher rev ceilings. Disadvantage: requires periodic valve clearance checks (shimming) — typically every 12,000–24,000 km depending on model. The V4 Granturismo engine (Multistrada V4, Diavel V4) broke tradition by using spring-return valves for 60,000 km intervals.",
    category: "general",
    tags: ["desmo", "desmodromic", "valves", "technology", "service"],
  },
  {
    id: "kb-014",
    title: "UK Insurance Considerations for Ducati Owners",
    content:
      "UK insurance for Ducati motorcycles: Panigale V4 and Streetfighter V4 are typically insurance group 17 (highest). Monster 937 falls in group 11-13. Scrambler 800 around group 8-10. Key factors affecting UK premiums: (1) Agreed value policies recommended for limited editions. (2) Tracker discount — Datatool or Monimoto can reduce premiums 5-15%. (3) Ducati UK dealer-fitted security (Oxford chains, Almax) can help. (4) Specialist brokers: Bennetts, Bikesure, Devitt, Lexham often competitive for Ducatis. (5) Track day use must be declared — some policies exclude track, others offer separate track day cover. (6) Modifications must be declared — exhaust, ECU remap, etc.",
    category: "insurance",
    tags: ["insurance", "uk", "tracker", "broker", "premium", "group"],
  },
  {
    id: "kb-015",
    title: "Buying a Used Ducati — UK Guide",
    content:
      "Key checks when buying a used Ducati in the UK: (1) Desmo service history is critical — ensure valve clearance checks are documented at correct intervals. Missing Desmo service = expect £800-£1,500+ to bring up to date. (2) HPI check for outstanding finance and stolen records. (3) Check MOT history online at gov.uk — look for advisory patterns. (4) Timing belts (on belt-driven models) — if unknown, budget for replacement. (5) Typical UK resale: Ducatis hold value well. Panigale V4 2019 with 10,000 miles: £14,000-£17,000. Monster 937 2022 with 5,000 miles: £7,500-£9,000. Scrambler 800 2020 with 8,000 miles: £5,500-£7,000. (6) Ducati UK approved used programme offers warranty. (7) Check for recall compliance at any Ducati dealer.",
    category: "buying",
    tags: ["buying", "used", "uk", "desmo", "hpi", "resale", "value"],
  },
  {
    id: "kb-016",
    title: "Track vs Road Setup — Ducati Panigale & Streetfighter",
    content:
      "Track preparation for Ducati sportbikes: (1) Suspension — road settings are typically softer. Track: increase preload, compression, and rebound damping by 2-3 clicks from standard. Professional setup recommended for serious track use. (2) Tyres — road: Pirelli Diablo Rosso IV or Michelin Road 6. Track: Pirelli Supercorsa SP (fast road/track) or SC (pure track, tyre warmers required). (3) Brake pads — upgrade to sintered race pads (Brembo Z04 compound). (4) ECU — Ducati Performance race ECU available for V4 models, removes road restrictions. (5) Exhaust — Ducati Performance Akrapovič full system (V4: +10-12 hp). (6) Oil — switch to Motorex or Shell Advance Racing for track days. (7) Chain and sprockets — consider -1 front / +2 rear for most UK circuits.",
    category: "general",
    tags: ["track", "road", "setup", "suspension", "tyres", "brakes", "ecu"],
  },
  {
    id: "kb-017",
    title: "Ducati Panigale V4 — Torque Specifications",
    content:
      "Critical torque specs for Panigale V4 (always use torque wrench): Cylinder head bolts: 45 Nm. Spark plugs: 12 Nm. Front axle pinch bolts: 20 Nm. Front axle nut: 25 Nm. Rear axle nut: 200 Nm. Steering head nut: 55 Nm. Triple clamp pinch bolts: 24 Nm. Engine sprocket nut: 190 Nm. Rear sprocket bolts: 42 Nm. Oil drain plug: 20 Nm. Oil filter: hand-tight + ¾ turn. Caliper mounting bolts: 44 Nm. Brake disc bolts: 25 Nm (apply Loctite 243). Swingarm pivot nut: 75 Nm. Sump guard bolts: 10 Nm. CAUTION: These are OEM specifications — always cross-reference with the official workshop manual for your specific year.",
    model: "Panigale V4",
    yearStart: 2018,
    yearEnd: 2025,
    category: "specs",
    tags: ["panigale", "v4", "torque", "specs", "bolts", "nm"],
  },
  {
    id: "kb-018",
    title: "Ducati Monster 937 — Torque Specifications",
    content:
      "Critical torque specs for Monster 937: Cylinder head bolts: 52 Nm. Spark plugs: 12 Nm. Front axle nut: 90 Nm. Rear axle nut: 180 Nm. Steering head nut: 50 Nm. Triple clamp pinch bolts: 22 Nm. Engine sprocket nut: 190 Nm. Rear sprocket bolts: 42 Nm. Oil drain plug: 20 Nm. Oil filter: hand-tight + ¾ turn. Caliper mounting bolts: 44 Nm. Brake disc bolts: 25 Nm (Loctite 243). Timing belt tensioner: 24 Nm. Cam cover bolts: 10 Nm. CAUTION: Always verify against official workshop manual.",
    model: "Monster 937",
    yearStart: 2021,
    yearEnd: 2025,
    category: "specs",
    tags: ["monster", "937", "torque", "specs", "bolts", "nm"],
  },
];

/* ─── Simple keyword-based search (simulates vector similarity) ──── */
export function searchKB(query: string, limit = 5): KBEntry[] {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  const scored = DUCATI_KB.map(entry => {
    let score = 0;
    const haystack = [
      entry.title,
      entry.content,
      entry.model ?? "",
      entry.category,
      ...entry.tags,
    ]
      .join(" ")
      .toLowerCase();

    for (const word of words) {
      if (haystack.includes(word)) score += 1;
      if (entry.tags.some(t => t.includes(word))) score += 2;
      if (entry.title.toLowerCase().includes(word)) score += 3;
    }

    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.entry);
}

/* ─── Mock AI response generation ─────────────────────────────────── */
const FALLBACK_RESPONSE =
  "I don't have verified information about that in my knowledge base. For accurate technical data, please consult your Ducati workshop manual or contact an authorised Ducati dealer.";

export function generateMockAIResponse(query: string, userBike?: { model: string; year: number }): {
  response: string;
  sources: KBEntry[];
  confidence: number;
} {
  const sources = searchKB(query);

  if (sources.length === 0) {
    return { response: FALLBACK_RESPONSE, sources: [], confidence: 0 };
  }

  // Build a mock "AI" response from KB entries
  const primary = sources[0];
  let response = primary.content;

  // If user has a bike, add personalised note
  if (userBike) {
    const bikeEntries = sources.filter(
      s => s.model && s.model.toLowerCase().includes(userBike.model.toLowerCase())
    );
    if (bikeEntries.length > 0) {
      response += `\n\nAs a ${userBike.year} ${userBike.model} owner, this information is directly relevant to your bike.`;
    }
  }

  // Add secondary sources if available
  if (sources.length > 1) {
    response += "\n\n**Related information:** " + sources[1].title;
  }

  // Confidence based on category
  const confidence =
    primary.category === "specs" ? 0.95 :
    primary.category === "service" ? 0.92 :
    primary.category === "issues" ? 0.88 :
    primary.category === "insurance" ? 0.85 :
    0.80;

  return { response, sources, confidence };
}

/* ─── Suggested questions ─────────────────────────────────────────── */
export const SUGGESTED_QUESTIONS = [
  "What are the service intervals for the Panigale V4?",
  "What torque should I use for the front axle on my V4?",
  "What are the known issues with 2018-2019 Panigale V4?",
  "Monster 937 vs Scrambler 800 — which should I buy?",
  "How does the Desmodromic valve system work?",
  "Best insurance options for a Ducati in the UK?",
  "Track day tyre recommendations for Panigale V4?",
  "Multistrada V4 service intervals?",
];
