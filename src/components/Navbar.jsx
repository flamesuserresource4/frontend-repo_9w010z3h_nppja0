import { LineChart, Settings, Star } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 grid place-items-center text-white shadow-lg shadow-sky-500/20">
            <LineChart size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">Fintweet</span>
            <span className="text-xs text-zinc-500">Finance x Sentiment x AI</span>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <Star size={16} />
            Watchlist
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <Settings size={16} />
            Settings
          </button>
        </nav>
      </div>
    </header>
  );
}
