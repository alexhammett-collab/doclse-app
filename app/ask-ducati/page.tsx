import type { Metadata } from "next";
import AskDucatiClient from "./AskDucatiClient";

export const metadata: Metadata = {
  title: "Ask a Ducati",
  description: "AI-powered Ducati technical assistant — verified specs, service intervals, and expert guidance.",
};

export default function AskDucatiPage() {
  return <AskDucatiClient />;
}
