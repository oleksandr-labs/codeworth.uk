export function MarketplaceTwoSidedPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">M</div>
          <span className="font-bold text-gray-900 text-sm">MarketLink</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>For Buyers</span><span>For Sellers</span>
          <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-full font-semibold">Get Early Access</span>
        </div>
      </nav>

      <section className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/20">
          🚀 Early Access · Limited spots
        </div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight max-w-2xl mx-auto">
          The marketplace where<br />buyers & sellers win together
        </h1>
        <p className="text-indigo-200 text-lg mb-8 max-w-lg mx-auto">
          Zero commission for founding members. Join now and lock in your free spot.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl text-sm">Join as Buyer</button>
          <button className="bg-indigo-500 border border-white/30 text-white font-bold px-6 py-3 rounded-xl text-sm">Start Selling</button>
        </div>
      </section>

      <section className="px-8 py-12 bg-white">
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl p-6 bg-indigo-50 border border-indigo-100">
            <div className="text-2xl mb-3">🛍️</div>
            <h3 className="font-bold text-gray-900 mb-3">For Buyers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Verified sellers only", "Secure escrow payments", "Buyer protection guarantee", "Price match promise", "24h response SLA"].map((b) => (
                <li key={b} className="flex items-center gap-2"><span className="text-indigo-500">✓</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-6 bg-violet-50 border border-violet-100">
            <div className="text-2xl mb-3">🏪</div>
            <h3 className="font-bold text-gray-900 mb-3">For Sellers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["0% commission (founding)", "Instant payouts", "Built-in storefront", "Analytics dashboard", "Marketing tools"].map((b) => (
                <li key={b} className="flex items-center gap-2"><span className="text-violet-500">✓</span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-8 py-8 bg-gray-50 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-6 text-sm">
          {[["1,240", "Buyers waiting"], ["380", "Verified sellers"], ["0%", "Commission fee"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl font-extrabold text-indigo-600">{n}</div>
              <div className="text-xs text-gray-500">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
