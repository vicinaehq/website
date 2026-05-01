"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Author {
  handle: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
}

interface Command {
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

interface Extension {
  id: string;
  name: string;
  title: string;
  description: string;
  author: Author;
  downloadCount: number;
  icons: { light: string | null; dark: string | null };
  categories: { id: string; name: string }[];
  commands: Command[];
  sourceUrl: string;
  downloadUrl: string;
  createdAt: string;
}

const CATEGORY_ORDER = [
  "System",
  "Developer Tools",
  "Productivity",
  "Web",
  "Security",
  "Applications",
  "Design Tools",
  "Media",
  "Finance",
  "Fun",
  "Data",
  "Other",
];

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExtensionIcon({ src, title }: { src: string | null; title: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-10 h-10 rounded-[10px] bg-ink-700/80 flex items-center justify-center text-sage-500/60 text-sm font-medium shrink-0">
        {title.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={title}
      width={40}
      height={40}
      className="w-10 h-10 rounded-[10px] shrink-0 object-cover"
      onError={() => setError(true)}
    />
  );
}

type SortOption = "popular" | "newest" | "name";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "Most popular",
  newest: "Newest",
  name: "Alphabetical",
};

function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 rounded-lg bg-ink-800/60 border border-sand-700/10 pl-3 pr-3 text-sm text-stone-400 outline-none transition-all focus:border-sand-500/25 cursor-pointer flex items-center gap-2 hover:bg-ink-700/50 hover:border-sand-700/15"
      >
        {SORT_LABELS[value]}
        <span className={`text-stone-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDownIcon />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-lg border border-sand-700/12 bg-ink-800 py-1 shadow-xl shadow-black/40 animate-fade-in-subtle">
          {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer ${
                value === key
                  ? "text-sand-300 bg-sand-600/10"
                  : "text-stone-400 hover:text-stone-200 hover:bg-sand-700/[0.06]"
              }`}
            >
              {SORT_LABELS[key]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ExtensionCard({ ext, index }: { ext: Extension; index: number }) {
  return (
    <Link
      href={`/extensions/${ext.author.handle}/${ext.name}`}
      className="group relative flex flex-col rounded-xl bg-ink-800/40 border border-sand-700/8 p-5 transition-all duration-250 hover:bg-ink-800/70 hover:border-sand-600/18 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(154,123,63,0.08)] animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <div className="flex items-start gap-3.5">
        <ExtensionIcon src={ext.icons.dark} title={ext.title} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-medium text-stone-200 truncate group-hover:text-sand-200 transition-colors">
            {ext.title}
          </h3>
          <span className="text-xs text-stone-500 group-hover:text-stone-400 transition-colors inline-flex items-center gap-1.5">
            <Image src={ext.author.avatarUrl} alt={ext.author.handle} width={14} height={14} className="w-3.5 h-3.5 rounded-full" />
            {ext.author.name || ext.author.handle}
          </span>
        </div>
        <span className="text-[11px] text-sage-500/70 flex items-center gap-1 shrink-0 pt-0.5 tabular-nums">
          {formatCount(ext.downloadCount)}
        </span>
      </div>

      <p className="mt-3 text-[13px] text-stone-500 leading-relaxed line-clamp-2 text-ellipsis flex-1 group-hover:text-stone-400 transition-colors">
        {ext.description}
      </p>

      <div className="mt-3 flex items-center gap-1.5 flex-wrap min-h-[20px]">
        {ext.categories.slice(0, 2).map((cat) => (
          <span
            key={cat.id}
            className="text-[10px] text-sage-400/60 bg-sage-700/10 rounded-md px-1.5 py-0.5 leading-tight"
          >
            {cat.name}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-4 pt-3.5 border-t border-sand-700/6 flex items-center gap-2">
        <a
          href={`vicinae://extensions/${ext.author.handle}/${ext.name}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg btn-warm h-8 text-[13px]"
        >
          Install
        </a>
        <a
          href={ext.downloadUrl}
          title="Download bundle"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center rounded-lg text-stone-600 h-8 w-8 transition-all hover:text-sage-400 hover:bg-sage-700/10"
        >
          <DownloadIcon />
        </a>
        <a
          href={ext.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View source"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center rounded-lg text-stone-600 h-8 w-8 transition-all hover:text-stone-300 hover:bg-ink-700/50"
        >
          <GitHubIcon />
        </a>
      </div>
    </Link>
  );
}

export function ExtensionStore({ extensions }: { extensions: Extension[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("popular");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const ext of extensions) {
      for (const cat of ext.categories) {
        counts.set(cat.name, (counts.get(cat.name) || 0) + 1);
      }
    }
    return CATEGORY_ORDER.filter((name) => counts.has(name)).map((name) => ({
      name,
      count: counts.get(name)!,
    }));
  }, [extensions]);

  const filtered = useMemo(() => {
    let result = extensions;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (ext) =>
          ext.title.toLowerCase().includes(q) ||
          ext.description.toLowerCase().includes(q) ||
          ext.author.handle.toLowerCase().includes(q) ||
          ext.author.name.toLowerCase().includes(q) ||
          ext.commands.some((c) => c.title.toLowerCase().includes(q)),
      );
    }

    if (activeCategory) {
      result = result.filter((ext) =>
        ext.categories.some((c) => c.name === activeCategory),
      );
    }

    switch (sort) {
      case "popular":
        result = [...result].sort(
          (a, b) => b.downloadCount - a.downloadCount,
        );
        break;
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "name":
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title),
        );
        break;
    }

    return result;
  }, [extensions, search, activeCategory, sort]);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[200px] left-1/4 w-[700px] h-[500px] rounded-full blur-[180px] opacity-50"
          style={{
            background:
              "radial-gradient(ellipse, rgba(154,123,63,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[500px] right-1/3 w-[400px] h-[400px] rounded-full blur-[150px] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(86,122,108,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl text-stone-100">
            Extensions
          </h1>
          <p className="mt-2 text-sage-400/60 text-[15px]">
            {extensions.length} extensions built by the community
          </p>
        </div>

        <div className="mt-8 relative z-20 flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="relative flex-1 group/search">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600 transition-colors group-focus-within/search:text-sand-500">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search extensions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 rounded-lg bg-ink-800/60 border border-sand-700/10 pl-10 pr-4 text-sm text-stone-200 placeholder:text-stone-600 outline-none transition-all focus:border-sand-500/25 focus:bg-ink-800/80 focus:shadow-[0_0_0_3px_rgba(154,123,63,0.06)]"
            />
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="mt-5 flex items-center gap-1.5 flex-wrap animate-fade-in" style={{ animationDelay: "100ms" }}>
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              activeCategory === null
                ? "bg-sand-500 text-ink-900 shadow-[0_0_16px_-2px_rgba(184,148,78,0.25)]"
                : "text-stone-500 hover:text-stone-300 hover:bg-ink-700/50"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.name ? null : cat.name,
                )
              }
              className={`rounded-full px-3.5 py-1.5 text-xs transition-all cursor-pointer ${
                activeCategory === cat.name
                  ? "bg-sand-500 text-ink-900 font-medium shadow-[0_0_16px_-2px_rgba(184,148,78,0.25)]"
                  : "text-stone-500 hover:text-stone-300 hover:bg-ink-700/50"
              }`}
            >
              {cat.name}
              <span className={`ml-1.5 tabular-nums ${activeCategory === cat.name ? "text-ink-900/50" : "text-stone-700"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="py-20 text-center animate-fade-in">
              <p className="text-stone-500">
                No extensions found
                {search && (
                  <>
                    {" "}for &ldquo;{search}&rdquo;
                  </>
                )}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((ext, i) => (
                <ExtensionCard key={ext.id} ext={ext} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
