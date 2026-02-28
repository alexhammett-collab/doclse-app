export interface SwapListing {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerRating: number;
  ownerSwaps: number;
  ownerMember: string; // "Full Member" | "Subscriber"
  bike: string;
  year: number;
  color: string;
  mileage: number;
  location: string;
  description: string;
  tags: string[];
  availableDates: string; // human-readable
  swapType: ("day" | "rideout")[];
  experience: "Beginner Friendly" | "Intermediate" | "Advanced";
  /** What the owner would like to ride in return (flexible if empty) */
  wantsToRide: string;
  insuredValue: number; // £
  active: boolean;
  swapsCompleted: number;
  image: string;
}

export interface InsuranceTier {
  id: string;
  name: string;
  tagline: string;
  priceDay: number; // £ per day
  excess: number;   // £
  cover: number;    // £ max cover
  features: string[];
  recommended?: boolean;
}

export const SWAP_LISTINGS: SwapListing[] = [
  {
    id: "s1",
    ownerId: "r1",
    ownerName: "Marco B.",
    ownerAvatar: "MB",
    ownerRating: 4.9,
    ownerSwaps: 7,
    ownerMember: "Full Member",
    bike: "Panigale V4R",
    year: 2023,
    color: "Ducati Red",
    mileage: 4200,
    location: "London, SE1",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&fit=crop",
    description: "My pride and joy — the full race-spec V4R in Ducati Red. She's tuned with an Akrapovič slip-on and Öhlins setup. I'd love someone to experience her properly, not just look at her. Dry days only please.",
    tags: ["Track Ready", "Race Spec", "Akrapovič", "Öhlins"],
    availableDates: "Weekends in March & April",
    swapType: ["day", "rideout"],
    experience: "Advanced",
    wantsToRide: "Streetfighter V4S or Monster SP",
    insuredValue: 38000,
    active: true,
    swapsCompleted: 7,
  },
  {
    id: "s2",
    ownerId: "r5",
    ownerName: "Diego F.",
    ownerAvatar: "DF",
    ownerRating: 4.7,
    ownerSwaps: 4,
    ownerMember: "Full Member",
    bike: "Monster SP",
    year: 2022,
    color: "Arctic White",
    mileage: 9800,
    location: "Sevenoaks, Kent",
    image: "https://images.unsplash.com/photo-1558980394-34764db076b4?w=600&q=80&fit=crop",
    description: "The Monster SP in Arctic White — a proper all-rounder. Comfortable enough for a Surrey Hills rideout but punchy enough to put a grin on your face. Happy for any experience level on this one.",
    tags: ["All-rounder", "Comfortable", "Touring Ready"],
    availableDates: "Most Saturdays, flexible",
    swapType: ["day", "rideout"],
    experience: "Intermediate",
    wantsToRide: "Open to anything — Multistrada, Diavel, Scrambler",
    insuredValue: 14500,
    active: true,
    swapsCompleted: 4,
  },
  {
    id: "s3",
    ownerId: "r6",
    ownerName: "Chloe N.",
    ownerAvatar: "CN",
    ownerRating: 5.0,
    ownerSwaps: 2,
    ownerMember: "Full Member",
    bike: "Hypermotard 950",
    year: 2023,
    color: "Dark Stealth",
    mileage: 3100,
    location: "Brighton",
    image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=600&q=80&fit=crop",
    description: "The Hypermotard is unlike anything else. Upright, wild, insane fun on B-roads. Perfect for a coastal rideout. Low mileage, immaculate condition. Ideal for someone who wants to try something totally different.",
    tags: ["Supermoto", "B-road King", "Low Miles", "Coastal"],
    availableDates: "Mid-week flexible, some weekends",
    swapType: ["rideout"],
    experience: "Intermediate",
    wantsToRide: "Panigale V2 or V4",
    insuredValue: 12800,
    active: true,
    swapsCompleted: 2,
  },
  {
    id: "s4",
    ownerId: "r20",
    ownerName: "Isla T.",
    ownerAvatar: "IT",
    ownerRating: 4.8,
    ownerSwaps: 5,
    ownerMember: "Full Member",
    bike: "Scrambler Nightshift",
    year: 2022,
    color: "Black on Black",
    mileage: 6700,
    location: "Guildford, Surrey",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80&fit=crop",
    description: "The Scrambler Nightshift is the perfect gateway drug for anyone new to Ducati. Relaxed, beautiful, dead easy to ride but still puts a massive smile on your face. Great for a day out in the Surrey Hills.",
    tags: ["Beginner Friendly", "Surrey Hills", "Classic Style"],
    availableDates: "Sundays mainly, some Saturdays",
    swapType: ["day", "rideout"],
    experience: "Beginner Friendly",
    wantsToRide: "Happy with anything — want to try a Multistrada",
    insuredValue: 9500,
    active: true,
    swapsCompleted: 5,
  },
  {
    id: "s5",
    ownerId: "r10",
    ownerName: "Björn L.",
    ownerAvatar: "BL",
    ownerRating: 4.6,
    ownerSwaps: 11,
    ownerMember: "Full Member",
    bike: "Multistrada V4S",
    year: 2021,
    color: "Aviator Grey",
    mileage: 22400,
    location: "Oxford",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&fit=crop",
    description: "The Swiss Army knife of motorcycles. The Multistrada V4S in Aviator Grey has done 22k miles across 14 countries. Radar cruise, 4 riding modes, heated grips, Skyhook suspension. Perfect for a long day's adventure ride.",
    tags: ["Adventure", "Long Distance", "Radar Cruise", "Heated Grips"],
    availableDates: "Bank holidays & longer weekends",
    swapType: ["day"],
    experience: "Intermediate",
    wantsToRide: "Streetfighter V4S or Panigale V4",
    insuredValue: 24000,
    active: true,
    swapsCompleted: 11,
  },
  {
    id: "s6",
    ownerId: "r18",
    ownerName: "Nina K.",
    ownerAvatar: "NK",
    ownerRating: 4.9,
    ownerSwaps: 8,
    ownerMember: "Full Member",
    bike: "Panigale V4",
    year: 2022,
    color: "Speciale White",
    mileage: 7800,
    location: "Reading, Berkshire",
    image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=600&q=80&fit=crop",
    description: "Standard V4 (not R spec) in Speciale White. A little more forgiving than the R but still an absolutely devastating motorcycle. Full titanium exhaust, quick-shifter. Would love a Multistrada or Streetfighter in return.",
    tags: ["Titanium Exhaust", "Quick-shifter", "Track Capable"],
    availableDates: "Saturdays in March–May",
    swapType: ["rideout"],
    experience: "Advanced",
    wantsToRide: "Multistrada V4 RS or Streetfighter V4 M",
    insuredValue: 28000,
    active: false,
    swapsCompleted: 8,
  },
];

