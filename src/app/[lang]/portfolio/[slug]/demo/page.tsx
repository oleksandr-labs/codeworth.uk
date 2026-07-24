import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectTitle } from "@/lib/data/portfolio";
import { WholesaleHubDemo } from "@/components/portfolio/demos/WholesaleHubDemo";
import { ChainOpsDemo } from "@/components/portfolio/demos/ChainOpsDemo";
import { BuildTrackDemo } from "@/components/portfolio/demos/BuildTrackDemo";
import { RetailCoreDemo } from "@/components/portfolio/demos/RetailCoreDemo";
import { AgencyDeskDemo } from "@/components/portfolio/demos/AgencyDeskDemo";
import { CareHubDemo } from "@/components/portfolio/demos/CareHubDemo";
import { FleetDeskDemo } from "@/components/portfolio/demos/FleetDeskDemo";
import { DemoBanner } from "@/components/portfolio/demos/DemoBanner";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

/** Map portfolio slug → demo component (ERP/ML case studies only) */
const DEMOS: Record<string, React.ComponentType<{ lang: string }>> = {
  "erp-wholesale": WholesaleHubDemo,
  "erp-restaurant-chain": ChainOpsDemo,
  "erp-construction": BuildTrackDemo,
  "erp-retail-chain": RetailCoreDemo,
  "erp-agency": AgencyDeskDemo,
  "erp-clinic": CareHubDemo,
  "erp-logistics": FleetDeskDemo,
};

export async function generateStaticParams() {
  return Object.keys(DEMOS).map((slug) => ({ slug }));
}

const ERP_SLUGS = new Set(["erp-wholesale", "erp-restaurant-chain", "erp-construction", "erp-retail-chain", "erp-agency", "erp-clinic", "erp-logistics"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project || !DEMOS[slug]) return {};
  const isUk = lang === "uk";
  const isErp = ERP_SLUGS.has(slug);
  const desc = isUk ? project.description : (project.descriptionEn ?? project.description);
  const title = getProjectTitle(project, lang);
  return {
    title: isUk
      ? `${title} — Демо сайту | Портфоліо Codeworth`
      : `${title} — Live Demo | Codeworth Portfolio`,
    description: isUk
      ? `Інтерактивне демо: ${project.description}`
      : `Interactive demo: ${desc}`,
    robots: isErp ? { index: true, follow: true } : { index: false },
    alternates: isErp ? {
      canonical: `https://codeworth.uk/${lang}/portfolio/${slug}/demo`,
    } : undefined,
  };
}

export default async function PortfolioDemoPage({ params }: Props) {
  const { lang, slug } = await params;
  const DemoComponent = DEMOS[slug];
  if (!DemoComponent) notFound();
  const project = PROJECTS.find((p) => p.slug === slug);
  const isErp = ERP_SLUGS.has(slug);

  const softwareLd = isErp && project ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: getProjectTitle(project, lang),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: project.descriptionEn ?? project.description,
    offers: {
      "@type": "Offer",
      price: project.priceFrom ?? 1999,
      priceCurrency: "GBP",
      seller: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
    },
    url: `https://codeworth.uk/${lang}/portfolio/${slug}/demo`,
    screenshot: `https://codeworth.uk/og/portfolio/${slug}.png`,
    creator: { "@type": "Organization", name: "Codeworth", url: "https://codeworth.uk" },
  } : null;

  return (
    <>
      {softwareLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      )}
      <DemoComponent lang={lang} />
      <DemoBanner lang={lang} slug={slug} />
    </>
  );
}
