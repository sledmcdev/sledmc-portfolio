import type { Metadata } from "next";
import ClientsSection from "@/components/pages/ClientsSection";
import meta from "@/data/pages/clients/meta.json";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function ClientsPage() {
  return <ClientsSection />;
}
