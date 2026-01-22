"use client";

import { Button } from "@/components/ui";
import { siteConfig } from "@/data/landing";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const heroImages = [
	"/images/screenshot-1.png",
	"/images/screenshot-2.png",
	"/images/screenshot-9.png",
	"/images/screenshot-3.png",
	"/images/screenshot-4.png",
	"/images/screenshot-5.png",
	"/images/screenshot-6.png",
	"/images/screenshot-7.png",
	"/images/screenshot-8.png",
];

function GitHubIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="16"
			height="16"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
		</svg>
	);
}

export function Hero() {
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % heroImages.length);
		}, 2500);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-zinc-400/10 to-transparent dark:from-zinc-600/5 rounded-full blur-3xl" />
			</div>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-[#E8E6E1]"
						style={{ fontFamily: 'var(--font-kalam)' }}
					>
						{siteConfig.name}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mt-4 text-xl sm:text-2xl text-orange-600 dark:text-orange-400 font-medium"
					>
						{siteConfig.tagline}
					</motion.p>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400"
					>
						{siteConfig.description}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
					>
						<Button size="lg" asChild>
							<a href="https://docs.vicinae.com" target="_blank" rel="noopener noreferrer">Get Started</a>
						</Button>
						<Button variant="secondary" size="lg" asChild>
							<a
								href={EXTERNAL_LINKS.github}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2"
							>
								<GitHubIcon />
								View on GitHub
							</a>
						</Button>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="mt-16 sm:mt-20"
				>
					<div className="relative mx-auto max-w-4xl aspect-[1249/787]">
						<div className="absolute inset-0 -z-10 scale-105">
							<div className="absolute inset-[20%] bg-orange-500/5 rounded-full blur-3xl" />
						</div>
						<AnimatePresence>
							<motion.div
								key={currentImage}
								initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
								animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
								exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="absolute inset-0"
							>
								<Image
									src={heroImages[currentImage]}
									alt="Vicinae launcher screenshot"
									fill
									className="object-contain"
									priority
									quality={95}
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>

			</div>
		</section>
	);
}
