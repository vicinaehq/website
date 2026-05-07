import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/sections";
import { AnalyticsDashboard } from "./analytics-dashboard";

export const metadata: Metadata = {
  title: "Open Data - Vicinae",
  description:
    "Public telemetry data from Vicinae users. See adoption trends, platform breakdowns, and usage statistics.",
  openGraph: {
    title: "Open Data - Vicinae",
    description:
      "Public telemetry data from Vicinae users. See adoption trends, platform breakdowns, and usage statistics.",
  },
};

export default function DataPage() {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
              <div className="h-[350px] flex items-center justify-center text-stone-600 text-sm">
                Loading...
              </div>
            </div>
          }
        >
          <AnalyticsDashboard />
        </Suspense>
      </main>
    </>
  );
}
