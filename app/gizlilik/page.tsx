import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${site.name} internet sitesi gizlilik politikası ve çerez kullanımı bilgilendirmesi.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Gizlilik"
      title="Gizlilik Politikası"
      intro={`${site.name} olarak ziyaretçilerimizin ve müvekkillerimizin gizliliğine büyük önem veriyoruz. Bu politika; internet sitemiz üzerinde toplanan bilgileri, kullanım amaçlarını ve haklarınızı açıklar.`}
      sections={[
        {
          heading: "Toplanan Bilgiler",
          body: (
            <ul className="list-disc pl-6 space-y-1.5">
              <li>İletişim formu aracılığıyla ilettiğiniz ad, soyad, telefon ve e-posta bilgileri</li>
              <li>Site kullanım istatistikleri (ziyaret edilen sayfa, oturum süresi)</li>
              <li>Teknik bilgiler: IP, tarayıcı tipi, işletim sistemi</li>
              <li>Tarafınızca tercih edilirse pazarlama amaçlı çerezler</li>
            </ul>
          ),
        },
        {
          heading: "Çerez Kullanımı",
          body: (
            <>
              <p>
                İnternet sitemizde, ziyaretçi deneyimini iyileştirmek ve hizmetin
                doğru çalışmasını sağlamak amacıyla zorunlu çerezler
                kullanılmaktadır. Analitik veya pazarlama amaçlı üçüncü taraf
                çerezler yalnızca açık onayınız olması hâlinde yüklenir.
              </p>
              <p>
                Tarayıcı ayarlarınızdan çerezleri her zaman silebilir veya
                engelleyebilirsiniz; ancak bu durumda sitenin bazı bölümleri
                doğru çalışmayabilir.
              </p>
            </>
          ),
        },
        {
          heading: "Üçüncü Taraf Hizmetler",
          body: (
            <p>
              Sitemiz; harita gösterimi için Google Maps, font yüklemesi için
              Google Fonts gibi hizmetlerden yararlanır. Bu hizmetler kendi
              gizlilik politikalarına tabidir.
            </p>
          ),
        },
        {
          heading: "Veri Güvenliği",
          body: (
            <p>
              Topladığımız tüm verileri HTTPS bağlantısı üzerinden iletiyor;
              sunucu ve uygulama tarafında güncel güvenlik önlemleri ile
              koruyoruz. Avukatlık Kanunu&apos;ndan kaynaklanan sır saklama
              yükümlülüğü çerçevesinde müvekkil bilgileri yetkisiz üçüncü
              kişilerle paylaşılmaz.
            </p>
          ),
        },
        {
          heading: "İletişim",
          body: (
            <p>
              Bu politika ile ilgili sorularınızı {site.email} adresine
              iletebilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
