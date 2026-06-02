export function FintechAppPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">$</div>
          <span className="font-bold text-gray-900 text-sm">ClearBank</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-gray-500">
          <span>Features</span><span>Security</span><span>Pricing</span>
          <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold">Open Account</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white px-8 py-14">
        <div className="grid grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-emerald-400/30">
              🔒 FCA Regulated · FSCS Protected
            </div>
            <h1 className="text-3xl font-extrabold mb-4 leading-tight">
              Banking that works<br />for you, not banks
            </h1>
            <p className="text-emerald-200 text-base mb-6">
              3% cashback. No hidden fees. Open in 4 minutes with your phone.
            </p>
            <button className="bg-white text-emerald-800 font-bold px-6 py-3 rounded-xl text-sm mr-3">Open Free Account</button>
          </div>
          <div className="bg-emerald-700/40 rounded-2xl p-5 border border-emerald-600/40">
            <div className="text-xs text-emerald-300 mb-3 font-semibold">Your ClearBank Card</div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 mb-4">
              <div className="flex justify-between items-start mb-6">
                <div className="text-white text-sm font-bold">ClearBank</div>
                <div className="text-white/70 text-xs">💳</div>
              </div>
              <div className="text-white font-mono text-sm tracking-widest mb-4">•••• •••• •••• 4291</div>
              <div className="flex justify-between text-white/80 text-xs">
                <span>Alex Johnson</span><span>12/28</span>
              </div>
            </div>
            <div className="text-center text-emerald-300 text-xs">Instant issue · Apple Pay ready</div>
          </div>
        </div>
      </section>

      <section className="px-8 py-10 bg-white border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Why 50,000+ people switched</h2>
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
          {[
            { icon: "💸", title: "3% Cashback", desc: "On all purchases" },
            { icon: "🚫", title: "Zero fees", desc: "No monthly charges" },
            { icon: "⚡", title: "Instant transfers", desc: "24/7 real-time" },
            { icon: "🌍", title: "0% FX", desc: "Interbank rate" },
          ].map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-emerald-50">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-bold text-gray-900 text-sm">{f.title}</div>
              <div className="text-xs text-gray-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-8 bg-emerald-50 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 flex-wrap">
          {["🔒 256-bit encryption", "🏦 FSCS protected up to £85,000", "⭐ 4.8/5 on Trustpilot", "📱 iOS & Android"].map((b) => (
            <span key={b} className="bg-white border border-gray-200 px-3 py-1.5 rounded-full">{b}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
