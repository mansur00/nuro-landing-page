"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const WORDS: { t: string; c: string }[] = [
  ..."INDUSTRY-LEADING ROBOTICS".split(" ").map((t) => ({ t, c: "#1B1B1F" })),
  ..."TECHNOLOGY ON THE ROAD TODAY".split(" ").map((t) => ({ t, c: "#B4B4BC" })),
];

const Arrow = ({ dark }: { dark?: boolean }) => (
  <span className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 ease-nuro group-hover:rotate-45 ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2 12 12 2m0 0H4m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);

export default function Industry() {
  const root = useRef<HTMLElement>(null);
  const stat = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-w]", root.current);
      gsap.set(words, { color: "#E4E4E8" });
      gsap.to(words, {
        color: (_i, el: HTMLElement) => el.dataset.c!,
        stagger: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "[data-h]", start: "top 80%", end: "bottom 50%", scrub: true },
      });
      gsap.from("[data-card]", {
        yPercent: 18, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power4.out",
        scrollTrigger: { trigger: "[data-cards]", start: "top 85%", once: true },
      });
      const n = { v: 0 };
      gsap.to(n, {
        v: 35, duration: 1.8, ease: "power2.out",
        scrollTrigger: { trigger: "[data-cards]", start: "top 80%", once: true },
        onUpdate: () => { if (stat.current) stat.current.textContent = String(Math.round(n.v)); },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="product" className="mx-auto max-w-[1520px] px-6 py-24 md:px-10 md:py-40">
      <h2 data-h className="max-w-[1490px] text-[clamp(36px,6.6vw,128px)] font-semibold leading-[1.02] tracking-[-0.03em]">
        {WORDS.map((w, i) => (
          <span key={i} data-w data-c={w.c} style={{ color: w.c }} className="mr-[0.25em] inline-block">{w.t}</span>
        ))}
      </h2>

      <a href="#technology" className="group mt-10 inline-flex h-14 items-center rounded-full bg-ink px-10 text-white transition-colors duration-300 hover:bg-black md:mt-14 md:h-[72px] md:px-[70px]">
        Learn More
      </a>

      <div data-cards className="mt-16 grid items-end gap-4 md:mt-24 md:grid-cols-3 md:gap-6">
        {[
          { t: "Zero tailpipe emissions", b: "Every Nuro vehicle is fully electric, so each trip adds no exhaust to the street." },
          { t: "Quieter neighborhoods", b: "Electric drive keeps noise low at night, for the people who live along the route." },
        ].map((c) => (
          <a key={c.t} data-card href="#technology" className="group flex min-h-[260px] flex-col justify-between rounded-2xl border border-ink/10 bg-white p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] md:min-h-[286px] md:p-10">
            <div className="flex items-start justify-between gap-6">
              <h3 className="max-w-[300px] font-sans text-xl font-bold leading-tight md:text-2xl">{c.t}</h3>
              <Arrow />
            </div>
            <p className="max-w-[360px] text-base text-ink/60">{c.b}</p>
          </a>
        ))}
        <a data-card href="#technology" className="group flex min-h-[320px] flex-col justify-between rounded-2xl bg-ink p-8 text-white md:min-h-[458px] md:p-10">
          <div className="flex items-start justify-between gap-6">
            <h3 className="max-w-[300px] font-sans text-xl font-bold leading-tight md:text-2xl">Electric vehicle benefits</h3>
            <Arrow dark />
          </div>
          <div>
            <p className="font-display text-[clamp(72px,8vw,120px)] font-bold leading-none tracking-tight"><span ref={stat}>35</span>%</p>
            <p className="mt-3 text-lg text-white/70">More cost effective</p>
          </div>
        </a>
      </div>
    </section>
  );
}
