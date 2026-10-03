import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { DISCOUNT_PERCENT } from "@/lib/site-config";

/** Slim notice above the header: we are a dealer, not the manufacturer. */
export function DealerBar() {
  return (
    <div className="bg-abyss text-foam/85">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5 text-center text-xs sm:px-6 sm:text-sm">
        <BadgeCheck className="hidden size-4 shrink-0 text-aqua sm:block" aria-hidden />
        <p>
          <strong className="font-semibold text-white">Independent dealer</strong>
          <span className="hidden sm:inline"> — genuine products from trusted brands like Provet Pharma</span>
          <span aria-hidden> · </span>
          {DISCOUNT_PERCENT}% below MRP{" "}
          <Link
            href="/about#dealer"
            className="ml-1 underline decoration-aqua/60 underline-offset-2 hover:text-white"
          >
            Learn more
          </Link>
        </p>
      </div>
    </div>
  );
}
