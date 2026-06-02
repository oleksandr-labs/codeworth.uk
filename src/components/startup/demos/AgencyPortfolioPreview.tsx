export function AgencyPortfolioPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-slate-950 text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-600 flex items-center justify-center text-white text-xs font-bold">◆</div>
          <span className="font-bold text-sm">Craft Studio</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <span>Work</span><span>Services</span><span>About</span>
          <span className="bg-white text-slate-900 px-3 py-1.5 rounded-lg font-bold">Start a Project</span>
        </div>
      </nav>

      <section className="bg-slate-950 text-white px-8 py-16">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-4 tracking-widest uppercase">Branding · Web · Digital</div>
          <h1 className="text-5xl font-extrabold mb-6 leading-none">
            We build brands<br /><span className="text-slate-400">that people</span><br />actually love.
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-lg">
            Strategic branding & web design for ambitious companies. From seed-stage to Series B.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm">See our work →</button>
            <button className="border border-slate-700 text-white px-5 py-3 rounded-xl text-sm">Book a call</button>
          </div>
        </div>
      </section>

      <section className="px-8 py-8 bg-slate-900 border-t border-slate-800">
        <div className="text-xs text-slate-500 mb-4">Trusted by</div>
        <div className="flex items-center gap-8">
          {["Acme VC", "BuildCorp", "NovaTech", "GrowthLab", "SkyScale"].map((c) => (
            <span key={c} className="text-sm font-bold text-slate-600">{c}</span>
          ))}
        </div>
      </section>

      <section className="px-8 py-10 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Selected Work</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Acme Rebrand", tag: "Branding", color: "bg-violet-100", num: "+240% brand recall" },
            { name: "NovaTech Website", tag: "Web Design", color: "bg-blue-100", num: "+180% demo requests" },
            { name: "GrowthLab App", tag: "Product Design", color: "bg-emerald-100", num: "4.9⭐ App Store" },
          ].map((c) => (
            <div key={c.name} className={`rounded-xl p-5 ${c.color}`}>
              <div className="text-xs font-bold text-gray-500 mb-2">{c.tag}</div>
              <div className="font-bold text-gray-900 mb-3">{c.name}</div>
              <div className="text-sm font-semibold text-gray-700">{c.num}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-8 bg-slate-950 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Ready to build something great?</h2>
        <p className="text-slate-400 text-sm mb-5">We take on 3 new clients per quarter. Spots fill fast.</p>
        <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-xl text-sm">Start Your Project →</button>
      </section>
    </div>
  );
}
