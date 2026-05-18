# Architecture

## Genel Yapı

Proje kökü: `hukuk-burosu`

Bu uygulama `app/` klasörü altında çalışan bir Next.js App Router projesidir. `src/` klasörü kullanılmıyor; route ve layout dosyaları doğrudan proje kökündeki `app/` klasörü altındadır.

## Klasörler

### `app/`

Next.js App Router sayfalarını ve route handlerlarını içerir.

- `app/layout.tsx`: Global HTML iskeleti, metadata, JSON-LD, fontlar, `Navbar`, `Footer` ve `CookieBanner`.
- `app/page.tsx`: Ana sayfa.
- `app/hakkimizda/page.tsx`: Büro hikayesi, değerler ve ekip sayfası.
- `app/hizmetler/page.tsx`: Hizmet alanları sayfası.
- `app/blog/page.tsx`: Blog listeleme sayfası.
- `app/blog/[slug]/page.tsx`: Statik blog detay sayfası. `generateStaticParams` ile `lib/posts.ts` içindeki yazılar için rota üretir.
- `app/sss/page.tsx`: Sık sorulan sorular sayfası.
- `app/iletisim/page.tsx`: İletişim bilgileri, harita ve iletişim formu.
- `app/kvkk/page.tsx`: KVKK aydınlatma metni.
- `app/gizlilik/page.tsx`: Gizlilik politikası.
- `app/api/contact/route.ts`: İletişim formu için POST endpoint.
- `app/robots.ts`: Robots metadata route.
- `app/sitemap.ts`: Sitemap metadata route.
- `app/globals.css`: Tailwind v4 importu, tema tokenları ve global utility sınıfları.

### `components/`

Tekrar kullanılabilir UI componentlerini içerir.

- `Navbar.tsx`: Masaüstü ve mobil navigasyon.
- `Footer.tsx`: Footer, sayfa linkleri ve iletişim bilgileri.
- `Hero.tsx`: Ana sayfa hero alanı.
- `PrestigeScene.tsx`: Ana sayfa hero içinde kullanılan, CSS 3D/perspective, SVG/Lucide ikonlar ve Framer Motion ile oluşturulmuş premium 3D sahne.
- `PageHero.tsx`: Alt sayfalarda ortak hero yapısı.
- `ContactForm.tsx`: Client-side iletişim formu ve `/api/contact` çağrısı.
- `CookieBanner.tsx`: LocalStorage tabanlı çerez bildirimi.
- `FaqAccordion.tsx`: SSS açılır kapanır yapı.
- `MotionWrapper.tsx`: Framer Motion ile ortak animasyon wrapperları.
- `ServiceCard.tsx`, `TeamCard.tsx`, `StatsBar.tsx`, `Process.tsx`, `Testimonials.tsx`: Ana sayfa ve içerik bloklarında kullanılan sunum componentleri.
- `Hero.original.tsx`, `ServiceCard.original.tsx`: Mevcut yedek/orijinal component kopyaları gibi görünüyor. Silinmeden önce kullanım amacı doğrulanmalı.

### `lib/`

Statik veri ve site konfigürasyonunu içerir.

- `site.ts`: Marka adı, navigasyon, iletişim bilgileri, adres, harita embed URL'i.
- `services.ts`: Hizmet alanları verisi.
- `team.ts`: Ekip üyeleri verisi.
- `faq.ts`: SSS verisi.
- `posts.ts`: Blog yazıları ve `getPost` yardımcı fonksiyonu.

### `public/`

Statik dosyalar için Next.js public klasörüdür. Şu anda varsayılan Next/Vercel SVG dosyaları bulunuyor. Kullanılıp kullanılmadıkları ayrıca kontrol edilmeli.

### `.claude/`

Yerel Claude/agent skill dosyaları içeriyor. Uygulamanın runtime parçası gibi görünmüyor.

### `docs/`

Proje hafızası ve çalışma sürekliliği dosyalarını içerir. Yeni oturumlarda önce bu klasördeki dosyalar okunmalıdır.

## Sayfa Yapısı

Site aşağıdaki ana rotalardan oluşur:

- `/`
- `/hakkimizda`
- `/hizmetler`
- `/blog`
- `/blog/[slug]`
- `/sss`
- `/iletisim`
- `/kvkk`
- `/gizlilik`
- `/api/contact`

Sayfalar büyük ölçüde Server Component olarak çalışır. Etkileşim veya animasyon gereken componentlerde `"use client"` kullanılır.

## Styling Sistemi

Styling Tailwind CSS v4 ile `app/globals.css` üzerinden kurulmuştur.

- `@import "tailwindcss"` kullanılıyor.
- Renk, font ve shadow tokenları `@theme` içinde tanımlanmış.
- Ana görsel dil sıcak krem/kahve/altın tonlarından premium onyx, bronz, aurum ve liquid-glass hissine genişletildi.
- 3D hissi paket eklemeden CSS perspective, transform-style, layered glass/foil yüzeyleri ve Framer Motion ile sağlanıyor.
- Fontlar `next/font/google` ile `Inter` ve `Playfair Display` olarak yükleniyor.
- Ortak sınıflar: `container-prose`, `btn-primary`, `btn-ghost`, `eyebrow`, `premium-glass`, `premium-card`, `prestige-shell`, `scene-perspective`.
- Animasyonlar Framer Motion componentleriyle yapılıyor.

## Data Akışı

Kalıcı veri kaynağı yoktur.

İçerikler TypeScript dosyalarında statik olarak tutulur:

- Site bilgileri: `lib/site.ts`
- Hizmetler: `lib/services.ts`
- Ekip: `lib/team.ts`
- Blog: `lib/posts.ts`
- SSS: `lib/faq.ts`

İletişim formu client componentten `/api/contact` endpointine JSON gönderir. Route handler veriyi doğrular, honeypot alanını kontrol eder, KVKK onayı ister ve Resend ile e-posta göndermeye çalışır.

## Build ve Deploy Akışı

Scriptler:

- `npm run dev`: Next development server.
- `npm run build`: Production build.
- `npm run start`: Production server.
- `npm run lint`: ESLint kontrolü.

Deploy hedefi Vercel için uygundur. Production ortamında iletişim formunun gerçekten mail göndermesi için Resend ortam değişkenleri tanımlanmalıdır.
