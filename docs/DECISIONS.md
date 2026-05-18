# Decisions

## 2026-05-12 Başlangıç Kararları

- Mevcut framework korunacak.
- Mevcut Next.js App Router yapısı korunacak.
- Mevcut tasarım korunacak.
- Büyük refactor yapılmayacak.
- Proje hafızası `docs/` klasöründe tutulacak.
- Yeni çalışmalar küçük görevler halinde ilerleyecek.
- Vercel deploy uyumluluğu korunacak.
- Gereksiz npm paketi kurulmayacak.
- Backend veya database eklenmeyecek.
- Statik site verileri şimdilik `lib/*.ts` dosyalarında tutulmaya devam edecek.
- İletişim formu için mevcut Resend tabanlı route handler korunacak.
- Her iş sonunda `docs/PROGRESS.md`, gerekirse `docs/TODO.md`, `docs/DECISIONS.md` ve `docs/BUGS.md` güncellenecek.

## 2026-05-12 Devam Kararları

- Mobil headerda masaüstü CTA görünmemeli; `btn-primary` gibi display veren global sınıflar `hidden` utility ile aynı elemana doğrudan verilmemeli.
- Domain bilgisi tek kaynak olarak `site.url` altında tutulacak.
- Placeholder/generic marka bilgileri tahminle değiştirilmemeli; gerçek değerler kullanıcıdan alınana kadar risk olarak takip edilmeli.

## UI/UX Skill Kararı

- Claude Code için hazırlanmış `UI UX Pro Max Skill`, Codex tarafında da kullanılmak üzere global skill klasörüne kopyalanacak/kopyalandı.
- UI/UX işleri yapılırken mevcut proje tasarımı korunacak; skill önerileri büyük refactor veya sıfırdan tasarım bahanesi olarak kullanılmayacak.
- Skill, özellikle mobil uyumluluk, erişilebilirlik, spacing, tipografi, renk kontrastı, animasyon ve component kalite kontrolü için yardımcı referans olarak kullanılacak.
- Skill'in önerdiği büyük font/renk değişimleri mevcut marka hissini bozuyorsa uygulanmayacak; önce küçük efektler ve kalite iyileştirmeleri tercih edilecek.
- Animasyon/efekt eklenirken `prefers-reduced-motion` gözetilecek.

## 2026-05-12 Apple Tarzı UI/UX Kararları

- "Apple tarzı" yaklaşım, mevcut hukuk bürosu kimliğini kopya bir teknoloji markasına çevirmek yerine sade hiyerarşi, cam yüzeyler, yumuşak gölgeler, kontrollü hareket ve yüksek okunabilirlik olarak uygulanacak.
- Hukuk sitesi güven/otorite hissini korumalı; premium görünüm için kontrast, tipografi ve spacing iyileştirilecek ama içerik yapısı ve sayfa mimarisi gereksiz değiştirilmeyecek.
- Yeni görsel dil global tema tokenları ve küçük yardımcı sınıflar üzerinden yönetilecek; büyük refactor yapılmayacak.
- Gerçek marka materyalleri gelene kadar logo, fotoğraf ve iletişim bilgileri tahminle değiştirilmeyecek.

## 2026-05-12 Çift Şehir (Ankara + İstanbul) Kararları

- Marka, Ankara (Bilkent) ve İstanbul (Beşiktaş) olmak üzere iki ofisle çalışacak. Kurucu avukat Mahmut Kardak; ekip Servet Ağcakaya ve Berk Erdem Işık olarak korunuyor.
- Tek telefon hattı (0553 612 24 56) ve tek WhatsApp her iki ofis için ortak kullanılıyor. İleride İstanbul için ayrı hat çıkarsa yapı genişlemeye hazır.
- Ofis adresleri ilçe seviyesinde (Bilkent / Beşiktaş) tutuluyor; tam sokak/kapı bilgisi yine "WhatsApp üzerinden paylaşılır" mantığında.
- JSON-LD; tek Organization + her ofis için ayrı LegalService (parentOrganization referanslı) standart pattern olarak benimsendi. Google Business Profile için iki ayrı profil açılırsa bu yapı destek verir.
- Blog içerik stratejisi: 11 Ankara odaklı + 5 İstanbul odaklı uzun-form yazı (toplam 16). Kapsam dengeli; İstanbul'a Avrupa/Anadolu Yakası ayrımı işlendi.
- Hero baro satırı tek baroya kilitlenmedi; "Ankara · İstanbul" şehir vurgusu ile değiştirildi. Avukatların baro kaydı SSS'de açıklanıyor.

