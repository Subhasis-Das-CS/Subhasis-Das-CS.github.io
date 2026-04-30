import { Code2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer({ whatsappNumber }) {
  const wa = whatsappNumber || "";
  const waDisplay = wa
    ? `+${wa.slice(0, 2)} ${wa.slice(2, 7)} ${wa.slice(7)}`
    : "";

  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-[#06060f] mt-12"
    >
      <div className="container mx-auto px-6 max-w-7xl py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
              <Code2 className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="gradient-text">Pi</span>
              <span className="text-slate-300/80"> and </span>
              <span className="text-white">Pixels</span>
            </span>
          </div>
          <p className="mt-5 max-w-md text-sm text-slate-400 leading-relaxed">
            A modern computer science institute for students in Class 5
            through college. Where logic meets creativity.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#courses" className="hover:text-white">Courses</a></li>
            <li><a href="#apply" className="hover:text-white">Apply Now</a></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-fuchsia-300" />
              <a
                data-testid="footer-email"
                href="mailto:subhashishdas2000@gmail.com"
                className="hover:text-white break-all"
              >
                subhashishdas2000@gmail.com
              </a>
            </li>
            {wa && (
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-fuchsia-300" />
                <a
                  data-testid="footer-phone"
                  href={`tel:+${wa}`}
                  className="hover:text-white"
                >
                  {waDisplay}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-fuchsia-300" />
              <span>Online & On-campus batches</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pi and Pixels. All rights reserved.</p>
          <p className="font-mono tracking-tight">
            <span className="text-slate-600">{"<"}</span> Where logic meets creativity{" "}
            <span className="text-slate-600">{"/>"}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
