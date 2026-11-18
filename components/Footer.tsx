const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#fleet", label: "Our Fleet" },
  { href: "#story", label: "About Us" },
  { href: "#product", label: "Technology" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path
        d="M14 8h2V5h-2.5C11.6 5 10.5 6.2 10.5 8v2h-2v3h2v6h3v-6h2l.5-3h-2.5V8.4c0-.3.2-.4.5-.4z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="16.4" cy="7.6" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path
        d="M5.5 5.5l13 13M18.5 5.5l-13 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <>
        <circle cx="7.2" cy="7.2" r="1.5" fill="currentColor" />
        <rect x="5.7" y="10" width="3" height="8" fill="currentColor" />
        <path
          d="M11 10h3v1.2c.5-.9 1.6-1.4 2.7-1.4 2 0 3.3 1.2 3.3 3.6V18h-3v-4c0-1-.5-1.6-1.4-1.6S14 13 14 14v4h-3z"
          fill="currentColor"
        />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#161618] px-6 pb-12 pt-16 text-center text-white">
      <div className="mx-auto max-w-[1200px]">
        {/* Brand Logo */}
        <a
          href="#home"
          aria-label="Nuro Home"
          className="inline-block font-display text-4xl md:text-5xl font-semibold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          nuro
        </a>

        {/* Brand Statement */}
        <p className="mx-auto mt-4 max-w-[620px] text-sm md:text-base text-white/65 leading-relaxed">
          Driven by innovation and powered by technology, Nuro strives to redefine what’s possible in the world of robotics.
        </p>

        {/* Navigation Row with Dividers */}
        <nav aria-label="Footer Navigation" className="mt-10 flex flex-wrap items-center justify-center text-xs md:text-sm">
          {LINKS.map((link, i) => (
            <div key={link.href} className="flex items-center">
              {i > 0 && <span className="mx-3 md:mx-6 text-white/20 select-none">|</span>}
              <a
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>

        {/* Social Icons Row */}
        <div className="mt-10 flex justify-center gap-4">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white/80 transition-all duration-300 hover:bg-white hover:text-[#161618] hover:-translate-y-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                {s.icon}
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-xs text-white/45">
          <p>© 2026 Nuro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
