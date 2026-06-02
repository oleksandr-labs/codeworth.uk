"use client";

import { useState } from "react";

/* ─── DATA ─────────────────────────────────────────────────────── */

type Project = {
  id: number;
  name: string;
  nameUk: string;
  category: string;
  location: string;
  locationUk: string;
  year: number;
  area: number;
  descEn: string;
  descUk: string;
  specs: { label: string; labelUk: string; value: string; valueUk: string }[];
  shape: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Monolith Residence",
    nameUk: "Резиденція Моноліт",
    category: "residential",
    location: "Kyiv, Ukraine",
    locationUk: "Київ, Україна",
    year: 2024,
    area: 420,
    descEn:
      "A brutalist family home carved into a hillside. Raw concrete exterior contrasts with warm interior volumes. Floor-to-ceiling glazing frames panoramic views of the Dnipro valley.",
    descUk:
      "Бруталістський сімейний будинок, вирізаний у схилі пагорба. Сирий бетонний екстер'єр контрастує з теплими внутрішніми об'ємами. Панорамне скління обрамлює вид на долину Дніпра.",
    specs: [
      { label: "Floors", labelUk: "Поверхів", value: "3", valueUk: "3" },
      { label: "Structure", labelUk: "Конструкція", value: "Reinforced concrete", valueUk: "Залізобетон" },
      { label: "Energy class", labelUk: "Енергоклас", value: "A+", valueUk: "A+" },
    ],
    shape: "▬",
  },
  {
    id: 2,
    name: "Vertex Tower",
    nameUk: "Вежа Вертекс",
    category: "commercial",
    location: "Lviv, Ukraine",
    locationUk: "Львів, Україна",
    year: 2023,
    area: 8200,
    descEn:
      "A 14-storey office tower with a faceted glass facade that shifts in appearance with the light. Ground-floor public plaza creates dialogue between building and city.",
    descUk:
      "14-поверхова офісна вежа з фасетованим скляним фасадом, який змінює вигляд залежно від освітлення. Громадська площа на першому поверсі створює діалог між будівлею та містом.",
    specs: [
      { label: "Floors", labelUk: "Поверхів", value: "14", valueUk: "14" },
      { label: "Facade", labelUk: "Фасад", value: "Faceted glass", valueUk: "Фасетоване скло" },
      { label: "BREEAM", labelUk: "BREEAM", value: "Excellent", valueUk: "Excellent" },
    ],
    shape: "▮",
  },
  {
    id: 3,
    name: "Horizon Cultural Centre",
    nameUk: "Культурний центр Горизонт",
    category: "public",
    location: "Odesa, Ukraine",
    locationUk: "Одеса, Україна",
    year: 2024,
    area: 5600,
    descEn:
      "A civic building embracing the Black Sea coastline. Cantilevered volumes hover above a public promenade. The roof doubles as an amphitheatre for open-air performances.",
    descUk:
      "Громадська будівля, що обіймає узбережжя Чорного моря. Консольні об'єми нависають над громадським променадом. Дах слугує амфітеатром для вистав просто неба.",
    specs: [
      { label: "Span", labelUk: "Проліт", value: "32 m cantilever", valueUk: "32 м консоль" },
      { label: "Seating", labelUk: "Місць", value: "600", valueUk: "600" },
      { label: "Material", labelUk: "Матеріал", value: "Corten + concrete", valueUk: "Кортен + бетон" },
    ],
    shape: "◣",
  },
  {
    id: 4,
    name: "Void Loft",
    nameUk: "Лофт Войд",
    category: "interior",
    location: "Kyiv, Ukraine",
    locationUk: "Київ, Україна",
    year: 2023,
    area: 180,
    descEn:
      "A former industrial warehouse converted into a live-work space. Double-height void connects upper studio with ground-floor gallery. Exposed steel trusses preserved as sculptural elements.",
    descUk:
      "Колишній промисловий склад, перетворений на простір для життя та роботи. Двосвітний простір з'єднує верхню студію з галереєю на першому поверсі. Відкриті сталеві ферми збережені як скульптурні елементи.",
    specs: [
      { label: "Ceiling", labelUk: "Стеля", value: "6.2 m", valueUk: "6,2 м" },
      { label: "Windows", labelUk: "Вікна", value: "Industrial steel", valueUk: "Промислова сталь" },
      { label: "Floor", labelUk: "Підлога", value: "Polished concrete", valueUk: "Полірований бетон" },
    ],
    shape: "▭",
  },
  {
    id: 5,
    name: "Grid Pavilion",
    nameUk: "Павільйон Ґрід",
    category: "public",
    location: "Kharkiv, Ukraine",
    locationUk: "Харків, Україна",
    year: 2022,
    area: 340,
    descEn:
      "A modular steel pavilion for a public park. The orthogonal grid structure allows infinite configuration. Perforated corten panels filter light and create shifting shadow patterns throughout the day.",
    descUk:
      "Модульний сталевий павільйон для громадського парку. Ортогональна ґратчаста конструкція дозволяє нескінченну конфігурацію. Перфоровані панелі з кортену фільтрують світло та створюють тіньові візерунки протягом дня.",
    specs: [
      { label: "Modules", labelUk: "Модулів", value: "12", valueUk: "12" },
      { label: "Material", labelUk: "Матеріал", value: "Corten steel", valueUk: "Сталь кортен" },
      { label: "Assembly", labelUk: "Монтаж", value: "3 weeks", valueUk: "3 тижні" },
    ],
    shape: "▦",
  },
  {
    id: 6,
    name: "Slate House",
    nameUk: "Будинок Слейт",
    category: "residential",
    location: "Carpathians, Ukraine",
    locationUk: "Карпати, Україна",
    year: 2024,
    area: 290,
    descEn:
      "A mountain retreat clad in local slate. The building emerges from the terrain as a geological formation. Minimal openings frame specific views — a peak, a stream, a forest edge.",
    descUk:
      "Гірський притулок, облицьований місцевим сланцем. Будівля виростає з ландшафту як геологічне утворення. Мінімальні отвори обрамлюють конкретні краєвиди — вершину, потік, узлісся.",
    specs: [
      { label: "Cladding", labelUk: "Облицювання", value: "Local slate", valueUk: "Місцевий сланець" },
      { label: "Heating", labelUk: "Опалення", value: "Geothermal", valueUk: "Геотермальне" },
      { label: "Footprint", labelUk: "Забудова", value: "Minimal", valueUk: "Мінімальна" },
    ],
    shape: "◤",
  },
];

