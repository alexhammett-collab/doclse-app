import type { Metadata } from "next";
import RideSwapClient from "./RideSwapClient";

export const metadata: Metadata = {
  title: "RideSwap — Swap Your Ducati for a Day",
  description: "Swap your Ducati with fellow DOCLSE members. Experience a different machine, covered by SwapShield insurance.",
};

export default function RideSwapPage() {
  return <RideSwapClient />;
}
