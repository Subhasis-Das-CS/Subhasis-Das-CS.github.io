import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ number }) {
  const message = encodeURIComponent(
    "Hi Pi and Pixels! I'd like to know more about admissions."
  );
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-floating-btn"
      aria-label="Chat with us on WhatsApp"
      className="pulse-ring fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3.5 text-white font-semibold shadow-[0_12px_40px_rgba(34,197,94,0.45)] hover:bg-emerald-400 hover:scale-[1.04] transition-all duration-300 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm">Chat with us</span>
    </a>
  );
}
