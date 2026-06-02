"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

type Subject = "english" | "math" | "coding" | "science";
type Level = "beginner" | "intermediate" | "advanced";

interface Question {
  text_en: string;
  text_uk: string;
  options_en: string[];
  options_uk: string[];
  correctIdx: number;
  explanation_en: string;
  explanation_uk: string;
  level: Level;
  points: number;
}

const QUESTIONS: Record<Subject, Record<Level, Question[]>> = {
  english: {
    beginner: [
      {
        text_en: "Choose the correct sentence:",
        text_uk: "Оберіть правильне речення:",
        options_en: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She goed to school every day."],
        options_uk: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She goed to school every day."],
        correctIdx: 1,
        explanation_en: "Third person singular (she/he/it) requires -s suffix on the verb in Present Simple.",
        explanation_uk: "Третя особа однини (she/he/it) потребує закінчення -s на дієслові у Present Simple.",
        level: "beginner",
        points: 10,
      },
    ],
    intermediate: [
      {
        text_en: "Select the correct passive voice form:",
        text_uk: "Оберіть правильну пасивну форму:",
        options_en: ["The report written by the team.", "The report was written by the team.", "The report has write by the team.", "The team written the report."],
        options_uk: ["The report written by the team.", "The report was written by the team.", "The report has write by the team.", "The team written the report."],
        correctIdx: 1,
        explanation_en: "Passive voice = was/were + past participle. 'Written' is the past participle of 'write'.",
        explanation_uk: "Пасивний стан = was/were + дієприкметник минулого часу. 'Written' — це форма 'write'.",
        level: "intermediate",
        points: 20,
      },
    ],
    advanced: [
      {
        text_en: "Which sentence uses the subjunctive mood correctly?",
        text_uk: "В якому реченні правильно використано умовний спосіб?",
        options_en: ["I suggest that he goes home early.", "I suggest that he go home early.", "I suggest that he would go home early.", "I suggest that he is going home early."],
        options_uk: ["I suggest that he goes home early.", "I suggest that he go home early.", "I suggest that he would go home early.", "I suggest that he is going home early."],
        correctIdx: 1,
        explanation_en: "The subjunctive mood uses the base form of the verb (no -s) after verbs like suggest, recommend, insist.",
        explanation_uk: "Умовний спосіб використовує базову форму дієслова (без -s) після дієслів suggest, recommend, insist.",
        level: "advanced",
        points: 30,
      },
    ],
  },
  math: {
    beginner: [
      {
        text_en: "What is 15% of 200?",
        text_uk: "Скільки становить 15% від 200?",
        options_en: ["25", "30", "35", "40"],
        options_uk: ["25", "30", "35", "40"],
        correctIdx: 1,
        explanation_en: "15% of 200 = (15 ÷ 100) × 200 = 0.15 × 200 = 30",
        explanation_uk: "15% від 200 = (15 ÷ 100) × 200 = 0.15 × 200 = 30",
        level: "beginner",
        points: 10,
      },
    ],
    intermediate: [
      {
        text_en: "Solve: 2x² + 5x - 3 = 0. What is the positive root?",
        text_uk: "Розв'яжіть: 2x² + 5x - 3 = 0. Який позитивний корінь?",
        options_en: ["x = 0.5", "x = 1", "x = 1.5", "x = 3"],
        options_uk: ["x = 0.5", "x = 1", "x = 1.5", "x = 3"],
        correctIdx: 0,
        explanation_en: "Using quadratic formula: x = (-5 ± √(25+24)) / 4 = (-5 ± 7) / 4. Positive: x = 2/4 = 0.5",
        explanation_uk: "Формула дискримінанта: x = (-5 ± √(25+24)) / 4 = (-5 ± 7) / 4. Позитивний: x = 2/4 = 0.5",
        level: "intermediate",
        points: 20,
      },
    ],
    advanced: [
      {
        text_en: "What is the derivative of f(x) = x³ · ln(x)?",
        text_uk: "Яка похідна функції f(x) = x³ · ln(x)?",
        options_en: ["3x² · ln(x)", "x² (3 ln(x) + 1)", "3x² / x", "x³ / x + 3x²"],
        options_uk: ["3x² · ln(x)", "x² (3 ln(x) + 1)", "3x² / x", "x³ / x + 3x²"],
        correctIdx: 1,
        explanation_en: "Product rule: (x³)' · ln(x) + x³ · (ln x)' = 3x² · ln(x) + x³ · (1/x) = 3x² ln(x) + x² = x²(3ln(x)+1)",
        explanation_uk: "Правило добутку: (x³)' · ln(x) + x³ · (ln x)' = 3x² · ln(x) + x³ · (1/x) = 3x² ln(x) + x² = x²(3ln(x)+1)",
        level: "advanced",
        points: 30,
      },
    ],
  },
  coding: {
    beginner: [
      {
        text_en: "What does this Python code print? print(type(3.14))",
        text_uk: "Що виведе цей код Python? print(type(3.14))",
        options_en: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
        options_uk: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
        correctIdx: 1,
        explanation_en: "3.14 is a floating-point number in Python. The built-in type() returns <class 'float'>.",
        explanation_uk: "3.14 є числом з рухомою комою в Python. Вбудована функція type() повертає <class 'float'>.",
        level: "beginner",
        points: 10,
      },
    ],
    intermediate: [
      {
        text_en: "What is the time complexity of binary search?",
        text_uk: "Яка часова складність бінарного пошуку?",
        options_en: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
        options_uk: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
        correctIdx: 2,
        explanation_en: "Binary search halves the search space at each step, giving O(log n) time complexity.",
        explanation_uk: "Бінарний пошук вдвічі зменшує простір пошуку на кожному кроці, даючи складність O(log n).",
        level: "intermediate",
        points: 20,
      },
    ],
    advanced: [
      {
        text_en: "In React, when does a component re-render with React.memo?",
        text_uk: "Коли компонент у React перерендерюється з React.memo?",
        options_en: ["Every parent re-render", "Only when props change (shallow comparison)", "Only on state change", "Never, it is always cached"],
        options_uk: ["При кожному рендері батька", "Тільки коли пропси змінюються (shallow compare)", "Тільки при зміні стану", "Ніколи, завжди кешується"],
        correctIdx: 1,
        explanation_en: "React.memo does a shallow comparison of props. If props haven't changed, the component skips re-rendering.",
        explanation_uk: "React.memo виконує поверхневе порівняння пропсів. Якщо вони не змінились — рендер пропускається.",
        level: "advanced",
        points: 30,
      },
    ],
  },
  science: {
    beginner: [
      {
        text_en: "Which gas do plants absorb during photosynthesis?",
        text_uk: "Який газ поглинають рослини під час фотосинтезу?",
        options_en: ["Oxygen (O₂)", "Nitrogen (N₂)", "Carbon Dioxide (CO₂)", "Hydrogen (H₂)"],
        options_uk: ["Кисень (O₂)", "Азот (N₂)", "Вуглекислий газ (CO₂)", "Водень (H₂)"],
        correctIdx: 2,
        explanation_en: "Plants absorb CO₂ and water to produce glucose and oxygen using light energy.",
        explanation_uk: "Рослини поглинають CO₂ та воду для виробництва глюкози та кисню за допомогою сонячного світла.",
        level: "beginner",
        points: 10,
      },
    ],
    intermediate: [
      {
        text_en: "What is Newton's Second Law of Motion?",
        text_uk: "Що таке другий закон Ньютона?",
        options_en: ["F = m/a", "F = ma", "F = m + a", "a = F + m"],
        options_uk: ["F = m/a", "F = ma", "F = m + a", "a = F + m"],
        correctIdx: 1,
        explanation_en: "F = ma means force equals mass times acceleration. It describes how force changes motion.",
        explanation_uk: "F = ma означає, що сила дорівнює масі помноженій на прискорення. Описує як сила змінює рух.",
        level: "intermediate",
        points: 20,
      },
    ],
    advanced: [
      {
        text_en: "Which particle mediates the electromagnetic force?",
        text_uk: "Яка частинка є переносником електромагнітної сили?",
        options_en: ["Gluon", "W boson", "Photon", "Graviton"],
        options_uk: ["Глюон", "W-бозон", "Фотон", "Гравітон"],
        correctIdx: 2,
        explanation_en: "Photons are the force carriers of the electromagnetic field in quantum electrodynamics (QED).",
        explanation_uk: "Фотони є переносниками електромагнітного поля в квантовій електродинаміці (КЕД).",
        level: "advanced",
        points: 30,
      },
    ],
  },
};

