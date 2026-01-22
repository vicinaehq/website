"use client";

import { Button } from "@/components/ui";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

export function ExtensionShowcase() {
	return (
		<section id="extensions" className="py-20 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center max-w-3xl mx-auto"
				>
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-[#E8E6E1]">
						Build your own extensions
					</h2>
					<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
						Create powerful extensions with React and TypeScript. No web browser involved.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Button asChild>
							<a
								href="https://docs.vicinae.com/extensions/introduction"
								target="_blank"
								rel="noopener noreferrer"
							>
								Get Started
							</a>
						</Button>
						<Button variant="secondary" asChild>
							<a
								href={EXTERNAL_LINKS.extensions}
								target="_blank"
								rel="noopener noreferrer"
							>
								Browse Extensions
							</a>
						</Button>
					</div>
				</motion.div>

				<div className="relative mt-12 sm:mt-16 h-[500px] sm:h-[600px] lg:h-[700px]">
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="absolute left-0 top-0 w-[75%] lg:w-[65%] z-10"
					>
						<Image
							src="/images/code.png"
							alt="Extension code example"
							width={1000}
							height={700}
							className="w-full h-auto rounded-xl shadow-2xl"
							quality={95}
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.25 }}
						className="absolute -right-8 lg:-right-12 bottom-0 w-[70%] lg:w-[58%] z-20"
					>
						<Image
							src="/images/code-ui.png"
							alt="Resulting UI from the extension code"
							width={800}
							height={600}
							className="w-full h-auto drop-shadow-2xl"
							quality={95}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
