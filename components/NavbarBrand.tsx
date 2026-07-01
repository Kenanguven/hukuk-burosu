import Link from "next/link";

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
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-warm/70 ring-1 ring-gold/15 sm:h-12 sm:w-12">
        <svg
          viewBox="0 0 120 100"
          aria-hidden="true"
          className="h-9 w-10 text-gold sm:h-10 sm:w-11"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M60 13l5 5-5 5-5-5z" fill="currentColor" stroke="none" />
            <path d="M60 24v43" strokeWidth="2.2" />
            <path d="M43 68h34" strokeWidth="2.2" />
            <path d="M31 31h58" strokeWidth="2.1" />
            <path d="M31 31 22 52M31 31l9 21" strokeWidth="1.9" />
            <path d="M19 53c2.5 5.5 21.5 5.5 24 0" strokeWidth="1.9" />
            <path d="M89 31 80 52M89 31l9 21" strokeWidth="1.9" />
            <path d="M77 53c2.5 5.5 21.5 5.5 24 0" strokeWidth="1.9" />
            <path
              d="M28 79c8-4 16 4 24 0s16-4 24 0 16 4 24 0"
              strokeWidth="2"
              opacity="0.55"
            />
          </g>
        </svg>
      </span>
      <span className="ml-3 flex min-w-0 flex-col items-start leading-none sm:ml-4">
        <span className="font-serif text-[1.18rem] font-semibold tracking-[0.28em] text-gold sm:text-[1.45rem]">
          KARDAK
        </span>
        <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.42em] text-coffee/70 sm:text-[0.56rem]">
          Hukuk Bürosu
        </span>
        <span className="mt-1 hidden text-[0.42rem] font-semibold uppercase tracking-[0.34em] text-gold sm:block">
          Avukatlık · Danışmanlık
        </span>
      </span>
    </Link>
  );
}
