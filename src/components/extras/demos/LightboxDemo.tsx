"use client";

import { useState } from "react";
import { LightboxGallery } from "@/components/ui/Lightbox";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRESETS = {
  portfolio: {
    labelEn: "Portfolio gallery",
    labelUk: "Галерея портфоліо",
    images: [
      { src: "https://placehold.co/1200x800/4f46e5/ffffff?text=Project+1+%E2%80%94+Restaurant", alt: "Project 1: Restaurant landing page", caption: "Restaurant «Smachno» — hero section" },
      { src: "https://placehold.co/1200x800/7c3aed/ffffff?text=Project+2+%E2%80%94+Beauty", alt: "Project 2: Beauty salon", caption: "Beauty salon — booking flow" },
      { src: "https://placehold.co/1200x800/db2777/ffffff?text=Project+3+%E2%80%94+SaaS", alt: "Project 3: SaaS dashboard", caption: "SaaS dashboard — pricing page" },
      { src: "https://placehold.co/1200x800/0891b2/ffffff?text=Project+4+%E2%80%94+E-commerce", alt: "Project 4: E-commerce store", caption: "E-commerce — product page" },
      { src: "https://placehold.co/1200x800/059669/ffffff?text=Project+5+%E2%80%94+Fitness", alt: "Project 5: Fitness app", caption: "Fitness studio — class schedule" },
      { src: "https://placehold.co/1200x800/d97706/ffffff?text=Project+6+%E2%80%94+Real+Estate", alt: "Project 6: Real Estate listing", caption: "Real estate — property listing" },
    ],
  },
  product: {
    labelEn: "Product photos",
    labelUk: "Фото товару",
    images: [
      { src: "https://placehold.co/1200x800/1e293b/f1f5f9?text=Front+View", alt: "Front view", caption: "Front view" },
      { src: "https://placehold.co/1200x800/334155/f1f5f9?text=Side+View", alt: "Side view", caption: "Side view" },
      { src: "https://placehold.co/1200x800/475569/f1f5f9?text=Back+View", alt: "Back view", caption: "Back view" },
      { src: "https://placehold.co/1200x800/64748b/f1f5f9?text=Detail", alt: "Detail close-up", caption: "Material detail" },
    ],
  },
};

type PresetKey = keyof typeof PRESETS;

export function LightboxDemo({ isUk }: Props) {
  const [preset, setPreset] = useState<PresetKey>("portfolio");
  const current = PRESETS[preset];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setPreset(k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              k === preset
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50"
            }`}
          >
            {isUk ? PRESETS[k].labelUk : PRESETS[k].labelEn}
          </button>
        ))}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Клікніть на зображення — відкриється fullscreen lightbox з навігацією, клавіатурними скороченнями (← → Esc) та підписами."
          : "Click any image — fullscreen lightbox opens with navigation, keyboard shortcuts (← → Esc) and captions."}
      </p>

      <LightboxGallery
        key={preset}
        images={current.images}
        columns={preset === "portfolio" ? 3 : 4}
      />
    </div>
  );
}