const CATEGORIES = [
  { key: "all", en: "All", uk: "Усі" },
  { key: "residential", en: "Residential", uk: "Житлові" },
  { key: "commercial", en: "Commercial", uk: "Комерційні" },
  { key: "public", en: "Public", uk: "Громадські" },
  { key: "interior", en: "Interior", uk: "Інтер'єр" },
];

const SERVICES = [
  {
    titleEn: "Architecture Design",
    titleUk: "Архітектурне проєктування",
    descEn:
      "Complete architectural design from concept to construction documentation. We approach every project as a unique spatial problem demanding a precise solution.",
    descUk:
      "Повний цикл архітектурного проєктування від концепції до робочої документації. Кожен проєкт — це унікальне просторове завдання, що вимагає точного рішення.",
    icon: "◻",
  },
  {
    titleEn: "Urban Planning",
    titleUk: "Містобудування",
    descEn:
      "Master planning and urban design for districts, campuses, and public spaces. We shape environments where architecture and infrastructure serve people.",
    descUk:
      "Генеральне планування та урбаністичний дизайн для районів, кампусів і громадських просторів. Ми формуємо середовища, де архітектура та інфраструктура служать людям.",
    icon: "▣",
  },
  {
    titleEn: "Interior Design",
    titleUk: "Дизайн інтер'єрів",
    descEn:
      "Interior architecture that extends the spatial logic of the building inward. Material, light, and proportion define every room we design.",
    descUk:
      "Інтер'єрна архітектура, що продовжує просторову логіку будівлі всередину. Матеріал, світло та пропорції визначають кожне приміщення, яке ми проєктуємо.",
    icon: "▤",
  },
  {
    titleEn: "Landscape Architecture",
    titleUk: "Ландшафтна архітектура",
    descEn:
      "Landscape design as an extension of built form. We work with terrain, vegetation, and water to create coherent environments between building and nature.",
    descUk:
      "Ландшафтний дизайн як продовження побудованої форми. Ми працюємо з рельєфом, рослинністю та водою, створюючи цілісне середовище між будівлею та природою.",
    icon: "▥",
  },
];

