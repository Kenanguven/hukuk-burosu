# Decisions

## 2026-06-19 Hero Video Kararı

- Kullanıcının sağladığı `görseller/ofis.mov` dosyası doğrudan yayına alınmayacak; yüksek boyutu nedeniyle optimize edilmiş web video çıktıları kullanılacak.
- Hero arka planında video, okunabilirliği bozmayacak düşük opaklık ve sıcak filtrelerle dekoratif/sinematik katman olarak çalışacak.
- Desktop ve mobil için ayrı video kaynakları kullanılacak; mobilde dikey kırpım tercih edilecek.
- Video sessiz, autoplay, loop ve playsInline özellikleriyle kullanılacak; `prefers-reduced-motion` tercihinde video gizlenecek.
- Video varlıkları `public/videos/` altında tutulacak; yeni npm paketi kurulmayacak.
- Orijinal yüksek boyutlu kaynak videolar repo içinde takip edilmeyecek; `görseller/` altındaki büyük video dosyaları `.gitignore` kapsamında yerel kaynak olarak kalacak.

## 2026-06-03 Hakkımızda Kartı ve Randevu Konumu Kararı

- Görünür avukat kadrosu şimdilik Av. Mahmut KARDAK olarak kalmaya devam edecek, ancak kart altında belirli çalışma alanı etiketleri gösterilmeyecek.
- Hakkımızda dili, kurucu avukatın yalnızca birkaç alanla sınırlı çalıştığı algısını vermemek için dosyanın niteliğine göre değerlendirme ve iş bölümü planı üzerinden kurulacak.
- Kullanıcının verdiği `https://maps.app.goo.gl/fe9STM5cYKWmhUCi6?g_st=iw` bağlantısı güncel randevu konumu olarak kabul edildi.
- Randevu konumu merkezi `lib/site.ts` verisinden yönetilecek; görünür iletişim kartları, Google Maps embed sorgusu ve JSON-LD adres bilgileri bu kaynağı kullanacak.

## 2026-06-02 Telefon ve SSS Kararı

- Güncel cep telefonu ve WhatsApp Web numarası `+90 533 612 24 56` / `https://wa.me/905336122456` olarak kabul edildi.
- Telefon ve WhatsApp bilgileri merkezi `lib/site.ts` verisinden yönetilecek; görünür kartlar ve yapılandırılmış veri bu kaynağı kullanacak.
- SSS içinde ilk görüşme ücretine dair ayrı madde gösterilmeyecek; ücretlendirme iletişimi yazılı sözleşme ve dosya kapsamı üzerinden nötr biçimde anlatılacak.

## 2026-05-26 Ankara Tek Lokasyon ve Renk Kararı

- Görünür site yapısı şimdilik yalnız Ankara / Bilkent randevu noktasıyla çalışacak; İstanbul / Beşiktaş kartları, iletişim hattı vurgusu ve ofis/randevu noktası iddiaları yayında gösterilmeyecek.
- İstanbul odaklı blog yazıları SEO için yayında kalacak; bu yazılar İstanbul ofisi veya Beşiktaş randevu noktası varmış gibi konum iddiası kurmayacak.
- İletişim sayfasındaki üst bilgi kartları WhatsApp Web, e-posta ve Ankara randevu konumuyla sade bir tek lokasyon akışı sunacak.
- Renk dili Tahancı'daki aydınlık açıklık ve Aslan'daki koyu kurumsal kontrast referansından hareketle, birebir kopya olmadan fildişi, grafit/orman ve şampanya-altın paletiyle sürdürülecek.
- Mevcut Next.js yapısı ve responsive davranış korunacak; bu görsel revizyon için yeni paket eklenmeyecek.

## 2026-05-26 Hero Aksiyon ve Sadelik Kararı

- Ana sayfa hero sahnesinde dekoratif `Premium` etiketi kullanılmayacak; güven anlatımı kurucu avukat, yazılı süreç, KVKK ve düzenli bilgilendirme üzerinden verilecek.
- Aynı hedefe yönlendiren yinelenen dış CTA kullanılmayacak; hero içindeki ana CTA'lara ek olarak sahne içinde yalnızca çalışan `WhatsApp` ve `Randevu Formu` aksiyonları korunacak.
- Küçük ekranlarda okunabilirlik ve hizalama için sahnenin 3D derinlik katmanları azaltılacak; tam 3D etki masaüstünde korunabilecek.

## 2026-05-22 Tek Avukat Görünümü Kararı

- Görünür avukat kadrosu şimdilik yalnızca `Av. Mahmut KARDAK` olarak tutulacak.
- Av. Servet Ağcakaya ve Av. Berk Erdem Işık site arayüzünden ve blog yazar atamalarından kaldırıldı.
- Blog yazar adı, hakkımızda ekip bölümü ve iletişim/ana sayfa metinleri tek kurucu avukat diline hizalanacak.
- İleride yeni avukat eklenecekse bu karar tekrar güncellenecek ve `lib/team.ts` yeniden genişletilecek.

