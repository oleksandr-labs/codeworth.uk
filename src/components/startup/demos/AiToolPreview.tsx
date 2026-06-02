export function AiToolPreview() {
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950 text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">◈</div>
          <span className="font-bold text-sm">NeuralFlow</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-gray-400">
          <span>Use Cases</span><span>Pricing</span>
          <span className="bg-violet-600 text-white px-3 py-1.5 rounded-lg font-semibold">Get Early Access</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-gray-950 via-violet-950 to-gray-950 text-white px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-violet-500/30">
          🤖 AI-powered · GPT-4o · 10× faster
        </div>
        <h1 className="text-4xl font-extrabold mb-4 leading-tight max-w-2xl mx-auto">
          Write better content<br />in a fraction of the time
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          NeuralFlow analyzes your brand voice, learns your style, and generates on-brand content that sounds like you.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-violet-600 text-white font-bold px-6 py-3 rounded-xl text-sm">Try it free — 50 generations</button>
          <button className="border border-white/20 text-white px-5 py-3 rounded-xl text-sm">See live demo ↓</button>
        </div>
      </section>

      <section className="px-8 py-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Before vs After NeuralFlow</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4 bg-red-50 border border-red-100">
              <div className="text-xs font-bold text-red-500 mb-2">❌ Without AI</div>
              <div className="text-xs text-gray-600 leading-relaxed italic">
                "We are pleased to offer our customers a wide range of solutions that meet their needs in today&apos;s competitive market environment..."
              </div>
              <div className="mt-3 text-xs text-red-400">3 hours · generic · low engagement</div>
            </div>
            <div className="rounded-xl p-4 bg-violet-50 border border-violet-200">
              <div className="text-xs font-bold text-violet-600 mb-2">✅ With NeuralFlow</div>
              <div className="text-xs text-gray-800 leading-relaxed font-medium">
                "Stop wasting 3 hours writing copy that nobody reads. NeuralFlow writes it in 90 seconds — and your customers actually click."
              </div>
              <div className="mt-3 text-xs text-violet-500">90 seconds · on-brand · 3× CTR</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-10 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
          {[
            { icon: "📝", label: "Blog posts" },
            { icon: "📧", label: "Email campaigns" },
            { icon: "📱", label: "Social captions" },
            { icon: "🎯", label: "Ad copy" },
          ].map((u) => (
            <div key={u.label} className="rounded-xl p-4 bg-white border border-gray-100">
              <div className="text-2xl mb-2">{u.icon}</div>
              <div className="text-xs font-semibold text-gray-700">{u.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="bg-violet-600 text-white font-bold px-8 py-3 rounded-xl text-sm">Get 50 free generations →</button>
          <p className="text-xs text-gray-400 mt-2">No credit card · Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}
