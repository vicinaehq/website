import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/sections";
import { getAllPosts, type PostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts — Vicinae",
  description:
    "News, updates, and deep dives from the Vicinae project.",
  openGraph: {
    title: "Posts — Vicinae",
    description:
      "News, updates, and deep dives from the Vicinae project.",
    url: "https://vicinae.com/posts",
    siteName: "Vicinae",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Posts — Vicinae",
    description:
      "News, updates, and deep dives from the Vicinae project.",
  },
};

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

function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group relative flex flex-col sm:flex-row rounded-xl bg-ink-800/40 border border-sand-700/8 overflow-hidden transition-all duration-250 hover:bg-ink-800/70 hover:border-sand-600/18 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(154,123,63,0.08)] animate-fade-in"
    >
      {post.image && (
        <div className="relative sm:w-1/2 h-52 sm:h-auto overflow-hidden">
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-800/60 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-800/60 to-transparent sm:hidden" />
        </div>
      )}
      <div className="flex flex-col justify-center flex-1 p-6 sm:p-8">
        <span className="text-xs text-sand-400/60 uppercase tracking-wider">
          Latest
        </span>
        <h3 className="mt-2 text-xl sm:text-2xl font-medium text-stone-100 group-hover:text-sand-200 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-stone-400 leading-relaxed line-clamp-3 group-hover:text-stone-300 transition-colors">
          {post.summary}
        </p>
        <div className="mt-5 flex items-center gap-3">
          {post.authorUsername && (
            <Image
              src={avatarUrl(post.authorUsername)}
              alt={post.author}
              width={22}
              height={22}
              className="rounded-full"
            />
          )}
          <span className="text-[12px] text-stone-500">{post.author}</span>
          <span className="text-stone-700">&middot;</span>
          <span className="text-[12px] text-stone-500">
            {formatDate(post.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group relative flex flex-col rounded-xl bg-ink-800/40 border border-sand-700/8 overflow-hidden transition-all duration-250 hover:bg-ink-800/70 hover:border-sand-600/18 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(154,123,63,0.08)] animate-fade-in"
      style={{
        animationDelay: `${Math.min(index * 30, 300)}ms`,
      }}
    >
      {post.image && (
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-800/80 to-transparent" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs text-stone-500">
          {formatDate(post.date)}
        </span>
        <h3 className="mt-1.5 text-base font-medium text-stone-200 group-hover:text-sand-200 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-[13px] text-stone-500 leading-relaxed line-clamp-2 flex-1 group-hover:text-stone-400 transition-colors">
          {post.summary}
        </p>
        {post.authorUsername && (
          <div className="mt-4 flex items-center gap-2">
            <Image
              src={avatarUrl(post.authorUsername)}
              alt={post.author}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-[12px] text-stone-500">
              {post.author}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function PostsPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <section className="relative py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(154,123,63,0.07) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-[100px] right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(86,122,108,0.06) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl text-stone-100">
                Posts
              </h1>
              <p className="mt-2 text-stone-500 text-[15px]">
                News, updates, and deep dives.
              </p>
            </div>

            {featured && (
              <div className="mt-10">
                <FeaturedPost post={featured} />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              {rest.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
