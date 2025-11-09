import { LineChart, LogIn, UserPlus, Moon, Sun } from 'lucide-react'

export default function HomeHeader({ dark, onToggleTheme, onLogin, onSignup }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 grid place-items-center text-white shadow-lg shadow-sky-500/20">
          <LineChart size={18} />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Fintweet</h1>
          <p className="text-xs text-slate-500">Finance x Sentiment x AI</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onLogin} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <LogIn size={16} /> Login
        </button>
        <button onClick={onSignup} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700 transition-colors">
          <UserPlus size={16} /> Sign up
        </button>
        <button onClick={onToggleTheme} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  )
}
