"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/Header";
import { SUBSCRIPTION_PLANS, getPricingLabel } from "@/lib/plans";
import { useUser } from "@/context/UserProvider";

export default function PlansPage() {
  const { user } = useUser();
  const currency = user?.currency ?? "INR";
  const pricing = getPricingLabel(currency);

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Subscription plans
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose your Bridge Coach plan
          </h1>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Final amounts at launch. Your currency is set from your country at registration.
          </p>
          <span className="mt-4 inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
            {pricing.badge}
          </span>
          {!user ? (
            <p className="mt-3 text-sm text-slate-500">
              <Link href="/register" className="font-semibold text-indigo-600 hover:underline">
                Sign up
              </Link>{" "}
              to save your profile and lock INR or USD pricing.
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-6 shadow-sm sm:p-7 ${
                plan.highlighted
                  ? "border-indigo-300 bg-white ring-2 ring-indigo-200"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              ) : null}

              <h2 className="text-xl font-bold text-slate-900">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>

              <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-5 text-center">
                <p className="text-2xl font-bold text-slate-900">{pricing.priceLine}</p>
                <p className="mt-1 text-xs text-slate-500">{pricing.subline}</p>
                <p className="mt-2 text-xs font-medium text-teal-700">{currency}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-teal-600">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={plan.id === "free"}
                className={`mt-8 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  plan.id === "free"
                    ? "cursor-default bg-slate-100 text-slate-500"
                    : plan.highlighted
                      ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white hover:opacity-90"
                      : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>

        <section className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Payments at launch</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• India users: Razorpay — UPI, cards, netbanking in INR.</li>
            <li>• Global users: Stripe — cards in USD.</li>
            <li>• {pricing.paymentNote}</li>
            <li>• Change country/currency in account settings (coming soon).</li>
          </ul>
          <Link
            href={user ? "/assess" : "/register"}
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {user ? "Take your assessment" : "Create free account"}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
