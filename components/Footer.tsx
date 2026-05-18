import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-graphite text-cream-soft">
      <div className="container-prose py-16 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4 space-y-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo variant="dark" size={44} />
            <span className="font-serif text-xl text-cream">{site.name}</span>
          </Link>
          <p className="text-sm leading-relaxed text-cream-soft/80 max-w-md">
            {site.description}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">
            {site.tagline}
          </p>

          <ul className="space-y-2.5 text-sm pt-2">
            <li className="flex gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <a
                href={`tel:${site.phoneRaw}`}
                className="text-cream-soft/85 hover:text-gold transition-colors"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-soft/85 hover:text-gold transition-colors"
              >
                WhatsApp Web
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <a
                href={`mailto:${site.email}`}
                className="text-cream-soft/85 hover:text-gold transition-colors"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span className="text-cream-soft/85">{site.hours}</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cream">
            Sayfalar
          </h3>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream-soft/80 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cream">
            Ofislerimiz
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {site.offices.map((office) => (
              <li key={office.slug} className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.18em] text-gold">
                  {office.city}
                </p>
                <p className="text-sm font-semibold text-cream">
                  {office.district}
                </p>
                <p className="text-xs text-cream-soft/75 leading-relaxed flex gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-gold shrink-0" />
                  <span>{office.regionLabel}</span>
                </p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-cream-soft/55">
                  {office.barosu}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-prose py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream-soft/70">
          <p>
            © {year} {site.name}. Tüm hakları saklıdır.
          </p>
          <nav className="flex gap-5">
            <Link href="/kvkk" className="hover:text-gold transition-colors">
              KVKK
            </Link>
            <Link href="/gizlilik" className="hover:text-gold transition-colors">
              Gizlilik Politikası
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
