import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "Особистий кабінет — Маркетплейс",
  description: "Ваш особистий кабінет покупця CodeNest — замовлення, проєкти, налаштування.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-warm-50">
        <AccountClient />
      </main>
      <Footer />
    </>
  );
}
