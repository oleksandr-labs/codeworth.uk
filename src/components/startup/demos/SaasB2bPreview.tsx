export function SaasB2bPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-700 flex items-center justify-center text-white text-xs font-bold">A</div>
          <span className="font-bold text-gray-900 text-sm">AutomateIQ</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-gray-500">
          <span>Features</span><span>Pricing</span><span>Security</span>
          <span className="bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold">Book a Demo</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white px-8 py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-400/30">
            Trusted by 200+ companies
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            Cut your ops costs by 40%<br />in the first quarter
          </h1>
          <p className="text-blue-200 text-lg mb-8 max-w-xl">
            Enterprise-grade workflow automation built for operations teams. No IT dependency required.
          </p>
          <div className="flex items-center gap-3">
            <button className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl text-sm">Book a 30-min Demo</button>
            <button className="border border-blue-400/40 text-white px-5 py-3 rounded-xl text-sm">Download ROI calculator</button>
          </div>
        </div>
      </section>

      <section className="px-8 py-8 bg-white border-b border-gray-100">
        <div className="text-xs text-gray-400 text-center mb-4">Trusted by teams at</div>
        <div className="flex items-center justify-center gap-8">
          {["Acme Corp", "BuildCo", "NovaTech", "ScaleFast", "CloudBase"].map((c) => (
            <span key={c} className="text-sm font-bold text-gray-300">{c}</span>
          ))}
        </div>
      </section>

      <section className="px-8 py-12 bg-gray-50">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">Built for enterprise teams</h2>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: "🔒", title: "SOC 2 Type II", desc: "Enterprise security & compliance out of the box" },
            { icon: "🔗", title: "200+ integrations", desc: "Slack, Salesforce, SAP, Jira, and your legacy stack" },
            { icon: "📊", title: "ROI dashboard", desc: "Real-time savings tracker for your finance team" },
            { icon: "👥", title: "Team pricing", desc: "Per-seat billing with volume discounts from 10+ seats" },
            { icon: "⚡", title: "No-code setup", desc: "Ops teams go live in 2 days, not 2 months" },
            { icon: "🛠️", title: "Dedicated CSM", desc: "Onboarding specialist + quarterly business reviews" },
          ].map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-white border border-gray-100">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="font-bold text-gray-900 text-sm mb-1">{f.title}</div>
              <div className="text-xs text-gray-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-10 bg-blue-700 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Ready to see AutomateIQ in action?</h2>
        <p className="text-blue-200 text-sm mb-5">30-minute demo. No commitment. ROI estimate included.</p>
        <button className="bg-white text-blue-800 font-bold px-8 py-3 rounded-xl text-sm">Schedule Your Demo →</button>
      </section>
    </div>
  );
}
