"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Robot from "./Robot";

export default function Cta() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Robot drives in from the right, then idles with a slow float.
      gsap.from("[data-bot]", { xPercent: 40, opacity: 0, duration: 1.6, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
      gsap.to("[data-float]", { y: -10, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="contact" className="mx-auto max-w-[1520px] px-6 pb-24 md:px-10 md:pb-40">
      <div className="relative grid min-h-[420px] items-center rounded-3xl bg-[#ECECEF] px-8 py-14 md:min-h-[536px] md:grid-cols-2 md:px-12 md:py-0">
        <div className="relative z-10">
          <h2 className="max-w-[674px] text-[clamp(32px,4.4vw,64px)] font-semibold leading-[1.05] tracking-tight">Ready to Embrace the Future of Robotics?</h2>
          <p className="mt-6 max-w-[620px] text-base leading-relaxed text-ink/70 md:text-lg">Join the revolution in intelligent automation with Nuro. Whether you’re looking to enhance efficiency, scale your business, or explore innovative solutions, our robotics are designed to meet your needs.</p>
          <a href="mailto:hello@nuro.example" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-7 font-medium transition-colors hover:bg-white/70">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-nuro group-hover:rotate-45">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2 12 12 2m0 0H4m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Read more
          </a>
        </div>
        <div data-bot className="pointer-events-none relative mt-10 md:absolute md:-top-[84px] md:right-0 md:mt-0 md:h-[calc(100%+84px)] md:w-1/2">
          <div data-float className="flex h-full items-end justify-center md:justify-end">
            <Robot src="/images/cta-robot.png" alt="Nuro robot ready for deployment" className="max-h-[420px] w-auto max-w-full object-contain md:max-h-full md:w-[110%] md:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
