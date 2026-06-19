# Bugs, Risks and Unknowns

## Doğrulanmış Hatalar

Aktif doğrulanmış hata yok.

## Giderilenler

- 2026-06-03: `/iletisim` sayfasındaki Google Maps embed ve randevu kartları eski `Bilkent, Ankara` bölge varsayımını kullanıyordu. Kullanıcının verdiği Google Maps bağlantısı çözümlenerek konum `Maidan, Mustafa Kemal, 2118. Cd., 06510 Çankaya / Ankara` olarak merkezi veriye işlendi; iletişim sayfası ve JSON-LD bu konuma hizalandı.

- 2026-06-02: Ana sayfadaki koyu güven bandında başlıkların koyu zeminde yeterince okunmaması giderildi. Koyu yüzey heading/paragraf renkleri açık fildişi tonlara sabitlendi, kart opaklığı ve animasyon başlangıç opaklığı artırıldı; desktop ve 390px mobil CDP kontrast taraması temiz geçti.
- 2026-05-20: Ana sayfadaki doğrulanmamış `500+ müvekkil`, `1200+ dosya` ve `14+ yıllık deneyim` metrikleri görünür arayüzden kaldırıldı. Stat bandı sayısız süreç ilkelerine dönüştürüldü.
- 2026-05-12: İlk lint çalıştırmasında `react/no-unescaped-entities` hataları görüldü. JSX içindeki düz tırnak/apostrof karakterleri güvenli entity biçimine çevrildi.
- 2026-05-12: İlk lint çalıştırmasında `react-hooks/set-state-in-effect` hataları görüldü. `CookieBanner` state güncellemesi async callback içine alındı, `Navbar` mobil menü kapatma davranışı link tıklamalarına taşındı.
- 2026-05-12: Düzeltmelerden sonra `npm.cmd run lint` ve `npm.cmd run build` başarıyla geçti.
- 2026-05-12: Mobil kontrolde Navbar içindeki masaüstü `Randevu Al` butonunun mobilde de göründüğü tespit edildi. `btn-primary` display değeri `hidden md:inline-flex` sınıfını ezdiği için CTA bir `hidden md:block` wrapper içine alındı.
- 2026-05-12: Next.js dev logunda `scroll-behavior` uyarısı görüldü. `html` etiketine `data-scroll-behavior="smooth"` eklendi.
- 2026-05-12: Son düzeltmelerden sonra `npm.cmd run lint` ve `npm.cmd run build` başarıyla geçti.
- 2026-05-12: Apple UI/UX rafinesi sırasında H1 kelime animasyonunda erişilebilir metin çıktısında kelimelerin birleştiği görüldü. Görsel akış bozulmadan gerçek boşluk karakterleri eklenerek düzeltildi.
- 2026-05-12: Apple UI/UX rafinesi sonrası `npm.cmd run lint`, `npm.cmd run build` ve Chrome headless/CDP mobil/desktop kontrolü başarıyla geçti.
- 2026-05-12: 3D hero çalışması sırasında mobilde grid item genişliği içerik min-width değerine göre büyüyüp metin kırpılmasına yol açtı. `container-prose` box model düzeltildi, mobil gridlerde açık `grid-cols-1` ve ilgili hero çocuklarında `min-w-0` kullanıldı.
- 2026-05-12: 3D sahnedeki mobil rozetlerin sağdan kesildiği görüldü. Mobilde sahne genişliği daraltıldı ve desktop'a özel rozetler mobilde gizlendi.
- 2026-05-12: Kardak 3D/premium UI çalışması sonrası `npm.cmd run lint`, `npm.cmd run build` ve Chrome headless/CDP mobil kontrolü başarıyla geçti.

## Riskler ve Bilinmeyenler

- `RESEND_API_KEY` production ortamında tanımlı değilse iletişim formu kullanıcıya başarılı dönebilir ama e-posta göndermez.
- `CONTACT_INBOX` ve `CONTACT_FROM` değerleri production için doğrulanmalı.
- `lib/site.ts` içindeki telefon ve WhatsApp değeri kullanıcı tarafından verildiği için güncellendi.
- `lib/site.ts` içindeki e-posta ve domain marka adına göre düzenlendi ancak gerçek production değeri ayrıca doğrulanmalı.
- Kullanıcı tarafından randevu konumu için Google Maps bağlantısı verildi ve merkezi site verisine işlendi. Sosyal medya değerleri henüz verilmedi.
- Gerçek e-posta ve domain değerleri marka adını temel alıyor; production öncesi marka sahibi tarafından ayrıca doğrulanmalı.
- Çalışma alanı görselleri gerçek ofis fotoğrafı değil, AI ile üretilmiş lisans riski düşük temsili katalog fotoğraflarıdır. Kurumsal fotoğraf/stock seti netleşirse ilgili kapaklar gerçek görsellerle değiştirilmeli.
- Hero arka planındaki ofis videosu kullanıcının sağladığı gerçek video varlığıdır; performans için optimize MP4/WebP çıktıları kullanılıyor. İleride daha güncel bir ofis videosu gelirse aynı `public/videos/` yapısıyla değiştirilebilir.
- Orijinal `görseller/ofis.mov` dosyası yaklaşık 215 MB olduğu için GitHub/Vercel push sürecini zorlayabilir; bu dosya git takibinden çıkarıldı ve `.gitignore` kapsamına alındı. Yayında yalnız optimize `public/videos/` çıktıları kullanılmalı.
- Sayısal güven metrikleri görünür arayüzden kaldırıldı; ileride gerçek ve belgelenebilir metrik kullanılacaksa avukat/marka sahibi tarafından ayrıca onaylanmalı.
- Blog yazıları ve hukuki metinlerin gerçek hukuki danışmanlık açısından avukat tarafından onaylanıp onaylanmadığı bilinmiyor. 2026-05-12 SEO çalışmasıyla eklenen 7 yeni uzun-form yazı genel bilgilendirme amaçlı yazıldı; sürelere, görevli mahkeme bilgilerine ve yargısal pratiğe değinen kısımların avukat tarafından son okuması yapılmalı.
- `site.url` "https://kardakhukuk.com" değeriyle JSON-LD ve canonical URL'lerde kullanılıyor. Gerçek domain başka olursa metadata + sitemap + JSON-LD doğru çalışsın diye yalnızca `site.url` güncellenmesi yeterli.
- `public/` içindeki varsayılan Next/Vercel SVG dosyalarının kullanılma durumu doğrulanmadı.
- `components/Hero.original.tsx` ve `components/ServiceCard.original.tsx` dosyalarının bilinçli yedek mi yoksa temizlenebilecek artık dosya mı olduğu bilinmiyor.
- PowerShell execution policy, `npm` PowerShell scriptini engelleyebilir. Bu ortamda `npm.cmd run lint` ve `npm.cmd run build` sorunsuz çalıştı.
- Python 3.12 kuruldu ve `ui-ux-pro-max` scriptleri tam Python yolu ile çalışıyor. Mevcut Codex oturumu eski PATH gördüğü için `python` komutu hâlâ Windows Store alias'ına gidebilir; yeni terminal/oturumda PATH'in düzelmesi beklenir.
- Chrome headless mobil kontrolde dekoratif blur yüzeylerin viewport dışına taştığı aday olarak raporlandı; ilgili bölümler `overflow-hidden` içinde olduğu ve gerçek yatay scroll oluşmadığı için aktif hata sayılmadı.
