import type { Metadata, Viewport } from "next";
import { Baloo_2, Mukta } from "next/font/google";
import { DealerBar } from "@/components/dealer-bar";
import { I18nProvider } from "@/components/i18n-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { htmlLang, locales } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import "../globals.css";

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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { t } = await getLocale(params);
  return {
    title: { default: t.meta.siteTitle, template: `%s | Hooda Enterprise` },
    description: t.meta.siteDescription,
  };
}

export const viewport: Viewport = {
  themeColor: "#0b3c49",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang, t } = await getLocale(params);

  return (
    <html lang={htmlLang[lang]} className={`${baloo.variable} ${mukta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <I18nProvider lang={lang}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
          >
            {t.nav.skip}
          </a>
          <DealerBar />
          <SiteHeader />
          <div id="main" className="flex flex-1 flex-col">
            {children}
          </div>
          <SiteFooter />
          <WhatsAppFab />
        </I18nProvider>
      </body>
    </html>
  );
}
