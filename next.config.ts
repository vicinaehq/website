import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
