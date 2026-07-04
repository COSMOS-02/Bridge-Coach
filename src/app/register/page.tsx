"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header, Footer } from "@/components/Header";
import { COUNTRIES, LIFE_STAGES } from "@/lib/auth";
import { useUser } from "@/context/UserProvider";
import type { CountryCode, UserLifeStage } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, ready } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lifeStage, setLifeStage] = useState<UserLifeStage>("class-12");
  const [country, setCountry] = useState<CountryCode>("IN");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace("/");
  }, [ready, user, router]);

  if (ready && user) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = register({ name, email, password, lifeStage, country });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push("/");
  }

  const selectedCountry = COUNTRIES.find((c) => c.value === country);

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create your Bridge Coach account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Tell us where you are in your journey — we personalize everything for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Basic details</h2>
            <div className="mt-4 space-y-4">
              <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                type="email"
              />
              <Field
                label="Password"
                value={password}
                onChange={setPassword}
                placeholder="At least 6 characters"
                type="password"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Where are you right now?</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your homepage, assessment, and coach plan adapt to this choice.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {LIFE_STAGES.map((stage) => (
                <button
                  key={stage.value}
                  type="button"
                  onClick={() => setLifeStage(stage.value)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    lifeStage === stage.value
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">{stage.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{stage.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Country</h2>
            <p className="mt-1 text-sm text-slate-500">
              Pick your country to set pricing and payment currency for your plan.
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700">Choose your country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.flag} {c.label} · {c.currency}
                  </option>
                ))}
              </select>
              <p className="mt-3 text-sm text-slate-500">
                Pricing will be shown in {selectedCountry?.currency ?? "USD"} for your selection.
              </p>
            </div>
          </section>

          {error ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account & continue"}
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:ring-2"
        required
      />
    </label>
  );
}
