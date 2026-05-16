import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Lujo europeo`,
  description:
    "Maison Valdezzani — El arte de la elegancia atemporal. Colecciones premium de lista para vestir, marroquinería y complementos.",
  keywords: ["lujo", "moda", "Maison Valdezzani", "premium", "elegancia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