export function AiEdtechDemo({ isUk }: Props) {
  const [subject, setSubject] = useState<Subject>("english");
  const [level, setLevel] = useState<Level>("beginner");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const subjects: { id: Subject; en: string; uk: string; emoji: string }[] = [
    { id: "english", en: "English", uk: "Англійська", emoji: "🇬🇧" },
    { id: "math", en: "Mathematics", uk: "Математика", emoji: "📐" },
    { id: "coding", en: "Coding", uk: "Програмування", emoji: "💻" },
    { id: "science", en: "Science", uk: "Природознавство", emoji: "🔬" },
  ];

  const levels: { id: Level; en: string; uk: string; color: string }[] = [
    { id: "beginner", en: "Beginner", uk: "Початковий", color: "emerald" },
    { id: "intermediate", en: "Intermediate", uk: "Середній", color: "amber" },
    { id: "advanced", en: "Advanced", uk: "Просунутий", color: "rose" },
  ];

  function loadQuestion() {
    setLoading(true);
    setSelected(null);
    setTimeout(() => {
      const q = QUESTIONS[subject][level][0];
      setQuestion(q);
      setLoading(false);
    }, 1200);
  }

  function handleAnswer(idx: number) {
    if (selected !== null || !question) return;
    setSelected(idx);
    setAnswered((a) => a + 1);
    if (idx === question.correctIdx) {
      setScore((s) => s + question.points);
    }
  }

  const levelColorMap: Record<Level, { btn: string; badge: string }> = {
    beginner: { btn: "border-emerald-500 bg-emerald-50 text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
    intermediate: { btn: "border-amber-500 bg-amber-50 text-amber-700", badge: "bg-amber-100 text-amber-700" },
    advanced: { btn: "border-rose-500 bg-rose-50 text-rose-700", badge: "bg-rose-100 text-rose-700" },
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "Адаптивне AI-навчання" : "Adaptive AI Learning"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk
          ? "AI визначає ваш рівень і підбирає запитання автоматично. Оберіть предмет та складність."
          : "AI assesses your level and selects questions automatically. Pick a subject and difficulty."}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
              {isUk ? "1. Предмет" : "1. Subject"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSubject(s.id); setQuestion(null); setSelected(null); }}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    subject === s.id
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  <span>{s.emoji}</span>
                  <span>{isUk ? s.uk : s.en}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
              {isUk ? "2. Рівень складності" : "2. Difficulty level"}
            </label>
            <div className="flex gap-2">
              {levels.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { setLevel(l.id); setQuestion(null); setSelected(null); }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
                    level === l.id
                      ? levelColorMap[l.id].btn
                      : "border-transparent bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {isUk ? l.uk : l.en}
                </button>
              ))}
            </div>
          </div>

          {/* Score card */}
          {answered > 0 && (
            <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
              <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide mb-2">
                {isUk ? "Ваш прогрес" : "Your progress"}
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-violet-700">{score}</div>
                  <div className="text-xs text-neutral-500">{isUk ? "балів" : "points"}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-violet-700">{answered}</div>
                  <div className="text-xs text-neutral-500">{isUk ? "запитань" : "questions"}</div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={loadQuestion}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-base hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-200 disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isUk ? "AI підбирає запитання..." : "AI selecting question..."}
              </>
            ) : question ? (
              <>{isUk ? "🔄 Наступне запитання" : "🔄 Next Question"}</>
            ) : (
              <>{isUk ? "▶ Почати тест" : "▶ Start Quiz"}</>
            )}
          </button>

          <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
            <p className="text-xs text-violet-600 font-semibold mb-1">
              {isUk ? "💡 Як AI адаптується" : "💡 How AI adapts"}
            </p>
            <p className="text-xs text-neutral-500">
              {isUk
                ? "Після 3 правильних відповідей поспіль AI автоматично підвищує складність. Після 2 помилок — знижує."
                : "After 3 correct answers in a row AI raises difficulty. After 2 mistakes it drops the level."}
            </p>
          </div>
        </div>

        {/* Question panel */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-6 min-h-[360px] flex flex-col">
          {!question && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400">
              <span className="text-6xl mb-4">🎓</span>
              <p className="text-sm font-medium text-neutral-500">
                {isUk ? "Запитання з'явиться тут" : "Question will appear here"}
              </p>
              <p className="text-xs mt-1">
                {isUk ? "Оберіть предмет і натисніть «Почати»" : "Pick a subject and click Start"}
              </p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex gap-1 mb-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-2 h-8 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <p className="text-sm text-violet-600 font-semibold">{isUk ? "AI аналізує ваш рівень..." : "AI analysing your level..."}</p>
            </div>
          )}

          {question && !loading && (
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${levelColorMap[question.level].badge}`}>
                  {isUk ? levels.find((l) => l.id === question.level)?.uk : levels.find((l) => l.id === question.level)?.en}
                </span>
                <span className="text-xs font-semibold text-violet-500">+{question.points} {isUk ? "балів" : "pts"}</span>
              </div>

              <p className="font-heading font-bold text-neutral-900 text-base leading-snug">
                {isUk ? question.text_uk : question.text_en}
              </p>

              <div className="space-y-2">
                {(isUk ? question.options_uk : question.options_en).map((opt, i) => {
                  let cls = "border-neutral-200 bg-white hover:border-violet-300 hover:bg-violet-50";
                  if (selected !== null) {
                    if (i === question.correctIdx) cls = "border-emerald-400 bg-emerald-50";
                    else if (i === selected && i !== question.correctIdx) cls = "border-red-400 bg-red-50";
                    else cls = "border-neutral-100 bg-neutral-50 opacity-60";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${cls}`}
                    >
                      <span className="mr-3 font-bold text-neutral-400">{["A", "B", "C", "D"][i]}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className={`mt-2 p-3 rounded-xl text-xs leading-relaxed ${
                  selected === question.correctIdx
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}>
                  <span className="font-bold mr-1">
                    {selected === question.correctIdx ? (isUk ? "✓ Правильно! " : "✓ Correct! ") : (isUk ? "✗ Неправильно. " : "✗ Incorrect. ")}
                  </span>
                  {isUk ? question.explanation_uk : question.explanation_en}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
