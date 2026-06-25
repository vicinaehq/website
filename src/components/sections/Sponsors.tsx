"use client";

import { EXTERNAL_LINKS, SPONSOR_TIERS } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

const TIER_COLORS: Record<string, string> = {
  Diamond: "text-sky-300",
  Gold: "text-amber-300",
  Silver: "text-stone-300",
  Bronze: "text-orange-300",
};

export function Sponsors() {
  return (
    <section id="sponsors" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Sponsors
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl text-stone-200">
            Backed by people who care
          </h2>
          <p className="mt-3 text-stone-400">
            Vicinae stays free and open source thanks to its sponsors.
          </p>

          <div className="mt-10 space-y-8">
            {SPONSOR_TIERS.map((tier) => (
              <div key={tier.tier}>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                    TIER_COLORS[tier.tier] ?? "text-stone-400"
                  }`}
                >
                  {tier.tier}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                  {tier.sponsors.map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-xl border border-sand-700/10 bg-ink-800/40 px-6 py-4 transition-all hover:border-sand-600/18 hover:bg-ink-700/50"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        width={36}
                        height={36}
                        className="rounded-md"
                      />
                      <span className="text-base text-stone-200">
                        {sponsor.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <a
            href={EXTERNAL_LINKS.sponsor}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-300"
          >
            Become a sponsor
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
