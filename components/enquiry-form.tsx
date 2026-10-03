"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "./i18n-provider";
import { WhatsAppIcon } from "./icons";

/** Builds a WhatsApp query from a few fields — nothing is sent to a server. */
export function EnquiryForm() {
  const { t } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", location: "", type: c.types[0], area: "", message: "" });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const details = [
      form.name.trim() && `${t.wa.name}: ${form.name.trim()}`,
      form.location.trim() && `${t.wa.location}: ${form.location.trim()}`,
      `${t.wa.farmType}: ${form.type}`,
      form.area.trim() && `${t.wa.pondArea}: ${form.area.trim()}`,
    ].filter(Boolean);
    const text = [t.wa.hello(siteConfig.name), "", form.message.trim(), "", ...details].join("\n");
    window.open(whatsappLink(text, "query"), "_blank", "noopener,noreferrer");
  };

  const input =
    "mt-1 w-full rounded-xl border border-deep/12 bg-cream px-3 py-2.5 text-ink focus:border-aqua focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">{c.name}</span>
          <input value={form.name} onChange={set("name")} autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">{c.location}</span>
          <input
            value={form.location}
            onChange={set("location")}
            autoComplete="address-level2"
            className={input}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">{c.youAre}</span>
          <select value={form.type} onChange={set("type")} className={input}>
            {c.types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">{c.area}</span>
          <input value={form.area} onChange={set("area")} placeholder={c.areaPlaceholder} className={input} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-ink">{c.question}</span>
        <textarea
          value={form.message}
          onChange={set("message")}
          required
          rows={4}
          placeholder={c.questionPlaceholder}
          className={input}
        />
      </label>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-lg font-bold text-abyss transition-transform hover:scale-[1.02] sm:w-auto"
      >
        <WhatsAppIcon className="size-6" /> {c.send}
      </button>
      <p className="text-sm text-muted">{c.privacy}</p>
    </form>
  );
}
