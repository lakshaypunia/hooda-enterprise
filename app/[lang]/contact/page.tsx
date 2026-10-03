import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { getLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { EnquiryForm } from "@/components/enquiry-form";
import { WhatsAppIcon } from "@/components/icons";
import { PageBanner } from "@/components/page-banner";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/contact", {
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
  });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang, t } = await getLocale(params);
  const c = t.contact;
  const hi = lang === "hi";
  const details = [
    {
      icon: Phone,
      label: c.phone,
      value: siteConfig.phoneDisplay,
      href: `tel:+${siteConfig.whatsappNumber}`,
    },
    {
      icon: MapPin,
      label: c.address,
      value: hi ? siteConfig.addressHi : siteConfig.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.name} ${siteConfig.address}`)}`,
    },
    { icon: Clock, label: c.hours, value: hi ? siteConfig.hoursHi : siteConfig.hours },
  ];

  return (
    <main className="flex-1">
      <PageBanner eyebrow={c.eyebrow} title={c.title}>
        {c.intro}
      </PageBanner>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[380px_1fr]">
        <aside className="relative -mt-10 space-y-4">
          <a
            href={whatsappLink(generalMessage(lang))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-[1.75rem] bg-whatsapp p-5 text-abyss shadow-soft transition-transform hover:scale-[1.01]"
          >
            <span className="grid size-14 place-items-center rounded-full bg-white/30">
              <WhatsAppIcon className="size-8" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold">{t.common.chatOnWhatsApp}</span>
              <span className="text-abyss/75">{c.fastest}</span>
            </span>
          </a>

          <ul className="divide-y divide-deep/8 rounded-[1.75rem] bg-white shadow-soft ring-1 ring-deep/6">
            {details.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-drop bg-foam text-lagoon">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="font-semibold text-ink">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 hover:bg-cream"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-5">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="relative rounded-[1.75rem] bg-white p-5 shadow-soft ring-1 ring-deep/6 sm:p-8 lg:-mt-10">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{c.formTitle}</h2>
          <p className="mt-1 mb-6 text-muted">{c.formIntro}</p>
          <EnquiryForm />
        </section>
      </div>
    </main>
  );
}
