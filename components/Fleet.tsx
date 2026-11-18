"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Robot from "./Robot";

const FLEET = [
  { name: "Nuro R3", img: "/images/fleet-2.png", text: "Third generation vehicle with customizable compartments." },
  { name: "Nuro R2", img: "/images/fleet-3.png", text: "Second generation vehicle built for neighborhood routes." },
  { name: "Nuro R1", img: "/images/fleet-1.png", text: "First generation vehicle that proved autonomy on public roads." },
];

export default function Fleet() {
  const [i, setI] = useState(0);
  const n = FLEET.length;
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const prev = useRef<number[]>([]);
  const copy = useRef<HTMLDivElement>(null);
  const drag = useRef<number | null>(null);
  const title = useRef<HTMLHeadingElement>(null);

  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slides.current.forEach((el, k) => {
      if (!el) return;
      const o = ((k - i + n + 1) % n) - 1; // -1 left, 0 center, 1 right
      const props = { xPercent: -50 + o * 108, scale: o === 0 ? 1 : 0.6, opacity: o === 0 ? 1 : 0.55, zIndex: o === 0 ? 2 : 1 };
      const was = prev.current[k];
      if (was === undefined || Math.abs(o - was) > 1 || reduce) gsap.set(el, props);
      else gsap.to(el, { ...props, duration: 0.9, ease: "power3.out" });
      prev.current[k] = o;
    });
    if (!reduce) gsap.fromTo(copy.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
  }, [i, n]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(title.current, { yPercent: 14 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: title.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => { ScrollTrigger.refresh(); }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our fleet"
      className="relative overflow-hidden bg-fleet py-20 text-white md:py-32"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
    >
      <h2
        ref={title}
        className="pointer-events-none select-none text-center text-[clamp(64px,17vw,320px)] font-bold leading-[0.9] tracking-[-0.04em]"
        style={{ backgroundImage: "linear-gradient(180deg,rgba(255,255,255,0.55) 10%,rgba(255,255,255,0) 85%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
      >
        OUR FLEET
      </h2>

      <div
        className="relative mx-auto mt-[-4vw] h-[clamp(260px,42vw,760px)] w-full touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => { drag.current = e.clientX; }}
        onPointerUp={(e) => {
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {FLEET.map((f, k) => (
          <div key={f.name} ref={(el) => { slides.current[k] = el; }} aria-hidden={k !== i} className="absolute bottom-0 left-1/2 w-[min(62vw,900px)] will-change-transform">
            <Robot src={f.img} alt={`${f.name} vehicle`} className="w-full select-none" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-10 flex max-w-[1468px] items-center justify-between px-6 md:mt-16">
        <button type="button" onClick={() => go(-1)} aria-label="Previous vehicle" className="grid h-14 w-14 place-items-center text-white/45 transition-colors hover:text-white md:h-[120px] md:w-[120px]">
          <svg viewBox="0 0 120 141" className="h-10 w-10 -scale-x-100 md:h-[84px] md:w-[84px]" fill="currentColor" aria-hidden><path d="M10 12v117c0 8 9 12 15 8l92-58c5-4 5-12 0-16L25 4c-6-4-15 0-15 8z" /></svg>
        </button>

        <div ref={copy} aria-live="polite" className="flex flex-col items-center px-4 text-center">
          <h3 className="text-[clamp(40px,6vw,96px)] font-semibold leading-none tracking-tight">{FLEET[i].name}</h3>
          <p className="mt-4 max-w-[560px] text-base text-white/60 md:mt-8 md:text-xl">{FLEET[i].text}</p>
          <a href="#technology" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white/15 py-2 pl-2 pr-7 text-sm font-medium backdrop-blur transition-colors hover:bg-white/25">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink transition-transform duration-500 ease-nuro group-hover:rotate-45">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2 12 12 2m0 0H4m8 0v8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            VIEW TECHNOLOGY
          </a>
        </div>

        <button type="button" onClick={() => go(1)} aria-label="Next vehicle" className="grid h-14 w-14 place-items-center text-white/45 transition-colors hover:text-white md:h-[120px] md:w-[120px]">
          <svg viewBox="0 0 120 141" className="h-10 w-10 md:h-[84px] md:w-[84px]" fill="currentColor" aria-hidden><path d="M10 12v117c0 8 9 12 15 8l92-58c5-4 5-12 0-16L25 4c-6-4-15 0-15 8z" /></svg>
        </button>
      </div>
    </section>
  );
}
