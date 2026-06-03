# Project Brief

## Proje Amacı

Bu proje `Kardak Hukuk Bürosu` için hazırlanmış kurumsal landing page ve tanıtım sitesidir. Site, bir hukuk bürosunun hizmet alanlarını, ekibini, blog içeriklerini, sık sorulan sorularını, KVKK/gizlilik metinlerini ve iletişim formunu sunar.

Ana hedef, potansiyel müvekkillerin büroyu tanıması, hizmet alanlarını incelemesi ve iletişim formu, telefon ya da WhatsApp Web üzerinden randevu talep etmesidir.

## Güncel Marka Bilgileri

- Firma adı: `Kardak Hukuk Bürosu`
- Büro sahibi / kurucu avukat: `Mahmut Kardak`
- Telefon: `+90 533 612 24 56`
- WhatsApp Web: `https://wa.me/905336122456`
- Randevu konumu: `Maidan, Mustafa Kemal, 2118. Cd., 06510 Çankaya / Ankara`
- Sosyal medya, gerçek domain ve production e-posta bilgileri henüz ayrıca doğrulanmalıdır.

## Proje Tipi

- Kurumsal tanıtım sitesi
- Statik içerik ağırlıklı Next.js web sitesi
- Küçük bir API route ile iletişim formu desteği

## Backend ve Database Durumu

Projede kalıcı bir backend veya database yok.

`app/api/contact/route.ts` altında Next.js Route Handler olarak çalışan bir iletişim API rotası var. Bu rota form verisini doğrular ve `RESEND_API_KEY` tanımlıysa Resend ile e-posta gönderir. API anahtarı yoksa mesajı kalıcı olarak kaydetmez; yalnızca sunucu konsoluna sınırlı bilgi yazar ve başarılı cevap döner.

## Vercel Uygunluğu

Proje Vercel deploy için uygundur:

- Next.js App Router kullanıyor.
- `npm run build` scripti mevcut.
- `next.config.ts` özel platform bağımlılığı içermiyor.
- `package-lock.json` ve npm akışı mevcut.
- Vercel, Next.js projelerini sıfır konfigürasyonla otomatik algılayabilir.

Production iletişim formu için Vercel ortam değişkenlerinde şu değerler tanımlanmalıdır:

- `RESEND_API_KEY`
- `CONTACT_INBOX`
- `CONTACT_FROM`

## Tespit Edilen Teknolojiler

- Next.js 16.2.6
- React 19.2.4
- TypeScript
- App Router
- Tailwind CSS v4
- Framer Motion
- lucide-react
- Resend
- ESLint 9 ve `eslint-config-next`