## 2026-05-21 AI Katalog Görsel Kararı

- Çalışma alanı kartlarında gerçekçi görünüm için lokal AI üretimli katalog fotoğrafları kullanılacak.
- Görseller `public/service-images/` altında WebP formatında tutulacak; harici stok fotoğraf bağlantısı veya yeni paket kullanılmayacak.
- `lib/services.ts` her hizmetin görsel kaynağı ve erişilebilir alt metni için tek veri kaynağı olacak.
- `components/ServiceVisual.tsx` aynı bileşen üzerinden hem ana sayfa kartlarında hem `/hizmetler` detay bloklarında bu görselleri gösterecek.
- Bu görseller temsili kabul edilecek; gerçek ofis, ekip veya kurumsal fotoğraf çekimi geldiğinde aynı dosya/veri yapısı korunarak değiştirilecek.

## 2026-05-20 Hibrit Ana Sayfa ve Güven Dili Kararı

- Aslan Hukuk Danışmanlık ve Tahancı Avukatlık Bürosu referansları birebir kopyalanmayacak; KARDAK Hukuk için kurumsal, sade, WhatsApp/randevu odaklı ve yayınlarla desteklenen hibrit bir yapı kullanılacak.
- Görünür arayüzde doğrulanmamış sayısal güven metrikleri (`500+ müvekkil`, `1200+ dosya`, `14+ yıllık deneyim`) kullanılmayacak.
- Güven anlatımı sayı yerine çalışma prensipleriyle verilecek: yazılı süreç, dosya stratejisi, düzenli bilgilendirme ve gizlilik hassasiyeti.
- Ana sayfada müvekkil yorumu/testimonial bölümü kullanılmayacak; hukuki hizmet sitesinde daha kontrollü ve doğrulanabilir bir iletişim dili tercih edilecek.
- İletişim dilinde iki ayrı `ofis` vurgusu yerine randevulu görüşme, WhatsApp Web ve randevu noktası dili kullanılacak.
- Menüde `Hizmetler` yerine `Çalışma Alanları`, `Blog` yerine `Yayınlar` etiketi kullanılacak.
- İletişim sayfasında harita kullanılacaksa açık adres kesinleşene kadar Google Maps embed yalnızca randevu bölgesi olarak gösterilecek; tam konumun WhatsApp Web üzerinden paylaşılacağı metni korunacak.
- Çalışma alanlarında gerçek fotoğraf seti sağlanana kadar lisans riski taşımayan lokal/temsili görsel kapaklar kullanılacak.

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

- Bu bölüm tarihsel karardır; görünür lokasyon yapısı 2026-05-26 tarihli Ankara tek lokasyon kararıyla şimdilik geçersiz kılındı.
- Marka, Ankara (Bilkent) ve İstanbul (Beşiktaş) olmak üzere iki ofisle çalışacak. Kurucu avukat Mahmut Kardak; ekip Servet Ağcakaya ve Berk Erdem Işık olarak korunuyor. Bu ekip kararı 2026-05-22'de görünür avukat kadrosunun şimdilik yalnızca Av. Mahmut KARDAK olması kararıyla güncellendi.
- Tek telefon hattı 2026-06-02 itibarıyla `+90 533 612 24 56` olarak güncellendi. İleride İstanbul için ayrı hat çıkarsa yapı genişlemeye hazır.
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

## 2026-05-18 KARDAK Yazım Kararı

- Görünen marka metinlerinde soyad `KARDAK` olarak büyük harfle yazılacak.
- Kişi adı `Mahmut KARDAK`, firma adı `KARDAK Hukuk Bürosu`, kısa marka adı `KARDAK Hukuk` olarak kullanılacak.
- URL, e-posta, slug ve dosya yolları gibi teknik değerlerde küçük harfli `kardak` korunacak.
- SVG logo içindeki path'e dönüşmüş yazı düzenlenemediği için küçük alanlarda amblem kırpması kullanılacak; marka yazısı HTML metniyle `KARDAK` biçiminde gösterilecek.

## 2026-05-13 Ofis WhatsApp Kararları

- `/iletisim` ofis kartlarında ayrı telefon satırı gösterilmeyecek; ofis kartları WhatsApp Web üzerinden aksiyon alacak.
- Ankara/Bilkent ofisi WhatsApp Web numarası 2026-06-02 itibarıyla `+90 533 612 24 56` olarak kullanılacak.
- İstanbul/Beşiktaş ofisi WhatsApp Web numarası `0545 724 42 88` olarak kullanılacak.
- Kullanıcının geri dönüş numarasını almak için iletişim formundaki `Telefon` alanı korunacak.
- Yapılandırılmış veride ofis bazlı iletişim numaraları kullanılacak.
