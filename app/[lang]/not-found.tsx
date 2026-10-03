"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { Bubbles } from "@/components/underwater";

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-underwater text-white">
      <div aria-hidden className="absolute inset-0 caustics" />
      <Bubbles />
      <div className="relative mx-auto max-w-xl px-4 py-28 text-center">
        <p className="font-display text-7xl font-extrabold text-aqua-light">404</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t.notFound.title}</h1>
        <p className="mt-3 text-lg text-foam/80">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={href("/products")}
            className="rounded-full bg-coral px-6 py-3 font-semibold hover:bg-coral-dark"
          >
            {t.notFound.browse}
          </Link>
          <Link
            href={href("/")}
            className="rounded-full border border-white/25 px-6 py-3 font-semibold hover:bg-white/10"
          >
            {t.notFound.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
