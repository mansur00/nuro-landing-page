"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cta() {
  const root = useRef<HTMLElement>(null);
  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(botRef.current, {
        xPercent: 25,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contact"
      className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12 md:pb-36 bg-white"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#ECECEF] p-8 sm:p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8 min-h-[440px] md:min-h-[500px]">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col items-start max-w-[580px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold uppercase tracking-tight text-[#1B1B1F] leading-[1.08]">
            READY TO EMBRACE THE FUTURE OF ROBOTICS?
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#1B1B1F]/70">
            Join the revolution in intelligent automation with Nuro. Whether you’re looking to enhance efficiency, scale your business, or explore innovative solutions, our robotics are designed to meet your needs.
          </p>

          <a
            href="mailto:contact@nuro.example"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-7 text-sm font-medium text-[#1B1B1F] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all hover:bg-white/90 hover:scale-105"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1B1B1F] text-white transition-transform duration-300 group-hover:rotate-45">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 12 12 2m0 0H4m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Read more
          </a>
        </div>

        {/* Right Robot Image with Custom Ground Shadow */}
        <div
          ref={botRef}
          className="relative flex flex-col items-center justify-center md:items-end h-full w-full pointer-events-none"
        >
          <div className="relative w-full max-w-[460px] md:max-w-[520px] flex flex-col items-center md:items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cta-robot.png"
              alt="Nuro autonomous vehicle ready for integration"
              className="relative z-10 w-full object-contain"
            />

            {/* Custom Automotive Ground Shadow */}
            <div className="relative -mt-6 sm:-mt-8 md:-mt-10 w-[85%] h-12 pointer-events-none">
              {/* Tires Contact */}
              <div className="absolute left-[16%] bottom-2 w-28 h-5 bg-black/85 rounded-full blur-[3px]" />
              <div className="absolute right-[16%] bottom-2 w-28 h-5 bg-black/85 rounded-full blur-[3px]" />
              {/* Undercarriage Ambient Occlusion */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[80%] h-8 bg-black/75 rounded-full blur-[8px]" />
              {/* Diffused Floor Shadow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-[110%] h-12 bg-black/25 rounded-full blur-xl" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[125%] h-16 bg-black/15 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
