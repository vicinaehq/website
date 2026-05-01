"use client";

import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import Image from "next/image";

export function ExtensionShowcase() {
  return (
    <section id="extensions" className="py-24 sm:py-32 bg-ink-800/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl text-stone-200">
            Build your own
          </h2>
          <p className="mt-4 text-stone-400">
            Write extensions with React and TypeScript. Your code becomes native
            UI — no browser involved.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href="https://docs.vicinae.com/extensions/introduction"
              external
            >
              Documentation
            </Button>
            <Button
              variant="secondary"
              href="/extensions"
            >
              Browse Extensions
            </Button>
          </div>
        </motion.div>

        <div className="relative mt-16 h-[450px] sm:h-[550px] lg:h-[650px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute left-0 top-0 w-[75%] lg:w-[65%] z-10"
          >
            <Image
              src="/images/code.png"
              alt="Extension source code"
              width={1000}
              height={700}
              className="w-full h-auto rounded-xl shadow-2xl shadow-black/30"
              quality={95}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute right-0 bottom-0 w-[65%] lg:w-[55%] z-20"
          >
            <Image
              src="/images/code-ui.png"
              alt="Resulting extension UI"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl shadow-2xl shadow-black/30"
              quality={95}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
