"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/Header";
import { useUser } from "@/context/UserProvider";
import { getStageContent } from "@/lib/stage-content";
import { lifeStageLabel } from "@/lib/auth";

export function HomeContent() {
  const { user, ready } = useUser();
  const content = getStageContent(user?.lifeStage);

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-slate-50 via-white to-teal-50/30">
      <Header />

      <main className="flex-1">
        {ready && user ? (
          <div className="border-b border-teal-100 bg-teal-50/60">
            <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-teal-900 sm:px-6">
              Welcome back, <strong>{user.name.split(" ")[0]}</strong> · Personalized for{" "}
              <strong>{lifeStageLabel(user.lifeStage)}</strong> · Payments in{" "}
              <strong>{user.currency}</strong>
            </div>
          </div>
        ) : null}

        <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-200">
                {content.badge}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
                {content.headline}{" "}
                <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  {content.headlineAccent}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={user ? "/assess" : "/register"}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 sm:text-base"
                >
                  {user ? content.ctaPrimary : "Sign up & start free"}
                </Link>
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 sm:text-base"
                >
                  {content.ctaSecondary}
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                {content.assessIntro} · Guidance only, not a job guarantee
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Sample path report
              </p>
              <div className="mt-4 space-y-3">
                <SamplePath rank={1} name="Engineering & Tech (PCM → B.Tech)" score={84} />
                <SamplePath rank={2} name="Commerce, CA & Finance" score={76} />
                <SamplePath rank={3} name="Creative & Design" score={71} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              Why people use Bridge Coach
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {content.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5"
                >
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {content.steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {step.num}
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SamplePath({ rank, name, score }: { rank: number; name: string; score: number }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-indigo-600">Path #{rank}</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-900">{name}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
          {score}/100
        </span>
      </div>
    </div>
  );
}
