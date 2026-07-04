"use client";

import Link from "next/link";
import { useState } from "react";
import { Header, Footer } from "@/components/Header";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(data.message ?? "If an account exists, instructions were sent.");
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-200">
      <Header />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-white">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your email and we’ll guide you through the next steps.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send reset instructions"}
            </button>
          </form>
          {message ? <p className="mt-4 text-sm text-cyan-300">{message}</p> : null}
          <p className="mt-6 text-sm text-slate-400">
            Back to <Link href="/login" className="font-semibold text-cyan-300">login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
