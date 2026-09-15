"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 p-5 text-white shadow-2xl shadow-slate-900/30">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 font-bold text-white shadow-lg shadow-blue-500/30">
          CF
        </div>
        <h2 className="text-lg font-bold tracking-wide">Menu</h2>
      </div>

      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/issues"
          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          Issues
        </Link>
      </div>
    </aside>
  );
}