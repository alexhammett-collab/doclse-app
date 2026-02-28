/* ─── AI Ride Matcher — mock data & matching algorithm ─────────────── */

export type RidingStyle = "spirited" | "touring" | "track";
export type SkillLevel = "novice" | "intermediate" | "advanced";
export type RideFrequency = "weekly" | "monthly" | "occasional";

export interface RiderProfile {
  userId: string;
  name: string;
  avatar: string;
  latitude: number;
  longitude: number;
  region: string;
  ridingStyle: RidingStyle;
  skillLevel: SkillLevel;
  rideFrequency: RideFrequency;
  bikeCategory: string;
  bike: string;
  memberSince: string;
  totalRides: number;
}

export interface MatchResult {
  rider: RiderProfile;
  score: number;
  distanceKm: number;
  explanation: string;
  factors: {
    proximity: number;
    style: number;
    skill: number;
    frequency: number;
  };
}

/* ─── Mock rider profiles across UK ───────────────────────────────── */
export const RIDER_PROFILES: RiderProfile[] = [
  {
    userId: "r-001",
    name: "Marcus Webb",
    avatar: "MW",
    latitude: 51.5074,
    longitude: -0.1278,
    region: "London",
    ridingStyle: "spirited",
    skillLevel: "advanced",
    rideFrequency: "weekly",
    bikeCategory: "Superbike",
    bike: "Panigale V4 S",
    memberSince: "2024-04",
    totalRides: 87,
  },
  {
    userId: "r-002",
    name: "Sarah Chen",
    avatar: "SC",
    latitude: 51.4545,
    longitude: -2.5879,
    region: "Bristol",
    ridingStyle: "touring",
    skillLevel: "intermediate",
    rideFrequency: "monthly",
    bikeCategory: "Adventure",
    bike: "Multistrada V4 S",
    memberSince: "2024-06",
    totalRides: 34,
  },
  {
    userId: "r-003",
    name: "James Thornton",
    avatar: "JT",
    latitude: 51.2787,
    longitude: 1.0803,
    region: "Kent",
    ridingStyle: "track",
    skillLevel: "advanced",
    rideFrequency: "weekly",
    bikeCategory: "Superbike",
    bike: "Panigale V4 R",
    memberSince: "2024-04",
    totalRides: 112,
  },
  {
    userId: "r-004",
    name: "Emma Ridley",
    avatar: "ER",
    latitude: 51.3811,
    longitude: -0.4065,
    region: "Surrey",
    ridingStyle: "spirited",
    skillLevel: "intermediate",
    rideFrequency: "weekly",
    bikeCategory: "Naked",
    bike: "Streetfighter V4",
    memberSince: "2024-08",
    totalRides: 52,
  },
  {
    userId: "r-005",
    name: "Tom Hargreaves",
    avatar: "TH",
    latitude: 50.8225,
    longitude: -0.1372,
    region: "Brighton",
    ridingStyle: "spirited",
    skillLevel: "advanced",
    rideFrequency: "weekly",
    bikeCategory: "Naked",
    bike: "Monster 937 SP",
    memberSince: "2024-05",
    totalRides: 68,
  },
  {
    userId: "r-006",
    name: "Priya Sharma",
    avatar: "PS",
    latitude: 51.7520,
    longitude: -1.2577,
    region: "Oxford",
    ridingStyle: "touring",
    skillLevel: "novice",
    rideFrequency: "monthly",
    bikeCategory: "Scrambler",
    bike: "Scrambler 800 Icon",
    memberSince: "2024-09",
    totalRides: 18,
  },
  {
    userId: "r-007",
    name: "Daniel Foster",
    avatar: "DF",
    latitude: 51.4416,
    longitude: -0.9432,
    region: "Reading",
    ridingStyle: "touring",
    skillLevel: "intermediate",
    rideFrequency: "monthly",
    bikeCategory: "Adventure",
    bike: "Multistrada V4 Rally",
    memberSince: "2024-07",
    totalRides: 29,
  },
  {
    userId: "r-008",
    name: "Lucy Patterson",
    avatar: "LP",
    latitude: 51.0504,
    longitude: -1.3128,
    region: "Hampshire",
    ridingStyle: "spirited",
    skillLevel: "intermediate",
    rideFrequency: "occasional",
    bikeCategory: "Naked",
    bike: "Monster 937",
    memberSince: "2024-10",
    totalRides: 14,
  },
  {
    userId: "r-009",
    name: "Ryan O'Brien",
    avatar: "RO",
    latitude: 51.5886,
    longitude: -0.0166,
    region: "East London",
    ridingStyle: "track",
    skillLevel: "advanced",
    rideFrequency: "weekly",
    bikeCategory: "Superbike",
    bike: "Panigale V4 S",
    memberSince: "2024-04",
    totalRides: 95,
  },
  {
    userId: "r-010",
    name: "Kate Morrison",
    avatar: "KM",
    latitude: 51.2362,
    longitude: 0.5550,
    region: "Maidstone",
    ridingStyle: "touring",
    skillLevel: "intermediate",
    rideFrequency: "monthly",
    bikeCategory: "Adventure",
    bike: "Multistrada V4 S",
    memberSince: "2024-05",
    totalRides: 41,
  },
  {
    userId: "r-011",
    name: "Chris Davies",
    avatar: "CD",
    latitude: 51.3148,
    longitude: -0.5600,
    region: "Guildford",
    ridingStyle: "spirited",
    skillLevel: "advanced",
    rideFrequency: "weekly",
    bikeCategory: "Superbike",
    bike: "Streetfighter V4 S",
    memberSince: "2024-06",
    totalRides: 74,
  },
  {
    userId: "r-012",
    name: "Hannah Wells",
    avatar: "HW",
    latitude: 51.6200,
    longitude: -0.2400,
    region: "North London",
    ridingStyle: "touring",
    skillLevel: "novice",
    rideFrequency: "occasional",
    bikeCategory: "Scrambler",
    bike: "Scrambler 800 Desert Sled",
    memberSince: "2024-11",
    totalRides: 8,
  },
  {
    userId: "r-013",
    name: "Alex Petrov",
    avatar: "AP",
    latitude: 51.4083,
    longitude: -0.0158,
    region: "South East London",
    ridingStyle: "spirited",
    skillLevel: "intermediate",
    rideFrequency: "weekly",
    bikeCategory: "Cruiser",
    bike: "Diavel V4",
    memberSince: "2024-07",
    totalRides: 39,
  },
  {
    userId: "r-014",
    name: "Ben Whitfield",
    avatar: "BW",
    latitude: 52.0406,
    longitude: -0.7594,
    region: "Milton Keynes",
    ridingStyle: "track",
    skillLevel: "intermediate",
    rideFrequency: "monthly",
    bikeCategory: "Superbike",
    bike: "Panigale V2",
    memberSince: "2024-08",
    totalRides: 26,
  },
  {
    userId: "r-015",
    name: "Natalie Grant",
    avatar: "NG",
    latitude: 51.2681,
    longitude: -0.3209,
    region: "Dorking",
    ridingStyle: "spirited",
    skillLevel: "advanced",
    rideFrequency: "weekly",
    bikeCategory: "Naked",
    bike: "Streetfighter V4",
    memberSince: "2024-05",
    totalRides: 63,
  },
];

