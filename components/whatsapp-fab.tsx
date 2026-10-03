import { GENERAL_ENQUIRY_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp button shown on every page. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(GENERAL_ENQUIRY_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-2 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink opacity-0 shadow-soft transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Need help? Chat with us
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-6px_rgb(18_140_74/0.6)] transition-transform group-hover:scale-105">
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30 [animation-duration:2.5s]"
        />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
