"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-about-card]", {
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
      gsap.from("[data-about-text]", {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="story"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-36 bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Image Card with Custom Automotive Ground Shadow */}
        <div
          data-about-card
          className="relative aspect-[4/3] rounded-3xl bg-[#ECECEF] p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative w-full max-w-[460px] flex flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-robot.png"
              alt="Nuro autonomous patrol robot in studio setting"
              className="relative z-10 w-full object-contain"
            />

            {/* Custom Manual Ground Shadow */}
            <div className="relative -mt-6 sm:-mt-8 w-[82%] h-10 pointer-events-none">
              {/* Left Wheels Contact */}
              <div className="absolute left-[14%] bottom-2 w-24 h-4 bg-black/85 rounded-full blur-[3px]" />
              {/* Right Wheels Contact */}
              <div className="absolute right-[14%] bottom-2 w-24 h-4 bg-black/85 rounded-full blur-[3px]" />
              {/* Core Undercarriage Shadow */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[75%] h-6 bg-black/75 rounded-full blur-[7px]" />
              {/* Ambient Floor Shadow Spread */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-[105%] h-10 bg-black/25 rounded-full blur-xl" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-[120%] h-14 bg-black/15 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Right Editorial Copy */}
        <div data-about-text className="flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-[#1B1B1F] uppercase leading-tight">
            ABOUT NURO
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#1B1B1F]/70">
            Driven by innovation and powered by technology, Nuro strives to redefine what’s possible in the world of robotics. We are shaping a smarter, more connected future, one robot at a time.
          </p>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1B1B1F]/70">
            Our mission is to build advanced robotics solutions that simplify tasks, enhance efficiency, and empower innovation across neighborhoods and industries.
          </p>

          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#ECECEF] py-2.5 pl-2.5 pr-7 text-sm font-medium text-[#1B1B1F] transition-all hover:bg-[#DFDFE4] hover:scale-105"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1B1B1F] text-white transition-transform duration-300 group-hover:rotate-45">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 12 12 2m0 0H4m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Read more
          </a>
        </div>
      </div>
    </section>
  );
}
