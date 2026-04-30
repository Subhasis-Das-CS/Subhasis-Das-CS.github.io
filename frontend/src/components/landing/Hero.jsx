import { ArrowRight, Sparkles, Terminal, Cpu, Braces } from "lucide-react";

const codeLines = [
  { t: "// Pi and Pixels — student.js", c: "text-slate-500" },
  { t: 'const learner = {', c: "text-slate-300" },
  { t: '  name: "you",', c: "text-slate-300" },
  { t: '  goal: "build real software",', c: "text-slate-300" },
  { t: "  skills: [", c: "text-slate-300" },
  { t: '    "Python", "Java",', c: "text-emerald-300" },
  { t: '    "DSA", "DBMS", "AI"', c: "text-emerald-300" },
  { t: "  ],", c: "text-slate-300" },
  { t: "  level: ++confidence", c: "text-slate-300" },
  { t: "};", c: "text-slate-300" },
  { t: 'await learner.master("logic");', c: "text-fuchsia-300" },
];

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex items-center pt-28 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 tech-grid" aria-hidden />
      <div
        className="aurora-blob bg-blue-600/40"
        style={{ width: 520, height: 520, top: -120, left: -120 }}
        aria-hidden
      />
      <div
        className="aurora-blob bg-fuchsia-600/40"
        style={{ width: 480, height: 480, top: 120, right: -140 }}
        aria-hidden
      />
      <div
        className="aurora-blob bg-indigo-700/30"
        style={{ width: 600, height: 600, bottom: -200, left: "30%" }}
        aria-hidden
      />

      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-12 gap-12 items-center relative">
        {/* Left: copy */}
        <div className="lg:col-span-7 reveal">
          <div
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-slate-300 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
            Admissions open · Class 5 – 12 & above
          </div>

          <h1
            data-testid="hero-heading"
            className="font-display mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Master Coding with{" "}
            <span className="gradient-text">Pi and Pixels</span>
          </h1>

          <p
            data-testid="hero-subheading"
            className="mt-6 max-w-xl text-lg sm:text-xl text-slate-300/90 leading-relaxed"
          >
            Where <span className="text-white font-medium">Logic</span> meets{" "}
            <span className="text-white font-medium">Creativity</span>. A serious
            programming school for curious students — from first loops to AI.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#apply"
              data-testid="hero-apply-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_40px_rgba(99,102,241,0.45)] hover:shadow-[0_14px_56px_rgba(168,85,247,0.55)] transition-all hover:-translate-y-0.5"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#courses"
              data-testid="hero-explore-btn"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-slate-100 hover:bg-white/10 hover:border-white/25 transition-colors"
            >
              Explore Courses
            </a>
          </div>

          {/* Stats */}
          <dl
            data-testid="hero-stats"
            className="mt-14 grid grid-cols-3 gap-6 max-w-lg"
          >
            {[
              { k: "1:6", v: "Mentor Ratio" },
              { k: "12+", v: "Live Projects" },
              { k: "100%", v: "Logic First" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: code card */}
        <div className="lg:col-span-5 reveal">
          <div className="relative animate-float-slow">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-fuchsia-600/40 blur-2xl opacity-70" />
            <div className="relative rounded-3xl border border-white/10 bg-[#0b0b1a]/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                </div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <Terminal className="h-3.5 w-3.5" />
                  student.js
                </div>
                <span className="w-10" />
              </div>
              <pre className="code-snippet px-6 py-6 text-[13px] leading-7 text-slate-200">
                {codeLines.map((l, i) => (
                  <div key={i} className={l.c}>
                    {l.t || "\u00A0"}
                  </div>
                ))}
              </pre>

              <div className="grid grid-cols-3 gap-3 px-5 pb-5">
                {[
                  { Icon: Braces, label: "Code" },
                  { Icon: Cpu, label: "Build" },
                  { Icon: Sparkles, label: "Ship" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300"
                  >
                    <b.Icon className="h-4 w-4 text-fuchsia-300" />
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
