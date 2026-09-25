import type { Metadata } from "next";
import meta from "@/data/pages/academy/meta.json";
import AcademyContent from "./AcademyContent";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AcademyPage() {
  return <AcademyContent />;
}
