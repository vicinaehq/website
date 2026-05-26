"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const match of markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = match[2].replace(/\*\*/g, "");
    entries.push({ id: slugify(text), text, level: match[1].length });
  }
  return entries;
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-.8 10.45a.75.75 0 0 0 1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 1 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25z" />
    </svg>
  );
}

function TableOfContents({
  entries,
  activeId,
}: {
  entries: TocEntry[];
  activeId: string;
}) {
  return (
    <nav className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-24">
        <p className="text-[11px] text-stone-600 uppercase tracking-wider mb-3">
          On this page
        </p>
        <ul className="space-y-1.5 border-l border-sand-700/10">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`block text-[13px] leading-snug transition-colors duration-150 ${
                  entry.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === entry.id
                    ? "text-sand-400 border-l-2 border-sand-400 -ml-px"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function PostContent({ content }: { content: string }) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }
  }, [headings]);

  useEffect(() => {
    const timer = setTimeout(setupObserver, 100);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  function LinkedHeading({
    level,
    children,
    ...props
  }: {
    level: number;
    children?: React.ReactNode;
    [key: string]: unknown;
  }) {
    const text = String(children ?? "");
    const id = slugify(text);
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <Tag id={id} className="group/heading scroll-mt-20" {...props}>
        <a
          href={`#${id}`}
          className="no-underline! flex items-center gap-2"
        >
          {children}
          <span className="opacity-0 group-hover/heading:opacity-100 transition-opacity text-stone-600 hover:text-sand-400">
            <LinkIcon />
          </span>
        </a>
      </Tag>
    );
  }

  return (
    <div className="flex gap-8 items-start">
      <div className="rounded-xl bg-ink-800/30 border border-sand-700/8 overflow-hidden animate-fade-in flex-1 min-w-0">
        <div className="h-[2px] bg-gradient-to-r from-sand-500/40 via-sand-600/15 to-transparent" />
        <div className="px-6 sm:px-10 py-8 sm:py-10">
          <div className="prose-vicinae">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ children, ...props }) => (
                  <LinkedHeading level={2} {...props}>
                    {children}
                  </LinkedHeading>
                ),
                h3: ({ children, ...props }) => (
                  <LinkedHeading level={3} {...props}>
                    {children}
                  </LinkedHeading>
                ),
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
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {headings.length > 0 && (
        <TableOfContents entries={headings} activeId={activeId} />
      )}
    </div>
  );
}
