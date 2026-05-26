import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  title: string;
  date: string;
  summary: string;
  author: string;
  authorUsername: string;
  image: string | null;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts: PostMeta[] = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf-8");
    const { data } = matter(raw);

    return {
      title: data.title,
      date: data.date,
      summary: data.summary,
      author: data.author || "Vicinae",
      authorUsername: data.authorUsername || "",
      image: data.image || null,
      slug,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: data.title,
    date: data.date,
    summary: data.summary,
    author: data.author || "Vicinae",
    authorUsername: data.authorUsername || "",
    image: data.image || null,
    slug,
    content,
  };
}
