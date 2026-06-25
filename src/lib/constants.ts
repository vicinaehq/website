export const EXTERNAL_LINKS = {
  github: "https://github.com/vicinaehq/vicinae",
  discord: "https://discord.com/invite/rP4ecD42p7",
  docs: "https://docs.vicinae.com",
  extensions: "https://github.com/vicinaehq/extensions",
  apiReference: "https://docs.vicinae.com/api-reference",
  installGuide: "https://docs.vicinae.com/getting-started/installation",
  sponsor: "https://github.com/sponsors/vicinaehq",
};

export const SPONSOR_TIERS = [
  {
    tier: "Gold",
    sponsors: [
      {
        name: "Depot",
        href: "https://depot.dev/?utm_source=vicinae&utm_medium=readme",
        logo: "/images/depot.png",
      },
    ],
  },
  {
    tier: "Silver",
    sponsors: [
      {
        name: "CodeRabbit",
        href: "https://coderabbit.link/vicinaehq",
        logo: "/images/coderabbit.svg",
      },
    ],
  },
];

export const NAV_LINKS = [
  { label: "Extensions", href: "/extensions" },
  { label: "Docs", href: EXTERNAL_LINKS.docs, external: true },
];
