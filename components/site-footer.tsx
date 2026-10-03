import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { GENERAL_ENQUIRY_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { LogoMark, Wave, WhatsAppIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto text-foam">
      <Wave className="-mb-px block h-12 w-full text-deep sm:h-16" />
      <div className="bg-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <LogoMark className="size-10" />
              <span className="font-display text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-foam/75">{siteConfig.description}</p>
            <p className="mt-4 text-sm text-foam/60">
              Supplier of {siteConfig.brands.join(" & ")} products.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-lg font-semibold text-white">Explore</h2>
            <ul className="mt-3 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-foam/75 hover:text-aqua-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-semibold text-white">Get in touch</h2>
            <ul className="mt-3 space-y-3 text-foam/80">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-aqua" />
                <a href={`tel:+${siteConfig.whatsappNumber}`} className="hover:text-aqua-light">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-aqua" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-aqua" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
            <a
              href={whatsappLink(GENERAL_ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-semibold text-abyss transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-foam/55 sm:flex-row sm:justify-between sm:px-6">
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <p>Product names and trademarks belong to their respective owners.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
