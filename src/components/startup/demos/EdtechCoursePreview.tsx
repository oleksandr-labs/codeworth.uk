export function EdtechCoursePreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-neutral-800 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white text-xs font-bold">🎓</div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">LaunchPad Academy</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Curriculum</span><span>Instructors</span>
          <span className="bg-teal-600 text-white px-3 py-1.5 rounded-lg font-semibold">Enroll Now</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-teal-800 to-cyan-900 text-white px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-400/20 text-teal-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-teal-400/30">
          ⚡ Next cohort starts June 3 · 12 spots left
        </div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          Go from idea to<br />$10K MRR in 90 days
        </h1>
        <p className="text-teal-200 text-lg mb-4 max-w-lg mx-auto">
          The only SaaS bootcamp where you build a real product, not just watch videos. Live cohort. Mentor reviews. Money-back guarantee.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-teal-200 mb-8">
          <span>⭐ 4.9 (312 reviews)</span>
          <span>👥 2,400+ alumni</span>
          <span>📅 8 weeks · live</span>
        </div>
        <button className="bg-white text-teal-800 font-bold px-8 py-3 rounded-xl text-sm">Enroll for $997 →</button>
        <p className="text-xs text-teal-300 mt-3">30-day money-back guarantee if you don&apos;t land your first customer</p>
      </section>

      <section className="px-8 py-10 bg-white dark:bg-neutral-800 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">What you&apos;ll build & learn</h2>
        <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
          {[
            ["Week 1–2", "Validate your idea in 7 days (without building anything)"],
            ["Week 3–4", "Build your MVP with no-code tools: Webflow + Supabase"],
            ["Week 5–6", "Acquire first 10 paying customers with cold outreach"],
            ["Week 7–8", "Automate, scale, and hit your first $10K MRR"],
          ].map(([week, desc]) => (
            <div key={week} className="flex items-start gap-3 p-4 rounded-xl bg-teal-50 border border-teal-100">
              <div className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded-lg whitespace-nowrap">{week}</div>
              <div className="text-sm text-gray-700">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-700 text-center">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          {[["$0 → $12K", "Average MRR after 90 days"], ["89%", "Completion rate"], ["4.9 ⭐", "Average rating"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-xl font-extrabold text-teal-600">{n}</div>
              <div className="text-xs text-gray-500">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
