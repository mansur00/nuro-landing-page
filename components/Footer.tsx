const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#product", label: "Product" },
  { href: "#story", label: "Our Story" },
  { href: "#technology", label: "Technology" },
];

const SOCIAL = [
  { label: "Facebook", href: "https://facebook.com", d: <path d="M14 8h2V5h-2.5C11.6 5 10.5 6.2 10.5 8v2h-2v3h2v6h3v-6h2l.5-3h-2.5V8.4c0-.3.2-.4.5-.4z" fill="currentColor" /> },
  { label: "Instagram", href: "https://instagram.com", d: <><rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" fill="none" /><circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" fill="none" /><circle cx="16.4" cy="7.6" r="1" fill="currentColor" /></> },
  { label: "X", href: "https://x.com", d: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> },
  { label: "LinkedIn", href: "https://linkedin.com", d: <><circle cx="7.2" cy="7.2" r="1.5" fill="currentColor" /><rect x="5.7" y="10" width="3" height="8" fill="currentColor" /><path d="M11 10h3v1.2c.5-.9 1.6-1.4 2.7-1.4 2 0 3.3 1.2 3.3 3.6V18h-3v-4c0-1-.5-1.6-1.4-1.6S14 13 14 14v4h-3z" fill="currentColor" /></> },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 pt-16 text-center text-white md:pt-[60px]">
      <p className="font-display text-5xl font-semibold tracking-tight md:text-6xl">nuro</p>
      <p className="mx-auto mt-5 max-w-[659px] text-base text-white/70 md:text-lg">Driven by innovation and powered by technology, Nuro strives to redefine what’s possible in the world of robotics.</p>
      <nav aria-label="Footer" className="mt-12 flex flex-wrap items-center justify-center gap-y-3 text-base md:mt-14">
        {LINKS.map((l, k) => (
          <a key={l.href} href={l.href} className={`group relative px-6 py-1 md:px-10 ${k > 0 ? "border-l border-white/25" : ""}`}>
            <span className="relative">{l.label}<span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-nuro group-hover:scale-x-100" /></span>
          </a>
        ))}
      </nav>
      <div className="mt-12 flex justify-center gap-4 md:gap-8">
        {SOCIAL.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition-all duration-500 ease-nuro hover:-translate-y-1 hover:bg-white hover:text-ink md:h-[60px] md:w-[60px]">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>{s.d}</svg>
          </a>
        ))}
      </div>
      <p className="mt-14 border-t border-white/10 pt-6 text-sm text-white/60">© 2026 Nuro. All rights reserved.</p>
    </footer>
  );
}
