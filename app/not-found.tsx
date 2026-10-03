import Link from "next/link";
import { Bubbles } from "@/components/underwater";

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-underwater text-white">
      <div aria-hidden className="absolute inset-0 caustics" />
      <Bubbles />
      <div className="relative mx-auto max-w-xl px-4 py-28 text-center">
        <p className="font-display text-7xl font-extrabold text-aqua-light">404</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">This page swam away</h1>
        <p className="mt-3 text-lg text-foam/80">
          We couldn&apos;t find what you were looking for. Try the product catalogue instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="rounded-full bg-coral px-6 py-3 font-semibold hover:bg-coral-dark">
            Browse products
          </Link>
          <Link href="/" className="rounded-full border border-white/25 px-6 py-3 font-semibold hover:bg-white/10">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
