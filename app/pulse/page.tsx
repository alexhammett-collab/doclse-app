import type { Metadata } from "next";
import PulseClient from "./PulseClient";

export const metadata: Metadata = {
  title: "Pulse — Global Ducati Community",
  description: "See Ducati riders active around the world right now.",
};

export default function PulsePage() {
  return <PulseClient />;
}
