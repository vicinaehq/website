import { getContributorCount, CONTRIBUTORS_URL } from "@/lib/github";

export async function Footer() {
  const contributorCount = await getContributorCount();

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
