"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, Send, CheckCircle2 } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  textEn: string;
  textUk: string;
  verified: boolean;
  helpful: number;
}

const INITIAL_REVIEWS: Review[] = [
  { id: 1, name: "Olha M.", rating: 5, date: "2026-04-28", textEn: "Excellent quality and fast delivery. Highly recommend!", textUk: "Чудова якість, швидка доставка. Раджу всім!", verified: true, helpful: 24 },
  { id: 2, name: "Dmytro K.", rating: 4, date: "2026-04-22", textEn: "Good product but packaging could be better.", textUk: "Гарний товар, але упаковка могла б бути кращою.", verified: true, helpful: 8 },
  { id: 3, name: "Anna S.", rating: 5, date: "2026-04-15", textEn: "Exactly as described. Will buy again.", textUk: "Точно як описано. Куплю ще.", verified: false, helpful: 12 },
];

function StarRow({ value, onChange, size = "md", interactive = false }: { value: number; onChange?: (v: number) => void; size?: "sm" | "md" | "lg"; interactive?: boolean }) {
  const [hover, setHover] = useState(0);
  const sizeClass = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-7 h-7" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= (hover || value);
        return interactive ? (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
            aria-label={`${i} star${i === 1 ? "" : "s"}`}
          >
            <Star className={`${sizeClass} ${filled ? "text-amber-400 fill-amber-400" : "text-neutral-300"}`} />
          </button>
        ) : (
          <Star key={i} className={`${sizeClass} ${filled ? "text-amber-400 fill-amber-400" : "text-neutral-300"}`} />
        );
      })}
    </div>
  );
}

export function EcomReviewsDemo({ isUk }: Props) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [helpfulVotes, setHelpfulVotes] = useState<Set<number>>(new Set());
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) return;
    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      rating,
      date: new Date().toISOString().slice(0, 10),
      textEn: text.trim(),
      textUk: text.trim(),
      verified: false,
      helpful: 0,
    };
    setReviews((r) => [newReview, ...r]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName(""); setText(""); setRating(0);
    }, 2500);
  };

  const voteHelpful = (id: number) => {
    if (helpfulVotes.has(id)) return;
    setHelpfulVotes((s) => new Set(s).add(id));
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)));
  };

  return (
    <div className="space-y-6">
      {/* Aggregate */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="text-center">
            <div className="text-5xl font-bold text-neutral-900 tabular-nums">{avg.toFixed(1)}</div>
            <StarRow value={Math.round(avg)} />
            <div className="text-xs text-neutral-500 mt-1">{reviews.length} {isUk ? "відгуків" : "reviews"}</div>
          </div>
          <div className="flex-1 min-w-[200px] space-y-1.5">
            {distribution.map((d) => {
              const pct = reviews.length > 0 ? (d.count / reviews.length) * 100 : 0;
              return (
                <div key={d.star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-neutral-500 tabular-nums">{d.star}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${pct}%` }}
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${d.star} stars: ${d.count} reviews`}
                    />
                  </div>
                  <span className="w-8 text-right text-neutral-500 tabular-nums">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900">{r.name}</span>
                  {r.verified && (
                    <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      {isUk ? "Підтверджено" : "Verified"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRow value={r.rating} size="sm" />
                  <span className="text-xs text-neutral-400">{r.date}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed mb-3">{isUk ? r.textUk : r.textEn}</p>
            <button
              onClick={() => voteHelpful(r.id)}
              disabled={helpfulVotes.has(r.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors ${
                helpfulVotes.has(r.id)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-neutral-500 hover:bg-neutral-100"
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              {isUk ? "Корисно" : "Helpful"} ({r.helpful})
            </button>
          </div>
        ))}
      </div>

      {/* Submit form */}
      <form onSubmit={submit} className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          {isUk ? "Залишити відгук" : "Write a review"}
        </h3>

        {submitted ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm">{isUk ? "Дякуємо! Ваш відгук опубліковано після модерації." : "Thank you! Your review will be published after moderation."}</p>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isUk ? "Ваше ім'я" : "Your name"}
              required
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
              aria-label={isUk ? "Ім'я" : "Name"}
            />
            <div>
              <p className="text-xs text-neutral-500 mb-2">{isUk ? "Оцінка:" : "Rating:"}</p>
              <StarRow value={rating} onChange={setRating} size="lg" interactive />
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isUk ? "Ваш відгук..." : "Your review..."}
              required
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm resize-none"
              aria-label={isUk ? "Текст відгуку" : "Review text"}
            />
            <button
              type="submit"
              disabled={!name.trim() || !text.trim() || rating === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
              {isUk ? "Опублікувати" : "Publish review"}
            </button>
          </>
        )}
      </form>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Schema.org AggregateRating + Review для Rich Snippets у Google. Модерація в адмін-панелі. Verified badge для покупців."
          : "Schema.org AggregateRating + Review for Google Rich Snippets. Moderation in admin. Verified badge for buyers."}
      </p>
    </div>
  );
}
