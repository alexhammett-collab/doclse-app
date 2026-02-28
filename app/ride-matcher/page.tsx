import type { Metadata } from "next";
import RideMatcherClient from "./RideMatcherClient";

export const metadata: Metadata = {
  title: "AI Ride Matcher",
  description: "Find compatible Ducati riding partners near you with AI-powered matching.",
};

export default function RideMatcherPage() {
  return <RideMatcherClient />;
}
