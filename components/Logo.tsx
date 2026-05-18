import Image from "next/image";

const brandLogoSrc = "/kardak-hukuk.svg";

type LogoVariant = "gold" | "dark" | "mono";
type LogoMode = "mark" | "lockup";

type LogoProps = {
  variant?: LogoVariant;
  mode?: LogoMode;
  size?: number;
  className?: string;
  ariaLabel?: string;
};

export function Logo({
  variant = "gold",
  mode = "mark",
  size = 40,
  className = "",
  ariaLabel = "KARDAK Hukuk Bürosu",
}: LogoProps) {
  if (mode === "lockup") {
    return (
      <Image
        src={brandLogoSrc}
        alt={ariaLabel}
        width={size}
        height={size}
        className={`block h-auto w-auto object-contain ${className}`}
        priority
        unoptimized
      />
    );
  }

  const tone =
    variant === "dark"
      ? "ring-gold/35 shadow-[0_14px_34px_-22px_rgba(255,244,207,0.7)]"
      : "ring-coffee/10 shadow-[0_12px_30px_-22px_rgba(36,25,21,0.65)]";
  const filter = variant === "mono" ? "grayscale contrast-125" : "";

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={`inline-block shrink-0 overflow-hidden rounded-[26%] bg-cream-soft ring-1 ${tone} ${filter} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${brandLogoSrc})`,
        backgroundPosition: "center 37%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "250%",
      }}
    />
  );
}
