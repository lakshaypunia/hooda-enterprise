import type { ReactNode } from "react";
import { Wave } from "./icons";
import { Bubbles } from "./underwater";

/** Underwater page header used by content pages. */
export function PageBanner({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-underwater text-white">
      <div aria-hidden className="absolute inset-0 caustics" />
      <Bubbles />
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-16">
        <p className="font-display text-sm font-semibold tracking-widest text-aqua-light uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {children && <div className="mt-3 max-w-2xl text-lg text-foam/85">{children}</div>}
      </div>
      <Wave className="absolute bottom-0 left-0 h-12 w-full text-cream sm:h-16" />
    </section>
  );
}
