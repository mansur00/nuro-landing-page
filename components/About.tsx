"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Robot from "./Robot";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Image card wipes open; the robot settles from a slight zoom.
      gsap.fromTo("[data-card]", { clipPath: "inset(0 100% 0 0 round 24px)" }, { clipPath: "inset(0 0% 0 0 round 24px)", duration: 1.4, ease: "power4.inOut", scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
      gsap.fromTo("[data-bot]", { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="story" className="mx-auto grid max-w-[1520px] items-center gap-10 px-6 py-24 md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-10 md:py-40">
      <div data-card className="grid aspect-[748/466] place-items-center overflow-hidden rounded-3xl bg-[#ECECEF]">
        <Robot data-bot src="/images/about-robot.png" alt="Nuro robot on a studio backdrop" className="h-[115%] w-auto max-w-none object-contain" />
      </div>
      <div>
        <h2 className="text-[clamp(36px,4.4vw,64px)] font-semibold leading-none tracking-tight">About Nuro</h2>
        <p className="mt-6 max-w-[620px] text-base leading-relaxed text-ink/70 md:text-lg">At Nuro, we are revolutionizing the way technology interacts with daily life. Our mission is to build advanced robotics solutions that simplify tasks, enhance efficiency, and empower innovation across industries.</p>
        <p className="mt-5 max-w-[620px] text-base leading-relaxed text-ink/70 md:text-lg">Driven by innovation and powered by technology, Nuro strives to redefine what’s possible in the world of robotics. We are shaping a smarter, more connected future, one robot at a time.</p>
        <a href="#contact" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#E4E4E8] py-2 pl-2 pr-7 font-medium transition-colors hover:bg-[#D8D8DE]">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-nuro group-hover:rotate-45">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2 12 12 2m0 0H4m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          Read more
        </a>
      </div>
    </section>
  );
}
