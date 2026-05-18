import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla yürüttüğümüz işleme faaliyetlerine ilişkin aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <LegalPage
      eyebrow="KVKK"
      title="Aydınlatma Metni"
      intro={`Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, ${site.name}'ın veri sorumlusu sıfatıyla yürüttüğü kişisel veri işleme faaliyetlerine ilişkin sizleri bilgilendirmek amacıyla hazırlanmıştır.`}
      sections={[
        {
          heading: "Veri Sorumlusu",
          body: (
            <>
              <p>
                Veri sorumlusu sıfatıyla {site.name} (&quot;Büro&quot;), 6698 sayılı KVKK ve
                ilgili mevzuat kapsamında kişisel verilerinizin işlenmesi
                konusunda gerekli idari ve teknik tedbirleri almaktadır.
              </p>
              <p>
                Adres: {site.address}
                <br />
                E-posta: {site.email}
                <br />
                Telefon: {site.phone}
              </p>
            </>
          ),
        },
        {
          heading: "İşlenen Kişisel Veriler",
          body: (
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Kimlik bilgileri (ad, soyad, T.C. kimlik numarası)</li>
              <li>İletişim bilgileri (telefon, e-posta, adres)</li>
              <li>Müvekkillik ilişkisinin gerektirdiği dosya ve belge bilgileri</li>
              <li>İnternet sitemiz üzerinden iletilen iletişim formu içerikleri</li>
              <li>Sitemizi ziyaretiniz sırasında üretilen log kayıtları ve çerez verileri</li>
            </ul>
          ),
        },
        {
          heading: "İşleme Amaçları",
          body: (
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Hukuki danışmanlık ve avukatlık hizmetlerinin yürütülmesi</li>
              <li>Avukatlık sözleşmesinin kurulması ve ifası</li>
              <li>İletişim taleplerinin karşılanması ve sürecin yönetilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi (vergi, baro, vb.)</li>
              <li>İnternet sitemizin güvenliği ve iyileştirilmesi</li>
            </ul>
          ),
        },
        {
          heading: "Hukuki Sebepler",
          body: (
            <p>
              Kişisel verileriniz; KVKK md. 5/2 (a) kanunlarda açıkça öngörülmesi,
              (c) sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması,
              (ç) hukuki yükümlülüğün yerine getirilmesi, (e) bir hakkın tesisi,
              kullanılması veya korunması ve (f) ilgili kişinin temel hak ve
              özgürlüklerine zarar vermemek kaydıyla meşru menfaatlerimizin
              gerektirmesi sebepleriyle işlenmektedir. Sınırlı durumlarda md. 5/1
              uyarınca açık rızanız temel alınarak işleme yapılabilir.
            </p>
          ),
        },
        {
          heading: "Aktarım",
          body: (
            <p>
              Kişisel verileriniz; yasal zorunluluk hâllerinde yetkili kamu kurum
              ve kuruluşlarına, mahkemelere, icra dairelerine, baroya; ayrıca
              hizmet alınan bilişim ve muhasebe çözüm sağlayıcılarına KVKK md. 8
              ve 9 sınırları içinde aktarılabilir. Verileriniz yurt dışına
              aktarılmamaktadır; yalnızca AB Genel Veri Koruma Tüzüğü (GDPR)
              uyumlu bilişim altyapılarında işlenmektedir.
            </p>
          ),
        },
        {
          heading: "Saklama Süresi",
          body: (
            <p>
              Verileriniz, ilgili mevzuatta öngörülen ya da işleme amacının
              gerektirdiği süre kadar muhafaza edilir. Avukatlık Kanunu ve ilgili
              mevzuat uyarınca dosya saklama süresi sonunda verileriniz silinir,
              yok edilir veya anonim hâle getirilir.
            </p>
          ),
        },
        {
          heading: "Haklarınız",
          body: (
            <>
              <p>KVKK md. 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşleme amacını ve bunlara uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içi/yurt dışında aktarılan üçüncü kişileri bilme</li>
                <li>Eksik ya da yanlış işlenmiş olması hâlinde düzeltilmesini isteme</li>
                <li>KVKK md. 7&apos;deki şartlarda silinmesini veya yok edilmesini isteme</li>
                <li>Zarara uğramanız hâlinde tazminat talep etme</li>
              </ul>
              <p className="mt-3">
                Taleplerinizi {site.email} adresine yazılı olarak iletebilirsiniz.
                Başvurunuza en geç otuz gün içinde dönüş yapılacaktır.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
