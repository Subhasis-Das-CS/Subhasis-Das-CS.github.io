# Pi and Pixels — Landing Page

Modern, responsive landing page for the **Pi and Pixels** educational institute.
React (CRA) + Tailwind + shadcn/ui + EmailJS. **No backend** — admission inquiries
are emailed directly from the browser via EmailJS.

---

## Local development

```bash
yarn install
yarn start          # http://localhost:3000
```

Environment variables (already set in `.env`):

| Var                              | Purpose                       |
| -------------------------------- | ----------------------------- |
| `REACT_APP_EMAILJS_SERVICE_ID`   | EmailJS Service ID            |
| `REACT_APP_EMAILJS_TEMPLATE_ID`  | EmailJS Template ID           |
| `REACT_APP_EMAILJS_PUBLIC_KEY`   | EmailJS Public Key            |

Production builds use `.env.production` automatically.

---

## Deploy to GitHub Pages

This project ships with a one-command deploy script.

### 1. Update `homepage` in `package.json`

Replace the placeholder with your repo URL:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME"
```

### 2. Make sure `.env.production` has your EmailJS keys

(Already done — values are baked into the static build.)

### 3. Deploy

```bash
yarn deploy
```

This will:
1. Run `yarn build` (uses `.env.production`)
2. Push the `build/` folder to a `gh-pages` branch on your repo

### 4. Enable GitHub Pages

In your GitHub repo: **Settings → Pages → Source = `gh-pages` branch → Save.**

Your site goes live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` in ~1 min.

### 5. Whitelist the domain in EmailJS

Otherwise EmailJS returns 412 Precondition Failed.

EmailJS dashboard → **Account → Security → Allowed origins** → add:
- `https://YOUR_USERNAME.github.io`

---

## Project structure

```
frontend/
├── public/
│   └── index.html           # Google Fonts + page meta
├── src/
│   ├── App.js               # Router + Sonner toaster
│   ├── pages/
│   │   └── LandingPage.jsx  # Composes all sections
│   └── components/
│       ├── ui/              # shadcn primitives
│       └── landing/
│           ├── Header.jsx
│           ├── Hero.jsx
│           ├── About.jsx
│           ├── Courses.jsx
│           ├── AdmissionForm.jsx   ← EmailJS lives here
│           ├── Footer.jsx
│           └── WhatsAppButton.jsx
├── .env                     # Dev env vars
├── .env.production          # Build-time env vars (baked into bundle)
└── package.json
```

---

## EmailJS template variables

The template (`template_2mwe97r`) should reference these:

- `{{full_name}}`
- `{{phone}}`
- `{{school_name}}`
- `{{student_class}}`
- `{{submitted_at}}`

Set the template's **To Email** to the recipient (e.g. `subhashishdas2000@gmail.com`).
