"use client";

import { SPONSOR_TIERS } from "@/lib/constants";
import { CONTRIBUTORS_URL } from "@/lib/github";
import Image from "next/image";
import { useEffect, useState } from "react";

const FOOTER_SPONSORS = SPONSOR_TIERS.flatMap((tier) =>
  tier.sponsors.map((sponsor) => ({ ...sponsor, tier: tier.tier })),
);

export function Footer() {
  const [contributorCount, setContributorCount] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/vicinaehq/vicinae/contributors?per_page=1&anon=true",
    )
      .then((res) => {
        const link = res.headers.get("link");
        if (link) {
          const match = link.match(/page=(\d+)>; rel="last"/);
          if (match) setContributorCount(parseInt(match[1], 10));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="py-8 border-t border-sand-700/8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {FOOTER_SPONSORS.length > 0 && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-stone-600">
              Sponsored by
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {FOOTER_SPONSORS.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-300"
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  {sponsor.name}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center gap-4 mb-3 text-xs">
          <a
            href="/open-data"
            className="text-stone-600 hover:text-stone-300 transition-colors"
          >
            Open Data
          </a>
        </div>
        <p className="text-sm text-stone-600 text-center">
          Made with{" "}
          <span className="text-sand-500" aria-label="love">
            ♥
          </span>{" "}
          by{" "}
          <a
            href="https://github.com/aurelleb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-300 transition-colors"
          >
            Aurelle
          </a>{" "}
          and{" "}
          <a
            href={CONTRIBUTORS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-300 transition-colors"
          >
            {contributorCount > 0
              ? `${contributorCount} contributors`
              : "contributors"}
          </a>
        </p>
      </div>
    </footer>
  );
}
