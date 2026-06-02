import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Оформлення замовлення — Маркетплейс",
  description: "Оформіть замовлення на готовий сайт від Codeworth.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-warm-50">
        <div className="bg-white border-b border-gray-100 py-6">
          <Container>
            <Breadcrumb
              items={[
                { label: "Маркетплейс", href: "/marketplace" },
                { label: "Кошик", href: "/marketplace/cart" },
                { label: "Оформлення" },
              ]}
            />
            <h1 className="text-3xl font-bold font-syne text-gray-900 mt-4">
              Оформлення замовлення
            </h1>
          </Container>
        </div>
        <Container className="py-10">
          <CheckoutForm />
        </Container>
      </main>
      <Footer />
    </>
  );
}
