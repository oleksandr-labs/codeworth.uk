export function CommunityPlatformPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-neutral-800 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">🏛</div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">BuildersCircle</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Members</span><span>Events</span>
          <span className="bg-purple-600 text-white px-3 py-1.5 rounded-full font-semibold">Join Community</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-purple-700 to-violet-900 text-white px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-purple-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-purple-400/30">
          🔥 Founding Members · 47 spots left
        </div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          The private network for<br />builders who ship
        </h1>
        <p className="text-purple-200 text-lg mb-8 max-w-lg mx-auto">
          Weekly expert sessions, deal flow, peer accountability, and the best founders community you&apos;ll ever join.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-white text-purple-800 font-bold px-6 py-3 rounded-xl text-sm">Join as Founding Member — $49/mo</button>
        </div>
        <p className="text-xs text-purple-300 mt-3">Regular price $97/mo · Lock in your rate forever</p>
      </section>

      <section className="px-8 py-10 bg-white dark:bg-neutral-800 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">What&apos;s inside</h2>
        <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            { icon: "🎤", title: "Weekly expert sessions", desc: "Live calls with operators who've done it before. Ask anything." },
            { icon: "💬", title: "Private Discord", desc: "24/7 access to 800+ founders. Get feedback in minutes, not days." },
            { icon: "🤝", title: "Accountability pods", desc: "Matched with 4 peers at your stage. Weekly check-ins." },
            { icon: "📋", title: "Resource vault", desc: "Templates, playbooks, and SOP library from successful founders." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
              <span className="text-xl">{f.icon}</span>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.title}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-8 bg-purple-50 border-t border-purple-100">
        <div className="text-center mb-4">
          <div className="text-xs font-bold text-purple-600 mb-2">WHO&apos;S ALREADY INSIDE</div>
          <div className="flex items-center justify-center -space-x-2 mb-2">
            {["bg-pink-400", "bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400", "bg-indigo-400"].map((c, i) => (
              <div key={i} className={`w-9 h-9 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">+794</div>
          </div>
          <p className="text-xs text-gray-500">800 founders · 40+ countries · $2M+ combined MRR</p>
        </div>
      </section>
    </div>
  );
}
