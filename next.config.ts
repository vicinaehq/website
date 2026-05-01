import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.vicinae.com",
				pathname: "/storage/extensions/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/discord",
				destination: "https://discord.com/invite/rP4ecD42p7",
				permanent: false,
			},
			{
				source: "/docs",
				destination: "https://docs.vicinae.com",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
