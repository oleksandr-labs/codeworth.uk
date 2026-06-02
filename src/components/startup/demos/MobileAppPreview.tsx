export function MobileAppPreview() {
  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-neutral-800 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold">F</div>
          <span className="font-bold text-gray-900">FitTrack</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Features</span>
          <span>Reviews</span>
          <div className="flex gap-2">
            <span className="bg-gray-900 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">🍎 App Store</span>
            <span className="bg-gray-900 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">▶ Google Play</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-8 py-14">
        <div className="flex items-center justify-between max-w-4xl mx-auto gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/30">
              ⭐ 4.9 on App Store · 1M+ downloads
            </div>
            <h1 className="text-3xl font-extrabold mb-4 leading-tight">
              Your personal fitness<br />coach in your pocket
            </h1>
            <p className="text-blue-100 text-base mb-6 leading-relaxed">
              AI-powered workouts, real-time tracking, nutrition guidance — everything you need to reach your goals faster.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="bg-white text-gray-900 dark:text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
                🍎 <span>Download on App Store</span>
              </button>
              <button className="bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
                ▶ <span>Get it on Google Play</span>
              </button>
            </div>
          </div>
          {/* Phone mockup */}
          <div className="shrink-0 w-40 h-72 rounded-3xl bg-gray-900 border-4 border-gray-700 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-cyan-600 p-3 pt-6">
              <div className="text-white text-xs font-bold mb-2">Today's Workout</div>
              <div className="bg-white/20 rounded-xl p-2 mb-2">
                <div className="text-white text-xs font-semibold">Upper Body HIIT</div>
                <div className="text-white/70 text-xs">32 min · 340 kcal</div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[["🔥", "340", "cal"], ["⏱", "32", "min"], ["💪", "8", "exer"], ["❤️", "142", "bpm"]].map(([e, v, u]) => (
                  <div key={u} className="bg-white/10 rounded-lg p-1.5 text-center">
                    <div className="text-sm">{e}</div>
                    <div className="text-white text-xs font-bold">{v}</div>
                    <div className="text-white/50 text-xs">{u}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-10 bg-white">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-8">Everything in one app</h2>
        <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto">
          {[
            { icon: "🤖", title: "AI Coach", desc: "Personalized workouts that adapt to your progress" },
            { icon: "📊", title: "Progress Tracking", desc: "Visual charts for weight, reps, and body metrics" },
            { icon: "🥗", title: "Nutrition Guide", desc: "Macro tracking with 2M+ food database" },
            { icon: "🏅", title: "Challenges", desc: "Compete with friends and win real rewards" },
            { icon: "📱", title: "Apple Watch", desc: "Real-time heart rate and workout sync" },
            { icon: "🌙", title: "Sleep Tracking", desc: "Recovery scores and sleep quality insights" },
          ].map((f) => (
            <div key={f.title} className="flex gap-3 items-start">
              <div className="text-2xl shrink-0">{f.icon}</div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{f.title}</div>
                <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-8 py-10 bg-gray-50 dark:bg-neutral-900 border-t border-gray-100">
        <div className="text-center mb-6">
          <div className="text-3xl font-extrabold text-gray-900">4.9 ★</div>
          <div className="text-sm text-gray-500">from 48,234 ratings</div>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Sarah M.", text: "Lost 12kg in 3 months. The AI coach is incredible!" },
            { name: "James T.", text: "Best fitness app I've ever used. Worth every penny." },
            { name: "Anna K.", text: "The nutrition tracker alone is worth downloading." },
          ].map((r) => (
            <div key={r.name} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-yellow-400 text-xs mb-2">★★★★★</div>
              <div className="text-xs text-gray-700 dark:text-neutral-300 mb-2">{r.text}</div>
              <div className="text-xs text-gray-400 dark:text-neutral-500 font-semibold">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Download CTA sticky-style */}
      <div className="px-8 py-5 bg-blue-600 text-white flex items-center justify-between">
        <div className="text-sm font-bold">Ready to transform your fitness?</div>
        <div className="flex gap-2">
          <button className="bg-white text-gray-900 dark:text-white text-xs font-bold px-4 py-2 rounded-lg">🍎 App Store</button>
          <button className="bg-white text-gray-900 dark:text-white text-xs font-bold px-4 py-2 rounded-lg">▶ Google Play</button>
        </div>
      </div>
    </div>
  );
}
