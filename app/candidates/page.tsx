import type { Metadata } from "next";
import CandidatesSection from "@/components/pages/CandidatesSection";
import meta from "@/data/pages/candidates/meta.json";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function CandidatesPage() {
  return <CandidatesSection />;
}
