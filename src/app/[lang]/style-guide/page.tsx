import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import { Divider } from "@/components/ui/Divider";
import { StarRating } from "@/components/ui/StarRating";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Style Guide — Codeworth Design System",
  description: "Дизайн-система Codeworth: кольорова палітра, типографіка, компоненти, токени.",
  robots: { index: false, follow: false },
};

const COLORS = [
  { name: "Indigo 600", hex: "#4F46E5", class: "bg-indigo-600" },
  { name: "Indigo 500", hex: "#6366F1", class: "bg-indigo-500" },
  { name: "Indigo 100", hex: "#E0E7FF", class: "bg-indigo-100" },
  { name: "Violet 600", hex: "#7C3AED", class: "bg-violet-600" },
  { name: "Emerald 500", hex: "#10B981", class: "bg-emerald-500" },
  { name: "Amber 500", hex: "#F59E0B", class: "bg-amber-500" },
  { name: "Red 500", hex: "#EF4444", class: "bg-red-500" },
  { name: "Neutral 900", hex: "#171717", class: "bg-neutral-900" },
  { name: "Neutral 500", hex: "#737373", class: "bg-neutral-500" },
  { name: "Neutral 100", hex: "#F5F5F5", class: "bg-neutral-100 border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", class: "bg-white border border-neutral-200" },
];

const GRADIENTS = [
  { name: "Primary", class: "bg-linear-to-r from-indigo-600 to-violet-600" },
  { name: "Hero", class: "gradient-hero" },
  { name: "Warm", class: "bg-linear-to-r from-amber-500 to-orange-500" },
  { name: "Success", class: "bg-linear-to-r from-emerald-500 to-teal-500" },
  { name: "Dark", class: "bg-linear-to-r from-neutral-800 to-neutral-950" },
];

const SHADOWS = [
  { name: "sm", class: "shadow-sm" },
  { name: "md", class: "shadow-md" },
  { name: "lg", class: "shadow-lg" },
  { name: "xl", class: "shadow-xl" },
  { name: "Glow (Indigo)", class: "shadow-lg shadow-indigo-500/30" },
];

