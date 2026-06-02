import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

// Pool of reviews — seeded by niche slug to pick different ones per page
const REVIEWS_POOL_UK: Review[] = [
  {
    name: "Олена Коваль",
    role: "Власниця бізнесу",
    text: "Команда Codeworth зробила все швидко та якісно. Сайт виглядає дуже професійно, клієнти часто хвалять дизайн. Рекомендую!",
    rating: 5,
    date: "15 лютого 2025",
  },
  {
    name: "Максим Петренко",
    role: "Підприємець",
    text: "Отримали готовий сайт за 12 днів. Усе як домовлялись, без затримок. Вже через тиждень пішли перші заявки з Google.",
    rating: 5,
    date: "3 березня 2025",
  },
  {
    name: "Аліна Мороз",
    role: "Директор компанії",
    text: "Дуже задоволена результатом. Сайт адаптований під мобільні, швидко завантажується. Менеджер на зв'язку і після здачі проєкту.",
    rating: 5,
    date: "28 січня 2025",
  },
  {
    name: "Сергій Бондаренко",
    role: "ФОП",
    text: "Перший раз замовляв сайт онлайн — переживав дарма. Все чітко: ТЗ, дедлайни, правки враховані. Ціна адекватна результату.",
    rating: 5,
    date: "10 лютого 2025",
  },
  {
    name: "Іванна Савченко",
    role: "Власниця студії",
    text: "Чудовий готовий шаблон, котрий доопрацювали під мій бренд. Мені не довелося придумувати структуру з нуля — зекономила місяць часу.",
    rating: 5,
    date: "22 квітня 2025",
  },
  {
    name: "Тарас Гриценко",
    role: "Засновник стартапу",
    text: "Якість верстки — вище за конкурентів, які брали вдвічі дорожче. SEO базово налаштовано одразу. Дуже хороша команда.",
    rating: 5,
    date: "5 березня 2025",
  },
];

const REVIEWS_POOL_EN: Review[] = [
  {
    name: "Elena Koval",
    role: "Business Owner",
    text: "The Codeworth team did everything quickly and with great quality. The site looks very professional — clients often compliment the design. Highly recommend!",
    rating: 5,
    date: "February 15, 2025",
  },
  {
    name: "Max Petrenko",
    role: "Entrepreneur",
    text: "We received a finished site in 12 days. Everything as agreed, no delays. Within a week the first leads came in from Google.",
    rating: 5,
    date: "March 3, 2025",
  },
  {
    name: "Alina Moroz",
    role: "Company Director",
    text: "Very happy with the result. The site is mobile-friendly and loads fast. The manager stayed in touch even after project handoff.",
    rating: 5,
    date: "January 28, 2025",
  },
  {
    name: "Sergiy Bondarenko",
    role: "Sole Trader",
    text: "It was my first time ordering a website online — I worried for nothing. Everything was clear: specs, deadlines, revisions all accounted for. Fair price for the quality.",
    rating: 5,
    date: "February 10, 2025",
  },
  {
    name: "Ivanna Savchenko",
    role: "Studio Owner",
    text: "A great ready-made template customised to my brand. I didn't have to build the structure from scratch — saved me a month of work.",
    rating: 5,
    date: "April 22, 2025",
  },
  {
    name: "Taras Hrytsenko",
    role: "Startup Founder",
    text: "Code quality is higher than competitors who charged twice as much. Basic SEO was set up right from the start. Really great team.",
    rating: 5,
    date: "March 5, 2025",
  },
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickReviews(slug: string, count = 3, pool: Review[] = REVIEWS_POOL_UK): Review[] {
  const seed = hashSlug(slug);
  const picked: Review[] = [];
  const pool2 = [...pool];
  let idx = seed;
  while (picked.length < count && pool2.length > 0) {
    const i = idx % pool2.length;
    picked.push(pool2.splice(i, 1)[0]);
    idx = Math.floor(idx / pool2.length + 1) * 7 + 3;
  }
  return picked;
}

interface NicheReviewsProps {
  slug: string;
  color: string;
  lang?: string;
}

export function NicheReviews({ slug, color, lang = "uk" }: NicheReviewsProps) {
  const isUk = lang === "uk";
  const reviews = pickReviews(slug, 3, isUk ? REVIEWS_POOL_UK : REVIEWS_POOL_EN);

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-3">
            {isUk ? "Що кажуть наші клієнти" : "What our clients say"}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            {isUk ? "Реальні відгуки підприємців, які вже запустили свій сайт з Codeworth" : "Real reviews from business owners who launched their website with Codeworth"}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating value={5} readonly size="sm" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {isUk ? "4.9 / 5 на основі 200+ проєктів" : "4.9 / 5 based on 200+ projects"}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-neutral-50 dark:bg-neutral-900 dark:bg-neutral-800/60 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 /50 flex flex-col gap-4"
            >
              <StarRating value={review.rating} readonly size="sm" />

              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-700 ">
                <Avatar name={review.name} size="sm" />
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                    {review.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {review.role} · {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
