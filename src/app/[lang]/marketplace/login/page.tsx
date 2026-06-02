import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Вхід до кабінету — Маркетплейс CodeNest",
  description: "Увійдіть до особистого кабінету покупця CodeNest, щоб керувати замовленнями та проєктами.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-warm-50 min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
