const GITHUB_REPO = "vicinaehq/vicinae";
const CACHE_DURATION = 3600;

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

export const CONTRIBUTORS_URL = `https://github.com/${GITHUB_REPO}/graphs/contributors`;
