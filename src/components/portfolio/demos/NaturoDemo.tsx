"use client";
import { useState } from "react";

export function NaturoDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [advisorStep, setAdvisorStep] = useState<0 | 1 | 2 | 3>(0);
  const [concern, setConcern] = useState("");
  const [form, setForm] = useState("");
  const [pregnant, setPregnant] = useState<boolean | null>(null);
  const [activeCategory, setActiveCategory] = useState("herbs");
  const [activeHerb, setActiveHerb] = useState<number | null>(null);
  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultConcern, setConsultConcern] = useState("");
  const [consultTime, setConsultTime] = useState("");
  const [consultSent, setConsultSent] = useState(false);
  const [activeSection, setActiveSection] = useState("advisor");

  const GREEN = "#2D6A4F";
  const BEIGE = "#F4ECD8";
  const OCHRE = "#D4A559";
  const LIGHT_GREEN = "#52B788";
  const DARK_GREEN = "#1B4332";

  const concerns = isUk
    ? [
        { id: "sleep", label: "Проблеми зі сном" },
        { id: "stress", label: "Стрес і тривога" },
        { id: "immunity", label: "Імунітет" },
        { id: "digestion", label: "Травлення" },
        { id: "joints", label: "Суглоби" },
        { id: "skin", label: "Шкіра" },
        { id: "energy", label: "Енергія" },
        { id: "hormones", label: "Гормональний баланс" },
      ]
    : [
        { id: "sleep", label: "Sleep problems" },
        { id: "stress", label: "Stress & anxiety" },
        { id: "immunity", label: "Immunity" },
        { id: "digestion", label: "Digestion" },
        { id: "joints", label: "Joint pain" },
        { id: "skin", label: "Skin" },
        { id: "energy", label: "Energy" },
        { id: "hormones", label: "Hormonal balance" },
      ];

  const forms = isUk
    ? [
        { id: "tea", label: "Чай" },
        { id: "tincture", label: "Настоянка" },
        { id: "capsules", label: "Капсули" },
        { id: "oil", label: "Ефірна олія" },
        { id: "cream", label: "Крем" },
      ]
    : [
        { id: "tea", label: "Tea" },
        { id: "tincture", label: "Tincture" },
        { id: "capsules", label: "Capsules" },
        { id: "oil", label: "Essential oil" },
        { id: "cream", label: "Cream" },
      ];

  type Product = { name: string; herb: string; desc: string; price: string };

  const remedyMap: Record<string, Record<string, Product[]>> = {
    sleep: {
      tea: [
        {
          name: isUk ? "Вечірній спокій" : "Evening Calm",
          herb: isUk ? "Валеріана" : "Valerian",
          desc: isUk ? "Заспокійливий чай для глибокого сну" : "Soothing tea for deep sleep",
          price: "₴189",
        },
        {
          name: isUk ? "Нічна тиша" : "Night Silence",
          herb: isUk ? "Пасифлора" : "Passionflower",
          desc: isUk ? "М'яке розслаблення перед сном" : "Gentle relaxation before sleep",
          price: "₴210",
        },
      ],
      capsules: [
        {
          name: isUk ? "Мелатонін+" : "Melatonin+",
          herb: isUk ? "Мелатонін з меліссою" : "Melatonin & Lemon Balm",
          desc: isUk ? "Регулює природний цикл сну" : "Regulates natural sleep cycle",
          price: "₴345",
        },
      ],
      tincture: [
        {
          name: isUk ? "Настоянка валеріани" : "Valerian Tincture",
          herb: isUk ? "Валеріана" : "Valerian Root",
          desc: isUk ? "Класичний засіб для сну" : "Classic sleep remedy",
          price: "₴155",
        },
        {
          name: isUk ? "Заспокійливе" : "Calming Blend",
          herb: isUk ? "Хміль та пасифлора" : "Hops & Passionflower",
          desc: isUk ? "Зменшує тривогу та покращує сон" : "Reduces anxiety and improves sleep",
          price: "₴280",
        },
      ],
      oil: [
        {
          name: isUk ? "Ефірна олія лаванди" : "Lavender Essential Oil",
          herb: isUk ? "Лаванда" : "Lavender",
          desc: isUk ? "Ароматерапія для розслаблення" : "Aromatherapy for relaxation",
          price: "₴320",
        },
      ],
      cream: [
        {
          name: isUk ? "Нічний бальзам" : "Night Balm",
          herb: isUk ? "Лаванда та меліса" : "Lavender & Lemon Balm",
          desc: isUk ? "Заспокійливий крем для скронь" : "Soothing temple cream",
          price: "₴265",
        },
      ],
    },
    stress: {
      tea: [
        {
          name: isUk ? "Антистрес" : "Anti-Stress",
          herb: isUk ? "Ромашка" : "Chamomile",
          desc: isUk ? "Знімає напругу та тривогу" : "Relieves tension and anxiety",
          price: "₴175",
        },
        {
          name: isUk ? "Баланс та спокій" : "Balance & Calm",
          herb: isUk ? "Меліса та м'ята" : "Lemon Balm & Mint",
          desc: isUk ? "Відновлює внутрішній баланс" : "Restores inner balance",
          price: "₴195",
        },
      ],
      capsules: [
        {
          name: isUk ? "Ашваганда Форте" : "Ashwagandha Forte",
          herb: isUk ? "Ашваганда" : "Ashwagandha",
          desc: isUk ? "Адаптоген для зниження кортизолу" : "Adaptogen for cortisol reduction",
          price: "₴420",
        },
        {
          name: isUk ? "Родіола Рожева" : "Rhodiola Rosea",
          herb: isUk ? "Родіола" : "Rhodiola",
          desc: isUk ? "Підвищує стресостійкість" : "Increases stress resilience",
          price: "₴385",
        },
      ],
      tincture: [
        {
          name: isUk ? "Пустирник" : "Motherwort",
          herb: isUk ? "Пустирник" : "Motherwort",
          desc: isUk ? "Заспокоює нервову систему" : "Calms the nervous system",
          price: "₴130",
        },
      ],
      oil: [
        {
          name: isUk ? "Суміш Спокою" : "Calm Blend",
          herb: isUk ? "Бергамот та ромашка" : "Bergamot & Chamomile",
          desc: isUk ? "Знімає емоційну напругу" : "Releases emotional tension",
          price: "₴295",
        },
      ],
      cream: [
        {
          name: isUk ? "Розслаблюючий крем" : "Relaxing Cream",
          herb: isUk ? "Лаванда та іланг-іланг" : "Lavender & Ylang-ylang",
          desc: isUk ? "Масаж для зняття стресу" : "Massage for stress relief",
          price: "₴310",
        },
      ],
    },
    immunity: {
      tea: [
        {
          name: isUk ? "Імунний щит" : "Immune Shield",
          herb: isUk ? "Ехінацея" : "Echinacea",
          desc: isUk ? "Зміцнює захисні сили організму" : "Strengthens body defenses",
          price: "₴220",
        },
      ],
      capsules: [
        {
          name: isUk ? "Ехінацея Плюс" : "Echinacea Plus",
          herb: isUk ? "Ехінацея та шипшина" : "Echinacea & Rosehip",
          desc: isUk ? "Максимальна підтримка імунітету" : "Maximum immune support",
          price: "₴395",
        },
        {
          name: isUk ? "Цинк та Бузина" : "Zinc & Elderberry",
          herb: isUk ? "Бузина чорна" : "Black Elderberry",
          desc: isUk ? "Противірусний комплекс" : "Antiviral complex",
          price: "₴410",
        },
      ],
      tincture: [
        {
          name: isUk ? "Ехінацея рідка" : "Echinacea Liquid",
          herb: isUk ? "Ехінацея пурпурна" : "Echinacea Purpurea",
          desc: isUk ? "Швидка дія при перших симптомах" : "Fast action at first symptoms",
          price: "₴245",
        },
      ],
      oil: [
        {
          name: isUk ? "Олія чайного дерева" : "Tea Tree Oil",
          herb: isUk ? "Чайне дерево" : "Tea Tree",
          desc: isUk ? "Антибактеріальна захист" : "Antibacterial protection",
          price: "₴280",
        },
      ],
      cream: [
        {
          name: isUk ? "Захисний крем" : "Protective Cream",
          herb: isUk ? "Ехінацея та каледула" : "Echinacea & Calendula",
          desc: isUk ? "Зміцнює шкірний бар'єр" : "Strengthens skin barrier",
          price: "₴290",
        },
      ],
    },
    digestion: {
      tea: [
        {
          name: isUk ? "Травний збір" : "Digestive Blend",
          herb: isUk ? "Фенхель та ромашка" : "Fennel & Chamomile",
          desc: isUk ? "Покращує травлення та знімає здуття" : "Improves digestion and reduces bloating",
          price: "₴185",
        },
      ],
      capsules: [
        {
          name: isUk ? "Розторопша" : "Milk Thistle",
          herb: isUk ? "Розторопша плямиста" : "Milk Thistle",
          desc: isUk ? "Відновлює функцію печінки" : "Restores liver function",
          price: "₴360",
        },
      ],
      tincture: [
        {
          name: isUk ? "Гіркі краплі" : "Bitter Drops",
          herb: isUk ? "Гіркі трави" : "Bitter Herbs",
          desc: isUk ? "Стимулює вироблення жовчі" : "Stimulates bile production",
          price: "₴195",
        },
      ],
      oil: [
        {
          name: isUk ? "Олія перцевої м'яти" : "Peppermint Oil",
          herb: isUk ? "Перцева м'ята" : "Peppermint",
          desc: isUk ? "Знімає спазми та нудоту" : "Relieves cramps and nausea",
          price: "₴240",
        },
      ],
      cream: [
        {
          name: isUk ? "Масаж живота" : "Belly Massage",
          herb: isUk ? "Кмин та фенхель" : "Caraway & Fennel",
          desc: isUk ? "Масажний крем при здутті" : "Massage cream for bloating",
          price: "₴270",
        },
      ],
    },
    joints: {
      tea: [
        {
          name: isUk ? "Суглобовий збір" : "Joint Blend",
          herb: isUk ? "Кропива та хвощ" : "Nettle & Horsetail",
          desc: isUk ? "Знімає запалення суглобів" : "Reduces joint inflammation",
          price: "₴200",
        },
      ],
      capsules: [
        {
          name: isUk ? "Куркума Форте" : "Turmeric Forte",
          herb: isUk ? "Куркума" : "Turmeric",
          desc: isUk ? "Протизапальна дія" : "Anti-inflammatory action",
          price: "₴445",
        },
      ],
      tincture: [
        {
          name: isUk ? "Звіробій суглобовий" : "St. John's Wort Joint",
          herb: isUk ? "Звіробій" : "St. John's Wort",
          desc: isUk ? "Знеболює та знімає запалення" : "Relieves pain and inflammation",
          price: "₴220",
        },
      ],
      oil: [
        {
          name: isUk ? "Олія розмарину" : "Rosemary Oil",
          herb: isUk ? "Розмарин" : "Rosemary",
          desc: isUk ? "Покращує кровообіг у суглобах" : "Improves circulation in joints",
          price: "₴310",
        },
      ],
      cream: [
        {
          name: isUk ? "Суглобовий крем" : "Joint Cream",
          herb: isUk ? "Арніка та евкаліпт" : "Arnica & Eucalyptus",
          desc: isUk ? "Знеболюючий та зігріваючий" : "Pain-relieving and warming",
          price: "₴330",
        },
      ],
    },
    skin: {
      tea: [
        {
          name: isUk ? "Очисний збір" : "Skin Cleanse",
          herb: isUk ? "Кропива та ромашка" : "Nettle & Chamomile",
          desc: isUk ? "Очищує зсередини" : "Cleanses from within",
          price: "₴180",
        },
      ],
      capsules: [
        {
          name: isUk ? "Примула вечірня" : "Evening Primrose",
          herb: isUk ? "Примула вечірня" : "Evening Primrose",
          desc: isUk ? "Живить та зволожує шкіру" : "Nourishes and moisturizes skin",
          price: "₴380",
        },
      ],
      tincture: [
        {
          name: isUk ? "Каледула рідка" : "Calendula Liquid",
          herb: isUk ? "Каледула" : "Calendula",
          desc: isUk ? "Загоює та заспокоює шкіру" : "Heals and soothes skin",
          price: "₴165",
        },
      ],
      oil: [
        {
          name: isUk ? "Олія троянди" : "Rose Oil",
          herb: isUk ? "Троянда болгарська" : "Bulgarian Rose",
          desc: isUk ? "Омолоджує та живить" : "Rejuvenates and nourishes",
          price: "₴520",
        },
      ],
      cream: [
        {
          name: isUk ? "Каледула крем" : "Calendula Cream",
          herb: isUk ? "Каледула та шипшина" : "Calendula & Rosehip",
          desc: isUk ? "Регенеруючий крем для обличчя" : "Regenerating face cream",
          price: "₴345",
        },
        {
          name: isUk ? "Алое Вера гель" : "Aloe Vera Gel",
          herb: isUk ? "Алое вера" : "Aloe Vera",
          desc: isUk ? "Зволожує та заспокоює" : "Moisturizes and soothes",
          price: "₴255",
        },
      ],
    },
    energy: {
      tea: [
        {
          name: isUk ? "Ранкова енергія" : "Morning Energy",
          herb: isUk ? "Женьшень та імбир" : "Ginseng & Ginger",
          desc: isUk ? "Бадьорість без кофеїну" : "Vitality without caffeine",
          price: "₴215",
        },
      ],
      capsules: [
        {
          name: isUk ? "Женьшень Плюс" : "Ginseng Plus",
          herb: isUk ? "Женьшень" : "Ginseng",
          desc: isUk ? "Підвищує фізичну та розумову активність" : "Boosts physical and mental activity",
          price: "₴465",
        },
        {
          name: isUk ? "Маца" : "Maca Root",
          herb: isUk ? "Маца перуанська" : "Peruvian Maca",
          desc: isUk ? "Природний стимулятор енергії" : "Natural energy stimulant",
          price: "₴410",
        },
      ],
      tincture: [
        {
          name: isUk ? "Елеутерокок" : "Eleutherococcus",
          herb: isUk ? "Елеутерокок" : "Eleutherococcus",
          desc: isUk ? "Підвищує тонус та витривалість" : "Increases tone and endurance",
          price: "₴190",
        },
      ],
      oil: [
        {
          name: isUk ? "Олія м'яти" : "Mint Oil",
          herb: isUk ? "Перцева м'ята" : "Peppermint",
          desc: isUk ? "Бадьорить та освіжає" : "Energizes and refreshes",
          price: "₴235",
        },
      ],
      cream: [
        {
          name: isUk ? "Тонізуючий крем" : "Toning Cream",
          herb: isUk ? "Кофеїн та зелений чай" : "Caffeine & Green Tea",
          desc: isUk ? "Тонізує та підтягує шкіру" : "Tones and firms skin",
          price: "₴295",
        },
      ],
    },
    hormones: {
      tea: [
        {
          name: isUk ? "Жіночий баланс" : "Female Balance",
          herb: isUk ? "Шавлія та м'ята" : "Sage & Mint",
          desc: isUk ? "Підтримує гормональний баланс" : "Supports hormonal balance",
          price: "₴230",
        },
      ],
      capsules: [
        {
          name: isUk ? "Вітекс священний" : "Vitex Agnus-Castus",
          herb: isUk ? "Вітекс" : "Vitex",
          desc: isUk ? "Регулює жіночий цикл" : "Regulates female cycle",
          price: "₴430",
        },
        {
          name: isUk ? "Дика ямс" : "Wild Yam",
          herb: isUk ? "Дика ямс" : "Wild Yam",
          desc: isUk ? "Природний прогестерон" : "Natural progesterone",
          price: "₴390",
        },
      ],
      tincture: [
        {
          name: isUk ? "Дягель жіночий" : "Dong Quai",
          herb: isUk ? "Дягель" : "Dong Quai",
          desc: isUk ? "Полегшує симптоми менопаузи" : "Eases menopause symptoms",
          price: "₴275",
        },
      ],
      oil: [
        {
          name: isUk ? "Олія герані" : "Geranium Oil",
          herb: isUk ? "Герань рожева" : "Rose Geranium",
          desc: isUk ? "Балансує гормони та настрій" : "Balances hormones and mood",
          price: "₴340",
        },
      ],
      cream: [
        {
          name: isUk ? "Крем клімакс" : "Menopause Cream",
          herb: isUk ? "Клімактеричні трави" : "Menopause Herbs",
          desc: isUk ? "Знімає припливи та дискомфорт" : "Relieves hot flashes and discomfort",
          price: "₴365",
        },
      ],
    },
  };

  const categories = [
    { id: "herbs", label: isUk ? "Трави та чаї" : "Herbs & Teas" },
    { id: "tinctures", label: isUk ? "Настоянки" : "Tinctures" },
    { id: "oils", label: isUk ? "Ефірні олії" : "Essential Oils" },
    { id: "supplements", label: isUk ? "Добавки" : "Supplements" },
    { id: "creams", label: isUk ? "Креми" : "Creams" },
    { id: "aromatherapy", label: isUk ? "Ароматерапія" : "Aromatherapy" },
  ];

  type CatalogProduct = { name: string; ingredient: string; benefit: string; price: string };
  const catalogProducts: Record<string, CatalogProduct[]> = {
    herbs: [
      { name: isUk ? "Ромашковий чай" : "Chamomile Tea", ingredient: isUk ? "Ромашка" : "Chamomile", benefit: isUk ? "Заспокоює та покращує сон" : "Soothes and improves sleep", price: "₴145" },
      { name: isUk ? "М'ятний збір" : "Mint Blend", ingredient: isUk ? "Перцева м'ята" : "Peppermint", benefit: isUk ? "Освіжає та покращує травлення" : "Refreshes and aids digestion", price: "₴135" },
      { name: isUk ? "Імунний збір" : "Immune Blend", ingredient: isUk ? "Ехінацея" : "Echinacea", benefit: isUk ? "Зміцнює імунітет" : "Boosts immunity", price: "₴185" },
      { name: isUk ? "Суглобовий чай" : "Joint Tea", ingredient: isUk ? "Кропива" : "Nettle", benefit: isUk ? "Підтримує суглоби" : "Supports joints", price: "₴165" },
    ],
    tinctures: [
      { name: isUk ? "Валеріана" : "Valerian", ingredient: isUk ? "Корінь валеріани" : "Valerian Root", benefit: isUk ? "Сон та заспокоєння" : "Sleep and sedation", price: "₴120" },
      { name: isUk ? "Ехінацея" : "Echinacea", ingredient: isUk ? "Ехінацея пурпурна" : "Echinacea Purpurea", benefit: isUk ? "Противірусна дія" : "Antiviral action", price: "₴155" },
      { name: isUk ? "Меліса" : "Lemon Balm", ingredient: isUk ? "Меліса лікарська" : "Melissa Officinalis", benefit: isUk ? "Антистрес" : "Anti-stress", price: "₴130" },
      { name: isUk ? "Звіробій" : "St. John's Wort", ingredient: isUk ? "Звіробій звичайний" : "Hypericum Perforatum", benefit: isUk ? "Настрій та нерви" : "Mood and nerves", price: "₴140" },
    ],
    oils: [
      { name: isUk ? "Лавандова олія" : "Lavender Oil", ingredient: isUk ? "Лаванда вузьколиста" : "Lavandula Angustifolia", benefit: isUk ? "Розслаблення та сон" : "Relaxation and sleep", price: "₴285" },
      { name: isUk ? "Олія евкаліпта" : "Eucalyptus Oil", ingredient: isUk ? "Евкаліпт" : "Eucalyptus", benefit: isUk ? "Дихання та антисептик" : "Breathing and antiseptic", price: "₴195" },
      { name: isUk ? "Олія чайного дерева" : "Tea Tree Oil", ingredient: isUk ? "Чайне дерево" : "Tea Tree", benefit: isUk ? "Антибактеріальна дія" : "Antibacterial action", price: "₴265" },
      { name: isUk ? "Олія троянди" : "Rose Oil", ingredient: isUk ? "Троянда дамаська" : "Rosa Damascena", benefit: isUk ? "Омолодження та краса" : "Rejuvenation and beauty", price: "₴520" },
    ],
    supplements: [
      { name: isUk ? "Ехінацея 400 мг" : "Echinacea 400mg", ingredient: isUk ? "Ехінацея" : "Echinacea", benefit: isUk ? "Імунна підтримка" : "Immune support", price: "₴320" },
      { name: isUk ? "Куркума + Піперин" : "Turmeric + Piperine", ingredient: isUk ? "Куркума" : "Turmeric", benefit: isUk ? "Протизапальна дія" : "Anti-inflammatory", price: "₴385" },
      { name: isUk ? "Ашваганда" : "Ashwagandha", ingredient: isUk ? "Ашваганда" : "Ashwagandha", benefit: isUk ? "Стресостійкість" : "Stress resilience", price: "₴420" },
      { name: isUk ? "Гінкго білоба" : "Ginkgo Biloba", ingredient: isUk ? "Гінкго" : "Ginkgo", benefit: isUk ? "Пам'ять та концентрація" : "Memory & focus", price: "₴355" },
    ],
    creams: [
      { name: isUk ? "Каледула крем" : "Calendula Cream", ingredient: isUk ? "Каледула" : "Calendula", benefit: isUk ? "Заживлення та захист" : "Healing and protection", price: "₴245" },
      { name: isUk ? "Арніка гель" : "Arnica Gel", ingredient: isUk ? "Арніка гірська" : "Arnica Montana", benefit: isUk ? "Забої та болі в м'язах" : "Bruises and muscle pain", price: "₴280" },
      { name: isUk ? "Суглобовий бальзам" : "Joint Balm", ingredient: isUk ? "Евкаліпт та розмарин" : "Eucalyptus & Rosemary", benefit: isUk ? "Суглоби та м'язи" : "Joints and muscles", price: "₴310" },
      { name: isUk ? "Крем від рубців" : "Scar Cream", ingredient: isUk ? "Шипшина та алое" : "Rosehip & Aloe", benefit: isUk ? "Регенерація шкіри" : "Skin regeneration", price: "₴365" },
    ],
    aromatherapy: [
      { name: isUk ? "Дифузор бамбуковий" : "Bamboo Diffuser", ingredient: isUk ? "Бамбук" : "Bamboo", benefit: isUk ? "Ароматерапія вдома" : "Home aromatherapy", price: "₴650" },
      { name: isUk ? "Набір для медитації" : "Meditation Kit", ingredient: isUk ? "3 олії + свічка" : "3 oils + candle", benefit: isUk ? "Розслаблення та медитація" : "Relaxation and meditation", price: "₴890" },
      { name: isUk ? "Ефірні олії 5 шт" : "Essential Oils Set 5", ingredient: isUk ? "5 базових олій" : "5 base oils", benefit: isUk ? "Стартовий набір" : "Starter kit", price: "₴1200" },
      { name: isUk ? "Аромасвічка лавандова" : "Lavender Candle", ingredient: isUk ? "Лаванда та соєвий віск" : "Lavender & Soy Wax", benefit: isUk ? "Затишок та ароматерапія" : "Cozy aromatherapy", price: "₴195" },
    ],
  };

  const herbs = [
    {
      name: isUk ? "Ромашка" : "Chamomile",
      latin: "Matricaria chamomilla",
      props: isUk ? "Протизапальна, заспокійлива, спазмолітична" : "Anti-inflammatory, sedative, antispasmodic",
      uses: isUk ? "Стрес, безсоння, проблеми з травленням, шкірні запалення" : "Stress, insomnia, digestive issues, skin inflammation",
      color: "#F4ECD8",
    },
    {
      name: isUk ? "Лаванда" : "Lavender",
      latin: "Lavandula angustifolia",
      props: isUk ? "Антисептична, заспокійлива, болезаспокійлива" : "Antiseptic, calming, analgesic",
      uses: isUk ? "Тривога, головний біль, ранки, безсоння, опіки" : "Anxiety, headache, wounds, insomnia, burns",
      color: "#E8DFEF",
    },
    {
      name: isUk ? "Ехінацея" : "Echinacea",
      latin: "Echinacea purpurea",
      props: isUk ? "Імуностимулювальна, противірусна, антибактеріальна" : "Immunostimulatory, antiviral, antibacterial",
      uses: isUk ? "Застуда, грип, зниження імунітету, рани" : "Colds, flu, low immunity, wounds",
      color: "#FCE4EC",
    },
    {
      name: isUk ? "Валеріана" : "Valerian",
      latin: "Valeriana officinalis",
      props: isUk ? "Седативна, спазмолітична, анксіолітична" : "Sedative, antispasmodic, anxiolytic",
      uses: isUk ? "Безсоння, нервовість, тривога, серцебиття" : "Insomnia, nervousness, anxiety, palpitations",
      color: "#E8F5E9",
    },
    {
      name: isUk ? "Гінкго Білоба" : "Ginkgo Biloba",
      latin: "Ginkgo biloba",
      props: isUk ? "Ноотропна, антиоксидантна, судинорозширювальна" : "Nootropic, antioxidant, vasodilatory",
      uses: isUk ? "Пам'ять, концентрація, кровообіг мозку, вікові зміни" : "Memory, concentration, brain circulation, age-related changes",
      color: "#FFF9C4",
    },
    {
      name: isUk ? "Розторопша" : "Milk Thistle",
      latin: "Silybum marianum",
      props: isUk ? "Гепатопротекторна, антиоксидантна, детоксикаційна" : "Hepatoprotective, antioxidant, detoxifying",
      uses: isUk ? "Захист печінки, детокс, жовчогінна дія, цироз" : "Liver protection, detox, cholagogue, cirrhosis",
      color: "#E1F5FE",
    },
  ];

  const blogPosts = [
    {
      title: isUk ? "7 трав для зміцнення імунітету взимку" : "7 Herbs to Boost Immunity in Winter",
      excerpt: isUk ? "Дізнайтесь, які рослини найкраще захищають від сезонних застуд та як правильно їх вживати." : "Discover which plants best protect against seasonal colds and how to use them correctly.",
      tag: isUk ? "Імунітет" : "Immunity",
      date: isUk ? "12 лютого 2025" : "Feb 12, 2025",
      readTime: "5 min",
    },
    {
      title: isUk ? "Ефірні олії: повний посібник для початківців" : "Essential Oils: Complete Beginner's Guide",
      excerpt: isUk ? "Все що потрібно знати про ароматерапію — вибір, безпека, поєднання та застосування вдома." : "Everything you need to know about aromatherapy — selection, safety, blends and home use.",
      tag: isUk ? "Ароматерапія" : "Aromatherapy",
      date: isUk ? "5 березня 2025" : "Mar 5, 2025",
      readTime: "8 min",
    },
    {
      title: isUk ? "Фітотерапія vs. синтетичні препарати: що обрати?" : "Herbal vs. Synthetic Medicines: What to Choose?",
      excerpt: isUk ? "Порівнюємо ефективність, безпеку та ціну природних та фармакологічних засобів." : "We compare effectiveness, safety and price of natural and pharmacological remedies.",
      tag: isUk ? "Наука" : "Science",
      date: isUk ? "20 березня 2025" : "Mar 20, 2025",
      readTime: "10 min",
    },
  ];

  const getRecommendations = (): Product[] => {
    if (!concern || !form) return [];
    const map = remedyMap[concern];
    if (!map) return [];
    const formKey = form as keyof typeof map;
    const byForm = map[formKey] || [];
    // fill up to 3 with any other form
    const all: Product[] = [...byForm];
    if (all.length < 3) {
      for (const [key, products] of Object.entries(map)) {
        if (key !== form) {
          for (const p of products) {
            if (all.length >= 3) break;
            all.push(p);
          }
        }
        if (all.length >= 3) break;
      }
    }
    return all.slice(0, 3);
  };

  const recommendations = advisorStep === 3 ? getRecommendations() : [];

  const sections = [
    { id: "advisor", label: isUk ? "Порадник" : "Advisor" },
    { id: "catalog", label: isUk ? "Каталог" : "Catalog" },
    { id: "herbs", label: isUk ? "Бібліотека трав" : "Herb Library" },
    { id: "consult", label: isUk ? "Консультація" : "Consultation" },
    { id: "blog", label: isUk ? "Блог" : "Blog" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: BEIGE, color: DARK_GREEN, minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${DARK_GREEN} 0%, ${GREEN} 60%, ${LIGHT_GREEN} 100%)`,
          padding: "56px 32px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0.07,
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              border: `1px solid rgba(255,255,255,0.2)`,
              borderRadius: "20px",
              padding: "6px 18px",
              color: "#B7E4C7",
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            {isUk ? "Натуральна фармація" : "Natural Pharmacy"}
          </div>
          <h1
            style={{
              fontSize: "clamp(26px, 5vw, 44px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.25,
              marginBottom: "16px",
              maxWidth: "700px",
              margin: "0 auto 16px",
            }}
          >
            {isUk ? "Сила природи — у кожному флаконі" : "Nature's power — in every bottle"}
          </h1>
          <p style={{ color: "#B7E4C7", fontSize: "17px", marginBottom: "24px", maxWidth: "520px", margin: "0 auto 24px" }}>
            {isUk
              ? "Фітопрепарати. Ефірні олії. Фітотерапія."
              : "Herbal medicines. Essential oils. Phytotherapy."}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "30px",
              padding: "8px 20px",
              color: "#D8F3DC",
              fontSize: "13px",
            }}
          >
            <span>🌿</span>
            <span>
              {isUk
                ? "800+ натуральних продуктів · Сертифікований фітотерапевт"
                : "800+ natural products · Certified phytotherapist"}
            </span>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{ background: "#fff", borderBottom: `2px solid ${BEIGE}`, padding: "0 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", minWidth: "max-content" }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: "14px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeSection === s.id ? 700 : 400,
                color: activeSection === s.id ? GREEN : "#6B7280",
                borderBottom: activeSection === s.id ? `3px solid ${GREEN}` : "3px solid transparent",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 20px" }}>
        {/* ADVISOR SECTION */}
        {activeSection === "advisor" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "26px", fontWeight: 700, color: GREEN, marginBottom: "8px" }}>
                {isUk ? "Знайдіть свій засіб" : "Find Your Remedy"}
              </h2>
              <p style={{ color: "#6B7280", fontSize: "15px" }}>
                {isUk ? "Трав'яний порадник підбере найкращі природні засоби для вас" : "Herbal advisor will find the best natural remedies for you"}
              </p>
            </div>

            {/* Progress */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
              {[1, 2, 3].map((step) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: advisorStep >= step ? GREEN : "#E5E7EB",
                      color: advisorStep >= step ? "#fff" : "#9CA3AF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px", fontWeight: 700, transition: "all 0.3s",
                    }}
                  >
                    {step}
                  </div>
                  {step < 3 && <div style={{ width: "40px", height: "2px", background: advisorStep > step ? GREEN : "#E5E7EB" }} />}
                </div>
              ))}
            </div>

            {/* Step 0 intro */}
            {advisorStep === 0 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>🌿</div>
                <p style={{ color: "#374151", fontSize: "16px", marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" }}>
                  {isUk
                    ? "Дайте відповідь на 3 питання і отримайте персональні рекомендації натуральних засобів"
                    : "Answer 3 questions and get personalized natural remedy recommendations"}
                </p>
                <button
                  onClick={() => setAdvisorStep(1)}
                  style={{
                    background: GREEN, color: "#fff", border: "none", borderRadius: "12px",
                    padding: "14px 36px", fontSize: "16px", fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {isUk ? "Розпочати" : "Start Now"}
                </button>
              </div>
            )}

            {/* Step 1: Concern */}
            {advisorStep === 1 && (
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_GREEN, marginBottom: "20px", textAlign: "center" }}>
                  {isUk ? "Що вас турбує?" : "What is your concern?"}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px", marginBottom: "24px" }}>
                  {concerns.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setConcern(c.id)}
                      style={{
                        padding: "14px 16px",
                        border: `2px solid ${concern === c.id ? GREEN : "#D1D5DB"}`,
                        borderRadius: "12px",
                        background: concern === c.id ? `${GREEN}15` : "#fff",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: concern === c.id ? 700 : 400,
                        color: concern === c.id ? GREEN : DARK_GREEN,
                        transition: "all 0.2s",
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => concern && setAdvisorStep(2)}
                    disabled={!concern}
                    style={{
                      background: concern ? GREEN : "#D1D5DB", color: "#fff", border: "none",
                      borderRadius: "12px", padding: "12px 32px", fontSize: "15px", fontWeight: 700,
                      cursor: concern ? "pointer" : "not-allowed",
                    }}
                  >
                    {isUk ? "Далі" : "Next"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Form + pregnant */}
            {advisorStep === 2 && (
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_GREEN, marginBottom: "16px", textAlign: "center" }}>
                  {isUk ? "Яку форму ви надаєте перевагу?" : "What form do you prefer?"}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "28px" }}>
                  {forms.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setForm(f.id)}
                      style={{
                        padding: "10px 20px",
                        border: `2px solid ${form === f.id ? OCHRE : "#D1D5DB"}`,
                        borderRadius: "30px",
                        background: form === f.id ? `${OCHRE}20` : "#fff",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: form === f.id ? 700 : 400,
                        color: form === f.id ? "#8B6914" : DARK_GREEN,
                        transition: "all 0.2s",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: DARK_GREEN, marginBottom: "14px", textAlign: "center" }}>
                  {isUk ? "Ви вагітні або годуєте груддю?" : "Are you pregnant or nursing?"}
                </h3>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "28px" }}>
                  {[
                    { val: false, label: isUk ? "Ні" : "No" },
                    { val: true, label: isUk ? "Так" : "Yes" },
                  ].map((opt) => (
                    <button
                      key={String(opt.val)}
                      onClick={() => setPregnant(opt.val)}
                      style={{
                        padding: "10px 32px",
                        border: `2px solid ${pregnant === opt.val ? GREEN : "#D1D5DB"}`,
                        borderRadius: "30px",
                        background: pregnant === opt.val ? `${GREEN}15` : "#fff",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: pregnant === opt.val ? 700 : 400,
                        color: pregnant === opt.val ? GREEN : DARK_GREEN,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button
                    onClick={() => setAdvisorStep(1)}
                    style={{
                      background: "#fff", color: GREEN, border: `2px solid ${GREEN}`,
                      borderRadius: "12px", padding: "12px 24px", fontSize: "15px", cursor: "pointer",
                    }}
                  >
                    {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => form && pregnant !== null && setAdvisorStep(3)}
                    disabled={!form || pregnant === null}
                    style={{
                      background: form && pregnant !== null ? GREEN : "#D1D5DB",
                      color: "#fff", border: "none", borderRadius: "12px",
                      padding: "12px 32px", fontSize: "15px", fontWeight: 700,
                      cursor: form && pregnant !== null ? "pointer" : "not-allowed",
                    }}
                  >
                    {isUk ? "Отримати рекомендації" : "Get Recommendations"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {advisorStep === 3 && (
              <div>
                {pregnant && (
                  <div
                    style={{
                      background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: "12px",
                      padding: "14px 18px", marginBottom: "24px", display: "flex", gap: "10px", alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>⚠️</span>
                    <p style={{ fontSize: "14px", color: "#92400E", margin: 0 }}>
                      {isUk
                        ? "Оскільки ви вагітні або годуєте, перед застосуванням будь-яких трав'яних засобів обов'язково проконсультуйтеся з лікарем."
                        : "Since you are pregnant or nursing, please consult your doctor before using any herbal remedies."}
                    </p>
                  </div>
                )}
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: GREEN, marginBottom: "8px", textAlign: "center" }}>
                  {isUk ? "Рекомендовані засоби для вас" : "Recommended Remedies for You"}
                </h3>
                <p style={{ color: "#6B7280", fontSize: "14px", textAlign: "center", marginBottom: "24px" }}>
                  {isUk ? "На основі ваших відповідей" : "Based on your answers"}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                  {recommendations.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#fff", borderRadius: "16px", padding: "20px",
                        border: `1px solid ${BEIGE}`,
                        boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
                      }}
                    >
                      <div
                        style={{
                          width: "48px", height: "48px", borderRadius: "12px",
                          background: `${GREEN}15`, display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: "22px", marginBottom: "12px",
                        }}
                      >
                        🌿
                      </div>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: DARK_GREEN, marginBottom: "4px" }}>{r.name}</h4>
                      <p style={{ fontSize: "12px", color: OCHRE, fontWeight: 600, marginBottom: "8px" }}>{r.herb}</p>
                      <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px", lineHeight: 1.5 }}>{r.desc}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "20px", fontWeight: 700, color: GREEN }}>{r.price}</span>
                        <button
                          style={{
                            background: GREEN, color: "#fff", border: "none", borderRadius: "8px",
                            padding: "8px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                          }}
                        >
                          {isUk ? "До кошика" : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => { setAdvisorStep(0); setConcern(""); setForm(""); setPregnant(null); }}
                    style={{
                      background: "#fff", color: GREEN, border: `2px solid ${GREEN}`,
                      borderRadius: "12px", padding: "12px 28px", fontSize: "14px", cursor: "pointer",
                    }}
                  >
                    {isUk ? "Почати знову" : "Start Over"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CATALOG SECTION */}
        {activeSection === "catalog" && (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: GREEN, marginBottom: "24px" }}>
              {isUk ? "Каталог продуктів" : "Product Catalog"}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  style={{
                    padding: "8px 18px",
                    border: `2px solid ${activeCategory === c.id ? GREEN : "#D1D5DB"}`,
                    borderRadius: "20px",
                    background: activeCategory === c.id ? GREEN : "#fff",
                    color: activeCategory === c.id ? "#fff" : DARK_GREEN,
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: activeCategory === c.id ? 700 : 400,
                    transition: "all 0.2s",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
              {(catalogProducts[activeCategory] || []).map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff", borderRadius: "16px", overflow: "hidden",
                    border: `1px solid ${BEIGE}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      height: "110px",
                      background: `linear-gradient(135deg, ${GREEN}20, ${OCHRE}25)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "40px",
                    }}
                  >
                    {activeCategory === "herbs" ? "🍵" : activeCategory === "tinctures" ? "🧪" : activeCategory === "oils" ? "💧" : activeCategory === "supplements" ? "💊" : activeCategory === "creams" ? "🧴" : "🕯️"}
                  </div>
                  <div style={{ padding: "16px" }}>
                    <p style={{ fontSize: "11px", color: OCHRE, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{p.ingredient}</p>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: DARK_GREEN, marginBottom: "6px" }}>{p.name}</h4>
                    <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "14px", lineHeight: 1.4 }}>{p.benefit}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "18px", fontWeight: 700, color: GREEN }}>{p.price}</span>
                      <button
                        style={{
                          background: `${GREEN}15`, color: GREEN, border: `1px solid ${GREEN}`,
                          borderRadius: "8px", padding: "6px 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                        }}
                      >
                        {isUk ? "Купити" : "Buy"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HERB LIBRARY SECTION */}
        {activeSection === "herbs" && (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: GREEN, marginBottom: "8px" }}>
              {isUk ? "Бібліотека трав" : "Herb Library"}
            </h2>
            <p style={{ color: "#6B7280", marginBottom: "28px" }}>
              {isUk ? "Натисніть на карточку, щоб дізнатись більше" : "Click a card to learn more"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {herbs.map((h, i) => (
                <div
                  key={i}
                  onClick={() => setActiveHerb(activeHerb === i ? null : i)}
                  style={{
                    background: "#fff", borderRadius: "16px", padding: "20px",
                    border: `2px solid ${activeHerb === i ? GREEN : BEIGE}`,
                    cursor: "pointer", transition: "all 0.2s",
                    boxShadow: activeHerb === i ? `0 4px 20px ${GREEN}25` : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div
                      style={{
                        width: "44px", height: "44px", borderRadius: "12px",
                        background: h.color, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "20px",
                      }}
                    >
                      🌱
                    </div>
                    <span style={{ fontSize: "18px" }}>{activeHerb === i ? "▲" : "▼"}</span>
                  </div>
                  <h4 style={{ fontSize: "17px", fontWeight: 700, color: DARK_GREEN, marginBottom: "2px" }}>{h.name}</h4>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", fontStyle: "italic", marginBottom: activeHerb === i ? "14px" : "0" }}>{h.latin}</p>
                  {activeHerb === i && (
                    <div>
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                          {isUk ? "Властивості" : "Properties"}
                        </p>
                        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.5 }}>{h.props}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: OCHRE, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                          {isUk ? "Застосування" : "Common Uses"}
                        </p>
                        <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.5 }}>{h.uses}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONSULTATION SECTION */}
        {activeSection === "consult" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>👩‍⚕️</div>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: GREEN, marginBottom: "8px" }}>
                {isUk ? "Онлайн консультація" : "Online Consultation"}
              </h2>
              <p style={{ color: "#6B7280", fontSize: "15px" }}>
                {isUk
                  ? "Наш сертифікований фітотерапевт відповість на всі ваші питання"
                  : "Our certified phytotherapist will answer all your questions"}
              </p>
            </div>
            {consultSent ? (
              <div
                style={{
                  background: `${GREEN}10`, border: `2px solid ${GREEN}`,
                  borderRadius: "16px", padding: "32px", textAlign: "center",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
                <h3 style={{ color: GREEN, fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                  {isUk ? "Заявку відправлено!" : "Request sent!"}
                </h3>
                <p style={{ color: "#6B7280" }}>
                  {isUk ? "Ми зв'яжемося з вами найближчим часом" : "We will contact you shortly"}
                </p>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff", borderRadius: "20px", padding: "32px",
                  boxShadow: "0 4px 24px rgba(45,106,79,0.1)",
                }}
              >
                {[
                  { label: isUk ? "Ваше ім'я" : "Your name", val: consultName, set: setConsultName, type: "text" },
                  { label: isUk ? "Телефон" : "Phone", val: consultPhone, set: setConsultPhone, type: "tel" },
                  { label: isUk ? "З чим потребуєте допомоги?" : "What do you need help with?", val: consultConcern, set: setConsultConcern, type: "text" },
                  { label: isUk ? "Зручний час" : "Preferred time", val: consultTime, set: setConsultTime, type: "text" },
                ].map((field, i) => (
                  <div key={i} style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: DARK_GREEN, marginBottom: "6px" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.val}
                      onChange={(e) => field.set(e.target.value)}
                      style={{
                        width: "100%", padding: "12px 14px", border: `2px solid ${BEIGE}`,
                        borderRadius: "10px", fontSize: "14px", color: DARK_GREEN,
                        background: "#FAFAFA", outline: "none", boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => consultName && consultPhone && setConsultSent(true)}
                  style={{
                    width: "100%", background: GREEN, color: "#fff", border: "none",
                    borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isUk ? "Записатись на консультацію" : "Book Consultation"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* BLOG SECTION */}
        {activeSection === "blog" && (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: GREEN, marginBottom: "28px" }}>
              {isUk ? "Статті про здоров'я" : "Health Articles"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {blogPosts.map((post, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff", borderRadius: "16px", overflow: "hidden",
                    border: `1px solid ${BEIGE}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: "140px",
                      background: `linear-gradient(135deg, ${DARK_GREEN}, ${GREEN})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "48px",
                    }}
                  >
                    {i === 0 ? "🌿" : i === 1 ? "💧" : "🔬"}
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                      <span
                        style={{
                          background: `${GREEN}15`, color: GREEN, fontSize: "11px",
                          fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
                        }}
                      >
                        {post.tag}
                      </span>
                      <span style={{ color: "#9CA3AF", fontSize: "11px" }}>· {post.readTime}</span>
                    </div>
                    <h4 style={{ fontSize: "16px", fontWeight: 700, color: DARK_GREEN, marginBottom: "8px", lineHeight: 1.4 }}>
                      {post.title}
                    </h4>
                    <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, marginBottom: "16px" }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{post.date}</span>
                      <button
                        style={{
                          background: "none", color: GREEN, border: "none",
                          fontSize: "13px", fontWeight: 700, cursor: "pointer",
                        }}
                      >
                        {isUk ? "Читати →" : "Read →"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div style={{ background: DARK_GREEN, padding: "20px 32px", textAlign: "center" }}>
        <p style={{ color: "#B7E4C7", fontSize: "13px", margin: 0 }}>
          {isUk
            ? "Naturo — ваша довірена натуральна аптека · Всі продукти сертифіковано · Безкоштовна доставка від ₴500"
            : "Naturo — your trusted natural pharmacy · All products certified · Free shipping from ₴500"}
        </p>
      </div>
    </div>
  );
}
