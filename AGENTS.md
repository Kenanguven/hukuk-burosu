# Proje Ajan Kuralları

Bu proje ChatGPT / GPT-5.5 ile uzun süre geliştirilecek.

## Her Yeni Oturumda Önce Okunacak Dosyalar

1. `AGENTS.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/PROGRESS.md`
4. `docs/TODO.md`
5. `docs/DECISIONS.md`
6. `docs/BUGS.md`

## Çalışma Kuralları

- Eski chat geçmişine güvenme.
- Projenin güncel durumunu repo içindeki docs dosyalarından öğren.
- Tüm projeyi gereksiz yere tarama.
- Sadece görevle ilgili dosyaları incele.
- Mevcut çalışan yapıyı bozma.
- Framework veya klasör yapısını gereksiz değiştirme.
- Gereksiz npm paketi kurma.
- Mobil uyumluluğu koru.
- Büyük değişikliklerden önce kısa plan yap.
- İş bitince `docs/PROGRESS.md` dosyasını güncelle.
- Tamamlanan işleri `docs/TODO.md` içinde işaretle.
- Önemli kararları `docs/DECISIONS.md` içine yaz.
- Hata, risk veya bilinmeyenleri `docs/BUGS.md` içine yaz.
- Mümkünse `npm run lint` ve `npm run build` çalıştır.
- Hata çıkarsa önce düzeltmeye çalış; düzeltemezsen `docs/BUGS.md` içine yaz.

## Next.js Notu

Bu proje Next.js 16 kullanıyor. Bu sürümde App Router, route handler, async `params` ve bazı framework davranışları eski Next.js sürümlerinden farklı olabilir. Kod yazmadan önce mevcut dosya örüntülerini takip et; gerekirse `node_modules/next/dist/docs/` içindeki yerel dokümanlara bak.

## UI/UX Pro Max Notu

- UI/UX tasarım, mobil görünüm, erişilebilirlik, animasyon, layout, landing page veya component iyileştirme işlerinde `ui-ux-pro-max` skill'i kullanılmalı.
- Codex için global kopya: `C:\Users\adm.kenang\.codex\skills\ui-ux-pro-max`
- Claude Code için repo içi kaynak kopya: `.claude/skills/ui-ux-pro-max`
- Bu skill'in arama scriptleri Python gerektirir. Python 3.12 kuruldu; mevcut Codex oturumu eski PATH görebilirse şu tam yol kullanılabilir: `C:\Users\adm.kenang\AppData\Local\Programs\Python\Python312\python.exe`
