"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Extension {
  id: string;
  name: string;
  title: string;
  description: string;
  author: {
    handle: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
  };
  downloadCount: number;
  icons: { light: string | null; dark: string | null };
  categories: { id: string; name: string }[];
  commands: {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    mode: string;
    icons: { light: string | null; dark: string | null };
  }[];
  sourceUrl: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ExtensionIcon({ src, title }: { src: string | null; title: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-16 h-16 rounded-xl bg-ink-700/80 flex items-center justify-center text-sage-500/60 text-xl font-medium shrink-0">
        {title.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={title}
      width={64}
      height={64}
      className="w-16 h-16 rounded-xl shrink-0 object-cover"
      onError={() => setError(true)}
    />
  );
}

function CommandIcon({
  commandIcon,
  extensionIcon,
  title,
}: {
  commandIcon: string | null;
  extensionIcon: string | null;
  title: string;
}) {
  const [error, setError] = useState(false);
  const src = commandIcon || extensionIcon;

  if (!src || error) {
    return (
      <div className="w-5 h-5 rounded bg-ink-700/80 flex items-center justify-center text-sage-500/50 text-[9px] font-medium shrink-0">
        {title.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={title}
      width={20}
      height={20}
      className="w-5 h-5 rounded shrink-0 object-cover"
      onError={() => setError(true)}
    />
  );
}

function resolveImageSrc(src: string, sourceUrl: string): string {
  if (src.startsWith("http")) return src;
  const base = sourceUrl
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/tree/", "/");
  return `${base}/${src}`;
}

export function ExtensionDetail({
  extension: ext,
  readme,
}: {
  extension: Extension;
  readme: string;
}) {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[100px] left-1/3 w-[600px] h-[400px] rounded-full blur-[160px] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(154,123,63,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <Link
            href="/extensions"
            className="text-sm text-stone-500 hover:text-sand-400 transition-colors inline-flex items-center gap-1.5 group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Extensions
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6 animate-fade-in" style={{ animationDelay: "50ms" }}>
              <div className="flex items-start gap-4">
                <ExtensionIcon src={ext.icons.dark} title={ext.title} />
                <div className="min-w-0">
                  <h1 className="text-2xl text-stone-100 leading-tight">
                    {ext.title}
                  </h1>
                  <a
                    href={ext.author.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-sand-400 transition-colors"
                  >
                    <Image
                      src={ext.author.avatarUrl}
                      alt={ext.author.handle}
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px] rounded-full"
                    />
                    {ext.author.name || ext.author.handle}
                  </a>
                </div>
              </div>

              <p className="text-[14px] text-stone-400 leading-relaxed">
                {ext.description}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`vicinae://extensions/${ext.author.handle}/${ext.name}`}
                  className="btn-warm inline-flex items-center justify-center gap-2 rounded-lg h-10 text-sm"
                >
                  Install in Vicinae
                </a>
                <div className="flex gap-2">
                  <a
                    href={ext.downloadUrl}
                    title="Download bundle"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-ink-800/60 border border-sand-700/10 text-stone-400 h-9 text-[13px] transition-all hover:bg-ink-700/50 hover:border-sand-700/18 hover:text-stone-200"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download
                  </a>
                  <a
                    href={ext.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View source"
                    className="inline-flex items-center justify-center rounded-lg bg-ink-800/60 border border-sand-700/10 text-stone-400 h-9 w-9 transition-all hover:bg-ink-700/50 hover:border-sand-700/18 hover:text-stone-200"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="rounded-lg bg-ink-800/40 border border-sand-700/8 divide-y divide-sand-700/6 overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-stone-500">Downloads</span>
                  <span className="text-sm text-sage-300 tabular-nums">{formatCount(ext.downloadCount)}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-stone-500">Updated</span>
                  <span className="text-sm text-stone-300">{formatDate(ext.updatedAt)}</span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-stone-500">Created</span>
                  <span className="text-sm text-stone-300">{formatDate(ext.createdAt)}</span>
                </div>
              </div>

              {ext.categories.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ext.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href="/extensions"
                      className="text-[11px] text-sage-400/60 bg-sage-700/10 rounded-md px-2 py-0.5 hover:text-sage-300 hover:bg-sage-700/15 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {ext.commands.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2.5">
                    {ext.commands.length} {ext.commands.length === 1 ? "command" : "commands"}
                  </h2>
                  <div className="space-y-0.5">
                    {ext.commands.map((cmd) => (
                      <div
                        key={cmd.id}
                        className="flex items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors hover:bg-ink-700/40"
                      >
                        <CommandIcon
                          commandIcon={cmd.icons.dark}
                          extensionIcon={ext.icons.dark}
                          title={cmd.title}
                        />
                        <span className="text-[13px] text-stone-300 truncate">
                          {cmd.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {readme ? (
              <div className="rounded-xl bg-ink-800/30 border border-sand-700/8 overflow-hidden">
                <div className="h-[2px] bg-gradient-to-r from-sand-500/40 via-sand-600/15 to-transparent" />
                <div className="px-6 sm:px-8 py-6 sm:py-8">
                  <div className="prose-vicinae">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        img: ({ src, alt, ...props }) => {
                          if (!src || typeof src !== "string") return null;
                          const resolved = resolveImageSrc(src, ext.sourceUrl);
                          return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={resolved}
                              alt={alt || ""}
                              loading="lazy"
                              {...props}
                            />
                          );
                        },
                        a: ({ href, children, ...props }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {readme}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-stone-600 text-sm">No README available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
