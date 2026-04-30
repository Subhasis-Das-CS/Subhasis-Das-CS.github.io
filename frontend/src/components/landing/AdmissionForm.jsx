import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CLASS_OPTIONS = [
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "College/Above",
];

const initial = {
  full_name: "",
  phone: "",
  school_name: "",
  student_class: "",
  honeypot: "",
};

export default function AdmissionForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.full_name.trim() || form.full_name.trim().length < 2) {
      e.full_name = "Please enter your full name.";
    }
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (digits.length < 7 || digits.length > 15) {
      e.phone = "Enter a valid phone number.";
    }
    if (!form.school_name.trim() || form.school_name.trim().length < 2) {
      e.school_name = "Please enter your school name.";
    }
    if (!form.student_class) {
      e.student_class = "Please select your class.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key) => (ev) => {
    const value = ev.target ? ev.target.value : ev;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (submitting) return;
    if (!validate()) {
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/admissions`, form, {
        timeout: 25000,
      });
      if (res.data?.success) {
        setSubmitted(true);
        setForm(initial);
        toast.success(
          res.data.message ||
            "Your response has been recorded. We will contact you soon."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Could not submit. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      data-testid="admission-section"
      className="relative py-24 sm:py-32"
    >
      <div
        className="aurora-blob bg-blue-600/30"
        style={{ width: 520, height: 520, top: -120, left: -120 }}
        aria-hidden
      />
      <div
        className="aurora-blob bg-fuchsia-600/30"
        style={{ width: 480, height: 480, bottom: -160, right: -120 }}
        aria-hidden
      />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left copy */}
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/90">
              Admission Inquiry
            </p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Apply in under{" "}
              <span className="gradient-text">a minute</span>.
            </h2>
            <p className="mt-5 text-slate-300/90 text-base sm:text-lg leading-relaxed">
              Share a few details and our admissions team will reach out with
              the right batch, schedule and starter projects for you.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-slate-300/90">
              {[
                "Mentor-led personalised counselling",
                "Free trial class before you decide",
                "Flexible weekday & weekend batches",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              We’ll never share your details.
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 reveal">
            <div className="relative">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-fuchsia-600/30 blur-2xl opacity-70" />
              <div className="relative rounded-3xl border border-white/10 bg-[#0b0b1a]/80 backdrop-blur-xl p-7 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                {submitted ? (
                  <SuccessState onAgain={() => setSubmitted(false)} />
                ) : (
                  <form
                    data-testid="admission-form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Honeypot (hidden from users) */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={handleChange("honeypot")}
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        opacity: 0,
                        height: 0,
                        width: 0,
                      }}
                      aria-hidden="true"
                    />

                    <FloatingField
                      id="full_name"
                      label="Full Name"
                      value={form.full_name}
                      error={errors.full_name}
                      onChange={handleChange("full_name")}
                      autoComplete="name"
                      testId="input-full-name"
                    />

                    <FloatingField
                      id="phone"
                      label="Phone Number"
                      type="tel"
                      value={form.phone}
                      error={errors.phone}
                      onChange={handleChange("phone")}
                      autoComplete="tel"
                      testId="input-phone"
                    />

                    <FloatingField
                      id="school_name"
                      label="School Name"
                      value={form.school_name}
                      error={errors.school_name}
                      onChange={handleChange("school_name")}
                      autoComplete="organization"
                      testId="input-school"
                    />

                    {/* Class select */}
                    <div>
                      <label
                        htmlFor="student_class"
                        className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2"
                      >
                        Class
                      </label>
                      <Select
                        value={form.student_class}
                        onValueChange={(v) =>
                          handleChange("student_class")(v)
                        }
                      >
                        <SelectTrigger
                          id="student_class"
                          data-testid="select-class-trigger"
                          className={`h-14 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 ${
                            errors.student_class
                              ? "border-rose-500/60 focus:ring-rose-500/40"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                        <SelectContent
                          data-testid="select-class-content"
                          className="bg-[#0b0b1a] border-white/10 text-slate-100"
                        >
                          {CLASS_OPTIONS.map((c) => (
                            <SelectItem
                              key={c}
                              value={c}
                              data-testid={`class-option-${c.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}
                              className="focus:bg-white/10 focus:text-white"
                            >
                              {c === "College/Above"
                                ? "College / Above"
                                : `Class ${c}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.student_class && (
                        <p
                          data-testid="error-class"
                          className="mt-2 text-xs text-rose-300"
                        >
                          {errors.student_class}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      data-testid="submit-admission-btn"
                      disabled={submitting}
                      className="group relative w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.45)] hover:shadow-[0_16px_56px_rgba(168,85,247,0.55)] transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      {submitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-500">
                      By submitting, you agree to be contacted by the Pi and
                      Pixels admissions team.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingField({
  id,
  label,
  type = "text",
  value,
  error,
  onChange,
  autoComplete,
  testId,
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder=" "
          data-testid={testId}
          className={`floating-input peer block w-full rounded-xl bg-white/5 border px-4 pt-6 pb-2 text-white placeholder-transparent outline-none transition-all focus:bg-white/[0.07] focus:ring-2 focus:ring-purple-500/50 ${
            error
              ? "border-rose-500/60 focus:ring-rose-500/40"
              : "border-white/10 focus:border-purple-500/60"
          }`}
        />
        <label
          htmlFor={id}
          className="floating-label pointer-events-none absolute left-4 top-4 text-sm text-slate-400"
        >
          {label}
        </label>
      </div>
      {error && (
        <p data-testid={`error-${id.replace("_", "-")}`} className="mt-2 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessState({ onAgain }) {
  return (
    <div
      data-testid="admission-success"
      className="text-center py-8 sm:py-12"
    >
      <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.35)]">
        <CheckCircle2 className="h-8 w-8 text-emerald-300" />
      </div>
      <h3 className="font-display mt-6 text-2xl sm:text-3xl font-semibold text-white">
        Your response has been recorded.
      </h3>
      <p className="mt-3 text-slate-300/90 max-w-md mx-auto">
        We will contact you soon with next steps for your admission to Pi and
        Pixels.
      </p>
      <button
        type="button"
        data-testid="submit-another-btn"
        onClick={onAgain}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-slate-100 hover:bg-white/10"
      >
        Submit another inquiry
      </button>
    </div>
  );
}
