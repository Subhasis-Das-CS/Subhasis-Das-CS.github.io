import { Compass, GraduationCap, Lightbulb, Rocket } from "lucide-react";

const pillars = [
  {
    Icon: Lightbulb,
    title: "Strong Fundamentals",
    desc: "We start from how a computer truly thinks — variables, memory, and control flow — so logic becomes second nature.",
  },
  {
    Icon: Compass,
    title: "Real Programming Logic",
    desc: "Every concept lands through hands-on problems, code reviews, and projects, not memorisation.",
  },
  {
    Icon: GraduationCap,
    title: "Advanced Topics",
    desc: "Move into Data Structures, DBMS, and AI when you're ready — at the pace your curiosity sets.",
  },
  {
    Icon: Rocket,
    title: "Build & Ship",
    desc: "Students leave with a portfolio of working projects: games, apps, dashboards, and AI experiments.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 sm:py-32"
    >
      <div
        className="aurora-blob bg-indigo-700/20"
        style={{ width: 460, height: 460, top: -80, right: -120 }}
        aria-hidden
      />
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7 reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/90">
              About Pi and Pixels
            </p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              A coding school that{" "}
              <span className="gradient-text">teaches you to think</span>, not
              just to type.
            </h2>
          </div>
          <p className="lg:col-span-5 text-slate-300/90 text-base sm:text-lg leading-relaxed reveal">
            We are a focused computer science institute for students in Class 5
            through college. Small mentor-led batches, real engineering tools,
            and a curriculum that grows with the learner — from first “Hello,
            world!” to deploying real applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              data-testid={`about-pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="reveal group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-7 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 text-fuchsia-200">
                <p.Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300/85 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
