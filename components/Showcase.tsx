"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Robot from "./Robot";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Pinned scene: NURO splits apart while the robot grows through the gap.
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", pin: true, scrub: 0.6 } })
        .fromTo("[data-nu]", { xPercent: 12 }, { xPercent: -22, ease: "none" }, 0)
        .fromTo("[data-ro]", { xPercent: -12 }, { xPercent: 22, ease: "none" }, 0)
        .fromTo("[data-bot]", { scale: 0.8, yPercent: 8 }, { scale: 1.06, yPercent: -3, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="technology" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-x-0 top-[22%] flex justify-between px-[3%] text-[clamp(120px,27vw,520px)] font-display font-bold leading-[0.8] tracking-[-0.05em] text-steel">
        <span data-nu>NU</span>
        <span data-ro>RO</span>
      </div>
      <h2 className="sr-only">Nuro PR-50</h2>
      <div data-bot className="absolute inset-x-0 bottom-0 top-[8%] flex items-end justify-center">
        <Robot src="/images/showcase-robot.png" alt="Front view of the Nuro PR-50 police robot" className="h-full w-auto max-w-none object-contain object-bottom" />
      </div>
    </section>
  );
}
