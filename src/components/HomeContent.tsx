"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header, Footer } from "@/components/Header";
import { useUser } from "@/context/UserProvider";
import { getStageContent } from "@/lib/stage-content";
import { lifeStageLabel } from "@/lib/auth";

export function HomeContent() {
  const { user, ready } = useUser();
  const content = getStageContent(user?.lifeStage);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-full flex-col cosmic-hero">
      <div className={`intro-overlay ${showIntro ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden="true">
        <div className="intro-burst" />
        <div className="intro-ring intro-ring-1" />
        <div className="intro-ring intro-ring-2" />
        <div className="intro-shard intro-shard-1" />
        <div className="intro-shard intro-shard-2" />
        <div className="intro-shard intro-shard-3" />
        <div className="intro-shard intro-shard-4" />
        <div className="intro-shard intro-shard-5" />
        <div className="intro-shard intro-shard-6" />
        <div className="intro-shard intro-shard-7" />
        <div className="intro-particle intro-particle-1" />
        <div className="intro-particle intro-particle-2" />
        <div className="intro-particle intro-particle-3" />
        <div className="intro-particle intro-particle-4" />
        <div className="intro-particle intro-particle-5" />
        <div className="intro-particle intro-particle-6" />
        <div className="intro-particle intro-particle-7" />
        <div className="intro-particle intro-particle-8" />
      </div>

      <div className={`relative z-10 flex min-h-full flex-col transition-all duration-1000 ${showIntro ? "translate-y-4 scale-[0.98] opacity-0" : "translate-y-0 scale-100 opacity-100"}`}>
        <div className="space-asteroid-belt" aria-hidden="true" />
        <div className="space-dust" aria-hidden="true" />
        <div className="space-planet planet-one" aria-hidden="true" />
        <div className="space-planet planet-two" aria-hidden="true" />
        <div className="space-orbit orbit-one" aria-hidden="true" />
        <div className="space-orbit orbit-two" aria-hidden="true" />
        <div className="space-asteroid asteroid-one" aria-hidden="true" />
        <div className="space-asteroid asteroid-two" aria-hidden="true" />
        <div className="star-dots" />
        <div className="cosmic-glow left-10 top-20 h-72 w-72 bg-sky-500/30" />
        <div className="cosmic-glow right-10 top-32 h-64 w-64 bg-fuchsia-500/30" />
        <Header />

        <main className="flex-1">
        {ready && user ? (
          <div className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-200 sm:px-6">
              <span className="inline-flex rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-500/20">
                Comet protocol active
              </span>{" "}
              Welcome back, <strong>{user.name.split(" ")[0]}</strong> · Personalized for <strong>{lifeStageLabel(user.lifeStage)}</strong> · Payments in <strong>{user.currency}</strong>
            </div>
          </div>
        ) : null}

        <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-300/30">
                {content.badge}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl sm:leading-tight">
                {content.headline}{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {content.headlineAccent}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {content.description}
              </p>
              <p className="mt-6 max-w-xl rounded-3xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
                Navigate your next stage like a space mission: clear paths, honest fit scores, and a weekly plan that keeps you moving forward.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={user ? "/assess" : "/register"}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:opacity-90 sm:text-base"
                >
                  {user ? content.ctaPrimary : "Launch your path"}
                </Link>
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/80 px-6 py-3.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 sm:text-base"
                >
                  {content.ctaSecondary}
                </Link>
              </div>
              <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 text-sm text-slate-300">
                <p className="font-semibold text-cyan-200">Launch-ready support</p>
                <p className="mt-1">Need help? Use the assessment, account settings, or contact us at hello@bridge-coach.app.</p>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                {content.assessIntro} · Guidance only, not a job guarantee
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
              <div className="absolute left-[-20%] top-[-10%] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute right-[-18%] bottom-[-10%] h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  Sample path report
                </p>
                <div className="mt-4 space-y-3">
                  <SamplePath rank={1} name="Engineering & Tech (PCM → B.Tech)" score={84} />
                  <SamplePath rank={2} name="Commerce, CA & Finance" score={76} />
                  <SamplePath rank={3} name="Creative & Design" score={71} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-950/90 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
              Why people use Bridge Coach
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {content.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/30"
                >
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {content.steps.map((step) => (
              <div
                key={step.num}
                className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 text-center shadow-xl shadow-slate-950/30"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-sm font-bold text-white">
                  {step.num}
                </span>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </div>
  );
}

function SamplePath({ rank, name, score }: { rank: number; name: string; score: number }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 shadow-lg shadow-slate-950/20">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-cyan-300">Path #{rank}</p>
          <p className="mt-0.5 text-sm font-semibold text-white">{name}</p>
        </div>
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200">
          {score}/100
        </span>
      </div>
    </div>
  );
}
