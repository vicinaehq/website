import { unstable_cache } from "next/cache";

const GITHUB_REPO = "vicinaehq/vicinae";
const CACHE_DURATION = 3600;
// The install script installs the *latest* release, so the tag we serve it
// from must track new releases closely to stay in sync with release assets.
const RELEASE_TAG_CACHE_DURATION = 60;

export async function getContributorCount(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=1&anon=true`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: CACHE_DURATION },
      }
    );

    if (!res.ok) {
      return 0;
    }

    const linkHeader = res.headers.get("link");
    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    const contributors = await res.json();
    return Array.isArray(contributors) ? contributors.length : 0;
  } catch {
    return 0;
  }
}

// Resolved via the github.com redirect rather than api.github.com: the API
// allows only 60 unauthenticated requests/hour, too few for a 60s cache.
export const getLatestReleaseTag = unstable_cache(
  async (): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://github.com/${GITHUB_REPO}/releases/latest`,
        { redirect: "manual" }
      );

      const location = res.headers.get("location");
      const match = location?.match(/\/releases\/tag\/([^/?#]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    } catch {
      return null;
    }
  },
  ["latest-release-tag"],
  { revalidate: RELEASE_TAG_CACHE_DURATION }
);

export const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}`;

export const CONTRIBUTORS_URL = `https://github.com/${GITHUB_REPO}/graphs/contributors`;
