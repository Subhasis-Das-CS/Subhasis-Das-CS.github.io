import { useEffect, useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Apply", href: "#apply" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#060611]/75 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between py-4">
        <a
          href="#top"
          data-testid="brand-logo"
          className="flex items-center gap-2 group"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_24px_rgba(124,58,237,0.45)]">
            <Code2 className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">
            <span className="gradient-text">Pi</span>
            <span className="text-slate-300/80"> and </span>
            <span className="text-white">Pixels</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#apply"
            data-testid="header-apply-btn"
            className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.55)] transition-shadow"
          >
            Apply Now
          </a>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden border-t border-white/10 bg-[#060611]/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-6 max-w-7xl py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-link-${l.label.toLowerCase()}`}
                className="px-4 py-3 rounded-lg text-slate-200 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#apply"
              onClick={() => setOpen(false)}
              data-testid="mobile-apply-btn"
              className="mt-2 inline-flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
