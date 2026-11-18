"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const FLEET = [
  {
    name: "NURO R3",
    img: "/images/fleet-2.png",
    text: "Third generation autonomous delivery platform with customizable compartments and automotive-grade safety.",
  },
  {
    name: "NURO R2",
    img: "/images/fleet-3.png",
    text: "Second generation neighborhood delivery vehicle engineered for passenger-free city streets.",
  },
  {
    name: "NURO R1",
    img: "/images/fleet-1.png",
    text: "First generation prototype that pioneered fully autonomous commercial goods delivery on public roads.",
  },
];

export default function Fleet() {
  const [index, setIndex] = useState(0);
  const n = FLEET.length;
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const prevIndex = (index - 1 + n) % n;
  const nextIndex = (index + 1) % n;

  const go = (step: number) => {
    setIndex((curr) => (curr + step + n) % n);
  };

  useEffect(() => {
    if (copyRef.current) {
      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [index]);

  return (
    <section
      id="fleet"
      aria-label="Our Fleet"
      className="relative overflow-hidden bg-[#18181A] text-white py-20 md:py-32 select-none"
    >
      {/* Giant "OUR FLEET" Title with metallic gradient */}
      <h2
        ref={titleRef}
        className="pointer-events-none select-none text-center text-[clamp(64px,17vw,320px)] font-bold leading-[0.88] tracking-[-0.04em] uppercase"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.02) 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        OUR FLEET
      </h2>

      {/* Vehicle Stage */}
      <div className="relative mx-auto -mt-6 md:-mt-12 h-[340px] sm:h-[420px] md:h-[580px] lg:h-[660px] w-full max-w-[1600px] flex items-center justify-center">
        {/* Left Dimmed Flanking Vehicle */}
        <div
          onClick={() => go(-1)}
          className="absolute left-[2%] md:left-[5%] top-1/2 -translate-y-1/2 w-[30%] max-w-[420px] opacity-35 scale-80 cursor-pointer transition-all duration-500 hover:opacity-60 hidden sm:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${FLEET[prevIndex].img}?v=3`}
            alt={FLEET[prevIndex].name}
            className="w-full object-contain pointer-events-none"
          />
        </div>

        {/* Center Active Vehicle with Custom Ground Shadow */}
        <div className="relative z-10 w-[70%] sm:w-[50%] max-w-[720px] flex flex-col items-center justify-center transition-transform duration-500">
          <div className="relative w-full flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={FLEET[index].name}
              src={`${FLEET[index].img}?v=3`}
              alt={FLEET[index].name}
              className="relative z-10 w-full object-contain animate-in fade-in zoom-in-95 duration-500"
            />

            {/* Soft Studio Ground Shadow */}
            <div
              className="relative -mt-4 sm:-mt-6 w-[75%] max-w-[520px] h-8 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.25) 45%, rgba(0, 0, 0, 0) 75%)",
                filter: "blur(10px)",
              }}
            />
          </div>
        </div>

        {/* Right Dimmed Flanking Vehicle */}
        <div
          onClick={() => go(1)}
          className="absolute right-[2%] md:right-[5%] top-1/2 -translate-y-1/2 w-[30%] max-w-[420px] opacity-35 scale-80 cursor-pointer transition-all duration-500 hover:opacity-60 hidden sm:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${FLEET[nextIndex].img}?v=3`}
            alt={FLEET[nextIndex].name}
            className="w-full object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Controls & Vehicle Information */}
      <div className="relative mx-auto mt-6 md:mt-10 flex max-w-[1360px] items-center justify-between px-6 md:px-12">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous vehicle"
          className="grid h-12 w-12 md:h-16 md:w-16 place-items-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Vehicle Info */}
        <div ref={copyRef} className="flex flex-col items-center px-4 text-center max-w-[620px]">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight text-white">
            {FLEET[index].name}
          </h3>
          <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/65 leading-relaxed">
            {FLEET[index].text}
          </p>

          <a
            href="#technology"
            className="group mt-6 md:mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/20 py-2.5 pl-2.5 pr-7 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105"
          >
            <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-[#1B1B1F] text-white transition-transform duration-300 group-hover:rotate-45">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 12 12 2m0 0H4m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            VIEW TECHNOLOGY
          </a>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next vehicle"
          className="grid h-12 w-12 md:h-16 md:w-16 place-items-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
