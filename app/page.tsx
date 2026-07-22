import type { Metadata } from "next";
import { VisionHome } from "@/components/vision/VisionHome";

export const metadata: Metadata = {
  title: "Hanaply Vision | AI Career Radar",
  description: "Explore the vision behind Hanaply, an AI Career Radar designed to discover meaningful opportunities, explain real job fit, and prepare truthful personalized Application Packs.",
  alternates: { canonical: "/" },
};

export default function HomePage() { return <VisionHome />; }
