"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/faq";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-coffee/10 rounded-2xl bg-cream-soft border border-coffee/10 overflow-hidden">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <li key={idx}>
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-start justify-between gap-6 text-left px-6 md:px-8 py-5 hover:bg-cream transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg md:text-xl text-coffee-deep leading-snug">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="grid place-items-center w-9 h-9 rounded-full bg-coffee-dark text-cream shrink-0 mt-0.5"
              >
                <Plus className="w-4 h-4" strokeWidth={2.2} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 md:px-8 pb-6 pt-1 text-ink-soft leading-relaxed max-w-3xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
