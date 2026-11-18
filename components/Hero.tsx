"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Positions are % of the 1920x1451 Figma frame.
const HOTSPOTS = [
  { id: "car", label: "Police Robotic Car", x: 23.6, y: 39.8, side: "left", detail: "Purpose-built patrol platform for city streets." },
  { id: "thermal", label: "Thermal Image", x: 50.9, y: 41.1, side: "right", detail: "Thermal imaging reads heat signatures in the dark." },
  { id: "vision", label: "360° Vision", x: 63.0, y: 31.4, side: "right", detail: "Overlapping cameras remove blind spots all around." },
  { id: "wheels", label: "All-Terrain Wheels", x: 24.3, y: 66.3, side: "left", detail: "Independent drive wheels hold grip on uneven roads." },
  { id: "battery", label: "Battery", x: 60.9, y: 60.3, side: "right", detail: "Swappable pack built for a full shift of patrols." },
  { id: "ultra", label: "Ultrasonics", x: 47.7, y: 72.8, side: "left", detail: "Close-range sensors for tight curbs and parking." },
] as const;

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#product", label: "Product" },
  { href: "#story", label: "Our Story" },
  { href: "#technology", label: "Technology" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const robot = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let off = () => {};
    const ctx = gsap.context(() => {
      // One orchestrated entrance: letters rise, robot drives in, hotspots arrive last.
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-logo]", { opacity: 0, y: -12, duration: 0.8 })
        .from("[data-letter]", { yPercent: 110, duration: 1.2, stagger: 0.07 }, 0.1)
        .from(robot.current, { y: 120, scale: 0.92, opacity: 0, duration: 1.4 }, 0.35)
        .from("[data-hotspot]", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.09, ease: "back.out(2.4)" }, 1.1)
        .from("[data-pill]", { y: 30, opacity: 0, duration: 0.8 }, 1.3);

      // Pointer parallax: robot leans toward the cursor, headline drifts the other way.
      const rx = gsap.quickTo(robot.current, "x", { duration: 0.9, ease: "power3" });
      const ry = gsap.quickTo(robot.current, "y", { duration: 0.9, ease: "power3" });
      const wx = gsap.quickTo(word.current, "x", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        rx(nx * 28);
        ry(ny * 14);
        wx(nx * -40);
      };
      window.addEventListener("pointermove", onMove);
      off = () => window.removeEventListener("pointermove", onMove);
    }, root);

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="home" className="relative isolate h-[max(100svh,720px)] min-h-[560px] overflow-hidden bg-stage">
      <a data-logo href="#home" aria-label="Nuro home" className="absolute left-1/2 top-6 z-30 -translate-x-1/2 text-3xl font-semibold tracking-tight text-white md:top-8 md:text-5xl">
        nuro
      </a>

      <h1
        ref={word}
        aria-label="Autonomy"
        className="pointer-events-none absolute inset-x-0 top-[9%] z-0 flex select-none justify-center text-[clamp(64px,19vw,360px)] font-semibold leading-[0.9] tracking-[-0.04em]"
        style={{
          backgroundImage: "linear-gradient(180deg,#fff 18%,rgba(255,255,255,0) 82%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {"AUTONOMY".split("").map((c, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em]" aria-hidden>
            <span data-letter className="inline-block">{c}</span>
          </span>
        ))}
      </h1>

      <div ref={robot} className="absolute inset-x-0 bottom-0 top-[12%] z-10 flex items-end justify-center">
        {/* Figma node 1:36 -> public/images/hero-robot.png (transparent PNG) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-robot.png" alt="Nuro PR-50 police robotic vehicle" className="h-full w-auto max-w-none object-contain object-bottom md:h-auto md:w-[96%]" />
      </div>

      <ul className="absolute inset-0 z-20 hidden md:block">
        {HOTSPOTS.map((h) => {
          const open = active === h.id;
          return (
            <li key={h.id} data-hotspot className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
              <button
                type="button"
                aria-expanded={open}
                aria-label={h.label}
                onMouseEnter={() => setActive(h.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(h.id)}
                onBlur={() => setActive(null)}
                className="relative flex items-center"
              >
                <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/40 backdrop-blur-sm">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/50 motion-reduce:animate-none" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white shadow" />
                </span>
                <span
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-4 py-2.5 text-left text-[13px] font-medium text-ink shadow-lg transition-all duration-500 ease-nuro ${
                    h.side === "right" ? "left-10 origin-left" : "right-10 origin-right"
                  } ${open ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                >
                  <span className="block">{h.label}</span>
                  <span className={`block max-w-[220px] overflow-hidden whitespace-normal text-[12px] font-normal leading-snug text-ink/60 transition-all duration-500 ease-nuro ${open ? "mt-1 max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
                    {h.detail}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <nav data-pill aria-label="Primary" className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 md:bottom-10">
        <ul className="flex items-center gap-1 rounded-full bg-white/70 p-2 pr-3 text-sm backdrop-blur-xl md:gap-4 md:pr-6 md:text-base">
          <li>
            <a href="#product" aria-label="Scroll to product" className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-nuro hover:rotate-90 md:h-12 md:w-12">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden><path d="M1 7h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </li>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="rounded-full px-2 py-2 text-ink/80 transition-colors hover:text-ink md:px-3">{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
