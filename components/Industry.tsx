"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const Arrow = ({ dark }: { dark?: boolean }) => (
  <span
    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
      dark ? "bg-white text-[#1B1B1F]" : "bg-[#1B1B1F] text-white"
    }`}
  >
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 12 12 2m0 0H4m8 0v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default function Industry() {
  const root = useRef<HTMLElement>(null);
  const stat = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Headline reveal
      gsap.from("[data-h] span", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      // Cards stagger in
      gsap.from("[data-card]", {
        yPercent: 15,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-cards]", start: "top 85%", once: true },
      });

      // Stat counter
      const n = { v: 0 };
      gsap.to(n, {
        v: 35,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-cards]", start: "top 80%", once: true },
        onUpdate: () => {
          if (stat.current) stat.current.textContent = String(Math.round(n.v));
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="product" className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-36 bg-white">
      {/* Multi-line Title */}
      <h2
        data-h
        className="max-w-[1360px] text-[clamp(36px,6.2vw,104px)] font-bold leading-[1.0] tracking-[-0.03em] uppercase"
      >
        <span className="block text-[#1B1B1F]">INDUSTRY-LEADING</span>
        <span className="block">
          <span className="text-[#1B1B1F]">ROBOTICS </span>
          <span className="text-[#B4B4BC]">TECHNOLOGY</span>
        </span>
        <span className="block text-[#B4B4BC]">ON THE ROAD TODAY</span>
      </h2>

      {/* Pill Action Button */}
      <div className="mt-8 md:mt-12">
        <a
          href="#technology"
          className="group inline-flex items-center rounded-full bg-[#1B1B1F] px-8 py-3.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black hover:scale-105"
        >
          Learn More
        </a>
      </div>

      {/* Cards Grid */}
      <div data-cards className="mt-16 grid items-end gap-6 md:mt-24 md:grid-cols-3">
        {/* Card 1 */}
        <a
          data-card
          href="#technology"
          className="group flex min-h-[220px] md:min-h-[260px] flex-col justify-between rounded-2xl border border-black/10 bg-white p-7 md:p-8 transition-all duration-300 hover:shadow-xl hover:border-black/20"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-[#1B1B1F] leading-snug">
              ELECTRIC VEHICLE<br />BENEFITS
            </h3>
            <Arrow />
          </div>
          <p className="text-xs md:text-sm text-[#1B1B1F]/60 max-w-[280px]">
            Zero tailpipe emissions and ultra-quiet operation built for residential streets.
          </p>
        </a>

        {/* Card 2 */}
        <a
          data-card
          href="#technology"
          className="group flex min-h-[220px] md:min-h-[260px] flex-col justify-between rounded-2xl border border-black/10 bg-white p-7 md:p-8 transition-all duration-300 hover:shadow-xl hover:border-black/20"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-[#1B1B1F] leading-snug">
              ELECTRIC VEHICLE<br />BENEFITS
            </h3>
            <Arrow />
          </div>
          <p className="text-xs md:text-sm text-[#1B1B1F]/60 max-w-[280px]">
            Scalable fleet architecture with intelligent power management and route optimization.
          </p>
        </a>

        {/* Card 3 (Dark Stat Card) */}
        <a
          data-card
          href="#technology"
          className="group flex min-h-[360px] md:min-h-[440px] flex-col justify-between rounded-2xl bg-[#1B1B1F] p-8 md:p-10 text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-white leading-snug">
              ELECTRIC VEHICLE<br />BENEFITS
            </h3>
            <Arrow dark />
          </div>

          <div className="mt-12">
            <p className="font-display text-[clamp(68px,8vw,116px)] font-bold leading-none tracking-tight">
              <span ref={stat}>35</span>%
            </p>
            <p className="mt-3 text-base md:text-lg text-white/70 font-medium">
              More Cost Effective
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
