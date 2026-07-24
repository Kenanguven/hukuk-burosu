"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Calculator,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Home,
  Hourglass,
  Menu,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { NavbarBrand } from "@/components/NavbarBrand";
import { nav, site } from "@/lib/site";

const toolLinks = [
  { href: "/hesaplama-araclari", label: "Tüm Hesaplama Araçları", icon: Calculator },
  { href: "/hesaplama-araclari#labor", label: "İşçilik Alacakları", icon: ClipboardCheck },
  { href: "/hesaplama-araclari#netGross", label: "Net ↔ Brüt Çevirici", icon: ArrowLeftRight },
  { href: "/hesaplama-araclari#reemployment", label: "İşe İade Hesaplama", icon: ShieldCheck },
  { href: "/hesaplama-araclari#unemployment", label: "İşsizlik Ödeneği", icon: ShieldCheck },
  { href: "/hesaplama-araclari#execution", label: "İnfaz Hesaplama", icon: Hourglass },
  { href: "/hesaplama-araclari#courtFee", label: "Dava Harcı Hesaplama", icon: FileText },
  { href: "/hesaplama-araclari#rent", label: "Kira Artış Hesaplama", icon: Home },
];

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
    <header className="sticky top-0 z-50 px-0 py-3">
      <div
        className={`container-prose transition-all duration-300 ${
          scrolled ? "scale-[0.992]" : "scale-100"
        }`}
      >
        <div className="premium-glass flex items-center justify-between gap-3 rounded-[1.65rem] px-3 py-3 md:rounded-full md:px-4">
          <NavbarBrand onClick={() => setOpen(false)} />

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              if (item.href === "/hesaplama-araclari") {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4 ${
                        active
                          ? "text-coffee-deep"
                          : "text-ink-soft hover:bg-cream-soft/70 hover:text-coffee-deep"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-cream-soft/80 ring-1 ring-coffee/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                    </Link>
                    <div className="invisible absolute left-1/2 top-full z-40 w-80 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="overflow-hidden rounded-[1.1rem] border border-gold/25 bg-[#101a2d] p-2 shadow-warm-lg">
                        {toolLinks.map((tool) => {
                          const Icon = tool.icon;
                          return (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-cream-soft/78 transition hover:bg-cream-soft/8 hover:text-cream-soft"
                            >
                              <Icon className="h-4 w-4 shrink-0 text-gold-soft" />
                              {tool.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4 ${
                    active
                      ? "text-coffee-deep"
                      : "text-ink-soft hover:bg-cream-soft/70 hover:text-coffee-deep"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-cream-soft/80 ring-1 ring-coffee/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
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
              className="btn-primary px-5 py-2.5 text-sm"
            >
              WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid min-h-11 min-w-11 place-items-center rounded-full text-coffee-deep transition-colors hover:bg-cream-soft/70 md:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="overflow-hidden md:hidden"
          >
            <div className="container-prose pt-2">
              <div className="premium-glass flex flex-col gap-1 rounded-[1.75rem] p-3">
                {nav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <div key={item.href} className="grid gap-1">
                      <Link
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
                      {item.href === "/hesaplama-araclari" && (
                        <div className="grid gap-1 rounded-2xl bg-coffee-deep/95 p-2">
                          {toolLinks.slice(1).map((tool) => {
                            const Icon = tool.icon;
                            return (
                              <Link
                                key={tool.href}
                                href={tool.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-cream-soft/82"
                              >
                                <Icon className="h-4 w-4 text-gold-soft" />
                                {tool.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
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
