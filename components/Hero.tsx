"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const HOTSPOTS = [
  {
    id: "car",
    label: "Police Robotic Car",
    // Position of the badge (% from top-left)
    badgeX: 23,
    badgeY: 38,
    // Target dot on the vehicle (% from top-left)
    targetX: 32,
    targetY: 42,
    detail: "Purpose-built patrol platform for city streets.",
  },
  {
    id: "thermal",
    label: "Thermal Image",
    badgeX: 53,
    badgeY: 34,
    targetX: 50,
    targetY: 39,
    detail: "Thermal imaging reads heat signatures in total darkness.",
  },
  {
    id: "vision",
    label: "360° Vision",
    badgeX: 66,
    badgeY: 30,
    targetX: 59,
    targetY: 34,
    detail: "Overlapping HD cameras eliminate all blind spots.",
  },
  {
    id: "wheels",
    label: "All-Terrain Wheels",
    badgeX: 22,
    badgeY: 64,
    targetX: 31,
    targetY: 67,
    detail: "Independent drive wheels hold grip on uneven terrain.",
  },
  {
    id: "battery",
    label: "Battery",
    badgeX: 63,
    badgeY: 57,
    targetX: 57,
    targetY: 61,
    detail: "Quick-swap battery pack engineered for full-shift patrols.",
  },
  {
    id: "ultra",
    label: "Ultrasonics",
    badgeX: 47,
    badgeY: 71,
    targetX: 44,
    targetY: 67,
    detail: "High-precision close-range sensors for tight navigation.",
  },
];

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
      // Orchestrated entrance
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-logo]", { opacity: 0, y: -20, duration: 0.9 })
        .from("[data-letter]", { yPercent: 110, duration: 1.2, stagger: 0.06 }, 0.1)
        .from(robot.current, { y: 100, scale: 0.94, opacity: 0, duration: 1.4 }, 0.3)
        .from("[data-hotspot]", { opacity: 0, scale: 0.85, duration: 0.8, stagger: 0.08 }, 0.9)
        .from("[data-pill]", { y: 30, opacity: 0, duration: 0.8 }, 1.2);

      // Subtle parallax on mouse move
      const rx = gsap.quickTo(robot.current, "x", { duration: 0.9, ease: "power3" });
      const ry = gsap.quickTo(robot.current, "y", { duration: 0.9, ease: "power3" });
      const wx = gsap.quickTo(word.current, "x", { duration: 1.2, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        rx(nx * 24);
        ry(ny * 12);
        wx(nx * -30);
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
    <section
      ref={root}
      id="home"
      className="relative isolate min-h-[100svh] h-[920px] max-h-[1200px] w-full overflow-hidden select-none flex flex-col justify-between"
      style={{
        background: "radial-gradient(ellipse 90% 70% at 50% 35%, #EDEDF1 0%, #D8D8DF 55%, #C9C9D1 100%)",
      }}
    >
      {/* Top Logo */}
      <header className="relative z-30 pt-8 md:pt-10 flex justify-center">
        <a
          data-logo
          href="#home"
          aria-label="Nuro Home"
          className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          nuro
        </a>
      </header>

      {/* Giant "AUTONOMY" Headline */}
      <h1
        ref={word}
        aria-label="Autonomy"
        className="pointer-events-none absolute inset-x-0 top-[6%] md:top-[7%] z-0 flex select-none justify-center text-[clamp(60px,18.5vw,350px)] font-bold leading-none tracking-[-0.04em]"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 28%, rgba(255, 255, 255, 0.08) 85%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {"AUTONOMY".split("").map((c, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.06em]" aria-hidden>
            <span data-letter className="inline-block">{c}</span>
          </span>
        ))}
      </h1>

      {/* Center Robot Hero Image */}
      <div
        ref={robot}
        className="absolute inset-x-0 bottom-[10%] top-[12%] z-10 flex items-center justify-center pointer-events-none"
      >
        {/* Soft ground shadow */}
        <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[72%] max-w-[850px] h-20 bg-black/25 blur-3xl rounded-full" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-robot.png"
          alt="Nuro PR-50 autonomous patrol robot"
          className="relative z-10 h-auto max-h-[82%] w-auto max-w-[92%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Hotspots & Leader Lines (Desktop / Tablet) */}
      <div className="absolute inset-0 z-20 hidden md:block pointer-events-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {HOTSPOTS.map((h) => {
            const isHovered = active === h.id;
            return (
              <g key={`line-${h.id}`}>
                {/* Pointer line */}
                <line
                  x1={`${h.badgeX}%`}
                  y1={`${h.badgeY}%`}
                  x2={`${h.targetX}%`}
                  y2={`${h.targetY}%`}
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="1.2"
                  strokeDasharray={isHovered ? "none" : "2 2"}
                />
                {/* Dot on vehicle */}
                <circle
                  cx={`${h.targetX}%`}
                  cy={`${h.targetY}%`}
                  r={isHovered ? 4.5 : 3}
                  fill="#FFFFFF"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {HOTSPOTS.map((h) => {
          const isHovered = active === h.id;
          return (
            <div
              key={h.id}
              data-hotspot
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              style={{
                left: `${h.badgeX}%`,
                top: `${h.badgeY}%`,
                transform: isHovered ? "translate(-50%, -50%) scale(1.06)" : "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1B1B1F]" />
                  <span className="text-[11px] lg:text-[12px] font-medium text-[#1B1B1F] tracking-tight whitespace-nowrap">
                    {h.label}
                  </span>
                </div>

                {/* Popover detail tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-xl bg-white/95 p-3 text-left text-[11px] leading-relaxed text-[#1B1B1F]/80 shadow-xl border border-black/5 backdrop-blur-md pointer-events-none transition-all duration-200 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  <p className="font-semibold text-[#1B1B1F] mb-0.5">{h.label}</p>
                  <p>{h.detail}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Small subtle badge at bottom of vehicle */}
        <div
          data-hotspot
          className="absolute left-1/2 -translate-x-1/2 bottom-[14%] z-20 flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-4 py-1.5 border border-white/50 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[#1B1B1F] animate-pulse" />
          <span className="text-[11px] font-medium text-[#1B1B1F] tracking-wide uppercase">
            Police Robotic Car • Patrol Ready
          </span>
        </div>
      </div>

      {/* Floating Bottom Pill Navbar */}
      <nav data-pill aria-label="Primary" className="relative z-30 pb-7 md:pb-10 flex justify-center">
        <ul className="flex items-center gap-1 sm:gap-2 rounded-full bg-white/85 backdrop-blur-xl p-1.5 pr-4 md:pr-6 shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-white/70">
          <li>
            <a
              href="#product"
              aria-label="Scroll to product"
              className="grid h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 place-items-center rounded-full bg-[#1B1B1F] text-white transition-transform duration-300 hover:scale-105"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </li>
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-[#1B1B1F]/80 hover:text-[#1B1B1F] transition-colors rounded-full hover:bg-black/5"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
