import type { Metadata, Viewport } from "next";
import { Baloo_2, Mukta } from "next/font/google";
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
    "Wholesale supplier of Provet Pharma aquaculture products — probiotics, zeolites, disinfectants, minerals and feed additives for healthy fish and shrimp ponds. Order on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0b3c49",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo.variable} ${mukta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
