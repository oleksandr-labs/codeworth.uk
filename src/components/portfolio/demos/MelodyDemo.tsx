"use client";

import { useState } from "react";
import Link from "next/link";

interface Props { lang: string; }

export function MelodyDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [submitted, setSubmitted] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDir, setFormDir] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formPhone) setSubmitted(true);
  };

  const directions = isUk
    ? [
        { icon: "🎸", title: "Гітара", subtitle: "Акустична та електро", age: "7–45 р.", formats: ["Поп", "Рок", "Класика", "Finger-style"], price: "900 ₴/міс", color: "from-orange-400 to-amber-500" },
        { icon: "🎹", title: "Фортепіано", subtitle: "Класична школа + сучасне", age: "5–40 р.", formats: ["Класика", "Джаз", "Поп", "Самостійні акорди"], price: "1 000 ₴/міс", color: "from-violet-500 to-purple-600" },
        { icon: "🎤", title: "Вокал", subtitle: "Академічний та естрадний", age: "8–50 р.", formats: ["Постановка голосу", "Репертуар", "Запис треків", "Сцена"], price: "1 100 ₴/міс", color: "from-pink-500 to-rose-600" },
        { icon: "🥁", title: "Барабани", subtitle: "Від нуля до groove", age: "7–35 р.", formats: ["Ритмічна основа", "Rock beats", "Jazz shuffle", "Polyrhythm"], price: "950 ₴/міс", color: "from-red-500 to-orange-600" },
      ]
    : [
        { icon: "🎸", title: "Guitar", subtitle: "Acoustic & electric", age: "7–45 y.o.", formats: ["Pop", "Rock", "Classical", "Fingerstyle"], price: "$26 / mo", color: "from-orange-400 to-amber-500" },
        { icon: "🎹", title: "Piano", subtitle: "Classical school + modern", age: "5–40 y.o.", formats: ["Classical", "Jazz", "Pop", "Chord playing"], price: "$29 / mo", color: "from-violet-500 to-purple-600" },
        { icon: "🎤", title: "Vocals", subtitle: "Academic & pop style", age: "8–50 y.o.", formats: ["Voice placement", "Repertoire", "Studio recording", "Stage"], price: "$32 / mo", color: "from-pink-500 to-rose-600" },
        { icon: "🥁", title: "Drums", subtitle: "From zero to groove", age: "7–35 y.o.", formats: ["Rhythm fundamentals", "Rock beats", "Jazz shuffle", "Polyrhythm"], price: "$27 / mo", color: "from-red-500 to-orange-600" },
      ];

  const teachers = isUk
    ? [
        { emoji: "🎸", name: "Андрій Лисенко", title: "Викладач гітари", bio: "12 років на сцені, учасник гурту «Промені». Навчив 200+ учнів — від дітей до людей 40+.", award: "Гастролі: Польща, Чехія, Румунія" },
        { emoji: "🎹", name: "Вікторія Мусієнко", title: "Викладач фортепіано", bio: "Закінчила Київську консерваторію. Майстер-класи у Відні та Варшаві. Авторська методика для дорослих-початківців.", award: "Переможець Всеукраїнського конкурсу піаністів" },
        { emoji: "🎤", name: "Карина Федорук", title: "Вокальний педагог", bio: "Ведуча сольного репертуару на 3-х міжнародних фестивалях. Готує учнів до виступів та студійних записів.", award: "Учасниця X-Factor Ukraine — TOP-16" },
      ]
    : [
        { emoji: "🎸", name: "Andriy Lysenko", title: "Guitar Teacher", bio: "12 years on stage, member of the Promeni band. Has taught 200+ students from children to adults in their 40s.", award: "Tours: Poland, Czech Republic, Romania" },
        { emoji: "🎹", name: "Viktoriia Musiienko", title: "Piano Teacher", bio: "Graduated from Kyiv Conservatory. Master classes in Vienna and Warsaw. Original methodology for adult beginners.", award: "Winner — All-Ukraine Piano Competition" },
        { emoji: "🎤", name: "Karyna Fedoruk", title: "Vocal Coach", bio: "Solo performer at 3 international festivals. Prepares students for live performances and studio recordings.", award: "X-Factor Ukraine participant — TOP-16" },
      ];

  const formats = isUk
    ? [
        { icon: "🌍", title: "Онлайн", desc: "Через Zoom, де б ви не були. Урок записується — можна переглянути.", highlight: true, badge: "Найпопулярніший" },
        { icon: "🏢", title: "Офлайн (Київ)", desc: "Заняття в студії на Оболоні. Власні інструменти для практики.", highlight: false, badge: null },
        { icon: "🏠", title: "Вдома у вас", desc: "Викладач приїжджає до вас (Київ). Зручно для дітей до 10 років.", highlight: false, badge: null },
      ]
    : [
        { icon: "🌍", title: "Online", desc: "Via Zoom, wherever you are. Every lesson is recorded so you can replay it.", highlight: true, badge: "Most popular" },
        { icon: "🏢", title: "Studio (Kyiv)", desc: "Classes at our Obolon studio. Instruments provided for practice.", highlight: false, badge: null },
        { icon: "🏠", title: "At your home", desc: "Teacher comes to you (Kyiv). Ideal for children under 10.", highlight: false, badge: null },
      ];

  const whyOnline = isUk
    ? [
        { icon: "⏰", title: "Гнучкий розклад", desc: "Заняття вранці, вдень або ввечері — коли зручно вам, а не школі" },
        { icon: "🌍", title: "Без поїздок", desc: "Не треба витрачати час на дорогу. Вчитесь вдома в комфорті" },
        { icon: "📹", title: "Запис уроку", desc: "Кожен урок записується. Повторіть скільки завгодно разів" },
        { icon: "🎯", title: "Індивідуально", desc: "Викладач фокусується тільки на вас — жодних загальних груп" },
        { icon: "💰", title: "Дешевше", desc: "Онлайн-уроки на 20–30% дешевші за студійні в Києві" },
        { icon: "🌐", title: "Будь-де у світі", desc: "Переїхали — продовжуєте навчання з тим самим викладачем" },
      ]
    : [
        { icon: "⏰", title: "Flexible schedule", desc: "Morning, afternoon, or evening — on your time, not the school's" },
        { icon: "🌍", title: "No commute", desc: "No time lost travelling. Learn from the comfort of your home" },
        { icon: "📹", title: "Lesson recordings", desc: "Every lesson is recorded. Watch it back as many times as you like" },
        { icon: "🎯", title: "Personal focus", desc: "Your teacher focuses entirely on you — no group distractions" },
        { icon: "💰", title: "Better value", desc: "Online lessons are 20–30% cheaper than in-studio rates in Kyiv" },
        { icon: "🌐", title: "From anywhere", desc: "Moved abroad? Continue lessons with the same teacher" },
      ];

  const testimonials = isUk
    ? [
        { name: "Оля, 14 р.", dir: "🎸 Гітара", text: "Грала 4 пісні вже після 2 місяців! Думала що буде нудно, але урок завжди цікавий. Андрій пояснює все зрозуміло." },
        { name: "Сергій, 32 р.", dir: "🎹 Фортепіано", text: "Почав в 32 без нот та музичної освіти. Вже граю 'Місячну сонату'. Вікторія — найкращий педагог якого я зустрічав." },
        { name: "Катя, 19 р.", dir: "🎤 Вокал", text: "Записала свій перший кавер після 4 місяців. Карина допомагає не тільки технічно, але й морально." },
        { name: "Мама Миколи, 8 р.", dir: "🎹 Фортепіано", text: "Малому подобається навчання — він сам нагадує про урок. Зручно що всі заняття записуються." },
        { name: "Тарас, 27 р.", dir: "🥁 Барабани", text: "За 3 місяці навчився грати рок-ритми та джаз. Онлайн формат спочатку бентежив — але все виявилось зручніше ніж думав." },
        { name: "Ірина, 41 р.", dir: "🎸 Гітара", text: "Мрія дитинства вивчити гітару. Вже пою пісні та граю на кухні вечорами. Ніколи не пізно починати!" },
      ]
    : [
        { name: "Olya, age 14", dir: "🎸 Guitar", text: "Playing 4 songs after just 2 months! I thought it would be boring, but every lesson is interesting. Andriy explains everything so clearly." },
        { name: "Serhiy, age 32", dir: "🎹 Piano", text: "Started at 32 with zero musical background. I'm already playing Moonlight Sonata. Viktoriia is the best teacher I've ever had." },
        { name: "Katia, age 19", dir: "🎤 Vocals", text: "Recorded my first cover after 4 months. Karyna helps not just technically but emotionally too." },
        { name: "Mykola's mum, age 8", dir: "🎹 Piano", text: "He loves his lessons — he reminds me about them himself! Great that every class is recorded." },
        { name: "Taras, age 27", dir: "🥁 Drums", text: "Learned rock rhythms and jazz in 3 months. Online format seemed odd at first — turned out much more convenient than expected." },
        { name: "Iryna, age 41", dir: "🎸 Guitar", text: "Childhood dream of learning guitar — finally doing it! Singing and playing in the kitchen every evening. It's never too late!" },
      ];

  const instrumentOptions = isUk
    ? ["Гітара", "Фортепіано", "Вокал", "Барабани"]
    : ["Guitar", "Piano", "Vocals", "Drums"];

  const stats = isUk
    ? [{ val: "1 200+", label: "учнів пройшли курс" }, { val: "4", label: "напрями навчання" }, { val: "11.4%", label: "конверсія з реклами" }]
    : [{ val: "1,200+", label: "students taught" }, { val: "4", label: "instruments" }, { val: "11.4%", label: "ad conversion rate" }];

  return (
    <div className="min-h-screen bg-[#0e0a1a] font-sans text-white">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#0e0a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <span className="font-extrabold text-xl tracking-tight">Melody<span className="text-violet-400">Online</span></span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-white/60">
            <a href="#directions" className="hover:text-white transition-colors">{isUk ? "Напрями" : "Instruments"}</a>
            <a href="#formats" className="hover:text-white transition-colors">{isUk ? "Формати" : "Formats"}</a>
            <a href="#teachers" className="hover:text-white transition-colors">{isUk ? "Викладачі" : "Teachers"}</a>
            <a href="#reviews" className="hover:text-white transition-colors">{isUk ? "Відгуки" : "Reviews"}</a>
          </div>
          <a
            href="#trial"
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {isUk ? "Пробний урок" : "Free Lesson"}
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-28">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 rounded-full px-4 py-1.5 text-violet-300 text-sm mb-6">
                🎵 {isUk ? "Онлайн-школа музики з 2019 року" : "Online music school since 2019"}
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {isUk ? (
                  <>Навчіться{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">грати музику</span>{" "}яка вам подобається</>
                ) : (
                  <>Learn to play{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">the music</span>{" "}you love</>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                {isUk
                  ? "Гітара, фортепіано, вокал або барабани — для дітей від 5 років та дорослих без обмежень віку. Перший урок безкоштовно."
                  : "Guitar, piano, vocals or drums — for children from age 5 and adults of any age. First lesson is free."}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#trial"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-7 py-4 rounded-2xl text-base transition-colors shadow-xl shadow-violet-600/30"
                >
                  🎯 {isUk ? "Безкоштовний пробний урок" : "Book a free trial lesson"}
                </a>
                <a
                  href="#directions"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/5 font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
                >
                  {isUk ? "Напрями →" : "Instruments →"}
                </a>
              </div>
              <div className="flex flex-wrap gap-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                    <div className="text-sm text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="hidden md:flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center text-3xl shrink-0">🎸</div>
                  <div>
                    <div className="font-bold text-sm">Andriy L.</div>
                    <div className="text-white/40 text-xs">{isUk ? "Урок гітари · Сьогодні 18:00" : "Guitar lesson · Today 6:00 PM"}</div>
                  </div>
                  <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50 shrink-0" />
                </div>
                <div className="flex items-end gap-1 h-12">
                  {[3,5,8,6,4,9,7,5,3,6,8,4,7,9,5,6,4,8,3,5].map((h, i) => (
                    <div key={i} className="flex-1 bg-violet-500 rounded-sm opacity-60" style={{ height: `${h * 5}px` }} />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-white/40">
                  <span>4:12</span>
                  <div className="flex gap-2 items-center">
                    <span>⏮</span>
                    <span className="text-white bg-violet-600 rounded-full w-6 h-6 flex items-center justify-center">▶</span>
                    <span>⏭</span>
                  </div>
                  <span>8:30</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(isUk
                  ? [{ icon: "🎸", label: "Гітара", count: "340+" }, { icon: "🎹", label: "Піаніно", count: "280+" }, { icon: "🎤", label: "Вокал", count: "390+" }]
                  : [{ icon: "🎸", label: "Guitar", count: "340+" }, { icon: "🎹", label: "Piano", count: "280+" }, { icon: "🎤", label: "Vocals", count: "390+" }]
                ).map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="font-bold text-sm">{s.count}</div>
                    <div className="text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Directions ──────────────────────────────────────── */}
      <section id="directions" className="py-20 bg-white/3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">{isUk ? "Оберіть свій інструмент" : "Choose your instrument"}</h2>
            <p className="text-white/50">{isUk ? "Для дітей від 5 і дорослих без верхньої межі віку" : "For children from age 5 and adults with no upper age limit"}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directions.map((d) => (
              <div
                key={d.title}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/40 hover:-translate-y-1 transition-all"
              >
                <div className={`h-32 bg-linear-to-br ${d.color} flex items-center justify-between px-5`}>
                  <div>
                    <div className="font-extrabold text-white text-2xl">{d.title}</div>
                    <div className="text-white/80 text-xs mt-0.5">{d.subtitle}</div>
                  </div>
                  <span className="text-5xl">{d.icon}</span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-white/40 mb-3">{isUk ? "Вік:" : "Age:"} {d.age}</div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {d.formats.map((f) => (
                      <span key={f} className="text-[11px] px-2 py-0.5 rounded-lg bg-white/10 text-white/60">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-violet-400">{d.price}</span>
                    <a href="#trial" className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors">
                      {isUk ? "Пробний урок" : "Free trial"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formats ─────────────────────────────────────────── */}
      <section id="formats" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">{isUk ? "Формати занять" : "Lesson formats"}</h2>
            <p className="text-white/50">{isUk ? "Оберіть зручний для вас спосіб" : "Choose the format that suits you"}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map((f) => (
              <div
                key={f.title}
                className={`rounded-3xl border p-8 ${
                  f.highlight
                    ? "bg-violet-600 border-violet-500 shadow-2xl shadow-violet-600/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-extrabold text-xl mb-2">{f.title}</h3>
                {f.badge && <div className="text-xs font-bold bg-white/20 rounded-full px-3 py-1 inline-block mb-3">⭐ {f.badge}</div>}
                <p className={`text-sm leading-relaxed ${f.highlight ? "text-violet-100" : "text-white/50"}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why online ──────────────────────────────────────── */}
      <section className="py-16 bg-white/3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            {isUk ? "Чому онлайн краще, ніж офлайн?" : "Why online beats in-person?"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyOnline.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold mb-1 text-sm">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teachers ────────────────────────────────────────── */}
      <section id="teachers" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">{isUk ? "Наші викладачі" : "Our teachers"}</h2>
            <p className="text-white/50">{isUk ? "Практикуючі музиканти, а не лише педагоги" : "Practising musicians, not just instructors"}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-violet-500/30 transition-colors">
                <div className="text-5xl mb-4">{t.emoji}</div>
                <h3 className="font-extrabold text-xl mb-0.5">{t.name}</h3>
                <div className="text-violet-400 font-semibold text-sm mb-3">{t.title}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{t.bio}</p>
                <div className="border-t border-white/10 pt-4 text-xs text-white/30">🏆 {t.award}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section id="reviews" className="py-20 bg-white/3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            {isUk ? "Відгуки учнів" : "Student reviews"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((r) => (
              <div key={r.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-amber-400">★</span>)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-800 flex items-center justify-center font-bold text-violet-200 text-sm shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-white/30">{r.dir}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial form ──────────────────────────────────────── */}
      <section id="trial" className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-linear-to-br from-violet-900/60 to-purple-900/60 border border-violet-500/30 rounded-3xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🎵</div>
              <h2 className="text-2xl font-extrabold mb-2">
                {isUk ? "Перший урок безкоштовно" : "First lesson is free"}
              </h2>
              <p className="text-white/50 text-sm">
                {isUk
                  ? "Оберіть інструмент, час та викладача. Без передоплати."
                  : "Choose your instrument, time and teacher. No upfront payment."}
              </p>
            </div>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-extrabold mb-2">{isUk ? "Чудово!" : "Wonderful!"}</h3>
                <p className="text-white/50 text-sm">
                  {isUk
                    ? "Надішлемо деталі у Viber/WhatsApp протягом 2 годин."
                    : "We'll send details via WhatsApp / Telegram within 2 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={isUk ? "Ваше ім'я або ім'я дитини" : "Your name or child's name"}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
                <input
                  type="tel"
                  placeholder={isUk ? "Номер телефону" : "Phone number"}
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
                <select
                  value={formDir}
                  onChange={(e) => setFormDir(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="" className="bg-slate-900">{isUk ? "Оберіть інструмент" : "Choose instrument"}</option>
                  {instrumentOptions.map((d) => (
                    <option key={d} value={d} className="bg-slate-900">{d}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-violet-600/30"
                >
                  {isUk ? "Записатись на безкоштовний урок" : "Book my free lesson →"}
                </button>
                <p className="text-center text-xs text-white/30">
                  {isUk ? "Без передоплати. Зв'яжемось протягом 2 годин." : "No payment needed. We'll contact you within 2 hours."}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#0a0715] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎵</span>
                <span className="font-extrabold text-white text-lg">Melody<span className="text-violet-400">Online</span></span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                {isUk
                  ? "Онлайн-школа музики з 2019 року. Гітара, фортепіано, вокал та барабани для дітей та дорослих."
                  : "Online music school since 2019. Guitar, piano, vocals and drums for children and adults."}
              </p>
              <div className="space-y-1.5 text-sm text-white/50">
                <a href="tel:+380671234567" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-violet-400">📞</span> +38 067 123 45 67
                </a>
                <a href="mailto:hello@melodyonline.ua" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-violet-400">✉️</span> hello@melodyonline.ua
                </a>
              </div>
            </div>
            {/* Navigation */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Навігація" : "Navigation"}</div>
              <ul className="space-y-2.5 text-sm text-white/50">
                {(isUk
                  ? [["#directions","Напрями"], ["#formats","Формати"], ["#teachers","Викладачі"], ["#reviews","Відгуки"], ["#trial","Пробний урок"]]
                  : [["#directions","Instruments"], ["#formats","Formats"], ["#teachers","Teachers"], ["#reviews","Reviews"], ["#trial","Free lesson"]]
                ).map(([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            {/* Hours + Social */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Графік" : "Hours"}</div>
              <ul className="space-y-2 text-sm text-white/50 mb-6">
                <li>{isUk ? "Пн – Пт: 09:00 – 21:00" : "Mon – Fri: 9 AM – 9 PM"}</li>
                <li>{isUk ? "Сб – Нд: 10:00 – 18:00" : "Sat – Sun: 10 AM – 6 PM"}</li>
              </ul>
              <div className="font-semibold text-white text-sm mb-3">{isUk ? "Соцмережі" : "Follow us"}</div>
              <div className="flex gap-2 flex-wrap">
                {["Instagram", "YouTube", "TikTok"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/50 hover:text-white hover:bg-white/20 cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <span>© 2025 MelodyOnline. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
            <span>
              {isUk ? "Сайт розроблено студією" : "Built by"}{" "}
              <Link href={`/${lang}/portfolio`} className="text-white/50 hover:text-white transition-colors">
                Codeworth ↗
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
