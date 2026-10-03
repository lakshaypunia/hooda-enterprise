"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

const FARM_TYPES = ["Fish pond", "Shrimp pond", "Hatchery", "Dealer / shop", "Other"];

/** Builds a WhatsApp query from a few fields — nothing is sent to a server. */
export function EnquiryForm() {
  const [form, setForm] = useState({ name: "", location: "", type: FARM_TYPES[0], area: "", message: "" });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const details = [
      form.name.trim() && `Name: ${form.name.trim()}`,
      form.location.trim() && `Location: ${form.location.trim()}`,
      `Farm type: ${form.type}`,
      form.area.trim() && `Pond area: ${form.area.trim()}`,
    ].filter(Boolean);
    const text = [`Hello ${siteConfig.name},`, "", form.message.trim(), "", ...details].join("\n");
    window.open(whatsappLink(text, "query"), "_blank", "noopener,noreferrer");
  };

  const input =
    "mt-1 w-full rounded-xl border border-deep/12 bg-cream px-3 py-2.5 text-ink focus:border-aqua focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Your name</span>
          <input value={form.name} onChange={set("name")} autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Village / town</span>
          <input
            value={form.location}
            onChange={set("location")}
            autoComplete="address-level2"
            className={input}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">You are a</span>
          <select value={form.type} onChange={set("type")} className={input}>
            {FARM_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Pond area (optional)</span>
          <input value={form.area} onChange={set("area")} placeholder="e.g. 2 acres" className={input} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-ink">Your question</span>
        <textarea
          value={form.message}
          onChange={set("message")}
          required
          rows={4}
          placeholder="Describe your pond problem or the products you need"
          className={input}
        />
      </label>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-lg font-bold text-abyss transition-transform hover:scale-[1.02] sm:w-auto"
      >
        <WhatsAppIcon className="size-6" /> Send on WhatsApp
      </button>
      <p className="text-sm text-muted">
        This opens WhatsApp with your message ready. Nothing is stored on this site.
      </p>
    </form>
  );
}
