"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info, MapPin, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Hotspot {
  id: string;
  x: number; // percent across panorama
  y: number;
  labelEn: string;
  labelUk: string;
  descEn: string;
  descUk: string;
}

const SCENES = [
  {
    id: "lobby",
    nameEn: "Lobby",
    nameUk: "Лобі",
    // CSS gradient panorama (acts as 360° background)
    bg: "from-amber-200 via-orange-300 to-rose-300",
    hotspots: [
      { id: "h1", x: 25, y: 60, labelEn: "Reception", labelUk: "Рецепція", descEn: "Check-in 14:00–24:00", descUk: "Заселення 14:00–24:00" },
      { id: "h2", x: 65, y: 55, labelEn: "Bar", labelUk: "Бар", descEn: "Open until 23:00", descUk: "Працює до 23:00" },
      { id: "h3", x: 85, y: 70, labelEn: "Lift to rooms", labelUk: "Ліфт до номерів", descEn: "Floors 2–8", descUk: "2–8 поверхи" },
    ] as Hotspot[],
  },
  {
    id: "room",
    nameEn: "Deluxe Room",
    nameUk: "Делюкс номер",
    bg: "from-sky-200 via-indigo-200 to-violet-300",
    hotspots: [
      { id: "h1", x: 35, y: 50, labelEn: "King bed", labelUk: "King-розмір ліжко", descEn: "Memory-foam mattress", descUk: "Memory-foam матрац" },
      { id: "h2", x: 70, y: 65, labelEn: "City view", labelUk: "Вид на місто", descEn: "Panoramic windows", descUk: "Панорамні вікна" },
    ] as Hotspot[],
  },
  {
    id: "spa",
    nameEn: "Spa Area",
    nameUk: "Спа-зона",
    bg: "from-emerald-200 via-teal-300 to-cyan-300",
    hotspots: [
      { id: "h1", x: 30, y: 55, labelEn: "Sauna", labelUk: "Сауна", descEn: "85°C, capacity 8", descUk: "85°C, до 8 осіб" },
      { id: "h2", x: 75, y: 50, labelEn: "Pool", labelUk: "Басейн", descEn: "25m, heated", descUk: "25м, з підігрівом" },
    ] as Hotspot[],
  },
];

export function VirtualTourDemo({ isUk }: Props) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [offset, setOffset] = useState(0); // panorama drag offset (px)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);

  const scene = SCENES[sceneIdx];

  const handleSceneChange = (idx: number) => {
    setSceneIdx(idx);
    setOffset(0);
    setActiveHotspot(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startOffset.current = offset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setOffset(startOffset.current + delta);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const up = () => { isDragging.current = false; };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleSceneChange(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              i === sceneIdx
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {isUk ? s.nameUk : s.nameEn}
          </button>
        ))}
        <button
          onClick={() => { setOffset(0); setActiveHotspot(null); }}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {isUk ? "Скинути" : "Reset view"}
        </button>
      </div>

      <div
        className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="application"
        aria-label={isUk ? `360° тур: ${scene.nameUk}` : `360° tour: ${scene.nameEn}`}
      >
        {/* Panorama "background" — 200% wide so user can drag */}
        <div
          className={`absolute inset-y-0 w-[200%] bg-linear-to-r ${scene.bg} transition-transform duration-100`}
          style={{ transform: `translateX(calc(-25% + ${offset}px))` }}
        >
          {/* Scene details / "objects" */}
          <div className="absolute inset-0 flex items-center justify-around opacity-30">
            <div className="w-32 h-32 rounded-full bg-white/40 blur-xl" />
            <div className="w-48 h-48 rounded-full bg-white/30 blur-2xl" />
            <div className="w-24 h-24 rounded-full bg-white/40 blur-xl" />
          </div>

          {/* Hotspots positioned on panorama */}
          {scene.hotspots.map((h) => (
            <button
              key={h.id}
              onClick={(e) => { e.stopPropagation(); setActiveHotspot(h); }}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={isUk ? h.labelUk : h.labelEn}
            >
              <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-2 border-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform animate-pulse">
                <Info className="w-4 h-4 text-indigo-600" />
              </span>
            </button>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setOffset((o) => o + 100)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
          aria-label={isUk ? "Повернути ліворуч" : "Pan left"}
        >
          <ChevronLeft className="w-5 h-5 text-neutral-700" />
        </button>
        <button
          onClick={() => setOffset((o) => o - 100)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
          aria-label={isUk ? "Повернути праворуч" : "Pan right"}
        >
          <ChevronRight className="w-5 h-5 text-neutral-700" />
        </button>

        {/* Scene label */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
          {sceneIdx + 1} / {SCENES.length} · {isUk ? scene.nameUk : scene.nameEn}
        </div>
      </div>

      {/* Hotspot panel */}
      {activeHotspot && (
        <div
          role="dialog"
          aria-label={isUk ? activeHotspot.labelUk : activeHotspot.labelEn}
          className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">{isUk ? activeHotspot.labelUk : activeHotspot.labelEn}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">{isUk ? activeHotspot.descUk : activeHotspot.descEn}</p>
          </div>
          <button
            onClick={() => setActiveHotspot(null)}
            className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 text-sm"
            aria-label={isUk ? "Закрити" : "Close"}
          >
            ✕
          </button>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Перетягуйте панораму або використовуйте стрілки. Клікайте на точки інтересу. Production стек: Matterport iframe або Pannellum.js."
          : "Drag the panorama or use arrows. Click hotspots for info. Production stack: Matterport iframe or Pannellum.js."}
      </p>
    </div>
  );
}
