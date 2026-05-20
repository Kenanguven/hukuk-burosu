"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "mh-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = window.setTimeout(() => {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (!v) setVisible(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function set(value: "accepted" | "rejected") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[60] md:bottom-6 md:left-auto md:right-6 md:max-w-md"
        >
          <div className="premium-glass rounded-[1.65rem] p-4 text-coffee-deep md:p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-graphite text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                <Cookie className="h-5 w-5" />
              </span>
              <div className="min-w-0 space-y-2">
                <p className="text-sm font-medium leading-relaxed text-ink-soft">
                  Sitemizin işleyişi için zorunlu çerezleri kullanıyoruz. Detaylar
                  için{" "}
                  <Link
                    href="/gizlilik"
                    className="text-coffee-deep underline decoration-gold/60 underline-offset-4"
                  >
                    Gizlilik Politikası
                  </Link>
                  .
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => set("accepted")}
                    className="rounded-full bg-graphite px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-coffee-dark"
                  >
                    Kabul Et
                  </button>
                  <button
                    onClick={() => set("rejected")}
                    className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-soft/80 hover:text-coffee-deep"
                  >
                    Reddet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