const RADIUS = [
  { name: "rounded-md", class: "rounded-md" },
  { name: "rounded-xl", class: "rounded-xl" },
  { name: "rounded-2xl", class: "rounded-2xl" },
  { name: "rounded-full", class: "rounded-full" },
];

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 border-b border-neutral-100 dark:border-neutral-800">
      <h2 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white dark:bg-neutral-950">
        {/* Hero */}
        <div className="pt-32 pb-12 gradient-hero">
          <Container>
            <Breadcrumb items={[{ label: "Style Guide" }]} />
            <h1 className="text-5xl font-heading font-extrabold text-neutral-900 dark:text-white mt-6 mb-3">
              Design System
            </h1>
            <p className="text-lg text-neutral-500 max-w-xl">
              Токени, компоненти та правила дизайн-системи Codeworth.
            </p>
          </Container>
        </div>

        <Container>
          {/* Colors */}
          <Section title="Кольорова палітра" id="colors">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {COLORS.map((c) => (
                <div key={c.name} className="flex flex-col gap-2">
                  <div className={`h-16 rounded-xl ${c.class}`} />
                  <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{c.name}</div>
                  <div className="text-xs text-neutral-400 font-mono">{c.hex}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Gradients */}
          <Section title="Градієнти" id="gradients">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {GRADIENTS.map((g) => (
                <div key={g.name} className="flex flex-col gap-2">
                  <div className={`h-20 rounded-2xl ${g.class}`} />
                  <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{g.name}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Typography */}
          <Section title="Типографіка" id="typography">
            <div className="space-y-6">
              {[
                { label: "H1 — 60px, font-heading, extrabold", el: <h1 className="text-6xl font-heading font-extrabold text-neutral-900 dark:text-white leading-tight">Заголовок H1</h1> },
                { label: "H2 — 48px, font-heading, extrabold", el: <h2 className="text-5xl font-heading font-extrabold text-neutral-900 dark:text-white">Заголовок H2</h2> },
                { label: "H3 — 36px, font-heading, bold", el: <h3 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white">Заголовок H3</h3> },
                { label: "H4 — 24px, font-heading, bold", el: <h4 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">Заголовок H4</h4> },
                { label: "Body Large — 18px, neutral-600", el: <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">Основний текст великий. Inter, 18px, leading-relaxed. Використовується для описів секцій і лідів.</p> },
                { label: "Body — 16px, neutral-600", el: <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">Стандартний основний текст. Inter, 16px, leading-relaxed. Найпоширеніший розмір для контенту.</p> },
                { label: "Body Small — 14px, neutral-500", el: <p className="text-sm text-neutral-500 dark:text-neutral-400">Малий текст. 14px. Використовується для підписів, метаданих, опцій форм.</p> },
                { label: "Caption — 12px, neutral-400", el: <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">CAPTION / OVERLINE текст</p> },
              ].map(({ label, el }) => (
                <div key={label} className="pb-5 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="text-xs text-neutral-400 font-mono mb-3">{label}</div>
                  {el}
                </div>
              ))}
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Кнопки" id="buttons">
            <div className="space-y-6">
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">Варіанти (variant)</div>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="primary" isLoading>Loading</Button>
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">Розміри (size)</div>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>
            </div>
          </Section>

          {/* Badges */}
          <Section title="Бейджі та теги" id="badges">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge>Default</Badge>
              <Badge variant="hot">🔥 Хіт</Badge>
              <Badge variant="new">✨ Новинка</Badge>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">🟢 Простий</span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">🟡 Середній</span>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">🔴 Складний</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">Тег</span>
              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">SEO</span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">Next.js</span>
            </div>
          </Section>

          {/* Avatars */}
          <Section title="Аватари" id="avatars">
            <div className="space-y-6">
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">Розміри</div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar name="Олег Коваленко" size="xs" />
                  <Avatar name="Марія Іванова" size="sm" />
                  <Avatar name="Петро Сидоренко" size="md" />
                  <Avatar name="Анна Мельник" size="lg" />
                  <Avatar name="Іван Петрів" size="xl" />
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">Статус онлайн</div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar name="Онлайн" size="md" status="online" />
                  <Avatar name="Офлайн" size="md" status="offline" />
                  <Avatar name="Зайнятий" size="md" status="busy" />
                  <Avatar name="Відійшов" size="md" status="away" />
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">Група</div>
                <AvatarGroup avatars={[{name:"Олег К."},{name:"Марія І."},{name:"Петро С."},{name:"Анна М."},{name:"Іван П."}]} max={4} />
              </div>
            </div>
          </Section>

          {/* Star Rating */}
          <Section title="Рейтинг" id="rating">
            <div className="space-y-4">
              {[5, 4.5, 4, 3.5, 3].map((v) => (
                <div key={v} className="flex items-center gap-4">
                  <StarRating value={v} readonly showValue reviewCount={Math.floor(v * 10)} />
                  <span className="text-xs text-neutral-400 font-mono">value={v}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Dividers */}
          <Section title="Розділювачі" id="dividers">
            <div className="space-y-6">
              <Divider />
              <Divider variant="dashed" />
              <Divider variant="dotted" />
              <Divider label="або" />
              <Divider label="Секція" align="left" />
            </div>
          </Section>

          {/* Shadows & Radius */}
          <Section title="Тіні та радіуси" id="shadows">
            <div className="space-y-10">
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-4">Тіні</div>
                <div className="flex flex-wrap gap-6">
                  {SHADOWS.map((s) => (
                    <div key={s.name} className={`w-24 h-20 rounded-xl bg-white ${s.class} flex items-end justify-center pb-2`}>
                      <span className="text-xs text-neutral-500">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-4">Радіуси заокруглення</div>
                <div className="flex flex-wrap gap-6 items-center">
                  {RADIUS.map((r) => (
                    <div key={r.name} className={`w-20 h-20 bg-indigo-100 border-2 border-indigo-300 ${r.class} flex items-center justify-center`}>
                      <span className="text-xs text-indigo-700 text-center leading-tight">{r.name.replace("rounded-", "")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Skeletons */}
          <Section title="Skeleton Loaders" id="skeletons">
            <div className="space-y-6">
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">SkeletonText</div>
                <SkeletonText lines={3} />
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-mono mb-3">SkeletonCard (grid)</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </div>
          </Section>

          {/* Spacing */}
          <Section title="Відступи" id="spacing">
            <div className="space-y-3">
              {[
                { name: "4px / 1", val: "1" },
                { name: "8px / 2", val: "2" },
                { name: "12px / 3", val: "3" },
                { name: "16px / 4", val: "4" },
                { name: "24px / 6", val: "6" },
                { name: "32px / 8", val: "8" },
                { name: "48px / 12", val: "12" },
                { name: "64px / 16", val: "16" },
                { name: "96px / 24", val: "24" },
              ].map(({ name, val }) => (
                <div key={name} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neutral-400 w-20">{name}</span>
                  <div
                    className="h-5 bg-indigo-200 rounded"
                    style={{ width: `${parseInt(val) * 4}px` }}
                  />
                </div>
              ))}
            </div>
          </Section>

          {/* Links */}
          <div className="py-12">
            <p className="text-sm text-neutral-500">
              Детальніше:{" "}
              <Link href="/portfolio" className="text-indigo-600 hover:underline">Портфоліо</Link>
              {" · "}
              <Link href="/marketplace" className="text-indigo-600 hover:underline">Маркетплейс</Link>
              {" · "}
              <Link href="/" className="text-indigo-600 hover:underline">Головна</Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
