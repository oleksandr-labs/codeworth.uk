import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codeworth — ML & AI Consultancy",
    short_name: "Codeworth",
    description:
      "Custom machine learning and AI solutions for UK businesses — from proof of concept to production MLOps.",
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
        name: "Послуги",
        url: "/services",
        description: "AI/ML послуги для бізнесу",
      },
    ],
  };
}
