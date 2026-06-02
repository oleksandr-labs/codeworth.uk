import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import CartClient from "./CartClient";
import { CartSummary } from "./CartSummary";

export const metadata: Metadata = {
  title: "Кошик — Маркетплейс",
  description: "Ваш кошик замовлень на Codeworth Маркетплейс.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-warm-50">
        <div className="bg-white border-b border-gray-100 py-6">
          <Container>
            <Breadcrumb
              items={[
                { label: "Маркетплейс", href: "/marketplace" },
                { label: "Кошик" },
              ]}
            />
            <h1 className="text-3xl font-bold font-syne text-gray-900 mt-4 flex items-center gap-3">
              <ShoppingCart className="w-7 h-7 text-indigo-600" />
              Кошик
            </h1>
          </Container>
        </div>

        <Container className="py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <CartClient />
            </div>

            {/* Summary */}
            <CartSummary />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
