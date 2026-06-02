export function ImpactNgoPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-neutral-800 border-b border-green-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">🌱</div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">GreenFuture</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Projects</span><span>Impact</span><span>Team</span>
          <span className="bg-green-600 text-white px-3 py-1.5 rounded-full font-semibold">Donate Now</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white px-8 py-14 text-center">
        <div className="text-4xl mb-4">🌍</div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          Plant 1 million trees<br />by 2026
        </h1>
        <p className="text-green-200 text-lg mb-6 max-w-lg mx-auto">
          We&apos;ve planted 347,000 trees in 12 countries. With your support, we can hit our goal this year.
        </p>
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-200">347,000 planted</span>
            <span className="font-bold text-white">35% of goal</span>
          </div>
          <div className="h-3 bg-green-800 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "35%" }} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[["$10", "Plant 3 trees"], ["$25", "Plant 10 trees"], ["$100", "Plant 50 trees"]].map(([a, l]) => (
            <button key={a} className="bg-white text-green-800 font-bold px-5 py-2.5 rounded-xl text-sm">{a} — {l}</button>
          ))}
        </div>
        <p className="text-xs text-green-300 mt-3">Tax deductible · 100% to planting · Full transparency</p>
      </section>

      <section className="px-8 py-10 bg-white dark:bg-neutral-800 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">Our impact so far</h2>
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
          {[
            { n: "347K", l: "Trees planted" },
            { n: "12", l: "Countries" },
            { n: "8,420", l: "Donors" },
            { n: "94%", l: "Survival rate" },
          ].map(({ n, l }) => (
            <div key={l} className="py-4 rounded-xl bg-green-50">
              <div className="text-2xl font-extrabold text-green-700">{n}</div>
              <div className="text-xs text-gray-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-8 bg-green-50 text-center">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Transparent financials</h3>
        <div className="flex items-center justify-center gap-4 text-xs flex-wrap">
          {[["82%", "Direct to planting"], ["11%", "Operations"], ["7%", "Education programs"]].map(([p, l]) => (
            <div key={l} className="bg-white border border-green-200 px-4 py-2 rounded-full">
              <span className="font-bold text-green-700">{p}</span>
              <span className="text-gray-500 dark:text-neutral-400 ml-1">{l}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
