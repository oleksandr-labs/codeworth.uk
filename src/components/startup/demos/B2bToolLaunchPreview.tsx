export function B2bToolLaunchPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center text-white text-xs font-bold">⚙</div>
          <span className="font-bold text-sm">DevSync</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-gray-400">
          <span>Integrations</span><span>Security</span><span>Pricing</span>
          <span className="bg-cyan-600 text-white px-3 py-1.5 rounded-lg font-semibold">Start Pilot</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-gray-950 via-cyan-950 to-gray-950 text-white px-8 py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-cyan-500/30">
            🔧 Used by 40+ engineering teams in beta
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            Ship 3× faster.<br />Without more engineers.
          </h1>
          <p className="text-gray-400 dark:text-neutral-500 text-lg mb-6 max-w-xl">
            DevSync syncs your Jira, GitHub, Slack, and Notion into one unified workflow. No context switching. No missed updates.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-neutral-500 mb-8">
            <span>🔒 SOC 2 Type II</span>
            <span>·</span>
            <span>🔗 200+ integrations</span>
            <span>·</span>
            <span>⚡ 5-minute setup</span>
          </div>
          <button className="bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl text-sm">Start free 30-day pilot →</button>
        </div>
      </section>

      <section className="px-8 py-8 bg-gray-950 border-t border-gray-800">
        <div className="text-xs text-gray-500 dark:text-neutral-400 mb-4">Works with your existing stack</div>
        <div className="flex flex-wrap gap-3">
          {["GitHub", "GitLab", "Jira", "Linear", "Notion", "Slack", "Figma", "Datadog", "PagerDuty"].map((tool) => (
            <span key={tool} className="text-xs bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1.5 rounded-lg font-medium">{tool}</span>
          ))}
          <span className="text-xs text-cyan-500 px-3 py-1.5 font-medium">+191 more →</span>
        </div>
      </section>

      <section className="px-8 py-10 bg-white">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">Team-first pricing</h2>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Team", price: "$12", per: "/user/mo", desc: "Up to 25 seats", features: ["All integrations", "30-day history", "Slack notifications"] },
            { name: "Growth", price: "$9", per: "/user/mo", desc: "25–100 seats · popular", features: ["Everything in Team", "Unlimited history", "Priority support", "Custom workflows"], popular: true },
            { name: "Enterprise", price: "Custom", per: "", desc: "100+ seats", features: ["SSO / SAML", "Dedicated CSM", "SLA 99.99%", "On-prem option"] },
          ].map((p) => (
            <div key={p.name} className={`rounded-xl p-5 border-2 ${p.popular ? "border-cyan-500 bg-cyan-50" : "border-gray-200 dark:border-neutral-700 bg-white"}`}>
              {p.popular && <div className="text-xs font-bold text-cyan-600 mb-2">⭐ Most popular</div>}
              <div className="font-bold text-gray-900">{p.name}</div>
              <div className="flex items-end gap-1 my-2">
                <span className="text-2xl font-extrabold text-gray-900">{p.price}</span>
                <span className="text-xs text-gray-500 dark:text-neutral-400 mb-0.5">{p.per}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-neutral-400 mb-3">{p.desc}</div>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {p.features.map((f) => <li key={f} className="flex items-center gap-1.5">✓ {f}</li>)}
              </ul>
              <button className={`w-full mt-4 py-2 rounded-lg text-xs font-bold ${p.popular ? "bg-cyan-600 text-white" : "bg-gray-900 text-white"}`}>
                Start pilot
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
