import type { Metadata } from "next";
import AskDucatiClient from "./AskDucatiClient";

export const metadata: Metadata = {
  title: "Ducati AI Technical Assistant",
  description: "AI-powered Ducati technical assistant — GPT-4o with live web search, verified specs, service intervals, and expert guidance.",
};

export default function AskDucatiPage() {
  return <AskDucatiClient />;
}
