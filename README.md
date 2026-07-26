# AI Website Chatbot Widget

An embeddable AI chat assistant for small-business websites. Visitors get instant, accurate
answers about the business (menu, hours, location, FAQs) 24/7 — grounded only in the info you
give it, so it doesn't make things up.

**Live demo:** _add your Vercel URL here_

Built with **Next.js + TypeScript + Tailwind**, powered by **Groq (Llama-3.3-70B)**.

## ✨ Features

- Floating chat bubble that drops into any page
- Answers grounded in a single, easy-to-edit knowledge file — no database needed
- Quick-reply suggestion chips
- Replies in the customer's language
- Serverless API route (your API key stays on the server, never in the browser)

## 🧱 Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · Groq API · deployed on Vercel.

## 🚀 Run locally

```bash
npm install
cp .env.example .env.local        # add your GROQ_API_KEY (free: console.groq.com/keys)
npm run dev                        # http://localhost:3000
```

## ☁️ Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it at vercel.com → New Project.
3. Add an Environment Variable: `GROQ_API_KEY`.
4. Deploy. That's it.

## 🔧 Customize for a new business

Edit **one file** — `lib/business.ts`:

- `name`, `tagline`
- `suggestions` (the quick-reply chips)
- `systemInfo` — the knowledge block the assistant answers from (hours, menu, FAQs, policies…)

No other code changes needed.

## 📄 License

MIT.
