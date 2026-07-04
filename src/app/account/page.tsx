"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header, Footer } from "@/components/Header";
import { useUser } from "@/context/UserProvider";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useUser();
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleDelete() {
    setDeleting(true);
    const response = await fetch("/api/auth/delete-account", { method: "POST", credentials: "include" });
    setDeleting(false);
    if (!response.ok) {
      setMessage("We could not delete your account right now.");
      return;
    }
    await logout();
    router.replace("/");
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-200">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold text-white">Account settings</h1>
        <p className="mt-3 text-slate-400">Manage your data and account privacy.</p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">Signed in as</p>
          <p className="mt-1 text-lg font-semibold text-white">{user?.name ?? "Guest"}</p>
          <p className="text-sm text-slate-400">{user?.email ?? "No account"}</p>
          <div className="mt-6 rounded-2xl border border-red-900/50 bg-red-950/40 p-4">
            <h2 className="text-lg font-semibold text-red-200">Delete account</h2>
            <p className="mt-2 text-sm text-red-300">This removes your account, saved assessment result, and session data.</p>
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={deleting}
              className="mt-4 rounded-xl border border-red-700 bg-red-900/70 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-800 disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete account"}
            </button>
          </div>
          {message ? <p className="mt-4 text-sm text-amber-300">{message}</p> : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
