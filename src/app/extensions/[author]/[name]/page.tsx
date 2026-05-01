import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections";
import { ExtensionDetail } from "./extension-detail";

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
  commands: { id: string; name: string; title: string; subtitle: string; mode: string; icons: { light: string | null; dark: string | null } }[];
  sourceUrl: string;
  readmeUrl: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

async function getExtension(
  author: string,
  name: string,
): Promise<Extension | null> {
  const res = await fetch("https://api.vicinae.com/v1/store/list", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return (
    data.extensions?.find(
      (ext: Extension) =>
        ext.author.handle === author && ext.name === name,
    ) ?? null
  );
}

function readmeUrlToRaw(readmeUrl: string): string {
  return readmeUrl
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/tree/", "/");
}

async function getReadme(readmeUrl: string): Promise<string> {
  try {
    const res = await fetch(readmeUrlToRaw(readmeUrl), {
      next: { revalidate: 300 },
    });
    if (!res.ok) return "";
    return res.text();
  } catch {
    return "";
  }
}

async function getAllExtensions(): Promise<Extension[]> {
  const res = await fetch("https://api.vicinae.com/v1/store/list", {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return data.extensions || [];
}

export async function generateStaticParams() {
  const extensions = await getAllExtensions();
  return extensions.map((ext) => ({
    author: ext.author.handle,
    name: ext.name,
  }));
}

type Props = {
  params: Promise<{ author: string; name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { author, name } = await params;
  const ext = await getExtension(author, name);
  if (!ext) return { title: "Extension not found — Vicinae" };

  const title = `${ext.title} extension for Vicinae`;
  const description = ext.description;
  const categories = ext.categories.map((c) => c.name);

  return {
    title,
    description,
    keywords: [
      "vicinae",
      "extension",
      "linux",
      "launcher",
      ext.title.toLowerCase(),
      ext.author.handle,
      ...categories.map((c) => c.toLowerCase()),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://vicinae.com/extensions/${ext.author.handle}/${ext.name}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ExtensionPage({ params }: Props) {
  const { author, name } = await params;
  const ext = await getExtension(author, name);
  if (!ext) notFound();

  const readme = await getReadme(ext.readmeUrl);

  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen">
        <ExtensionDetail extension={ext} readme={readme} />
      </main>
    </>
  );
}
