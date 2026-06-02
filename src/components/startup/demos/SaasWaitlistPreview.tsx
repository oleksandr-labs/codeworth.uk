export function SaasWaitlistPreview() {
  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">L</div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">LaunchApp</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Features</span>
          <span>Pricing</span>
          <span className="bg-violet-600 text-white px-3 py-1.5 rounded-full font-semibold">Join Waitlist</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50 to-white px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          🚀 Coming Soon · Q3 2026
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          The AI tool your team<br />has been waiting for
        </h1>
        <p className="text-gray-500 dark:text-neutral-400 text-lg mb-8 max-w-md mx-auto">
          Automate repetitive work, focus on what matters. Join the waitlist and be first to know when we launch.
        </p>
        <div className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            readOnly
          />
          <button className="bg-violet-600 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-violet-700 transition-colors whitespace-nowrap">
            Join Waitlist
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-neutral-500 mt-3">No spam. Unsubscribe anytime.</p>
      </section>

      {/* Social proof */}
      <div className="bg-violet-600 text-white text-center py-4">
        <div className="flex items-center justify-center gap-3 text-sm font-medium">
          <div className="flex -space-x-2">
            {["bg-pink-400", "bg-blue-400", "bg-emerald-400", "bg-amber-400"].map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-violet-600`} />
            ))}
          </div>
          <span className="font-bold">2,847 people</span>
          <span className="text-violet-200">already on the waitlist</span>
        </div>
      </div>

      {/* Features */}
      <section className="px-8 py-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        {[
          { icon: "⚡", title: "10× faster", desc: "Complete tasks in seconds instead of hours" },
          { icon: "🔒", title: "Enterprise security", desc: "SOC 2 compliant. Your data stays yours." },
          { icon: "🔗", title: "100+ integrations", desc: "Works with tools you already use" },
        ].map((f) => (
          <div key={f.title} className="text-center">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.title}</div>
            <div className="text-xs text-gray-500">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Countdown */}
      <div className="bg-gray-950 text-white px-8 py-6 text-center">
        <div className="text-xs text-gray-400 dark:text-neutral-500 mb-3 uppercase tracking-widest">Launch countdown</div>
        <div className="flex items-center justify-center gap-4">
          {[["47", "Days"], ["12", "Hours"], ["38", "Minutes"], ["05", "Seconds"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-extrabold tabular-nums">{n}</div>
              <div className="text-xs text-gray-500">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral */}
      <div className="px-8 py-8 bg-violet-50 text-center border-t border-violet-100">
        <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">🎁 Move up the queue</div>
        <div className="text-xs text-gray-500 dark:text-neutral-400 mb-3">Refer a friend → skip 10 spots in the waitlist</div>
        <div className="flex gap-2 max-w-xs mx-auto">
          <div className="flex-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-xs text-gray-500 dark:text-neutral-400 truncate">
            launchapp.co/ref/ABC123
          </div>
          <button className="bg-violet-600 text-white text-xs font-bold px-3 py-2 rounded-lg">Copy</button>
        </div>
      </div>
    </div>
  );
}