/* ─── Haversine distance (km) ─────────────────────────────────────── */
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ─── Matching algorithm ──────────────────────────────────────────── */
export function findMatches(
  userProfile: RiderProfile,
  allProfiles: RiderProfile[] = RIDER_PROFILES,
  limit = 5,
): MatchResult[] {
  const candidates = allProfiles.filter(p => p.userId !== userProfile.userId);

  const results: MatchResult[] = candidates.map(candidate => {
    const distance = haversine(
      userProfile.latitude,
      userProfile.longitude,
      candidate.latitude,
      candidate.longitude,
    );

    /* ── Safety check: prevent dangerous pairings ──────────────── */
    if (
      userProfile.skillLevel === "novice" &&
      candidate.skillLevel === "advanced" &&
      candidate.ridingStyle === "track"
    ) {
      return {
        rider: candidate,
        score: 0,
        distanceKm: distance,
        explanation: "Safety mismatch — skill gap too large for track riding",
        factors: { proximity: 0, style: 0, skill: 0, frequency: 0 },
      };
    }
    if (
      candidate.skillLevel === "novice" &&
      userProfile.skillLevel === "advanced" &&
      userProfile.ridingStyle === "track"
    ) {
      return {
        rider: candidate,
        score: 0,
        distanceKm: distance,
        explanation: "Safety mismatch — skill gap too large for track riding",
        factors: { proximity: 0, style: 0, skill: 0, frequency: 0 },
      };
    }

    /* ── Proximity score (40% weight) ─────────────────────────── */
    // 0 km = 100, 200 km = 0
    const proximityScore = Math.max(0, Math.round(100 - (distance / 2)));

    /* ── Riding style (25% weight) ────────────────────────────── */
    let styleScore: number;
    if (userProfile.ridingStyle === candidate.ridingStyle) {
      styleScore = 100;
    } else if (
      (userProfile.ridingStyle === "spirited" && candidate.ridingStyle === "touring") ||
      (userProfile.ridingStyle === "touring" && candidate.ridingStyle === "spirited")
    ) {
      styleScore = 65;
    } else if (
      (userProfile.ridingStyle === "spirited" && candidate.ridingStyle === "track") ||
      (userProfile.ridingStyle === "track" && candidate.ridingStyle === "spirited")
    ) {
      styleScore = 70;
    } else {
      styleScore = 35;
    }

    /* ── Skill level (20% weight) ─────────────────────────────── */
    const SKILL_ORDER: SkillLevel[] = ["novice", "intermediate", "advanced"];
    const skillDiff = Math.abs(
      SKILL_ORDER.indexOf(userProfile.skillLevel) -
      SKILL_ORDER.indexOf(candidate.skillLevel),
    );
    const skillScore = skillDiff === 0 ? 100 : skillDiff === 1 ? 70 : 30;

    /* ── Ride frequency (15% weight) ──────────────────────────── */
    const FREQ_ORDER: RideFrequency[] = ["occasional", "monthly", "weekly"];
    const freqDiff = Math.abs(
      FREQ_ORDER.indexOf(userProfile.rideFrequency) -
      FREQ_ORDER.indexOf(candidate.rideFrequency),
    );
    const freqScore = freqDiff === 0 ? 100 : freqDiff === 1 ? 65 : 30;

    /* ── Weighted total ───────────────────────────────────────── */
    const score = Math.round(
      proximityScore * 0.40 +
      styleScore * 0.25 +
      skillScore * 0.20 +
      freqScore * 0.15,
    );

    /* ── Build explanation string ─────────────────────────────── */
    const parts: string[] = [];
    if (distance < 30) parts.push("Very close by");
    else if (distance < 80) parts.push(`${Math.round(distance)}km away`);
    else parts.push(`${Math.round(distance)}km apart`);

    if (styleScore === 100) parts.push("same riding style");
    else if (styleScore >= 65) parts.push("compatible riding style");

    if (skillScore === 100) parts.push("matched skill level");
    else if (skillScore >= 70) parts.push("similar skill level");

    if (freqScore === 100) parts.push("rides at same frequency");

    return {
      rider: candidate,
      score,
      distanceKm: distance,
      explanation: parts.join(" · "),
      factors: {
        proximity: proximityScore,
        style: styleScore,
        skill: skillScore,
        frequency: freqScore,
      },
    };
  });

  return results
    .filter(r => r.score >= 70)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/* ─── Default "current user" profile for demo ─────────────────────── */
export const DEMO_USER_PROFILE: RiderProfile = {
  userId: "demo-user",
  name: "You",
  avatar: "U",
  latitude: 51.4769,
  longitude: -0.0005,
  region: "Greenwich, London",
  ridingStyle: "spirited",
  skillLevel: "intermediate",
  rideFrequency: "weekly",
  bikeCategory: "Naked",
  bike: "Monster 937 SP",
  memberSince: "2024-06",
  totalRides: 45,
};

/* ─── Regions for profile setup ───────────────────────────────────── */
export const UK_REGIONS = [
  { label: "London", lat: 51.5074, lng: -0.1278 },
  { label: "South East London", lat: 51.4083, lng: -0.0158 },
  { label: "North London", lat: 51.6200, lng: -0.2400 },
  { label: "East London", lat: 51.5886, lng: -0.0166 },
  { label: "Surrey", lat: 51.3148, lng: -0.5600 },
  { label: "Kent", lat: 51.2787, lng: 1.0803 },
  { label: "Brighton", lat: 50.8225, lng: -0.1372 },
  { label: "Hampshire", lat: 51.0504, lng: -1.3128 },
  { label: "Oxford", lat: 51.7520, lng: -1.2577 },
  { label: "Reading", lat: 51.4416, lng: -0.9432 },
  { label: "Bristol", lat: 51.4545, lng: -2.5879 },
  { label: "Milton Keynes", lat: 52.0406, lng: -0.7594 },
  { label: "Guildford", lat: 51.3148, lng: -0.5600 },
  { label: "Maidstone", lat: 51.2362, lng: 0.5550 },
  { label: "Dorking", lat: 51.2681, lng: -0.3209 },
];
