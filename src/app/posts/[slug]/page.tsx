import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/sections";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { PostContent } from "./post-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found — Vicinae" };

  const title = `${post.title} — Vicinae`;
  const description = post.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://vicinae.com/posts/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function avatarUrl(username: string): string {
  return `https://avatars.githubusercontent.com/${username}`;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
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

          <div className="mx-auto max-w-5xl xl:max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 animate-fade-in">
              <Link
                href="/posts"
                className="text-sm text-stone-500 hover:text-sand-400 transition-colors inline-flex items-center gap-1.5 group"
              >
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="transition-transform group-hover:-translate-x-0.5"
                >
                  <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z" />
                </svg>
                Posts
              </Link>
            </div>

            {post.image && (
              <div
                className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-8 animate-fade-in"
                style={{ animationDelay: "50ms" }}
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900/30 to-transparent" />
              </div>
            )}

            <header
              className="mb-10 animate-fade-in"
              style={{ animationDelay: post.image ? "100ms" : "50ms" }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-stone-100 leading-tight">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-sm text-stone-500">
                {post.authorUsername && (
                  <Image
                    src={avatarUrl(post.authorUsername)}
                    alt={post.author}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <span>{post.author}</span>
                <span className="text-stone-700">&middot;</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </header>

            <PostContent content={post.content} />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
