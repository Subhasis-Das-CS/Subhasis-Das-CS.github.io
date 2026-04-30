import { Code2, Database, Network, BrainCircuit, ArrowUpRight } from "lucide-react";

const courses = [
  {
    Icon: Code2,
    tag: "Foundations",
    title: "Programming · Java & Python",
    desc: "Master syntax, OOP, and clean code through hands-on projects in Python and Java — the two languages every serious developer should know.",
    bullets: ["Variables → OOP", "Project-based", "Beginner friendly"],
    accent: "from-blue-500/30 to-indigo-500/30",
  },
  {
    Icon: Network,
    tag: "Logic Core",
    title: "Data Structures & Algorithms",
    desc: "Arrays to graphs, recursion to dynamic programming. Build the problem-solving muscle that interviews and real engineering demand.",
    bullets: ["100+ problems", "Pattern based", "Big-O thinking"],
    accent: "from-violet-500/30 to-fuchsia-500/30",
  },
  {
    Icon: Database,
    tag: "Backend",
    title: "Database Management",
    desc: "Design real schemas, write efficient SQL, and understand transactions, indexes, and NoSQL — the backbone of every product.",
    bullets: ["SQL + NoSQL", "Schema design", "Indexes & joins"],
    accent: "from-emerald-500/30 to-teal-500/30",
  },
  {
    Icon: BrainCircuit,
    tag: "Frontier",
    title: "AI & Advanced Topics",
    desc: "From neural networks to building with LLMs. Learn the math behind ML and ship real AI-powered apps with modern tooling.",
    bullets: ["ML foundations", "LLM apps", "Build with APIs"],
    accent: "from-fuchsia-500/30 to-rose-500/30",
  },
];

export default function Courses() {
  return (
    <section
      id="courses"
      data-testid="courses-section"
      className="relative py-24 sm:py-32"
    >
      <div
        className="aurora-blob bg-purple-700/25"
        style={{ width: 520, height: 520, top: 0, left: -160 }}
        aria-hidden
      />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="max-w-2xl reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/90">
            Curriculum
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Four tracks. <span className="gradient-text">One engineer.</span>
          </h2>
          <p className="mt-5 text-slate-300/90 text-base sm:text-lg">
            Every student progresses through these four pillars — designed to be
            challenging, project-driven, and genuinely fun.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courses.map((c) => (
            <article
              key={c.title}
              data-testid={`course-card-${c.title.toLowerCase().split(" ")[0]}`}
              className="reveal group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 hover:-translate-y-1 transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_24px_70px_rgba(124,58,237,0.18)] overflow-hidden"
            >
              <div
                className={`absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-60 group-hover:opacity-90 transition-opacity`}
                aria-hidden
              />

              <div className="relative flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/40 to-purple-600/40 border border-white/15 text-white shadow-[0_8px_24px_rgba(99,102,241,0.25)]">
                  <c.Icon className="h-6 w-6" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-300/90 mt-2">
                  {c.tag}
                </span>
              </div>

              <h3 className="font-display relative mt-6 text-2xl font-semibold text-white">
                {c.title}
              </h3>
              <p className="relative mt-3 text-slate-300/90 text-sm sm:text-base leading-relaxed">
                {c.desc}
              </p>

              <ul className="relative mt-6 flex flex-wrap gap-2">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-slate-300"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="#apply"
                data-testid={`course-cta-${c.title.toLowerCase().split(" ")[0]}`}
                className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
              >
                Join this track
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
