export function SaasMvpPreview() {
  return (
    <div className="font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">S</div>
          <span className="font-bold text-sm">StreamlineHQ</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-gray-400">
          <span>Features</span>
          <span>Pricing</span>
          <span>Docs</span>
          <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold">Start Free Trial</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gray-950 text-white px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-indigo-500/30">
          ✨ Now in public beta · 500+ teams
        </div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight max-w-2xl mx-auto">
          Project management that<br />actually works
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Stop juggling tools. StreamlineHQ brings tasks, docs, and your team into one beautifully simple workspace.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
            Start for free — no credit card
          </button>
          <button className="border border-white/20 text-white px-5 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
            Watch demo ▶
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span>✅ Free 14-day trial</span>
          <span>✅ Cancel anytime</span>
          <span>✅ No setup fee</span>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-12 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Everything your team needs</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: "📋", title: "Smart Tasks", desc: "AI-powered prioritization and auto-assignment" },
            { icon: "📄", title: "Docs & Wikis", desc: "Real-time collaborative editing, no more version hell" },
            { icon: "📊", title: "Analytics", desc: "Track velocity, bottlenecks, and team health" },
            { icon: "🔔", title: "Smart Alerts", desc: "Only get notified when it actually matters" },
            { icon: "🔗", title: "Integrations", desc: "Slack, GitHub, Notion, Jira and 80+ more" },
            { icon: "🔒", title: "Permissions", desc: "Granular roles for teams of any size" },
          ].map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="font-bold text-gray-900 text-sm mb-1">{f.title}</div>
              <div className="text-xs text-gray-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-8 py-12 bg-gray-50 border-t border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Simple, transparent pricing</h2>
          <p className="text-gray-500 text-sm mt-1">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Starter", price: "$0", desc: "Up to 5 users", features: ["10 projects", "1 GB storage", "Basic analytics", "Email support"], color: "border-gray-200 bg-white" },
            { name: "Pro", price: "$29/mo", desc: "Per workspace", features: ["Unlimited projects", "50 GB storage", "Advanced analytics", "Priority support", "Integrations"], color: "border-indigo-500 bg-indigo-50", popular: true },
            { name: "Enterprise", price: "Custom", desc: "Tailored plan", features: ["Unlimited everything", "SSO / SAML", "Dedicated support", "SLA guarantee", "Custom training"], color: "border-gray-200 bg-white" },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-xl p-5 border-2 ${plan.color}`}>
              {plan.popular && <div className="text-xs font-bold text-indigo-600 mb-2">⭐ Most Popular</div>}
              <div className="font-bold text-gray-900 text-lg">{plan.name}</div>
              <div className="text-2xl font-extrabold text-gray-900 my-1">{plan.price}</div>
              <div className="text-xs text-gray-500 mb-4">{plan.desc}</div>
              <ul className="space-y-1.5 text-xs text-gray-600 mb-4">
                {plan.features.map((f) => <li key={f} className="flex items-center gap-1.5">✓ {f}</li>)}
              </ul>
              <button className={`w-full py-2 rounded-lg text-xs font-bold ${plan.popular ? "bg-indigo-600 text-white" : "bg-gray-900 text-white"}`}>
                {plan.price === "$0" ? "Get started free" : "Start free trial"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <div className="px-8 py-6 bg-white border-t border-gray-100 text-center">
        <div className="text-xs text-gray-500 mb-3">Trusted by teams at</div>
        <div className="flex items-center justify-center gap-6">
          {["Acme Co", "NovaTech", "BuildFast", "GrowthLab"].map((company) => (
            <span key={company} className="text-sm font-bold text-gray-300">{company}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
