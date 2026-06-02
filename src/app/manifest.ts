import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codeworth — Веб-студія повного циклу",
    short_name: "Codeworth",
    description:
      "Розробка сайтів, інтернет-магазинів, PWA та маркетплейс готових рішень для бізнесу в Україні.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4F46E5",
    orientation: "portrait-primary",
    lang: "uk",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity"],
    shortcuts: [
      {
        name: "Контакти",
        url: "/contact",
        description: "Зв'яжіться з нами",
      },
      {
        name: "Маркетплейс",
        url: "/marketplace",
        description: "Готові рішення для бізнесу",
      },
    ],
  };
}
