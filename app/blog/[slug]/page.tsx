import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { FadeIn } from "@/components/MotionWrapper";
import { posts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
      section: post.category,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const formatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleUrl = `${site.url}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    inLanguage: "tr-TR",
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 0%, rgba(197,165,114,0.2), transparent 60%), var(--color-cream)",
        }}
      />

      <div className="container-prose pt-16 md:pt-20 pb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-coffee hover:text-coffee-deep transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tüm yazılar
        </Link>

        <FadeIn className="mt-8 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-coffee bg-cream-soft px-3 py-1 rounded-full border border-coffee/15">
            {post.category}
          </span>
          <h1 className="mt-6 font-serif text-3xl md:text-5xl text-coffee-deep leading-[1.1]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-mute">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatter.format(new Date(post.date))}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="w-4 h-4" /> {post.readMinutes} dk okuma
            </span>
          </div>
        </FadeIn>
      </div>

      <div className="container-prose pb-20 max-w-3xl">
        <FadeIn className="space-y-5 text-ink leading-[1.85] text-[1.05rem]">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 rounded-3xl bg-cream-soft p-8 border border-coffee/10">
          <p className="text-sm uppercase tracking-widest text-coffee">Önemli Not</p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Bu yazı genel bilgilendirme amacıyla hazırlanmıştır ve hukuki görüş
            niteliği taşımaz. Somut bir uyuşmazlığınız varsa lütfen büromuzla
            iletişime geçin.
          </p>
          <Link href="/iletisim" className="btn-primary mt-5">
            Bize Yazın
          </Link>
        </FadeIn>
      </div>

      {related.length > 0 && (
        <section className="pb-20 bg-cream-soft pt-16">
          <div className="container-prose">
            <h2 className="font-serif text-2xl md:text-3xl text-coffee-deep">
              İlginizi çekebilecek diğer yazılar
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl bg-cream p-7 border border-coffee/10 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)] transition"
                >
                  <span className="text-xs uppercase tracking-widest text-coffee">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-serif text-xl text-coffee-deep leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="sr-only">
        <address>{site.address}</address>
      </div>
    </article>
  );
}