const PRINCIPLES = [
  {
    titleEn: "Sustainability",
    titleUk: "Сталість",
    descEn:
      "Architecture must answer to the future. Every material choice, every energy system, every spatial decision carries responsibility. We design for permanence, not obsolescence.",
    descUk:
      "Архітектура повинна відповідати перед майбутнім. Кожен вибір матеріалу, кожна енергетична система, кожне просторове рішення несе відповідальність. Ми проєктуємо для довговічності, а не для застарівання.",
  },
  {
    titleEn: "Innovation",
    titleUk: "Інновація",
    descEn:
      "Technology serves form, not the reverse. We integrate computational design, parametric modelling, and advanced fabrication — but only when they produce better architecture.",
    descUk:
      "Технологія служить формі, а не навпаки. Ми інтегруємо обчислювальний дизайн, параметричне моделювання та передове виробництво — але лише тоді, коли вони створюють кращу архітектуру.",
  },
  {
    titleEn: "Context",
    titleUk: "Контекст",
    descEn:
      "No building exists in isolation. We read the site — its geology, climate, history, and culture — before drawing a single line. Architecture must belong to its place.",
    descUk:
      "Жодна будівля не існує ізольовано. Ми читаємо ділянку — її геологію, клімат, історію та культуру — перш ніж провести єдину лінію. Архітектура повинна належати своєму місцю.",
  },
];

const PHASES = [
  {
    numEn: "01",
    titleEn: "Brief",
    titleUk: "Завдання",
    descEn: "Understanding the client, the site, and the program. We listen before we draw.",
    descUk: "Розуміння клієнта, ділянки та програми. Ми слухаємо, перш ніж малювати.",
  },
  {
    numEn: "02",
    titleEn: "Concept",
    titleUk: "Концепція",
    descEn: "Spatial ideas translated into sketches, models, and diagrams. The big idea takes form.",
    descUk: "Просторові ідеї, перекладені у ескізи, моделі та діаграми. Велика ідея набуває форми.",
  },
  {
    numEn: "03",
    titleEn: "Design Development",
    titleUk: "Розробка проєкту",
    descEn: "Refining geometry, materials, and systems. Every detail is resolved on paper first.",
    descUk: "Уточнення геометрії, матеріалів та систем. Кожна деталь вирішується спершу на папері.",
  },
  {
    numEn: "04",
    titleEn: "Construction Supervision",
    titleUk: "Авторський нагляд",
    descEn: "On-site presence to ensure design intent is faithfully executed in built form.",
    descUk: "Присутність на об'єкті для забезпечення точного відтворення проєктного задуму.",
  },
  {
    numEn: "05",
    titleEn: "Completion",
    titleUk: "Завершення",
    descEn: "Handover, documentation, and post-occupancy evaluation. The building begins its life.",
    descUk: "Здача, документація та оцінка після заселення. Будівля починає своє життя.",
  },
];

const AWARDS = [
  {
    year: 2024,
    nameEn: "Ukrainian Architecture Award — Best Public Building",
    nameUk: "Українська архітектурна премія — Найкраща громадська будівля",
    projectEn: "Horizon Cultural Centre",
    projectUk: "Культурний центр Горизонт",
  },
  {
    year: 2023,
    nameEn: "Architectural Digest UA — Newcomer of the Year",
    nameUk: "Architectural Digest UA — Новачок року",
    projectEn: "Vertex Tower",
    projectUk: "Вежа Вертекс",
  },
  {
    year: 2023,
    nameEn: "European Steel Design Award — Honourable Mention",
    nameUk: "Європейська премія сталевого дизайну — Почесна згадка",
    projectEn: "Grid Pavilion",
    projectUk: "Павільйон Ґрід",
  },
  {
    year: 2022,
    nameEn: "Dezeen Awards Longlist — Small Building of the Year",
    nameUk: "Dezeen Awards Лонгліст — Мала будівля року",
    projectEn: "Slate House",
    projectUk: "Будинок Слейт",
  },
];

