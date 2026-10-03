import type { CSSProperties } from "react";

/** Deterministic bubble layout so server and client render the same markup. */
const BUBBLES = [
  { left: 4, size: 10, delay: 0, duration: 11 },
  { left: 11, size: 6, delay: 3, duration: 9 },
  { left: 19, size: 14, delay: 6, duration: 13 },
  { left: 27, size: 8, delay: 1.5, duration: 10 },
  { left: 36, size: 5, delay: 7, duration: 8 },
  { left: 44, size: 12, delay: 4, duration: 12 },
  { left: 53, size: 7, delay: 9, duration: 10 },
  { left: 61, size: 16, delay: 2, duration: 14 },
  { left: 69, size: 6, delay: 5.5, duration: 9 },
  { left: 77, size: 10, delay: 8, duration: 11 },
  { left: 85, size: 8, delay: 0.5, duration: 10 },
  { left: 93, size: 12, delay: 6.5, duration: 13 },
];

export function Bubbles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute -bottom-6 animate-bubble rounded-full border border-white/40 bg-white/10"
          style={
            {
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              "--bubble-duration": `${b.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function FishShape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 60" aria-hidden className={className} style={style}>
      <path
        fill="currentColor"
        d="M5 30c18-18 45-24 70-18 12 3 22 9 30 16l12-10v24l-12-10c-8 7-18 13-30 16-25 6-52 0-70-18z"
        transform="matrix(-1 0 0 1 122 0)"
      />
      <circle cx="102" cy="27" r="2.5" fill="rgb(6 42 51 / .6)" transform="matrix(-1 0 0 1 122 0)" />
    </svg>
  );
}

function ShrimpShape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 60" aria-hidden className={className} style={style} fill="none">
      <path
        d="M88 22c-8-12-26-16-42-10-14 5-24 16-26 28 6-2 10-6 14-10M88 22c2 8-2 16-10 20-10 5-22 4-32-2M88 22l10-8M86 20l8-14M40 40l-4 12M50 42l-2 12M60 42l0 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M20 40c-8 2-14 0-18-4 6 0 12-2 16-6" fill="currentColor" />
    </svg>
  );
}

function Kelp({ className, delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <svg
      viewBox="0 0 40 200"
      aria-hidden
      className={`origin-bottom animate-sway ${className}`}
      style={{ animationDelay: delay }}
    >
      <path
        d="M20 200C10 170 30 150 18 120S28 70 16 40 24 10 20 0"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 120c-12-4-16-14-14-22 8 4 12 12 14 22zM16 70c12-4 16-14 14-22-8 4-12 12-14 22z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Decorative pond life for dark hero sections. */
export function PondLife() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <FishShape
        className="absolute top-[22%] left-0 w-16 animate-swim text-aqua-light/25"
        style={{ animationDuration: "26s" }}
      />
      <FishShape
        className="absolute top-[48%] left-0 w-10 animate-swim text-white/15"
        style={{ animationDuration: "34s", animationDelay: "-12s" }}
      />
      <ShrimpShape
        className="absolute top-[68%] left-0 w-14 animate-swim text-coral/30"
        style={{ animationDuration: "40s", animationDelay: "-20s" }}
      />
      <Kelp className="absolute bottom-0 left-[6%] h-40 text-kelp/50 sm:h-56" />
      <Kelp className="absolute bottom-0 left-[10%] h-28 text-kelp/35 sm:h-40" delay="-2s" />
      <Kelp className="absolute right-[8%] bottom-0 h-36 text-kelp/45 sm:h-52" delay="-4s" />
    </div>
  );
}