## 2026-05-12 Kardak 3D Premium Kararları

- Gerçek firma adı `Kardak Hukuk Bürosu` olarak kullanılacak.
- Büro sahibi / kurucu avukat bilgisi `Mahmut Kardak` olarak kullanılacak.
- Telefon ve WhatsApp Web bilgileri kullanıcı tarafından verildiği için gerçek marka bilgisi kabul edilip `lib/site.ts` içinde merkezi tutulacak.
- 3D premium etki için yeni npm paketi kurulmayacak; mevcut Framer Motion, CSS perspective/transform ve Lucide ikonlarla ilerlenilecek.
- Sahte adres ve generic sosyal medya linkleri yayında tutulmayacak; gerçek bilgiler gelene kadar WhatsApp üzerinden konum paylaşımı mesajı gösterilecek.
- Premium 3D tasarım, hukuk sitesi güven/otorite hissini bozmayacak; aşırı hızlı animasyon ve okunurluğu düşüren cam opaklığı kullanılmayacak.

## 2026-05-13 Logo Yenileme Kararları

- Kullanıcı tarafından sağlanan PNG logo gerçek marka materyali olarak kabul edilip siteye entegre edilecek.
- Logo için yeni paket veya framework değişikliği yapılmayacak; Next.js static image import ve App Router icon sistemi kullanılacak.
- Dar alanlarda PNG'nin amblem bölümü kompakt marka işareti olarak kullanılacak; tam kare logo hero kartı ve favicon gibi uygun alanlarda gösterilecek.
- Navbar, Footer, favicon ve hero kartı aynı `Logo` component sistemiyle hizalanacak.
- PNG logo yüksek çözünürlük ihtiyacı için 1920x1920 kare dosya olarak tutulacak; orijinal kullanıcı dosyası ayrıca 800px yedek olarak saklanacak.
- Gerçek kurumsal logo materyali kullanıcı tarafından sağlanırsa mevcut tasarım yeniden değerlendirilecek.

## 2026-05-18 SVG Logo Kararları

- Kullanıcının ana klasöre eklediği `Kardak Hukuk.svg` güncel aktif logo kaynağı kabul edilecek.
- SVG logo tarayıcı erişimi için `public/kardak-hukuk.svg`, favicon/App Router icon için `app/icon.svg` olarak kullanılacak.
- `components/Logo.tsx` içinde aktif logo kaynağı PNG yerine `/kardak-hukuk.svg` olacak.
- Dar alanlarda SVG'nin amblem bölümü kompakt marka işareti olarak kırpılacak; hero kartı gibi geniş alanlarda tam lockup gösterilecek.
- JSON-LD `Organization.logo` SVG dosyasını işaret edecek.

## 2026-05-13 Ofis WhatsApp Kararları

- `/iletisim` ofis kartlarında ayrı telefon satırı gösterilmeyecek; ofis kartları WhatsApp Web üzerinden aksiyon alacak.
- Ankara/Bilkent ofisi WhatsApp Web numarası `0553 612 24 56` olarak kalacak.
- İstanbul/Beşiktaş ofisi WhatsApp Web numarası `0545 724 42 88` olarak kullanılacak.
- Kullanıcının geri dönüş numarasını almak için iletişim formundaki `Telefon` alanı korunacak.
- Yapılandırılmış veride ofis bazlı iletişim numaraları kullanılacak.
