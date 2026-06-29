# Bridge Coach

**Bridge Coach** is an AI-powered lifelong career navigator. Phase 1 helps students and professionals find the right path with personalized assessments, pros/cons, fit scores, and subscription plans.

> Career guidance only — not a job or admission guarantee.

## What's included

- **Sign up / Log in** with life stage + country selection
- **7 life stages:** School kid, Class 12, College, Dropout, Job seeker, Interview prep, Employed
- **Personalized homepage** based on your life stage
- **Stage-specific assessments** (12–16 questions per stage)
- **Career path reports** with fit scores, pros/cons, next steps
- **Plans page** with INR (India) or USD (international) payment labels
- Rule-based recommendations (OpenAI-ready later)

## Run locally

```bash
cd C:\Users\abhas\Projects\bridge-coach
npm install
npm run dev
```

Open **http://localhost:3000**

### Try the full flow

1. **Sign up** at `/register` — pick life stage + country
2. See your **personalized homepage**
3. Take the **assessment** (questions adapt to your stage)
4. View **results** and **plans** (INR or USD based on country)

## Deploy to Vercel (live website)

1. Create a free account at [vercel.com](https://vercel.com)
2. In terminal:

```bash
cd C:\Users\abhas\Projects\bridge-coach
npx vercel login
npx vercel --prod
```

3. Follow prompts — Vercel gives you a public URL like `https://bridge-coach.vercel.app`

**Alternative:** Push to GitHub, then import the repo at vercel.com/new (no CLI needed).

## Auth note (MVP)

Accounts are stored in your **browser localStorage** for now. This is fine for testing and demos. Before real launch, upgrade to **Supabase Auth** for secure cloud accounts.

## Next steps

- Supabase Auth + saved reports
- Razorpay (INR) / Stripe (USD) at launch pricing
- OpenAI-powered deeper reports
- Account settings (change life stage / country)

---

Built with **JARVIS** · Bridge Coach · India-first, global-ready
