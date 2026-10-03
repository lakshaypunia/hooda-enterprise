"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ShoppingBasket, Trash2, X } from "lucide-react";
import { getProduct } from "@/data/products";
import { basket, useBasket } from "@/lib/basket";
import { formatINR, sellingPrice } from "@/lib/pricing";
import { basketMessage, whatsappLink, type BasketLine } from "@/lib/whatsapp";
import { QtyStepper } from "./buy-panel";
import { WhatsAppIcon } from "./icons";
import { ProductImage } from "./product-image";

/** Header button that opens the enquiry list drawer. */
export function BasketButton() {
  const { items, addedCount, lastAdded } = useBasket();
  const dialog = useRef<HTMLDialogElement>(null);
  const count = items.reduce((n, i) => n + i.qty, 0);

  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Enquiry list, ${count} items`}
        className="relative grid size-10 place-items-center rounded-full text-white hover:bg-white/10"
      >
        <ShoppingBasket className="size-6" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">
            {count}
          </span>
        )}
      </button>

      <dialog
        ref={dialog}
        aria-label="Enquiry list"
        onClick={(e) => e.target === dialog.current && close()}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(28rem,100vw)] max-w-none bg-cream p-0 text-ink shadow-2xl backdrop:bg-abyss/60 backdrop:backdrop-blur-sm"
      >
        <BasketDrawer onClose={close} />
      </dialog>

      {/* key remounts the toast for every add, restarting its timer */}
      {lastAdded && <AddedToast key={addedCount} slug={lastAdded.slug} size={lastAdded.size} onOpen={open} />}
    </>
  );
}

function BasketDrawer({ onClose }: { onClose: () => void }) {
  const { items } = useBasket();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const lines: BasketLine[] = items.flatMap((item) => {
    const product = getProduct(item.slug);
    const pack = product?.packs.find((p) => p.size === item.size);
    return product && pack ? [{ product, pack, qty: item.qty }] : [];
  });
  const total = lines.reduce((sum, l) => sum + (l.pack.mrp ? sellingPrice(l.pack.mrp) * l.qty : 0), 0);
  const hasUnpriced = lines.some((l) => !l.pack.mrp);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-deep px-5 py-4 text-white">
        <div>
          <h2 className="text-xl font-bold">Your enquiry list</h2>
          <p className="text-sm text-aqua-light">Send everything in one WhatsApp message</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry list"
          className="grid size-10 place-items-center rounded-full hover:bg-white/10"
        >
          <X className="size-6" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-foam text-lagoon">
            <ShoppingBasket className="size-8" />
          </span>
          <p className="mt-4 font-display text-xl font-semibold">Your list is empty</p>
          <p className="mt-1 text-muted">Add products, then send the whole list to us on WhatsApp.</p>
          <Link
            href="/products"
            onClick={onClose}
            className="mt-5 rounded-full bg-coral px-5 py-2.5 font-semibold text-white hover:bg-coral-dark"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-deep/8 overflow-y-auto px-4">
            {lines.map(({ product, pack, qty }) => (
              <li key={`${product.slug}-${pack.size}`} className="flex gap-3 py-4">
                <ProductImage
                  product={product}
                  sizes="72px"
                  className="w-18 shrink-0 rounded-xl ring-1 ring-deep/8"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="font-display text-lg leading-tight font-semibold hover:text-lagoon"
                    >
                      {product.name}
                      <span className="block text-sm font-medium text-muted">{pack.size}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => basket.remove(product.slug, pack.size)}
                      aria-label={`Remove ${product.name} ${pack.size}`}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-muted hover:bg-coral/10 hover:text-coral-dark"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <QtyStepper
                      size="sm"
                      value={qty}
                      onChange={(q) => basket.setQty(product.slug, pack.size, q)}
                      label={`${product.name} ${pack.size}`}
                    />
                    <span className="font-display font-bold">
                      {pack.mrp ? formatINR(sellingPrice(pack.mrp) * qty) : "On request"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-3 border-t border-deep/10 bg-white p-4">
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="text-sm font-medium text-muted">Your name (optional)</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="mt-1 w-full rounded-xl border border-deep/12 bg-cream px-3 py-2 focus:border-aqua focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-muted">Village / town</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  autoComplete="address-level2"
                  className="mt-1 w-full rounded-xl border border-deep/12 bg-cream px-3 py-2 focus:border-aqua focus:outline-none"
                />
              </label>
            </div>
            <p className="flex items-baseline justify-between">
              <span className="text-muted">Estimated total{hasUnpriced && " (+ items on request)"}</span>
              <span className="font-display text-2xl font-bold">{formatINR(total)}</span>
            </p>
            <a
              href={whatsappLink(basketMessage(lines, { name: name.trim(), location: location.trim() }))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-lg font-bold text-abyss transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="size-6" /> Send order on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => basket.clear()}
              className="w-full text-sm font-semibold text-muted hover:text-coral-dark"
            >
              Clear list
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function AddedToast({ slug, size, onOpen }: { slug: string; size: string; onOpen: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, []);
  const product = getProduct(slug);
  if (!visible || !product) return null;

  // Portal to <body>: the sticky header uses backdrop-filter, which would trap position:fixed.
  return createPortal(
    <div
      role="status"
      className="fixed bottom-24 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl bg-abyss px-4 py-3 text-white shadow-2xl sm:bottom-8"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-kelp">
        <Check className="size-5" />
      </span>
      <span className="min-w-0 flex-1 text-sm">
        <strong className="block truncate">{product.name}</strong>
        {size} added to your list
      </span>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          onOpen();
        }}
        className="shrink-0 rounded-full bg-white/12 px-3 py-1.5 text-sm font-semibold hover:bg-white/20"
      >
        View list
      </button>
    </div>,
    document.body,
  );
}
