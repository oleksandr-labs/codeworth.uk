export function NewsletterPreview() {
  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-amber-950 text-white">
        <div className="flex items-center gap-2">
          <span className="text-xl">📰</span>
          <span className="font-extrabold tracking-tight">TechPulse Weekly</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-amber-200">
          <span>Archive</span>
          <span>About</span>
          <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full font-semibold">Subscribe Free</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-amber-950 text-white px-8 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-800/50 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-amber-700">
          📬 8,400+ founders & builders · Every Thursday
        </div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          The tech news that<br />actually matters
        </h1>
        <p className="text-amber-200 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          5-minute weekly digest of the most important tech trends, startup moves, and tools you need to know about. No fluff, no ads.
        </p>
        <div className="flex gap-2 max-w-sm mx-auto mb-3">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 bg-white/10 border border-amber-700 text-white placeholder-amber-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
            readOnly
          />
          <button className="bg-amber-500 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-amber-400 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-amber-600">Free forever. No spam. Read anytime.</p>
      </section>

      {/* Stats row */}
      <div className="bg-amber-900 text-white px-8 py-4">
        <div className="flex items-center justify-center gap-10 text-center">
          {[["8,400+", "Subscribers"], ["73%", "Open rate"], ["4.8★", "Rating"], ["52", "Issues published"]].map(([v, l]) => (
            <div key={l}>
              <div className="font-extrabold text-amber-300">{v}</div>
              <div className="text-xs text-amber-500">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent issues preview */}
      <section className="px-8 py-10 bg-white">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6">Recent issues</h2>
        <div className="space-y-3 max-w-3xl">
          {[
            { issue: "#52", date: "Apr 24", title: "OpenAI's new model vs Claude 4 — what matters for builders", tag: "AI" },
            { issue: "#51", date: "Apr 17", title: "The 5 startup trends reshaping B2B SaaS in 2026", tag: "Trends" },
            { issue: "#50", date: "Apr 10", title: "Bootstrapped to $1M ARR: 6 founders share their playbook", tag: "Founders" },
          ].map((item) => (
            <div key={item.issue} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-neutral-700 hover:border-amber-200 hover:bg-amber-50 transition-all cursor-pointer group">
              <div className="text-xs font-bold text-amber-600 bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-amber-100">
                {item.issue}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-amber-700 transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">{item.date}</div>
              </div>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="px-8 py-10 bg-amber-50 border-t border-amber-100">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">What you get every Thursday</h2>
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: "⚡", title: "5-min read", desc: "Concise. Dense. No filler." },
            { icon: "🎯", title: "Curated picks", desc: "Only what actually matters" },
            { icon: "🔧", title: "Tools & resources", desc: "Vetted tools for builders" },
            { icon: "💡", title: "Insights", desc: "Takeaways you can act on" },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="font-bold text-gray-900 dark:text-white text-xs mb-1">{b.title}</div>
              <div className="text-xs text-gray-500">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About / author */}
      <section className="px-8 py-8 bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700 flex items-center gap-6 max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-amber-200 flex items-center justify-center text-2xl shrink-0">👤</div>
        <div>
          <div className="font-bold text-gray-900">Alex Romanov</div>
          <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">ex-Google · 3× founder · Investor</div>
          <div className="text-xs text-gray-600 dark:text-neutral-300 mt-2 leading-relaxed">
            I read 200+ articles a week so you don't have to. Building in public since 2019.
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="px-8 py-6 bg-amber-500 text-white text-center">
        <div className="font-bold text-lg mb-1">Join 8,400+ readers this Thursday</div>
        <div className="text-amber-100 text-sm mb-4">It's free. Forever.</div>
        <button className="bg-white text-amber-700 font-bold px-8 py-3 rounded-2xl text-sm hover:bg-amber-50 transition-colors shadow">
          Subscribe — it's free
        </button>
      </div>
    </div>
  );
}
