"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 86% 18%, rgba(212,162,79,0.16), transparent 22rem), linear-gradient(180deg, rgba(255,253,248,0.98) 0%, rgba(246,245,240,0.92) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-[46%] blur-3xl opacity-30 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(240,216,164,0.68), rgba(40,65,57,0.16), transparent)" }}
      />

      <div className="absolute inset-y-0 left-0 w-px bg-coffee/10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 140 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="absolute top-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
        />
      </div>

      <div className="container-prose relative pb-16 pt-20 md:pb-20 md:pt-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-4 max-w-4xl font-serif text-4xl leading-[1.04] text-coffee-deep md:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-coffee/10">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="absolute left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
