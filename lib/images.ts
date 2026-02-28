/* ─── Curated Ducati & motorcycle image library ───────────────────────
   All images sourced from Unsplash (free license).
   STRICT RULE: Only Ducati motorcycles or clearly motorcycle-related content.
   ─────────────────────────────────────────────────────────────────── */

const UNS = "https://images.unsplash.com";

/* ─── Hero / full-bleed images ────────────────────────────────────── */
export const HERO = {
  /** Red Ducati Panigale studio-style shot */
  panigaleRed: `${UNS}/photo-1568772585407-9361f9bf3a87?w=1920&q=85&fit=crop`,
  /** Ducati on a mountain road — cinematic */
  mountainRoad: `${UNS}/photo-1558981806-ec527fa84c39?w=1920&q=85&fit=crop`,
  /** Sport bike close-up on track */
  trackClose: `${UNS}/photo-1558981359-219d6364c9c8?w=1920&q=85&fit=crop`,
  /** Rider on twisty road, motion blur */
  ridingMotion: `${UNS}/photo-1547549082-6bc09f2049ae?w=1920&q=85&fit=crop`,
  /** Motorcycle handlebar perspective */
  cockpit: `${UNS}/photo-1609630875171-b1321377ee65?w=1920&q=85&fit=crop`,
};

/* ─── Event category images ───────────────────────────────────────── */
export const EVENT_IMAGES = {
  rideout: [
    `${UNS}/photo-1558981806-ec527fa84c39?w=800&q=80&fit=crop`,
    `${UNS}/photo-1547549082-6bc09f2049ae?w=800&q=80&fit=crop`,
    `${UNS}/photo-1558981359-219d6364c9c8?w=800&q=80&fit=crop`,
    `${UNS}/photo-1609630875171-b1321377ee65?w=800&q=80&fit=crop`,
  ],
  training: [
    `${UNS}/photo-1568772585407-9361f9bf3a87?w=800&q=80&fit=crop`,
    `${UNS}/photo-1580310614729-ccd69652491d?w=800&q=80&fit=crop`,
  ],
  social: [
    `${UNS}/photo-1449426468159-d96dbf08f19f?w=800&q=80&fit=crop`,
    `${UNS}/photo-1558980394-34764db076b4?w=800&q=80&fit=crop`,
  ],
  special: [
    `${UNS}/photo-1568772585407-9361f9bf3a87?w=800&q=80&fit=crop`,
  ],
};

/* ─── Ride report images ──────────────────────────────────────────── */
export const REPORT_IMAGES = [
  `${UNS}/photo-1558981806-ec527fa84c39?w=800&q=80&fit=crop`,
  `${UNS}/photo-1547549082-6bc09f2049ae?w=800&q=80&fit=crop`,
  `${UNS}/photo-1558981359-219d6364c9c8?w=800&q=80&fit=crop`,
  `${UNS}/photo-1609630875171-b1321377ee65?w=800&q=80&fit=crop`,
  `${UNS}/photo-1449426468159-d96dbf08f19f?w=800&q=80&fit=crop`,
  `${UNS}/photo-1580310614729-ccd69652491d?w=800&q=80&fit=crop`,
];

/* ─── Ducati model images (for cards, swap listings, etc) ─────────── */
export const DUCATI_MODELS: Record<string, string> = {
  "Panigale V4":       `${UNS}/photo-1568772585407-9361f9bf3a87?w=600&q=80&fit=crop`,
  "Panigale V4 S":     `${UNS}/photo-1568772585407-9361f9bf3a87?w=600&q=80&fit=crop`,
  "Panigale V4 R":     `${UNS}/photo-1568772585407-9361f9bf3a87?w=600&q=80&fit=crop`,
  "Streetfighter V4":  `${UNS}/photo-1580310614729-ccd69652491d?w=600&q=80&fit=crop`,
  "Streetfighter V4 S":`${UNS}/photo-1580310614729-ccd69652491d?w=600&q=80&fit=crop`,
  "Monster 937":       `${UNS}/photo-1558980394-34764db076b4?w=600&q=80&fit=crop`,
  "Monster 937 SP":    `${UNS}/photo-1558980394-34764db076b4?w=600&q=80&fit=crop`,
  "Multistrada V4":    `${UNS}/photo-1558981806-ec527fa84c39?w=600&q=80&fit=crop`,
  "Multistrada V4 S":  `${UNS}/photo-1558981806-ec527fa84c39?w=600&q=80&fit=crop`,
  "Scrambler 800":     `${UNS}/photo-1449426468159-d96dbf08f19f?w=600&q=80&fit=crop`,
  "Diavel V4":         `${UNS}/photo-1547549082-6bc09f2049ae?w=600&q=80&fit=crop`,
  default:             `${UNS}/photo-1558981359-219d6364c9c8?w=600&q=80&fit=crop`,
};

/* ─── About / team images ─────────────────────────────────────────── */
export const ABOUT = {
  clubRide: `${UNS}/photo-1558981806-ec527fa84c39?w=1200&q=85&fit=crop`,
  groupRiders: `${UNS}/photo-1547549082-6bc09f2049ae?w=1200&q=85&fit=crop`,
  garageWorkshop: `${UNS}/photo-1558981359-219d6364c9c8?w=1200&q=85&fit=crop`,
};

/* ─── Membership page ─────────────────────────────────────────────── */
export const MEMBERSHIP = {
  hero: `${UNS}/photo-1558981806-ec527fa84c39?w=1400&q=85&fit=crop`,
  benefits: `${UNS}/photo-1547549082-6bc09f2049ae?w=800&q=80&fit=crop`,
};

/* ─── Route intelligence ──────────────────────────────────────────── */
export const ROUTES = {
  hero: `${UNS}/photo-1609630875171-b1321377ee65?w=1400&q=85&fit=crop`,
  scenic: `${UNS}/photo-1558981806-ec527fa84c39?w=800&q=80&fit=crop`,
};

/* ─── Helper: get image for a Ducati model name ───────────────────── */
export function getModelImage(modelName: string): string {
  for (const [key, url] of Object.entries(DUCATI_MODELS)) {
    if (key === "default") continue;
    if (modelName.toLowerCase().includes(key.toLowerCase())) return url;
  }
  return DUCATI_MODELS.default;
}

/* ─── Helper: get event image by category + index ─────────────────── */
export function getEventImage(category: string, index: number): string {
  const cat = category.toLowerCase();
  const images =
    EVENT_IMAGES[cat as keyof typeof EVENT_IMAGES] || EVENT_IMAGES.rideout;
  return images[index % images.length];
}
