import Link from "next/link";
import { Logo } from "@/components/Logo";

type NavbarBrandProps = {
  onClick?: () => void;
};

export function NavbarBrand({ onClick }: NavbarBrandProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex min-w-0 shrink-0 items-center rounded-full bg-cream-soft/92 px-4 py-2.5 shadow-[0_18px_44px_-34px_rgba(36,25,21,0.7)] ring-1 ring-coffee/8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 sm:px-5"
      aria-label="KARDAK Hukuk Bürosu ana sayfa"
    >
      <Logo size={48} className="bg-cream-warm/70 ring-gold/15" />
      <span className="ml-3 flex min-w-0 flex-col items-start leading-none sm:ml-4">
        <span className="font-serif text-[1.18rem] font-semibold tracking-[0.28em] text-gold sm:text-[1.45rem]">
          KARDAK
        </span>
        <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.34em] text-coffee/70 sm:text-[0.58rem]">
          Hukuk & Danışmanlık
        </span>
      </span>
    </Link>
  );
}
