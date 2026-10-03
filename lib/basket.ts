"use client";

import { useSyncExternalStore } from "react";

/**
 * Enquiry basket: products a buyer wants to order in one WhatsApp message.
 * Kept in this browser's localStorage only — a convenience, not an order record.
 */

export type BasketItem = { slug: string; size: string; qty: number };

type State = {
  items: BasketItem[];
  /** Increments on every add, so the UI can show a confirmation. */
  addedCount: number;
  lastAdded?: BasketItem;
};

const STORAGE_KEY = "hooda-basket-v1";
const EMPTY: State = { items: [], addedCount: 0 };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const items = raw ? (JSON.parse(raw) as BasketItem[]) : [];
    if (Array.isArray(items)) state = { ...state, items };
  } catch {
    // Storage unavailable (private mode, blocked) — basket just won't persist.
  }
}

function setState(next: State) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

export function useBasket() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

const same = (a: BasketItem, slug: string, size: string) => a.slug === slug && a.size === size;

export const basket = {
  add(slug: string, size: string, qty = 1) {
    const existing = state.items.find((i) => same(i, slug, size));
    const items = existing
      ? state.items.map((i) => (same(i, slug, size) ? { ...i, qty: i.qty + qty } : i))
      : [...state.items, { slug, size, qty }];
    setState({ items, addedCount: state.addedCount + 1, lastAdded: { slug, size, qty } });
  },
  setQty(slug: string, size: string, qty: number) {
    const items =
      qty <= 0
        ? state.items.filter((i) => !same(i, slug, size))
        : state.items.map((i) => (same(i, slug, size) ? { ...i, qty } : i));
    setState({ ...state, items });
  },
  remove(slug: string, size: string) {
    setState({ ...state, items: state.items.filter((i) => !same(i, slug, size)) });
  },
  clear() {
    setState({ ...state, items: [] });
  },
};
