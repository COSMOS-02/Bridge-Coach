"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Header, Footer } from "@/components/Header";
import { getQuestionsForStage, STORAGE_KEY } from "@/lib/questions";
import { generateRecommendations } from "@/lib/recommend";
import { getStageContent } from "@/lib/stage-content";
import { useUser } from "@/context/UserProvider";
import type { AssessmentAnswers, UserLifeStage } from "@/lib/types";

type FormState = Partial<AssessmentAnswers> & {
  favoriteSubjects?: string[];
};

const initialState: FormState = {
  favoriteSubjects: [],
};

export default function AssessPage() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [guestStage, setGuestStage] = useState<UserLifeStage>("class-12");

  const questions = useMemo(
    () => getQuestionsForStage(user?.lifeStage ?? guestStage),
    [user, guestStage],
  );
  const content = getStageContent(user?.lifeStage ?? guestStage);
  const question = questions[step];
  const progress = questions.length ? ((step + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    if (ready && user) {
      setGuestStage(user.lifeStage);
    }
  }, [ready, user]);

  const canContinue = useMemo(() => {
    if (!question) return false;
    const value = form[question.id as keyof FormState];

    if (question.type === "multi") {
      return Array.isArray(value) && value.length > 0 && value.length <= 4;
    }

    return typeof value === "string" && value.length > 0;
  }, [form, question]);

  if (!ready) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading assessment…</p>
      </div>
    );
  }

  function toggleMulti(value: string) {
    if (!question) return;
    setForm((prev) => {
      const key = question.id as "favoriteSubjects";
      const current = (prev[key] as string[] | undefined) ?? [];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v) => v !== value) };
      }
      if (current.length >= 4) return prev;
      return { ...prev, [key]: [...current, value] };
    });
  }

  function selectSingle(value: string) {
    if (!question) return;
    setForm((prev) => ({ ...prev, [question.id]: value }));
  }

  function handleNext() {
    if (!canContinue) return;

    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    const answers = form as AssessmentAnswers;
    const result = generateRecommendations(answers, user?.lifeStage ?? guestStage);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    router.push("/results");
  }

  function handleBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  const selectedValue =
    question?.type === "multi"
      ? form.favoriteSubjects ?? []
      : (form[question?.id as keyof FormState] as string | undefined);

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-4 rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900 ring-1 ring-indigo-100">
          {content.assessIntro} · {questions.length} questions for your stage
        </div>

        {!user ? (
          <div className="mb-6 rounded-2xl border border-teal-200 bg-teal-50/70 p-4 text-sm text-teal-800">
            <div className="font-semibold">Free one-time assessment is available right now</div>
            <p className="mt-1">You can start without creating an account, and sign up later if you want your results saved.</p>
          </div>
        ) : null}

        <div className="mb-6">
          <p className="text-sm font-medium text-teal-700">
            Question {step + 1} of {questions.length}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {question ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {question.title}
            </h1>
            {question.subtitle ? (
              <p className="mt-2 text-sm text-slate-600 sm:text-base">{question.subtitle}</p>
            ) : null}

            <div className="mt-6 space-y-3">
              {question.options.map((option) => {
                const isSelected =
                  question.type === "multi"
                    ? (selectedValue as string[]).includes(option.value)
                    : selectedValue === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      question.type === "multi"
                        ? toggleMulti(option.value)
                        : selectSingle(option.value)
                    }
                    className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition sm:text-base ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-200"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {question.type === "multi" ? (
              <p className="mt-3 text-xs text-slate-500">
                Selected {(form.favoriteSubjects ?? []).length}/4 max
              </p>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className="rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === questions.length - 1 ? "See my paths" : "Continue"}
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-slate-500 sm:flex-row sm:justify-center">
          <Link href="/plans" className="text-teal-700 underline-offset-2 hover:underline">
            View plans
          </Link>
          {!user ? (
            <Link href="/register" className="text-indigo-700 underline-offset-2 hover:underline">
              Create account later
            </Link>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
