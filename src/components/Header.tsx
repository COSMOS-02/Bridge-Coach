"use client";

import Link from "next/link";
import { lifeStageLabel } from "@/lib/auth";
import { useUser } from "@/context/UserProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/assess", label: "Assessment" },
  { href: "/plans", label: "Plans" },
];

export function Header() {
  const { user, ready, logout } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
            BC
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white sm:text-base">Bridge Coach</p>
            <p className="hidden text-xs text-slate-400 sm:block">Your career navigator</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white sm:px-3 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}

          {ready && user ? (
            <div className="ml-1 flex items-center gap-2 sm:ml-2">
              <span className="hidden rounded-lg bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-200 lg:inline">
                {lifeStageLabel(user.lifeStage)} · {user.currency}
              </span>
              <Link
                href="/account"
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800 sm:text-sm"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => void logout()}
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800 sm:text-sm"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="ml-1 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 sm:px-3 sm:text-sm"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90 sm:px-4 sm:text-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-900/80 bg-slate-950 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">Bridge Coach</p>
            <p className="mt-1 max-w-md text-sm text-slate-400">
              Career guidance only — not a job guarantee. From school to employed — your lifelong
              AI career navigator.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/plans" className="transition hover:text-cyan-300">
              Plans
            </Link>
            <Link href="/assess" className="transition hover:text-cyan-300">
              Assessment
            </Link>
            <Link href="/register" className="transition hover:text-cyan-300">
              Sign up
            </Link>
            <Link href="/privacy" className="transition hover:text-cyan-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-cyan-300">
              Terms
            </Link>
            <a href="mailto:hello@bridge-coach.app" className="transition hover:text-cyan-300">
              Contact
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Bridge Coach · India-first · Pay in INR or USD
        </p>
      </div>
    </footer>
  );
}
