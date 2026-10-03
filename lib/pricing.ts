import { DISCOUNT_PERCENT } from "./site-config";

/** Selling price after the standard discount, rounded to the nearest rupee. */
export function sellingPrice(mrp: number) {
  return Math.round(mrp * (1 - DISCOUNT_PERCENT / 100));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number) {
  return inr.format(amount);
}
