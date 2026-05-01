"use client";

import { CONTRIBUTORS_URL } from "@/lib/github";
import { useEffect, useState } from "react";

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