const TEAM = [
  {
    nameEn: "Andrii Kovalenko",
    nameUk: "Андрій Коваленко",
    roleEn: "Founder & Principal Architect",
    roleUk: "Засновник та головний архітектор",
    educationEn: "MA Architecture, ETH Zürich",
    educationUk: "Магістр архітектури, ETH Zürich",
    projectsEn: "Monolith Residence, Horizon Cultural Centre, Slate House",
    projectsUk: "Резиденція Моноліт, Культурний центр Горизонт, Будинок Слейт",
  },
  {
    nameEn: "Olena Marchuk",
    nameUk: "Олена Марчук",
    roleEn: "Design Director",
    roleUk: "Директорка з дизайну",
    educationEn: "MA Architecture, TU Delft",
    educationUk: "Магістр архітектури, TU Delft",
    projectsEn: "Vertex Tower, Void Loft, Grid Pavilion",
    projectsUk: "Вежа Вертекс, Лофт Войд, Павільйон Ґрід",
  },
  {
    nameEn: "Dmytro Savchenko",
    nameUk: "Дмитро Савченко",
    roleEn: "Technical Director",
    roleUk: "Технічний директор",
    educationEn: "MSc Structural Engineering, KPI Kyiv",
    educationUk: "Магістр будівельних конструкцій, КПІ Київ",
    projectsEn: "Horizon Cultural Centre, Vertex Tower, Grid Pavilion",
    projectsUk: "Культурний центр Горизонт, Вежа Вертекс, Павільйон Ґрід",
  },
];

/* ─── COMPONENT ────────────────────────────────────────────────── */

