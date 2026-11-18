"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const robot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Pinned cinematic expansion on scroll
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.6,
          },
        })
        .fromTo("[data-nu]", { xPercent: 10 }, { xPercent: -15, ease: "none" }, 0)
        .fromTo("[data-ro]", { xPercent: -10 }, { xPercent: 15, ease: "none" }, 0)
        .fromTo(
          robot.current,
          { scale: 0.88, yPercent: 4 },
          { scale: 1.05, yPercent: -2, ease: "none" },
          0
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="technology"
      className="relative h-[100svh] min-h-[640px] max-h-[1100px] w-full overflow-hidden bg-white select-none flex items-center justify-center"
    >
      {/* Giant "NU   RO" background letters */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-[52%] flex justify-between px-[4%] md:px-[6%] text-[clamp(130px,28vw,520px)] font-display font-bold leading-none tracking-[-0.05em] text-[#C6C6CE]"
      >
        <span data-nu className="inline-block">NU</span>
        <span data-ro className="inline-block">RO</span>
      </div>

      <h2 className="sr-only">Nuro PR-50 Front Showcase</h2>

      {/* Center robot front view with realistic ground shadow */}
      <div
        ref={robot}
        className="relative z-10 flex flex-col items-center justify-end h-[78%] w-auto max-w-[92%] pointer-events-none"
      >
        <div className="relative flex flex-col items-center justify-end h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/showcase-robot.png"
            alt="Front view of the Nuro PR-50 autonomous robot vehicle"
            className="relative z-10 h-full w-auto max-w-none object-contain"
          />

          {/* Symmetrical Automotive Ground Shadow for Front View */}
          <div className="relative -mt-6 sm:-mt-8 md:-mt-10 w-[72%] max-w-[560px] h-12 pointer-events-none">
            {/* Left Front Tire Contact Shadow */}
            <div className="absolute left-[8%] bottom-2 w-28 h-5 bg-black/90 rounded-full blur-[3px]" />
            {/* Right Front Tire Contact Shadow */}
            <div className="absolute right-[8%] bottom-2 w-28 h-5 bg-black/90 rounded-full blur-[3px]" />
            {/* Central Undercarriage Ambient Occlusion */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[80%] h-8 bg-black/75 rounded-full blur-[8px]" />
            {/* Soft Ambient Ground Spread */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-[110%] h-12 bg-black/30 rounded-full blur-2xl" />
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[130%] h-16 bg-black/15 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
