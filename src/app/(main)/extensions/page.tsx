import type { Metadata } from "next";
import { Header } from "@/components/sections";
import { ExtensionStore } from "./extension-store";

export const metadata: Metadata = {
  title: "Extensions — Vicinae",
  description:
    "Browse and install community extensions for Vicinae. Extend your launcher with new capabilities.",
  openGraph: {
    title: "Extensions — Vicinae",
    description:
      "Browse and install community extensions for Vicinae. Extend your launcher with new capabilities.",
  },
};

async function getExtensions() {
  const res = await fetch("https://api.vicinae.com/v1/store/list", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return data.extensions || [];
}

export default async function ExtensionsPage() {
  const extensions = await getExtensions();

  return (
    <>
      <Header />
      <main className="pt-14 flex-1">
        <ExtensionStore extensions={extensions} />
      </main>
    </>
  );
}
