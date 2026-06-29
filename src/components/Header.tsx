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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
            BC
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900 sm:text-base">Bridge Coach</p>
            <p className="hidden text-xs text-slate-500 sm:block">Your career navigator</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}

          {ready && user ? (
            <div className="ml-1 flex items-center gap-2 sm:ml-2">
              <span className="hidden rounded-lg bg-teal-50 px-2 py-1 text-xs font-medium text-teal-800 lg:inline">
                {lifeStageLabel(user.lifeStage)} · {user.currency}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:text-sm"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="ml-1 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 sm:px-3 sm:text-sm"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 sm:px-4 sm:text-sm"
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
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-900">Bridge Coach</p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              Career guidance only — not a job guarantee. From school to employed — your lifelong
              AI career navigator.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <Link href="/plans" className="hover:text-teal-700">
              Plans
            </Link>
            <Link href="/assess" className="hover:text-teal-700">
              Assessment
            </Link>
            <Link href="/register" className="hover:text-teal-700">
              Sign up
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Bridge Coach · India-first · Pay in INR or USD
        </p>
      </div>
    </footer>
  );
}
