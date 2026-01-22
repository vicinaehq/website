"use client";

import { CONTRIBUTORS_URL } from "@/lib/github";
import { useEffect, useState } from "react";

export function Footer() {
  const [contributorCount, setContributorCount] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/vicinaehq/vicinae/contributors?per_page=1&anon=true")
      .then((res) => {
        const link = res.headers.get("link");
        if (link) {
          const match = link.match(/page=(\d+)>; rel="last"/);
          if (match) {
            setContributorCount(parseInt(match[1], 10));
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-zinc-200 dark:border-[#2A2A2A] bg-white dark:bg-[#121212]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-zinc-500 text-center">
          Made with{" "}
          <span className="text-red-500" aria-label="love">
            ♥
          </span>{" "}
          by{" "}
          <a
            href="https://github.com/aurelleb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Aurelle
          </a>{" "}
          and{" "}
          <a
            href={CONTRIBUTORS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            {contributorCount > 0 ? `${contributorCount} contributors` : "contributors"}
          </a>
        </p>
      </div>
    </footer>
  );
}
