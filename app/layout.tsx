import type { Metadata, Viewport } from "next";
import { Baloo_2, Mukta } from "next/font/google";
import { DealerBar } from "@/components/dealer-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "devanagari"],
  weight: ["500", "600", "700", "800"],
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hooda Enterprise — Aquaculture Products for Fish & Shrimp Farming",
    template: "%s | Hooda Enterprise",
  },
  description:
    "Independent dealer of aquaculture products from trusted brands like Provet Pharma (BluNova) — probiotics, zeolites, disinfectants, minerals and feed additives for fish and shrimp ponds, 20% below MRP. Order on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0b3c49",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo.variable} ${mukta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <DealerBar />
        <SiteHeader />
        <div id="main" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
