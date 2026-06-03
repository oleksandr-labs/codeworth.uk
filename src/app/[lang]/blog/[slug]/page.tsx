import type { Metadata } from "next";
import { buildAlternates } from "@/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data/blog";
import { getAuthorByName, getAuthorBySlug } from "@/lib/data/blogAuthors";
import { getNicheLocalized } from "@/lib/data/niches";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";
import { Clock, Calendar, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { cn } from "@/lib/utils";


// Map blog categories → relevant service slugs
const CATEGORY_SERVICES: Record<string, string[]> = {
  "SEO та просування": ["seo", "ads", "smm"],
  "Веб-розробка": ["website-dev", "landing", "mobile"],
  "Дизайн і UX": ["design", "branding"],
  "E-commerce": ["ecommerce", "crm", "ads"],
  "Кейси клієнтів": ["website-dev", "ecommerce", "seo"],
  "Маркетплейс і нішеві рішення": ["website-dev", "support", "crm"],
  "Маркетинг": ["smm", "ads", "seo"],
  "Бізнес та зростання": ["website-dev", "crm", "ads"],
  "Безпека": ["website-dev", "support"],
  "Право та GDPR": ["website-dev", "support"],
  "AI та Автоматизація": ["artificial-intelligence", "machine-learning", "chatbots"],
  "Автоматизація": ["artificial-intelligence", "crm", "chatbots"],
  "Аналітика та дані": ["machine-learning", "crm", "seo"],
  "Мобільний веб та PWA": ["mobile", "website-dev", "design"],
  "Соціальні мережі": ["smm", "ads", "branding"],
  "Хостинг та інфраструктура": ["website-dev", "support"],
  "Локальний SEO": ["seo", "ads"],
  "Контент-маркетинг": ["smm", "seo", "ads"],
  "Конверсія (CRO)": ["website-dev", "design", "seo"],
  "Email-маркетинг": ["smm", "ads"],
  "Продуктивність": ["crm", "website-dev"],
  "Інструменти та технології": ["website-dev", "support"],
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const ogImage = `/og/blog/${slug}.png`;
  return {
    title: `${post.title} | Codeworth Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: buildAlternates(lang, `blog/${slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://codeworth.uk/${lang}/blog/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === "uk" ? "uk-UA" : "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// Static placeholder content (fallback if post has no custom content)
function getPostContent(post: (typeof BLOG_POSTS)[0], isUk: boolean): string[] {
  if (!isUk && post.contentEn && post.contentEn.length > 0) return post.contentEn;
  if (post.content && post.content.length > 0) return post.content;
  if (isUk) {
    return [
      `${post.excerpt}`,
      `У цій статті ми детально розглянемо ключові аспекти теми та надамо практичні рекомендації для вашого бізнесу.`,
      `**Чому це важливо?**\n\nСучасний цифровий ринок вимагає від бізнесу постійної адаптації та вдосконалення. Розуміння актуальних трендів та інструментів дає конкурентну перевагу.`,
      `**Практичні рекомендації**\n\n1. Починайте з аудиту поточного стану\n2. Визначте пріоритети та цілі\n3. Впроваджуйте зміни поетапно\n4. Вимірюйте результати та ітеруйте`,
      `**Висновок**\n\nЗастосовуючи описані підходи, ви зможете суттєво покращити результати вашого бізнесу в цифровому просторі. Команда Codeworth завжди готова допомогти з реалізацією.`,
    ];
  }
  return [
    `${post.excerpt}`,
    `In this article, we'll take a closer look at the key aspects of the topic and provide practical recommendations for your business.`,
    `**Why it matters?**\n\nThe modern digital market demands that businesses continuously adapt and improve. Understanding current trends and tools gives a competitive edge.`,
    `**Practical recommendations**\n\n1. Start with an audit of the current state\n2. Define priorities and goals\n3. Implement changes step by step\n4. Measure results and iterate`,
    `**Conclusion**\n\nBy applying the approaches described here, you can significantly improve your business results in the digital space. The Codeworth team is always ready to help with implementation.`,
  ];
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const isUk = lang === "uk";
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== post.category);
  const suggestions = [...sameCategory, ...otherPosts].slice(0, 3);

  const categoryObj = BLOG_CATEGORIES.find((c) => c.label.uk === post.category);

  const relatedNiche = post.nicheSlug ? getNicheLocalized(post.nicheSlug, lang) : null;

  const relatedServiceSlugs = CATEGORY_SERVICES[post.category] ?? ["website-dev", "seo"];
  const relatedServices = relatedServiceSlugs
    .map((s) => SERVICES_DATA.find((sd) => sd.slug === s))
    .filter(Boolean)
    .slice(0, 3) as (typeof SERVICES_DATA)[0][];

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  const authorData = getAuthorByName(post.author);
  const authorSchema: Record<string, unknown> = {
    "@type": "Person",
    name: isUk ? authorData?.name ?? post.author : authorData?.nameEn ?? post.author,
    ...(authorData && {
      jobTitle: isUk ? authorData.role : authorData.roleEn,
      url: `https://codeworth.uk/${lang}/blog/author/${authorData.slug}`,
      worksFor: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
      ...(authorData.social?.linkedin && { sameAs: [authorData.social.linkedin] }),
    }),
  };

  const reviewerData = post.reviewedBy ? getAuthorBySlug(post.reviewedBy) : undefined;
  const reviewerSchema = reviewerData ? {
    "@type": "Person",
    name: isUk ? reviewerData.name : reviewerData.nameEn,
    jobTitle: isUk ? reviewerData.role : reviewerData.roleEn,
    url: `https://codeworth.uk/${lang}/blog/author/${reviewerData.slug}`,
    worksFor: { "@type": "Organization", name: "Codeworth" },
    ...(reviewerData.social?.linkedin && { sameAs: [reviewerData.social.linkedin] }),
  } : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://codeworth.uk/og/blog/${post.slug}.png`,
    author: authorSchema,
    ...(reviewerSchema && { reviewedBy: reviewerSchema }),
    publisher: {
      "@type": "Organization",
      name: "Codeworth",
      url: "https://codeworth.uk",
      logo: { "@type": "ImageObject", url: "https://codeworth.uk/logo.png" },
    },
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    url: `https://codeworth.uk/${lang}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: isUk ? "uk" : "en",
    timeRequired: `PT${post.readTime}M`,
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: isUk ? item.q : (item.qEn ?? item.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: isUk ? item.a : (item.aEn ?? item.a),
      },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: "https://codeworth.uk" },
      { "@type": "ListItem", position: 2, name: "Блог", item: "https://codeworth.uk/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ReadingProgress slug={slug} />
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className={`pt-32 pb-16 bg-linear-to-br ${post.color} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <Container className="relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link href={`/${lang}`} className="hover:text-white">{isUk ? "Головна" : "Home"}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${lang}/blog`} className="hover:text-white">{isUk ? "Блог" : "Blog"}</Link>
              <ChevronRight className="w-4 h-4" />
              {categoryObj ? (
                <Link href={`/${lang}/blog/category/${categoryObj.id}`} className="text-white/90 hover:text-white truncate max-w-50 transition-colors">
                  {post.category}
                </Link>
              ) : (
                <span className="text-white/90 truncate max-w-50">{post.category}</span>
              )}
            </nav>
            <div className="max-w-3xl">
              {categoryObj ? (
                <Link href={`/${lang}/blog/category/${categoryObj.id}`} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 hover:bg-white/30 transition-colors">
                  {categoryObj.icon && <span aria-hidden="true">{categoryObj.icon}</span>}
                  {post.category}
                </Link>
              ) : (
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl lg:text-5xl font-heading font-extrabold text-white mb-5 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date, lang)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} {isUk ? "хв читання" : "min read"}
                </span>
                <span className="font-medium text-white">{post.author}</span>
                {post.updatedDate && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white/90 text-xs font-medium">
                    🔄 {isUk ? "Оновлено" : "Updated"}: {formatDate(post.updatedDate, lang)}
                  </span>
                )}
                {(() => {
                  if (!post.reviewedBy) return null;
                  const reviewer = getAuthorBySlug(post.reviewedBy);
                  if (!reviewer) return null;
                  return (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-100 text-xs font-medium">
                      ✓ {isUk ? "Перевірено:" : "Reviewed by:"} {isUk ? reviewer.name : reviewer.nameEn}
                    </span>
                  );
                })()}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-white dark:bg-neutral-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

              {/* Article */}
              <article className="lg:col-span-3">
                <div className="mb-8 flex justify-center"><EmojiIcon emoji={post.emoji} className="w-16 h-16 text-neutral-700 dark:text-neutral-200" /></div>

                <div className="prose prose-neutral max-w-none">
                  {getPostContent(post, isUk).map((para, i) => (
                    <div key={i} className="mb-6">
                      {para.split('\n').map((line, j) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <h2 key={j} className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mt-8 mb-3">{line.replace(/\*\*/g, '')}</h2>;
                        }
                        if (line.match(/^\d+\./)) {
                          return <p key={j} className="text-neutral-700 dark:text-neutral-300 leading-relaxed pl-4">{line}</p>;
                        }
                        return line ? <p key={j} className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">{line}</p> : null;
                      })}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-700 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/${lang}/blog/tag/${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                {/* Share */}
                <ShareButtons
                  url={`https://codeworth.uk/${lang}/blog/${post.slug}`}
                  title={post.title}
                  isUk={isUk}
                />

                {/* Related services */}
                {relatedServices.length > 0 && (
                  <div className="mt-8 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-neutral-50">
                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                      {isUk ? "Пов'язані послуги Codeworth" : "Related Codeworth Services"}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {relatedServices.map((rawSvc) => {
                        const svc = getServiceLocalized(rawSvc.slug, lang) ?? rawSvc;
                        const Icon = svc.icon;
                        return (
                          <Link
                            key={svc.slug}
                            href={`/${lang}/services/${svc.slug}`}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                            {svc.shortTitle}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 p-7 rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-800 text-white">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    {isUk ? "Потрібна допомога з реалізацією?" : "Need Help with Implementation?"}
                  </h3>
                  <p className="text-indigo-200 text-sm mb-5">
                    {isUk
                      ? "Команда Codeworth готова втілити ці ідеї у вашому проєкті. Безкоштовна консультація."
                      : "The Codeworth team is ready to implement these ideas in your project. Free consultation."}
                  </p>
                  <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors">
                    {isUk ? "Обговорити проєкт" : "Discuss the Project"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Author bio */}
                {(() => {
                  const authorData = getAuthorByName(post.author);
                  return (
                    <div className="mt-8 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shrink-0">
                        {authorData?.emoji ? <EmojiIcon emoji={authorData.emoji} className="w-8 h-8" /> : post.author[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-heading font-bold text-neutral-900 dark:text-white text-base leading-tight">
                          {authorData ? (
                            <Link href={`/${lang}/blog/author/${authorData.slug}`} className="hover:text-indigo-700 transition-colors">
                              {post.author}
                            </Link>
                          ) : post.author}
                        </div>
                        <div className="text-xs text-indigo-600 font-medium mt-0.5 mb-2">
                          {authorData ? (isUk ? authorData.role : authorData.roleEn) : "Codeworth Team"}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {authorData ? (isUk ? authorData.bio : authorData.bioEn) : (isUk ? "Спеціаліст команди Codeworth." : "Codeworth team specialist.")}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Navigation */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/${lang}/blog/${prevPost.slug}`}
                      className="group p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:border-indigo-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
                        <ArrowLeft className="w-3 h-3" />
                        {isUk ? "Попередня стаття" : "Previous Article"}
                      </div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-tight">
                        {prevPost.title}
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href={`/${lang}/blog`}
                      className="group p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:border-indigo-100 hover:shadow-md transition-all flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-indigo-700"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {isUk ? "Всі статті" : "All Articles"}
                    </Link>
                  )}
                  {nextPost ? (
                    <Link
                      href={`/${lang}/blog/${nextPost.slug}`}
                      className="group p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:border-indigo-100 hover:shadow-md transition-all text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-xs text-neutral-400 mb-1.5">
                        {isUk ? "Наступна стаття" : "Next Article"}
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-tight">
                        {nextPost.title}
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-8">
                {/* Author */}
                <div className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{isUk ? "Автор" : "Author"}</h3>
                  {(() => {
                    const sidebarAuthor = getAuthorByName(post.author);
                    return (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                          {sidebarAuthor?.emoji ? <EmojiIcon emoji={sidebarAuthor.emoji} className="w-8 h-8 text-white/80" /> : post.author[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                            {sidebarAuthor ? (
                              <Link href={`/${lang}/blog/author/${sidebarAuthor.slug}`} className="hover:text-indigo-700 transition-colors">
                                {post.author}
                              </Link>
                            ) : post.author}
                          </div>
                          <div className="text-xs text-indigo-600 font-medium">
                            {sidebarAuthor ? (isUk ? sidebarAuthor.role : sidebarAuthor.roleEn) : "Codeworth Team"}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Related posts */}
                {suggestions.length > 0 && (
                  <div className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white">
                    <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{isUk ? "Схожі статті" : "Related Articles"}</h3>
                    <div className="space-y-4">
                      {suggestions.map((related) => (
                        <Link key={related.slug} href={`/${lang}/blog/${related.slug}`} className="group block">
                          <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-700 transition-colors leading-tight mb-1">
                            {related.title}
                          </div>
                          <div className="text-xs text-neutral-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {related.readTime} {isUk ? "хв" : "min"}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Niche demo link */}
                {relatedNiche && (
                  <div className={`p-5 rounded-2xl bg-linear-to-br ${relatedNiche.gradient} text-white`}>
                    <div className="mb-2"><EmojiIcon emoji={relatedNiche.emoji} className="w-8 h-8 text-white/80" /></div>
                    <h3 className="font-heading font-bold text-white mb-1 text-sm">{isUk ? "Готове рішення" : "Ready-Made Solution"}</h3>
                    <p className="text-xs text-white/80 mb-3">{relatedNiche.subtitle}</p>
                    <div className="text-xs text-white/70 mb-3">
                      {isUk
                        ? `від ${relatedNiche.priceFrom.toLocaleString("uk-UA")} грн • ${relatedNiche.deliveryDays} днів`
                        : `from $${relatedNiche.priceFrom} • ${relatedNiche.deliveryDays} days`}
                    </div>
                    <Link
                      href={`/${lang}/niches/${relatedNiche.slug}`}
                      className="block w-full text-center py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-colors"
                    >
                      {isUk ? "Переглянути демо →" : "View Demo →"}
                    </Link>
                  </div>
                )}

                {/* Subscribe */}
                <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 text-sm">{isUk ? "Підписка на блог" : "Blog Newsletter"}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">{isUk ? "Нові статті раз на тиждень." : "New articles once a week."}</p>
                  <NewsletterForm variant="compact" />
                </div>
              </aside>
            </div>
          </Container>
        </section>

        {/* Related Articles — full-width bottom section */}
        {suggestions.length > 0 && (
          <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
                    {isUk ? "Читайте також" : "Keep Reading"}
                  </p>
                  <h2 className="text-2xl font-heading font-extrabold text-neutral-900">
                    {isUk ? `Більше про ${post.category}` : `More in ${categoryObj ? categoryObj.label.en : post.category}`}
                  </h2>
                </div>
                <Link
                  href={categoryObj ? `/${lang}/blog/category/${categoryObj.id}` : `/${lang}/blog`}
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {isUk ? "Всі статті категорії" : "All category articles"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${lang}/blog/${s.slug}`}
                    className="group bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className={`h-36 bg-linear-to-br ${s.color} flex items-center justify-center`}>
                      <EmojiIcon emoji={s.emoji} className="w-8 h-8 text-white/80" />
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-3">
                        {s.category}
                      </span>
                      <h3 className="font-heading font-bold text-neutral-900 dark:text-white group-hover:text-indigo-700 transition-colors leading-snug mb-2 line-clamp-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                        {s.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                        <span>{s.author.split(" ")[0]}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {s.readTime} {isUk ? "хв" : "min"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
