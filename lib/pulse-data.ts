export interface Rider {
  id: string;
  name: string;
  bike: string;
  city: string;
  country: string;
  countryCode: string;
  /** Latitude -90 to 90 */
  lat: number;
  /** Longitude -180 to 180 */
  lng: number;
  /** Is riding right now */
  active: boolean;
  /** Total km logged */
  totalKm: number;
  /** Total rides */
  totalRides: number;
  avatar: string; // initials
  joinedYear: number;
  moment?: string; // latest "from the road" post
  momentTime?: string;
}

export interface Moment {
  id: string;
  riderId: string;
  riderName: string;
  bike: string;
  city: string;
  country: string;
  countryCode: string;
  text: string;
  time: string;
  ago: string;
  active: boolean;
}

export const RIDERS: Rider[] = [
  { id: "r1",  name: "Marco B.",    bike: "Panigale V4R",       city: "London",       country: "UK",          countryCode: "🇬🇧", lat: 51.5,  lng: -0.1,   active: true,  totalKm: 18400, totalRides: 112, avatar: "MB", joinedYear: 2024, moment: "Perfect morning on the A3 — sun up, no traffic, V4R singing.", momentTime: "12 min ago" },
  { id: "r2",  name: "Sofia R.",    bike: "Streetfighter V4S",  city: "Rome",         country: "Italy",        countryCode: "🇮🇹", lat: 41.9,  lng: 12.5,   active: true,  totalKm: 24100, totalRides: 203, avatar: "SR", joinedYear: 2023, moment: "Colosseum at dawn on the Streetfighter. Life is good.", momentTime: "3 min ago" },
  { id: "r3",  name: "Lukas M.",    bike: "Multistrada V4S",    city: "Munich",       country: "Germany",      countryCode: "🇩🇪", lat: 48.1,  lng: 11.6,   active: true,  totalKm: 41200, totalRides: 289, avatar: "LM", joinedYear: 2022, moment: "Alpenstraße in snow. Deserves every one of those miles.", momentTime: "8 min ago" },
  { id: "r4",  name: "Yuki T.",     bike: "Panigale V2",        city: "Tokyo",        country: "Japan",        countryCode: "🇯🇵", lat: 35.7,  lng: 139.7,  active: true,  totalKm: 9800,  totalRides: 74,  avatar: "YT", joinedYear: 2024 },
  { id: "r5",  name: "Diego F.",    bike: "Monster SP",         city: "Barcelona",    country: "Spain",        countryCode: "🇪🇸", lat: 41.4,  lng: 2.2,    active: false, totalKm: 31000, totalRides: 187, avatar: "DF", joinedYear: 2022, moment: "Montserrat loop. Best road in Spain, no debate.", momentTime: "1 hr ago" },
  { id: "r6",  name: "Chloe N.",    bike: "Hypermotard 950",    city: "Paris",        country: "France",       countryCode: "🇫🇷", lat: 48.9,  lng: 2.3,    active: false, totalKm: 12600, totalRides: 98,  avatar: "CN", joinedYear: 2024 },
  { id: "r7",  name: "Raj P.",      bike: "Diavel V4",          city: "Dubai",        country: "UAE",          countryCode: "🇦🇪", lat: 25.2,  lng: 55.3,   active: true,  totalKm: 8200,  totalRides: 61,  avatar: "RP", joinedYear: 2025, moment: "Desert highway at 5am. Empty roads, red sunrise. Nothing like it.", momentTime: "22 min ago" },
  { id: "r8",  name: "James K.",    bike: "Scrambler Icon",     city: "Sydney",       country: "Australia",    countryCode: "🇦🇺", lat: -33.9, lng: 151.2,  active: false, totalKm: 22300, totalRides: 156, avatar: "JK", joinedYear: 2023 },
  { id: "r9",  name: "Ana S.",      bike: "Panigale V4S",       city: "São Paulo",    country: "Brazil",       countryCode: "🇧🇷", lat: -23.5, lng: -46.6,  active: true,  totalKm: 15700, totalRides: 104, avatar: "AS", joinedYear: 2024, moment: "Serra da Mantiqueira. 200km of perfect tarmac.", momentTime: "41 min ago" },
  { id: "r10", name: "Björn L.",    bike: "Multistrada V2",     city: "Stockholm",    country: "Sweden",       countryCode: "🇸🇪", lat: 59.3,  lng: 18.1,   active: false, totalKm: 38900, totalRides: 267, avatar: "BL", joinedYear: 2021 },
  { id: "r11", name: "Fatima A.",   bike: "Streetfighter V2",   city: "Casablanca",   country: "Morocco",      countryCode: "🇲🇦", lat: 33.6,  lng: -7.6,   active: false, totalKm: 7400,  totalRides: 52,  avatar: "FA", joinedYear: 2025 },
  { id: "r12", name: "Chen W.",     bike: "Monster 937",        city: "Shanghai",     country: "China",        countryCode: "🇨🇳", lat: 31.2,  lng: 121.5,  active: false, totalKm: 11900, totalRides: 83,  avatar: "CW", joinedYear: 2024 },
  { id: "r13", name: "Tom H.",      bike: "Panigale V4R",       city: "Cape Town",    country: "South Africa", countryCode: "🇿🇦", lat: -33.9, lng: 18.4,   active: true,  totalKm: 19200, totalRides: 138, avatar: "TH", joinedYear: 2023, moment: "Chapman's Peak at golden hour. Worth every mile.", momentTime: "17 min ago" },
  { id: "r14", name: "Elena V.",    bike: "Hypermotard 698",    city: "Milan",        country: "Italy",        countryCode: "🇮🇹", lat: 45.5,  lng: 9.2,    active: true,  totalKm: 6800,  totalRides: 47,  avatar: "EV", joinedYear: 2025 },
  { id: "r15", name: "Kenji O.",    bike: "Multistrada V4 RS",  city: "Osaka",        country: "Japan",        countryCode: "🇯🇵", lat: 34.7,  lng: 135.5,  active: false, totalKm: 28400, totalRides: 199, avatar: "KO", joinedYear: 2022 },
  { id: "r16", name: "Priya M.",    bike: "Monster SP",         city: "Singapore",    country: "Singapore",    countryCode: "🇸🇬", lat: 1.3,   lng: 103.8,  active: false, totalKm: 4200,  totalRides: 31,  avatar: "PM", joinedYear: 2025 },
  { id: "r17", name: "Carlos M.",   bike: "Streetfighter V4 M", city: "Mexico City",  country: "Mexico",       countryCode: "🇲🇽", lat: 19.4,  lng: -99.1,  active: true,  totalKm: 13500, totalRides: 92,  avatar: "CM", joinedYear: 2024, moment: "Carretera escénica at dusk. This country has roads like nowhere else.", momentTime: "5 min ago" },
  { id: "r18", name: "Nina K.",     bike: "Panigale V4",        city: "Zurich",       country: "Switzerland",  countryCode: "🇨🇭", lat: 47.4,  lng: 8.5,    active: false, totalKm: 33100, totalRides: 224, avatar: "NK", joinedYear: 2022 },
  { id: "r19", name: "Omar B.",     bike: "Diavel V4",          city: "Cairo",        country: "Egypt",        countryCode: "🇪🇬", lat: 30.0,  lng: 31.2,   active: false, totalKm: 9100,  totalRides: 65,  avatar: "OB", joinedYear: 2024 },
  { id: "r20", name: "Isla T.",     bike: "Scrambler Nightshift","city": "Edinburgh", country: "UK",           countryCode: "🇬🇧", lat: 55.95, lng: -3.2,   active: false, totalKm: 16200, totalRides: 121, avatar: "IT", joinedYear: 2023 },
  { id: "r21", name: "André L.",    bike: "Multistrada V4S",    city: "Lyon",         country: "France",       countryCode: "🇫🇷", lat: 45.75, lng: 4.83,   active: true,  totalKm: 27800, totalRides: 193, avatar: "AL", joinedYear: 2022, moment: "Gorges du Verdon. If you haven't, stop reading and go.", momentTime: "31 min ago" },
  { id: "r22", name: "Sarah O.",    bike: "Panigale V4S",       city: "Toronto",      country: "Canada",       countryCode: "🇨🇦", lat: 43.7,  lng: -79.4,  active: false, totalKm: 14900, totalRides: 107, avatar: "SO", joinedYear: 2023 },
  { id: "r23", name: "Viktor P.",   bike: "Streetfighter V4S",  city: "Prague",       country: "Czech Rep.",   countryCode: "🇨🇿", lat: 50.1,  lng: 14.4,   active: false, totalKm: 21500, totalRides: 158, avatar: "VP", joinedYear: 2023 },
  { id: "r24", name: "Ali H.",      bike: "Monster 937",        city: "Istanbul",     country: "Turkey",       countryCode: "🇹🇷", lat: 41.0,  lng: 28.95,  active: true,  totalKm: 10300, totalRides: 79,  avatar: "AH", joinedYear: 2024 },
];

export const MOMENTS: Moment[] = RIDERS
  .filter(r => r.moment)
  .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))
  .map(r => ({
    id:          `m-${r.id}`,
    riderId:     r.id,
    riderName:   r.name,
    bike:        r.bike,
    city:        r.city,
    country:     r.country,
    countryCode: r.countryCode,
    text:        r.moment!,
    time:        r.momentTime!,
    ago:         r.momentTime!,
    active:      r.active,
  }));

export const ACTIVE_COUNT  = RIDERS.filter(r => r.active).length;
export const COUNTRY_COUNT = new Set(RIDERS.map(r => r.country)).size;
export const TOTAL_KM      = RIDERS.reduce((s, r) => s + r.totalKm, 0);