export function ArkhytektonDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  /* ── Header ────────────────────────────────────────────────── */
  const header = (
    <header className="bg-stone-900 border-b border-stone-700">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <span
          className="text-white text-sm tracking-[0.35em] font-mono font-bold select-none"
          aria-label="Arkhytekton"
        >
          ARKHYTEKTON
        </span>
        <nav className="hidden md:flex gap-8">
          {(isUk
            ? ["Проєкти", "Послуги", "Студія", "Процес", "Контакт"]
            : ["Projects", "Services", "Studio", "Process", "Contact"]
          ).map((item) => (
            <span
              key={item}
              className="text-stone-400 text-xs tracking-widest uppercase font-mono cursor-pointer hover:text-white transition-colors"
            >
              {item}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );

  /* ── Hero ───────────────────────────────────────────────────── */
  const hero = (
    <section className="bg-stone-900 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tight leading-none">
          {isUk ? "МИ ФОРМУЄМО" : "WE SHAPE"}
          <br />
          {isUk ? "ПРОСТОРИ" : "SPACES"}
        </h1>
        <div className="w-full h-px bg-stone-600 my-10" />
        <p className="text-stone-400 max-w-xl text-base md:text-lg font-light leading-relaxed">
          {isUk
            ? "Архітектура — це мова простору. Ми створюємо будівлі, які говорять з оточенням, з людьми, з часом. Кожен проєкт — це маніфест функції, матеріалу та світла."
            : "Architecture is the language of space. We create buildings that speak to their surroundings, to people, to time. Every project is a manifesto of function, material, and light."}
        </p>
        <span className="inline-block mt-10 text-white text-xs tracking-widest uppercase font-mono border-b border-stone-500 pb-1 cursor-pointer hover:border-white transition-colors">
          {isUk ? "Дивитись проєкти" : "View Projects"} →
        </span>
      </div>
    </section>
  );

  /* ── Project Detail Overlay ─────────────────────────────────── */
  const projectOverlay = selectedProject && (
    <div className="fixed inset-0 z-50 bg-stone-900/95 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <button
          onClick={() => setSelectedProject(null)}
          className="text-stone-400 text-xs tracking-widest uppercase font-mono border-b border-stone-600 pb-1 mb-12 cursor-pointer hover:text-white hover:border-white transition-colors"
        >
          ← {isUk ? "Назад" : "Back"}
        </button>

        {/* Geometric placeholder */}
        <div className="w-full aspect-[16/9] bg-stone-800 border border-stone-700 flex items-center justify-center mb-10">
          <span className="text-stone-600 text-9xl font-mono select-none">
            {selectedProject.shape}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight">
              {isUk ? selectedProject.nameUk : selectedProject.name}
            </h2>
            <p className="text-stone-500 text-sm font-mono mt-2">
              {isUk ? selectedProject.locationUk : selectedProject.location} — {selectedProject.year}
            </p>
          </div>
          <p className="text-stone-400 text-sm font-mono">
            {selectedProject.area} m²
          </p>
        </div>

        <div className="w-full h-px bg-stone-700 mb-10" />

        <p className="text-stone-300 text-base leading-relaxed max-w-2xl mb-12">
          {isUk ? selectedProject.descUk : selectedProject.descEn}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {selectedProject.specs.map((s, i) => (
            <div key={i} className="border border-stone-700 p-5">
              <p className="text-stone-500 text-xs tracking-widest uppercase font-mono mb-2">
                {isUk ? s.labelUk : s.label}
              </p>
              <p className="text-white text-sm font-mono">
                {isUk ? s.valueUk : s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Projects Portfolio ─────────────────────────────────────── */
  const projects = (
    <section className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight mb-12">
          {isUk ? "ПРОЄКТИ" : "PROJECTS"}
        </h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-4 mb-14 border-b border-stone-800 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-xs tracking-widest uppercase font-mono pb-1 cursor-pointer transition-colors ${
                activeCategory === cat.key
                  ? "text-white border-b border-white"
                  : "text-stone-500 hover:text-stone-300"
              }`}
            >
              {isUk ? cat.uk : cat.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="text-left group cursor-pointer"
            >
              {/* Placeholder */}
              <div className="w-full aspect-[4/3] bg-stone-800 border border-stone-700 flex items-center justify-center mb-4 group-hover:border-stone-500 transition-colors">
                <span className="text-stone-600 text-6xl font-mono select-none group-hover:text-stone-500 transition-colors">
                  {project.shape}
                </span>
              </div>
              <h3 className="text-white text-sm font-mono font-bold tracking-wide">
                {isUk ? project.nameUk : project.name}
              </h3>
              <p className="text-stone-500 text-xs font-mono mt-1">
                {isUk ? project.locationUk : project.location} — {project.year} — {project.area} m²
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Services ───────────────────────────────────────────────── */
  const services = (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight mb-16">
          {isUk ? "ПОСЛУГИ" : "SERVICES"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-700">
          {SERVICES.map((svc, i) => (
            <div key={i} className="bg-stone-900 p-10">
              <span className="text-stone-600 text-4xl font-mono block mb-6">
                {svc.icon}
              </span>
              <h3 className="text-white text-lg font-mono font-bold tracking-wide mb-4">
                {isUk ? svc.titleUk : svc.titleEn}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {isUk ? svc.descUk : svc.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Studio Philosophy ──────────────────────────────────────── */
  const philosophy = (
    <section className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-stone-600 text-xs tracking-widest uppercase font-mono mb-4">
          {isUk ? "Філософія студії" : "Studio Philosophy"}
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-mono font-bold tracking-tight mb-16">
          {isUk ? "ФОРМА СЛІДУЄ ЗА ФУНКЦІЄЮ" : "FORM FOLLOWS FUNCTION"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PRINCIPLES.map((p, i) => (
            <div key={i}>
              <div className="w-8 h-px bg-stone-500 mb-6" />
              <h3 className="text-white text-base font-mono font-bold tracking-wide mb-4">
                {isUk ? p.titleUk : p.titleEn}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {isUk ? p.descUk : p.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Process ────────────────────────────────────────────────── */
  const process = (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight mb-16">
          {isUk ? "ПРОЦЕС" : "PROCESS"}
        </h2>

        {/* Horizontal timeline */}
        <div className="overflow-x-auto">
          <div className="flex min-w-[900px]">
            {PHASES.map((phase, i) => (
              <div key={i} className="flex-1 relative">
                {/* Connector line */}
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-white shrink-0" />
                  {i < PHASES.length - 1 && (
                    <div className="flex-1 h-px bg-stone-600" />
                  )}
                </div>
                <div className="pr-8">
                  <p className="text-stone-600 text-xs font-mono mb-2">
                    {phase.numEn}
                  </p>
                  <h3 className="text-white text-sm font-mono font-bold tracking-wide mb-3">
                    {isUk ? phase.titleUk : phase.titleEn}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {isUk ? phase.descUk : phase.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  /* ── Awards ─────────────────────────────────────────────────── */
  const awards = (
    <section className="bg-stone-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight mb-16">
          {isUk ? "НАГОРОДИ" : "AWARDS"}
        </h2>
        <div className="divide-y divide-stone-800">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6"
            >
              <span className="text-stone-600 text-sm font-mono shrink-0 w-16">
                {award.year}
              </span>
              <span className="text-white text-sm font-mono flex-1">
                {isUk ? award.nameUk : award.nameEn}
              </span>
              <span className="text-stone-500 text-xs font-mono">
                {isUk ? award.projectUk : award.projectEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Team ───────────────────────────────────────────────────── */
  const team = (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight mb-16">
          {isUk ? "КОМАНДА" : "TEAM"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-700">
          {TEAM.map((member, i) => (
            <div key={i} className="bg-stone-900 p-8">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-stone-800 border border-stone-700 flex items-center justify-center mb-6">
                <span className="text-stone-600 text-2xl font-mono">
                  {(isUk ? member.nameUk : member.nameEn).charAt(0)}
                </span>
              </div>
              <h3 className="text-white text-base font-mono font-bold tracking-wide mb-1">
                {isUk ? member.nameUk : member.nameEn}
              </h3>
              <p className="text-stone-500 text-xs font-mono mb-4">
                {isUk ? member.roleUk : member.roleEn}
              </p>
              <div className="w-6 h-px bg-stone-600 mb-4" />
              <p className="text-stone-400 text-xs font-mono mb-1">
                {isUk ? member.educationUk : member.educationEn}
              </p>
              <p className="text-stone-500 text-xs font-mono leading-relaxed mt-3">
                <span className="text-stone-600">
                  {isUk ? "Проєкти: " : "Projects: "}
                </span>
                {isUk ? member.projectsUk : member.projectsEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── Numbers ────────────────────────────────────────────────── */
  const numbers = (
    <section className="bg-stone-950 py-16 px-6 border-y border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "120+", labelEn: "Projects", labelUk: "Проєктів" },
          { value: "15", labelEn: "Years", labelUk: "Років" },
          { value: "8", labelEn: "Awards", labelUk: "Нагород" },
          { value: "4", labelEn: "Countries", labelUk: "Країни" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-white text-4xl md:text-5xl font-mono font-bold">
              {stat.value}
            </p>
            <p className="text-stone-500 text-xs tracking-widest uppercase font-mono mt-2">
              {isUk ? stat.labelUk : stat.labelEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  /* ── Contact ────────────────────────────────────────────────── */
  const contact = (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight mb-16">
          {isUk ? "КОНТАКТ" : "CONTACT"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-stone-600 text-xs tracking-widest uppercase font-mono mb-3">
              {isUk ? "Адреса" : "Address"}
            </p>
            <p className="text-stone-300 text-sm font-mono leading-relaxed">
              {isUk
                ? "вул. Хрещатик, 22/28\nКиїв, 01001\nУкраїна"
                : "22/28 Khreshchatyk St.\nKyiv, 01001\nUkraine"}
            </p>
          </div>
          <div>
            <p className="text-stone-600 text-xs tracking-widest uppercase font-mono mb-3">
              {isUk ? "Телефон" : "Phone"}
            </p>
            <p className="text-stone-300 text-sm font-mono">
              +380 44 123 4567
            </p>
          </div>
          <div>
            <p className="text-stone-600 text-xs tracking-widest uppercase font-mono mb-3">
              {isUk ? "Пишіть нам" : "Write to us"}
            </p>
            <p className="text-white text-lg md:text-xl font-mono font-bold">
              studio@arkhytekton.ua
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  /* ── Footer ─────────────────────────────────────────────────── */
  const footer = (
    <footer className="bg-stone-950 border-t border-stone-800 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-stone-600 text-xs font-mono">
          © 2024 ARKHYTEKTON
        </p>
        <p className="text-stone-700 text-xs font-mono">
          {isUk ? "Київ, Україна" : "Kyiv, Ukraine"}
        </p>
        <p className="text-stone-700 text-xs font-mono">
          {isUk ? "ЄДРПОУ 12345678" : "Reg. No. 12345678"}
        </p>
      </div>
    </footer>
  );

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {projectOverlay}
      {header}
      {hero}
      {projects}
      {services}
      {philosophy}
      {process}
      {awards}
      {team}
      {numbers}
      {contact}
      {footer}
    </div>
  );
}
