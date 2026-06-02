export function DtcBrandPreview() {
  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-neutral-800 border-b border-rose-100">
        <div className="font-extrabold text-rose-700 tracking-tight text-lg">LUMIÈRE</div>
        <div className="flex items-center gap-5 text-xs text-gray-500">
          <span>Our Story</span>
          <span>Ingredients</span>
          <span>Reviews</span>
          <span className="bg-rose-600 text-white px-4 py-1.5 rounded-full font-semibold">Shop Now</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 px-8 py-14">
        <div className="flex items-center gap-12 max-w-4xl mx-auto">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              🌹 Cruelty-free · Vegan · Made in France
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Your skin deserves<br />the best of nature
            </h1>
            <p className="text-gray-500 dark:text-neutral-400 text-base mb-6 leading-relaxed">
              Our award-winning rose serum is crafted from 100% organic Bulgarian rose extract. Backed by dermatologists, loved by 50,000+ customers.
            </p>
            <div className="flex gap-3 mb-4">
              <button className="bg-rose-600 text-white font-bold px-7 py-3 rounded-2xl text-sm hover:bg-rose-700 transition-colors">
                Shop Now — £38
              </button>
              <button className="border border-rose-200 text-rose-700 px-5 py-3 rounded-2xl text-sm font-semibold hover:bg-rose-50 transition-colors">
                Our Story
              </button>
            </div>
            <div className="text-xs text-gray-400 dark:text-neutral-500 flex items-center gap-3">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-gray-600">4.9</span>
              <span>from 3,284 reviews</span>
            </div>
          </div>
          {/* Product image placeholder */}
          <div className="shrink-0 w-48 h-48 rounded-3xl bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">🌹</div>
              <div className="text-xs font-bold text-rose-800">Rose Serum</div>
              <div className="text-xs text-rose-700">30ml</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product details */}
      <section className="px-8 py-10 bg-white dark:bg-neutral-800 border-t border-rose-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">Why LUMIÈRE Rose Serum?</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "🌿", title: "100% Organic", desc: "No parabens, sulfates, or artificial fragrances" },
              { icon: "🔬", title: "Dermatologist tested", desc: "Clinically proven to reduce wrinkles by 34%" },
              { icon: "🌍", title: "Sustainable", desc: "Recyclable packaging, carbon-neutral shipping" },
              { icon: "❤️", title: "50K+ customers", desc: "With a 4.9★ average rating" },
            ].map((f) => (
              <div key={f.title} className="text-center p-4 rounded-xl bg-rose-50">
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="font-bold text-gray-900 dark:text-white text-xs mb-1">{f.title}</div>
                <div className="text-xs text-gray-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC Reviews */}
      <section className="px-8 py-10 bg-rose-50 border-t border-rose-100">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white text-center mb-6">Real results from real customers</h2>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Emma L.", text: "My skin has never looked better! After 4 weeks, the difference is incredible.", before: "Dry & dull", after: "Glowing & hydrated" },
            { name: "Olivia K.", text: "I've tried dozens of serums. This is the only one that actually delivers on its promises.", before: "Fine lines", after: "Visibly smoother" },
            { name: "Sophie R.", text: "The scent is divine and it absorbs immediately. No greasy feeling whatsoever.", before: "Redness", after: "Calm & even" },
          ].map((r) => (
            <div key={r.name} className="bg-white rounded-xl p-4 border border-rose-100">
              <div className="text-yellow-400 text-xs mb-2">★★★★★</div>
              <div className="text-xs text-gray-700 dark:text-neutral-300 mb-3 italic">&ldquo;{r.text}&rdquo;</div>
              <div className="flex gap-2 mb-2">
                <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">Before: {r.before}</span>
                <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">After: {r.after}</span>
              </div>
              <div className="text-xs text-gray-400 dark:text-neutral-500 font-semibold">{r.name} · Verified buyer</div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription offer */}
      <div className="px-8 py-6 bg-gray-900 text-white flex items-center justify-between">
        <div>
          <div className="font-bold text-sm">Subscribe & Save 15%</div>
          <div className="text-xs text-gray-400">Cancel anytime. Free shipping on every order.</div>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <div className="text-xs text-gray-400 dark:text-neutral-500 line-through">£38</div>
            <div className="font-extrabold text-rose-400 text-lg">£32.30/mo</div>
          </div>
          <button className="bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-rose-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
