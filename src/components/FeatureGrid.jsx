import { Sparkles, Star, Shield, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Realtime trends',
    desc: 'Track price action and volume across the market with auto-refresh.'
  },
  {
    icon: Sparkles,
    title: 'AI signals',
    desc: 'Get quick predictions and confidence hints to guide your next move.'
  },
  {
    icon: Star,
    title: 'Personal watchlist',
    desc: 'Follow the tickers you care about and sync across sessions.'
  },
  {
    icon: Shield,
    title: 'Secure by design',
    desc: 'Your data is protected with modern patterns and best practices.'
  }
]

export default function FeatureGrid() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
          <div className="h-10 w-10 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 grid place-items-center mb-3">
            <Icon size={18} />
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{desc}</p>
        </div>
      ))}
    </section>
  )
}
