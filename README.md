# KARDAK Hukuk Bürosu

KARDAK Hukuk Bürosu için kurumsal hukuk bürosu tanıtım sitesi. Proje; ana sayfa, hakkımızda, hizmetler, blog, SSS, iletişim, KVKK ve gizlilik sayfalarından oluşan bir Next.js App Router uygulamasıdır.

Güncel marka bilgileri:

- Firma: KARDAK Hukuk Bürosu
- Kurucu/Sahip: Mahmut KARDAK
- Telefon: +90 533 612 24 56
- WhatsApp Web: `https://wa.me/905336122456`

## Kullanılan Teknolojiler

- Next.js 16.2.6
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react
- Resend
- ESLint

## Kurulum

Bağımlılıklar yüklü değilse:

```bash
npm install
```

Geliştirme sunucusu:

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

## Komutlar

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Ortam Değişkenleri

İletişim formu Resend ile e-posta gönderebilir. Örnek değerler `.env.local.example` içinde bulunur.

```bash
RESEND_API_KEY=
CONTACT_INBOX=
CONTACT_FROM=
```

`RESEND_API_KEY` tanımlı değilse form kalıcı kayıt yapmaz ve e-posta göndermez; route handler sınırlı bilgiyi sunucu konsoluna yazar.

## Vercel Deploy Notu

Proje Vercel deploy için uygundur. Vercel Next.js'i otomatik algılar. Production ortamında iletişim formunun çalışması için Resend ortam değişkenleri Vercel panelinde tanımlanmalıdır.

## ChatGPT ile Çalışma Düzeni

Bu repo uzun süre ChatGPT / GPT-5.5 ile geliştirilecek şekilde proje hafızası içerir. Yeni oturumlarda önce şu dosyalar okunmalıdır:

1. `AGENTS.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/PROGRESS.md`
4. `docs/TODO.md`
5. `docs/DECISIONS.md`
6. `docs/BUGS.md`

Çalışma sırasında eski chat geçmişine güvenilmemeli; güncel durum repo içindeki docs dosyalarından öğrenilmelidir. İş bittikten sonra `docs/PROGRESS.md` ve gerekiyorsa `docs/TODO.md`, `docs/DECISIONS.md`, `docs/BUGS.md` güncellenmelidir.

## Proje Hafızası

- `docs/PROJECT_BRIEF.md`: Projenin amacı ve kapsamı.
- `docs/ARCHITECTURE.md`: Klasör, sayfa, component ve data yapısı.
- `docs/TODO.md`: Sıradaki işler.
- `docs/PROGRESS.md`: Güncel durum ve yapılan işler.
- `docs/DECISIONS.md`: Alınan teknik/ürün kararları.
- `docs/BUGS.md`: Hatalar, riskler ve bilinmeyenler.

## Faydalı Dokümanlar

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
