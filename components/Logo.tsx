type LogoVariant = "gold" | "dark" | "mono";

type LogoProps = {
  variant?: LogoVariant;
  size?: number;
  className?: string;
  ariaLabel?: string;
};

export function Logo({
  variant = "gold",
  size = 40,
  className = "",
  ariaLabel = "KARDAK Hukuk & Danışmanlık",
}: LogoProps) {
  const tone =
    variant === "dark"
      ? "ring-gold/35 shadow-[0_14px_34px_-22px_rgba(255,244,207,0.7)]"
      : "ring-coffee/10 shadow-[0_12px_30px_-22px_rgba(36,25,21,0.65)]";
  const color =
    variant === "mono"
      ? "text-current"
      : variant === "dark"
        ? "text-gold"
        : "text-gold";

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={`grid shrink-0 place-items-center overflow-hidden rounded-[26%] bg-cream-soft ring-1 ${tone} ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 120 100"
        aria-hidden="true"
        className={`h-[82%] w-[86%] ${color}`}
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
  );
}