export const INSURANCE_TIERS: InsuranceTier[] = [
  {
    id: "basic",
    name: "SwapShield Basic",
    tagline: "Third-party protection for casual swappers",
    priceDay: 12,
    excess: 500,
    cover: 15000,
    features: [
      "Third-party liability cover",
      "Up to £15,000 bike value",
      "24-hour claims line",
      "Digital certificate (instant)",
      "1-day minimum, up to 3 days",
    ],
  },
  {
    id: "plus",
    name: "SwapShield Plus",
    tagline: "Comprehensive cover for peace of mind",
    priceDay: 24,
    excess: 250,
    cover: 35000,
    recommended: true,
    features: [
      "Fully comprehensive cover",
      "Up to £35,000 bike value",
      "Zero excess option (+£8/day)",
      "Breakdown & recovery",
      "Personal accident cover £25k",
      "Helmet & leathers cover £1,500",
      "Digital certificate (instant)",
      "Up to 7 days",
    ],
  },
  {
    id: "elite",
    name: "SwapShield Elite",
    tagline: "Maximum cover for high-value machines",
    priceDay: 45,
    excess: 0,
    cover: 60000,
    features: [
      "Fully comprehensive, zero excess",
      "Up to £60,000 bike value",
      "Track day extension available",
      "Breakdown, recovery & hotel",
      "Personal accident cover £50k",
      "Helmet, leathers & gear £3,000",
      "Legal expenses cover",
      "Dedicated swap concierge",
      "Up to 14 days",
    ],
  },
];

export const MY_BIKES = [
  { id: "mb1", name: "Streetfighter V4S", year: 2023, reg: "DC23 XYZ" },
  { id: "mb2", name: "Monster 937", year: 2021, reg: "DC21 ABC" },
];
