"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Header, Footer } from "@/components/Header";
import { PathCard } from "@/components/PathCard";
import { STORAGE_KEY } from "@/lib/questions";
import { getStageContent } from "@/lib/stage-content";
import { lifeStageLabel } from "@/lib/auth";
import { useUser } from "@/context/UserProvider";
import { buildRoadmap } from "@/lib/roadmap";
import type { AssessmentResult } from "@/lib/types";

type ChatMessage = {
  role: "coach" | "user";
  text: string;
};

function generateCoachReply(message: string, result: AssessmentResult | null) {
  const lower = message.toLowerCase();
  const topPath = result?.paths[0]?.name ?? "your recommended path";

  if (lower.includes("ca") || lower.includes("b.com")) {
    return `For a commerce-focused profile, CA is usually stronger if you enjoy detail, discipline, and long-term qualification. B.Com is a better fit if you want a shorter path into business or finance roles. Your top recommendation is ${topPath}.`;
  }

  if (lower.includes("salary") || lower.includes("money")) {
    return `If earning growth is the priority, focus on paths with strong market demand and clear skill proof. The strongest options in your profile are usually the ones with higher fit and a realistic timeline, not just the most popular names.`;
  }

  if (lower.includes("stream") || lower.includes("choice")) {
    return `The best stream choice is the one that matches your interests, effort comfort, and long-term goals. Based on your assessment, I would lean toward ${topPath} as the best starting point.`;
  }

  return `A good next step is to pick one action that compounds over time: a project, internship, exam prep block, or skill-building habit. I can help you narrow that down further if you share your goal or current stage.`;
}

export default function ResultsPage() {
  const { user } = useUser();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [ready, setReady] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "coach",
      text: "I can help with follow-ups like stream choices, salary trade-offs, or next steps. Ask me anything.",
    },
  ]);

  const content = getStageContent(result?.lifeStage ?? user?.lifeStage);
  const roadmap = useMemo(() => (result ? buildRoadmap(result) : null), [result]);

  useEffect(() => {
    let ignore = false;

    async function loadResult() {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as AssessmentResult;
          if (!ignore) {
            setResult(parsed);
          }
        } catch {
          if (!ignore) {
            setResult(null);
          }
        }
      }

      try {
        const response = await fetch("/api/auth/assessment", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!ignore && data?.result) {
          setResult(data.result as AssessmentResult);
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.result));
        }
      } catch {
        // Ignore fetch errors and fall back to local session result.
      }

      if (!ignore) {
        setReady(true);
      }
    }

    void loadResult();
    return () => {
      ignore = true;
    };
  }, []);

  function handleChatSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const reply = generateCoachReply(trimmed, result);
    setChatMessages((prev) => [
      ...prev,
      { role: "user" as const, text: trimmed },
      { role: "coach" as const, text: reply },
    ]);
    setChatInput("");
  }

  if (!ready) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading your report…</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-full flex-col bg-slate-50">
        <Header />
        <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">No report yet</h1>
          <p className="mt-3 text-slate-600">
            Complete the assessment first to see your personalized career paths.
          </p>
          <Link
            href="/assess"
            className="mt-6 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Start free assessment
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-indigo-50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Your Bridge Coach report · {lifeStageLabel(result.lifeStage)}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">{content.resultsTitle}</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            {content.resultsSubtitle}
          </p>

          <div className="mt-6 inline-flex flex-col gap-1 rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-teal-100 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm font-semibold text-slate-900">
              Suggested direction: {result.topStream}
            </p>
            <p className="text-xs text-slate-500">
              {result.answers.currentClass
                ? `Class ${result.answers.currentClass} · `
                : ""}
              Generated {new Date(result.generatedAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        </section>

        <div className="mt-8 space-y-6">
          {result.paths.map((path, index) => (
            <PathCard key={path.id} path={path} rank={index + 1} />
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-teal-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                Your roadmap
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">A practical plan from now to the next 5 years</h2>
            </div>
            <p className="text-sm text-slate-500">Focus: {roadmap?.focus}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {roadmap?.milestones.map((milestone) => (
              <div key={milestone.period} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {milestone.period}
                </p>
                <h3 className="mt-2 font-semibold text-slate-900">{milestone.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {milestone.steps.map((step) => (
                    <li key={step} className="flex gap-2">
                      <span className="mt-1 text-teal-600">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Coach chat</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ask follow-up questions and get a clear, practical answer that fits your profile.
          </p>

          <div className="mt-5 space-y-3 rounded-2xl border border-indigo-100 bg-white p-4">
            {chatMessages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-3 py-2.5 text-sm ${
                  message.role === "coach"
                    ? "bg-slate-50 text-slate-700"
                    : "bg-indigo-600 text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Example: Is CA better than B.Com for me?"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0"
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Ask coach
            </button>
          </form>
        </section>

        <section className="mt-10 rounded-3xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Want the full roadmap?</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Unlock 90-day action plans and ongoing coach check-ins with a subscription — pay in{" "}
            {user?.currency ?? "INR"} at launch.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              View subscription plans
            </Link>
            <Link
              href="/assess"
              className="inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100/50"
            >
              Retake assessment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
