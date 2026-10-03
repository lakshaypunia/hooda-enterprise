import type { SVGProps } from "react";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.34-8.04z" />
    </svg>
  );
}

/** Brand mark: a fish inside a water drop. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <defs>
        <linearGradient id="logo-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2bb3b1" />
          <stop offset="1" stopColor="#0b3c49" />
        </linearGradient>
      </defs>
      <path d="M24 3C24 3 7 20 7 30a17 17 0 0 0 34 0C41 20 24 3 24 3z" fill="url(#logo-drop)" />
      <path
        d="M14 31c3.5-4.5 8-6 12-6 3.2 0 5.8 1.3 7.5 3l3.5-3v8l-3.5-3c-1.7 1.7-4.3 3-7.5 3-4 0-8.5-1.5-12-2z"
        fill="#e3f6f3"
      />
      <circle cx="29.5" cy="29" r="1.2" fill="#0b3c49" />
      <circle cx="17" cy="18" r="1.6" fill="#e3f6f3" opacity=".7" />
      <circle cx="20.5" cy="13" r="1" fill="#e3f6f3" opacity=".6" />
    </svg>
  );
}

/** Horizontal wave used as a section divider. Colour comes from `currentColor`. */
export function Wave({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        fill="currentColor"
        d="M0 40c120 22 240 33 360 28S600 34 720 30s240 10 360 20 240 12 360-2V80H0z"
        opacity=".45"
      />
      <path
        fill="currentColor"
        d="M0 52c140-18 280-22 420-10s280 30 420 26 280-24 420-26c70-1 130 4 180 10V80H0z"
      />
    </svg>
  );
}
