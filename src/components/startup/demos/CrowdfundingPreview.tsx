export function CrowdfundingPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-orange-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-bold">F</div>
          <span className="font-bold text-gray-900 text-sm">FundFlow</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Updates</span><span>Backers</span>
          <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full font-semibold">Back This Project</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-orange-500 to-amber-600 text-white px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          ⏰ 14 days left
        </div>
        <h1 className="text-3xl font-extrabold mb-3 leading-tight">
          The world&apos;s first portable<br />cold press juicer
        </h1>
        <p className="text-orange-100 text-base mb-6 max-w-md mx-auto">
          Fresh juice anywhere. USB-C charged. No plastic waste. Ship Dec 2026.
        </p>
        <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl text-sm mb-4">
          🎯 Back this project from $49
        </button>
      </section>

      <section className="px-8 py-8 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-bold text-gray-900">$87,430 raised</span>
            <span className="text-gray-500">of $50,000 goal · <strong className="text-orange-500">174%</strong></span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: "100%" }} />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[["847", "Backers"], ["14", "Days left"], ["$49", "Early bird"]].map(([n, l]) => (
              <div key={l} className="py-3 rounded-xl bg-orange-50">
                <div className="text-xl font-extrabold text-orange-600">{n}</div>
                <div className="text-xs text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-10 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Choose your reward</h2>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { tier: "Early Bird", price: "$49", desc: "1× juicer + travel pouch", left: "23 left", accent: "bg-orange-500" },
            { tier: "Double Down", price: "$89", desc: "2× juicers + recipe book", left: "Unlimited", accent: "bg-amber-500" },
            { tier: "Gift Set", price: "$129", desc: "2× juicers + premium case + gift wrap", left: "Unlimited", accent: "bg-yellow-500" },
          ].map((t) => (
            <div key={t.tier} className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center">
              <div className="text-lg font-extrabold text-gray-900 mb-1">{t.price}</div>
              <div className="font-semibold text-gray-700 text-sm mb-2">{t.tier}</div>
              <div className="text-xs text-gray-500 mb-3">{t.desc}</div>
              <div className="text-xs text-orange-500 font-bold mb-3">{t.left}</div>
              <button className={`w-full py-2 rounded-lg text-xs font-bold text-white ${t.accent}`}>Select</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
