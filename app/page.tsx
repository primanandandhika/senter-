import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "SENTER — Understand Your Energy",
  description:
    "Explore a simulated, appliance-level view of electricity use, estimated costs, and preliminary energy insights for Indonesian coffee shops.",
};

export default function Home() {
  return <LandingPage />;
}
