import type { Metadata } from "next";
import RidesClient from "./RidesClient";

export const metadata: Metadata = { title: "Ride Outs & Route Planner" };

export default function RidesPage() {
  return <RidesClient />;
}
