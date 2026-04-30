# Pi and Pixels — Landing Page PRD

## Original Problem Statement
Build a modern, responsive landing page for "Pi and Pixels" — a computer science / programming institute for students in Class 5–12 and above. Must capture admission inquiries and email submissions to a recipient.

## User Personas
- Prospective students (Class 5–12, College/Above) and their parents.
- Admin / admissions team that receives inquiry emails.

## Core Requirements (static)
- Premium dark deep-blue/purple landing page with glassmorphism, gradients, micro-interactions.
- Sections: Hero, About, Courses (Programming, DSA, DBMS, AI), Admission Form, Footer.
- Admission form fields: Full Name, Phone, School, Class (5,6,7,8,9,10,11,12,College/Above).
- Floating WhatsApp button (+91 7449858122).
- Form submissions must email a recipient (subhashishdas2000@gmail.com) AND persist for record-keeping.
- Basic anti-spam (honeypot + validation).
- Fully responsive.

## Architecture
- Frontend: React (CRA) + Tailwind + shadcn/ui + lucide-react + sonner.
  - EmailJS (`@emailjs/browser`) for sending email from the browser (per user choice — JavaScript, not Python).
  - Env: `REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_TEMPLATE_ID`, `REACT_APP_EMAILJS_PUBLIC_KEY`.
- Backend: FastAPI + Motor (MongoDB).
  - `POST /api/admissions` validates payload + saves to MongoDB.
  - `GET /api/admissions` returns recent submissions (admin/test).
  - `GET /api/health` health check.
  - No email logic in backend.

## What's Been Implemented (2025-12)
- ✅ Landing page sections: Header, Hero (animated code card + gradient hero), About (4 pillars), Courses (4 cards), AdmissionForm, Footer, WhatsAppButton.
- ✅ Form validation (client + server) with floating-label inputs and shadcn Select.
- ✅ MongoDB persistence with Pydantic validation.
- ✅ EmailJS browser-side send (service_6fw8naj / template_2mwe97r).
- ✅ Honeypot anti-spam.
- ✅ Sonner toasts and success state.
- ✅ Tested via testing_agent_v3 — 100% backend, 100% frontend pass (iteration_2.json).

## Known External Config Step
- EmailJS may return 412 Precondition Failed in preview/prod until the deployed domain is whitelisted in the EmailJS dashboard for public key DBQnC9Pai--0akuRo. Form success path is intentionally non-blocking — DB record always saved.

## Backlog
### P1
- [ ] Whitelist preview/prod domain in EmailJS dashboard so live emails deliver.
- [ ] Verify the EmailJS template uses variables: `{{full_name}}`, `{{phone}}`, `{{school_name}}`, `{{student_class}}`, `{{submitted_at}}`.

### P2
- [ ] Protect `GET /api/admissions` with a simple admin token (currently public).
- [ ] Build a tiny `/admin` page to view inquiries from the browser.
- [ ] Add Google reCAPTCHA v3 alongside the honeypot.
- [ ] Testimonials section (deferred per user choice).

## Next Tasks
- Whitelist preview domain in EmailJS, confirm template variables, then take a real test submission.
