"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 px-0 py-3"
    >
      <div
        className={`container-prose transition-all duration-300 ${
          scrolled ? "scale-[0.992]" : "scale-100"
        }`}
      >
        <div className="premium-glass flex items-center justify-between rounded-full px-3.5 py-3 md:px-4">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 group">
            <span className="block transition-transform duration-300 group-hover:-rotate-3">
              <Logo variant="gold" size={40} />
            </span>
            <span className="font-serif text-xl text-coffee-deep tracking-tight">
              {site.shortName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-coffee-deep" : "text-ink-soft hover:bg-cream-soft/70 hover:text-coffee-deep"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-cream-soft/80 ring-1 ring-coffee/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5"
            >
              WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid min-h-11 min-w-11 place-items-center rounded-full text-coffee-deep transition-colors hover:bg-cream-soft/70"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="container-prose pt-2">
              <div className="premium-glass flex flex-col gap-1 rounded-[1.75rem] p-3">
                {nav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-2xl px-4 py-3 text-base font-medium transition ${
                        active
                          ? "bg-cream-soft text-coffee-deep"
                          : "text-ink-soft hover:bg-cream-soft/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-3 justify-center"
                >
                  WhatsApp Web
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
