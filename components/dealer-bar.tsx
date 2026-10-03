"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { DISCOUNT_PERCENT, serviceAreaText } from "@/lib/site-config";
import { useI18n } from "./i18n-provider";

/** Slim notice above the header: we are a dealer, not the manufacturer. */
export function DealerBar() {
  const { lang, t, href } = useI18n();
  const areas = serviceAreaText(lang);
  return (
    <div className="bg-abyss text-foam/85">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5 text-center text-xs sm:px-6 sm:text-sm">
        <BadgeCheck className="hidden size-4 shrink-0 text-aqua sm:block" aria-hidden />
        <p>
          <strong className="font-semibold text-white">{t.dealer.barStrong}</strong>
          <span className="hidden xl:inline">{t.dealer.barRest}</span>
          <span aria-hidden> · </span>
          {areas ? (
            <>
              {t.area.deliver(areas)}
              <span className="hidden md:inline">
                <span aria-hidden> · </span>
                {t.dealer.barPrice(DISCOUNT_PERCENT)}
              </span>
            </>
          ) : (
            t.dealer.barPrice(DISCOUNT_PERCENT)
          )}{" "}
          <Link
            href={`${href("/about")}#dealer`}
            className="ml-1 hidden underline decoration-aqua/60 underline-offset-2 hover:text-white sm:inline"
          >
            {t.common.learnMore}
          </Link>
        </p>
      </div>
    </div>
  );
}
